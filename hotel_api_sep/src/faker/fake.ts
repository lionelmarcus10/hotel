import { faker } from '@faker-js/faker';
import { Room } from '../room/room.interface';
import { RoomService } from '../room/room.service';
import { RoomReservationDetails } from '../room/dto/room.dto';
import { UserService } from '../user/user.service';

export function generateRooms(n: number): Room[] {
  const rooms: Room[] = Array.from({ length: n }, (_, i) => ({
    id: i,
    name: faker.commerce.productName(),
    reserved: false,
    details: faker.lorem.paragraph(),
    price: parseFloat(faker.commerce.price()),
    reservationDetails: null,
    previousReservationDetails: [],
    nextReservationDetails: [],
  }));
  return rooms;
}

export function generateClerkUsers(n: number) {
  const clerkUsers = Array.from({ length: n }, () => ({
    emailAddress: [faker.internet.email()],
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    password: 'Efrei2024',
  }));
  return clerkUsers;
}

export async function generateRoomReservationDetails(
  n: number,
  service: RoomService,
) {
  const rooms = service.findAllRooms();
  console.log(service.rooms.length);
  if (rooms.length < n)
    return 'Not enough rooms to generate reservations. Please add more rooms.';

  // choose n random rooms
  const randomRooms = faker.helpers.arrayElements(rooms, n);
  const randomUsers = faker.helpers.arrayElements(
    (await new UserService().findAll()).data.map((user) => user.id),
    n,
  );

  if (randomUsers.length < n)
    return 'Not enough users to generate reservations. Please add more users.';

  // zip random rooms with random users
  const roomReservationDetails = randomRooms.map((room, i) => {
    const { reservationStartDate, reservationEndDate, dateType } =
      generateReservationDates();
    const reservationDetails: RoomReservationDetails = {
      description: faker.lorem.sentence(),
      numberOfDays: faker.number.int({ min: 1, max: 20 }),
      reservationEndDate: reservationEndDate,
      reservationStartDate: reservationStartDate,
      userId: randomUsers[i],
      price: room.price,
    };
    return {
      roomId: room.id,
      resDetail: reservationDetails,
      dateType: dateType,
    };
  });

  return roomReservationDetails;
}

function generateReservationDates() {
  const type = faker.helpers.arrayElement(['past', 'ongoing', 'future']);

  let reservationStartDate;
  let reservationEndDate;

  switch (type) {
    case 'past':
      reservationEndDate = faker.date.recent();
      reservationStartDate = faker.date.between(
        faker.date.past(1),
        reservationEndDate,
      );
      break;
    case 'ongoing':
      reservationStartDate = faker.date.recent();
      reservationEndDate = faker.date.soon(
        faker.number.int({ min: 2, max: 30 }),
      );
      break;
    case 'future':
      reservationStartDate = faker.date.soon(20);
      reservationEndDate = faker.date.future(1, reservationStartDate);
      break;
  }

  return { dateType: type, reservationStartDate, reservationEndDate };
}
