import PocketBase from "pocketbase";
const db = new PocketBase("http://127.0.0.1:8090/");

export async function getOffres() {
    try {
        let data = await db.collection('Maison').getFullList({
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getOffre(id) {
    try {
        const data = await db.collection('Maison').getOne(id);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function getImageUrl(record, recordImage) {
    return db.files.getURL(record, recordImage);
}

export async function setFavori(offreId, isFavori) {
    try {
        const updatedOffre = await db.collection("maison").update(offreId, 
            { favori: isFavori }
        );
        return updatedOffre;
    } catch (error) {
        console.error("Error setting favori status:", error);
        return null;
    }
}

export async function getOffresBySurface(minSurface) {
    try {
        let data = await db.collection('Maison').getFullList({
            filter: `surface >= ${minSurface}`,
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant les maisons par surface', error);
        return [];
    }
}

export async function getOffresByPrix(maxPrix) {
    try {
        let data = await db.collection('Maison').getFullList({
            filter: `prix <= ${maxPrix}`,
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant les maisons par prix', error);
        return [];
    }
}
