// Fonction setFavori pour le côté client
export async function setFavori(house) {
    try {
        // Appel direct à l'API PocketBase pour inverser le favori
        await fetch(`http://127.0.0.1:8090/api/collections/Maison/records/${house.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ favori: !house.favori })
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du favori:', error);
    }
}
