--remove the client in rooms where the clients 
DELETE FROM CLIENT_IN_ROOMS WHERE allocated_room_id = any ((SELECT id FROM rooms_allocation
MINUS
SELECT distinct(allocated_room_id) FROM CLIENT_IN_ROOMS )
UNION
(SELECT id FROM rooms_allocation MINUS SELECT allocated_room_id FROM BOOKING_ROOMS_ALLOCATION)) ;

DELETE FROM BOOKING_ROOMS_ALLOCATION WHERE allocated_room_id = any ((SELECT id FROM rooms_allocation
MINUS
SELECT distinct(allocated_room_id) FROM CLIENT_IN_ROOMS )
UNION
(SELECT id FROM rooms_allocation MINUS SELECT allocated_room_id FROM BOOKING_ROOMS_ALLOCATION)) ;

DELETE FROM BOOKINGS WHERE id = any (SELECT id FROM BOOKINGS
MINUS
SELECT booking_id FROM BOOKING_ROOMS_ALLOCATION);

--remove clients that do not belong to any allocation
DELETE FROM CLIENTS WHERE id = any (
SELECT (id) FROM CLIENTS
MINUS
SELECT (client_id) FROM CLIENT_IN_ROOMS);
