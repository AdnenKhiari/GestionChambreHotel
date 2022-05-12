SET SERVEROUTPUT ON;
CREATE OR REPLACE PACKAGE GestionHotel AS
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
    date_checkin bookings.date_checkin%TYPE,
    date_checkout bookings.date_checkout%TYPE,
    rooms r_array
);

PROCEDURE get_booking_info(xid IN NUMBER,res OUT booking_obj);
END GestionHotel;
/
CREATE OR REPLACE PACKAGE BODY GestionHotel AS
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

SELECT b.id,b.date_checkin,b.date_checkout INTO current_bk.booking_id,current_bk.date_checkin,current_bk.date_checkout
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

