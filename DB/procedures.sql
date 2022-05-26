SET SERVEROUTPUT ON;
CREATE OR REPLACE PACKAGE GestionHotel AS

--for data insertion and modification
TYPE set_removed_arr IS TABLE OF NUMBER INDEX BY BINARY_INTEGER;
TYPE set_c_arr IS TABLE OF NUMBER INDEX BY BINARY_INTEGER;
TYPE set_room_obj IS RECORD(
    allocated_room_id booking_rooms_allocation.allocated_room_id%TYPE,
    food_choice rooms_allocation.food_choice%type,
    room_id ROOMS.id%TYPE,
    offer_id offers.id%TYPE,
    clients_to_remove set_c_arr,
    clients_to_add set_c_arr
);
TYPE set_r_arr IS TABLE OF set_room_obj INDEX BY BINARY_INTEGER;

TYPE set_booking_obj IS RECORD(
    booking_id bookings.id%TYPE,
    name bookings.name%TYPE,
    date_checkin bookings.date_checkin%TYPE,
    date_checkout bookings.date_checkout%TYPE,
    rooms set_r_arr
);
TYPE c_obj IS RECORD (
    client_id CLIENTS.id%TYPE,
    client_name CLIENTS.fullname%TYPE,
    client_date_of_birth CLIENTS.date_of_birth%TYPE,
    client_gender CLIENTS.gender%TYPE
);
TYPE c_array IS TABLE OF c_obj INDEX BY BINARY_INTEGER;
TYPE r_obj IS RECORD  (
    room_id ROOMS.id%TYPE,
    food_choice rooms_allocation.food_choice%TYPE,
    allocated_room_id booking_rooms_allocation.allocated_room_id%TYPE,
    offer_id offers.id%TYPE,
    room_number rooms.room_number%TYPE,
    room_capacity rooms.capacity%TYPE,
    room_type rooms.type%TYPE,
    room_option rooms.options%TYPE,
    offer_name offers.name%TYPE,
    offer_price offers.price%TYPE,
    clients c_array
);
TYPE r_array IS TABLE OF r_obj INDEX BY BINARY_INTEGER;
TYPE booking_obj IS RECORD (
    booking_id bookings.id%TYPE,
    booking_name bookings.name%TYPE,
    date_checkin bookings.date_checkin%TYPE,
    date_checkout bookings.date_checkout%TYPE,
    rooms r_array
);

PROCEDURE get_booking_info(xid IN NUMBER,res OUT booking_obj);
PROCEDURE set_booking_info(new_booking IN set_booking_obj,rooms_to_be_removed IN set_removed_arr);
PROCEDURE remove_booking(id IN NUMBER);

END GestionHotel;
/
CREATE OR REPLACE PACKAGE BODY GestionHotel AS

PROCEDURE remove_booking(id IN NUMBER) IS 
TYPE number_arr is TABLE OF NUMBER INDEX BY BINARY_INTEGER;
rm NUMBER;
arr number_arr;
BEGIN
   -- DBMS_OUTPUT.PUT_LINE('XDDDDDDDDD');

    SELECT allocated_room_id BULK COLLECT INTO arr  FROM BOOKING_ROOMS_ALLOCATION WHERE  booking_id=id;
    FOR rm IN 1..arr.COUNT 
    LOOP

    DELETE FROM BOOKING_ROOMS_ALLOCATION WHERE allocated_room_id=arr(rm);
    -- for error
    IF SQL%ROWCOUNT = 0 THEN
        raise_application_error(-20000, 'Could not remove from BOOKING_ROOMS_ALLOCATION');
    END IF;


    DELETE FROM CLIENT_IN_ROOMS WHERE allocated_room_id=arr(rm);
    -- for error
    IF SQL%ROWCOUNT = 0 THEN
        raise_application_error(-20000, 'Could not remove from CLIENT_IN_ROOMS');
    END IF;


    DELETE FROM ROOMS_ALLOCATION WHERE id=arr(rm);
    -- for error
    IF SQL%ROWCOUNT = 0 THEN
        raise_application_error(-20000, 'Could not remove from ROOMS_ALLOCATION');
    END IF;
       
    --DBMS_OUTPUT.PUT_LINE(rm);
    END LOOP;
    
END remove_booking;

PROCEDURE set_booking_info(new_booking IN set_booking_obj,rooms_to_be_removed IN set_removed_arr) IS 

room_iterator NUMBER;
client_iterator NUMBER;

room_instance set_room_obj;
bk set_booking_obj;
bk_id NUMBER;
r_index NUMBER;
r_id NUMBER;
BEGIN

   bk := new_booking;

   IF bk.booking_id = -1 THEN
   
       INSERT INTO BOOKINGS VALUES (null,bk.name,bk.date_checkin,bk.date_checkout)
       RETURNING id INTO bk_id;
       
        -- for error
        IF SQL%ROWCOUNT = 0 THEN
            raise_application_error(-20000, 'Could not insert into BOOKINGS');
        END IF;

       bk.booking_id := bk_id;
       
    ELSE
    
       UPDATE BOOKINGS SET 
       name = bk.name,
       date_checkin = bk.date_checkin,
       date_checkout=bk.date_checkout
       
       WHERE id = bk.booking_id;
   
        -- for error
        IF SQL%ROWCOUNT = 0 THEN
            raise_application_error(-20000, 'Could not update BOOKINGS');
        END IF;

    END IF;
    
   FOR r_index IN 0..rooms_to_be_removed.COUNT-1
   LOOP
    DELETE FROM BOOKING_ROOMS_ALLOCATION WHERE allocated_room_id=rooms_to_be_removed(r_index);
    -- for error
    IF SQL%ROWCOUNT = 0 THEN
        raise_application_error(-20000, 'Could not remove from BOOKING_ROOMS_ALLOCATION');
    END IF;

    DELETE FROM CLIENT_IN_ROOMS WHERE allocated_room_id=rooms_to_be_removed(r_index);
        -- for error
    IF SQL%ROWCOUNT = 0 THEN
        raise_application_error(-20000, 'Could not remove from CLIENT_IN_ROOMS');
    END IF;

    DELETE FROM ROOMS_ALLOCATION WHERE id=rooms_to_be_removed(r_index);
        -- for error
    IF SQL%ROWCOUNT = 0 THEN
        raise_application_error(-20000, 'Could not remove from ROOMS_ALLOCATION');
    END IF;

   END LOOP;
          
   FOR room_iterator IN 0..bk.rooms.COUNT-1
   LOOP
       
          room_instance := bk.rooms(room_iterator);
          
         IF room_instance.allocated_room_id = -1 THEN
          
            INSERT INTO ROOMS_ALLOCATION VALUES (null,room_instance.food_choice,room_instance.room_id,room_instance.offer_id)
            RETURNING id INTO r_id;
            -- for error
            IF SQL%ROWCOUNT = 0 THEN
                raise_application_error(-20000, 'Could not insert in Rooms Allocation');
            END IF;
            
            room_instance.allocated_room_id := r_id;
            
            INSERT INTO BOOKING_ROOMS_ALLOCATION VALUES (bk.booking_id,room_instance.allocated_room_id);
            -- for error
            IF SQL%ROWCOUNT = 0 THEN
                raise_application_error(-20000, 'Could not insert in BOOKING_ROOMS_ALLOCATION');
            END IF;

        ELSE
         
            UPDATE ROOMS_ALLOCATION SET
            food_choice = room_instance.food_choice,
            room_id=room_instance.room_id,
            offer_id=room_instance.offer_id
            WHERE id = room_instance.allocated_room_id;    
            -- for error
            IF SQL%ROWCOUNT = 0 THEN
                raise_application_error(-20000, 'Could not update in Rooms Allocation');
            END IF;

        END IF;
            
        FOR client_iterator IN 0..room_instance.clients_to_add.COUNT-1
        LOOP
            INSERT INTO CLIENT_IN_ROOMS VALUES (room_instance.clients_to_add(client_iterator),room_instance.allocated_room_id);
            -- for error
            IF SQL%ROWCOUNT = 0 THEN
                raise_application_error(-20000, 'Could not insert in CLIENT_IN_ROOMS');
            END IF;
        END LOOP;
        
        FOR client_iterator IN 0..room_instance.clients_to_remove.COUNT-1
        LOOP
            DELETE FROM CLIENT_IN_ROOMS WHERE client_id = room_instance.clients_to_remove(client_iterator) AND allocated_room_id=room_instance.allocated_room_id;
            -- for error
            IF SQL%ROWCOUNT = 0 THEN
                raise_application_error(-20000, 'Could not remove from CLIENT_IN_ROOMS');
            END IF;
        END LOOP;
        
    END LOOP;
   

END set_booking_info;

PROCEDURE get_booking_info(xid IN NUMBER,res OUT booking_obj) IS
--For geting the rooms data
CURSOR rooms_data (bid in NUMBER) IS 
SELECT ra.id,ra.food_choice ,ra.room_id,ra.offer_id,r.room_number,r.capacity,r.type,r.options,o.name,o.price
FROM BOOKING_ROOMS_ALLOCATION b,ROOMS_ALLOCATION ra,OFFERS o,ROOMS r 
WHERE b.booking_id = bid 
--join on room allocation
AND b.allocated_room_id = ra.id 
--join on offer
AND ra.offer_id = o.id 
-- join on room
AND r.id=ra.room_id ;

all_rooms r_array;
room_instance r_obj;

room_counter NUMBER DEFAULT 0;

current_bk booking_obj;

BEGIN

SELECT b.id,b.name,b.date_checkin,b.date_checkout INTO current_bk.booking_id,current_bk.booking_name,current_bk.date_checkin,current_bk.date_checkout
FROM BOOKINGS b
WHERE b.id = xid;
OPEN rooms_data(current_bk.booking_id);
    LOOP
    
    FETCH rooms_data INTO 
    room_instance.allocated_room_id ,
    room_instance.food_choice ,
    room_instance.room_id,
    room_instance.offer_id ,
    room_instance.room_number ,
    room_instance.room_capacity ,
    room_instance.room_type ,
    room_instance.room_option ,
    room_instance.offer_name ,
    room_instance.offer_price;
    
    EXIT WHEN rooms_data%notfound;
                
    SELECT c.id,c.fullname,c.date_of_birth,c.gender BULK COLLECT INTO room_instance.clients FROM CLIENTS c,CLIENT_IN_ROOMS cir WHERE cir.client_id = c.id AND cir.allocated_room_id = room_instance.allocated_room_id  ;        
    current_bk.rooms(current_bk.rooms.COUNT) := room_instance;
    DBMS_OUTPUT.PUT_LINE(current_bk.booking_id || ',' || current_bk.date_checkin || ',' || current_bk.date_checkout || ',' || room_instance.allocated_room_id || ',' || room_instance.food_choice || ',' || room_instance.room_number || ',' || room_instance.clients(1).client_name); 
    END LOOP;
    
CLOSE rooms_data;
res :=current_bk;
END;
END GestionHotel;