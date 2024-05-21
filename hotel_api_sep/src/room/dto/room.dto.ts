export type RoomReservationDetails = {
  description: string;
  numberOfDays: number;
  reservationStartDate: Date;
  reservationEndDate: Date;
  userId: string;
  price: number;
};

export type stats = {
  users: number;
  rooms: number;
  reservations: number;
  income: number;
  pendingReservations: number;
  finishedReservations: number;
};
