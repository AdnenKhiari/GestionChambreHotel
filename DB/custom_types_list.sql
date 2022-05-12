/*DROP TYPE o_c_obj;
DROP TYPE o_c_array;
DROP TYPE o_r_obj;
DROP TYPE o_r_array;
DROP TYPE o_booking_obj;*/

CREATE OR REPLACE  TYPE client_object AS OBJECT (
    client_id INTEGER,
    client_name VARCHAR(30),
    client_date_of_birth DATE,
    client_gender CHAR(1)
);
CREATE OR REPLACE TYPE client_array AS TABLE OF client_object;
CREATE OR REPLACE TYPE room_object AS OBJECT  (
    room_id INTEGER,
    food_choice CHAR(2),
    allocated_room_id INTEGER,
    offer_id INTEGER,
    room_number INTEGER,
    room_capacity CHAR(1),
    room_type CHAR(1),
    room_option CHAR(1),
    offer_name VARCHAR(40),
    offer_price NUMBER(5,2),
    clients client_array
);
CREATE OR REPLACE TYPE  room_array AS TABLE OF room_object;
CREATE OR REPLACE TYPE booking_object AS OBJECT (
    booking_id INTEGER,
    date_checkin DATE,
    date_checkout DATE,
    rooms room_array
);
