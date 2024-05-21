export async function getAllRooms(){
    const response = await fetch('http://localhost:3000/rooms')
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données des salles');
    } else {
        const rooms = await response.json();
        return rooms;
    }
}

export async function getStats(){
        const response = await fetch('http://localhost:3000/stats', {
          method: 'GET',
          headers: {
            'accept': '*/*'
          }
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const stats = await response.json();
        
        return { users: stats.users, rooms: stats.rooms, reservations: stats.reservations, pendingReservations: stats.pendingReservations, finishedReservations: stats.finishedReservations, income: stats.income }
}