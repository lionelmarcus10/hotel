export async function fetchUsersData() {
  try {

    const response = await fetch("http://localhost:3000/users-clerk",{
        method: 'GET',
        headers: {
            "accept": "*/*",
        },
    });
    if (!response.ok) {
      throw new Error(
        "Erreur lors de la récupération des données des utilisateurs"
      );
    }

    const userData = await response.json(); // Extraire les données d'utilisateur de la réponse JSON

    // Mapper les données d'utilisateur pour extraire les champs requis
    const userList = userData.data.map((user) => ({
      name: `${user.firstName} ${user.lastName}`, // Nom + Prénom
      email:
        user.emailAddresses.length > 0
          ? user.emailAddresses[0].emailAddress
          : "Non renseigné", // Email (si disponible)
      phone:
        user.phoneNumbers.length > 0 ? user.phoneNumbers[0].phoneNumber : "Non renseigné", // Numéro de téléphone (si disponible)
      userId: user.id, // Identifiant de l'utilisateur
      createdAt: formatDate(new Date(user.createdAt)), // Date de création au format français
    }));

    return userList; // Retourner la liste des utilisateurs avec les champs requis
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la liste des utilisateurs :",
      error
    );
    throw error; // Propager l'erreur
  }
}

export async function fetchUserDataById(userId) {
    try {
      const response = await fetch(`http://localhost:3000/users-clerk/${userId}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données de l\'utilisateur');
      }
      const userData = await response.json(); // Extraire les données de l'utilisateur de la réponse JSON
      
      // Extraire les champs requis de l'utilisateur
      const user = {
        name: `${userData.firstName} ${userData.lastName}`, // Nom + Prénom
        email: userData.emailAddresses.length > 0 ? userData.emailAddresses[0].emailAddress : 'Non renseigné', // Email (si disponible)
        phoneNumber: userData.phoneNumbers.length > 0 ? userData.phoneNumbers[0].phoneNumber : 'Non renseigné', // Numéro de téléphone (si disponible)
        userId: userData.id, // Identifiant de l'utilisateur
        createdAt: formatDate(new Date(userData.createdAt)) // Date de création au format français
      };
  
      return user; // Retourner les données de l'utilisateur avec les champs requis
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
      throw error; // Propager l'erreur
    }
  }
  
 export async function deleteUserById(userId) {
    try {
      const response = await fetch(`http://localhost:3000/users-clerk/${userId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'utilisateur');
      }
      return "success"; // Message de réussite
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      throw error; // Propager l'erreur
    }
  }

export function formatDate(date) {
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}



export function getUserReservations(userId, rooms) {
  const userReservations = {
    current: [],
    previous: [],
    future: []
  };

  rooms.forEach(room => {
    if (room.reservationDetails && room.reservationDetails.userId === userId) {
      userReservations.current.push(room);
    }

    if (room.previousReservationDetails.length > 0) {
      room.previousReservationDetails.forEach(reservation => {
        if (reservation.userId === userId) {
          userReservations.previous.push(room);
        }
      });
    }

    if (room.nextReservationDetails.length > 0) {
      room.nextReservationDetails.forEach(reservation => {
        if (reservation.userId === userId) {
          userReservations.future.push(room);
        }
      });
    }
  });
  return userReservations;
}