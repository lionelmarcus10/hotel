export async function getAllRooms(){
    const response = await fetch('http://localhost:3000/rooms')
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données des salles');
    } else {
        const rooms = await response.json();
        return rooms;
    }
}