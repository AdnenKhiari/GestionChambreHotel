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
);*/
TYPE r_array IS TABLE OF r_obj INDEX BY BINARY_INTEGER;

TYPE booking_obj IS RECORD (
    booking_id bookings.id%TYPE,
    date_checkin bookings.date_checkin%TYPE,
    date_checkout bookings.date_checkout%TYPE,
    rooms r_array
);