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

export async function setFavori(house) {
    await db.collection('Maison').update(house.id, { favori: !house.favori });
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
export async function filterByPrix(minPrix, maxPrix) {
    try {
        let data = await db.collection('Maison').getFullList({
            filter: `prix >= ${minPrix} && prix <= ${maxPrix}`,
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant les maisons par prix', error);
        return [];
    }
}

export async function addOffre(house) {
    try {
        await db.collection('Maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function getAgents() {
    try {
        let data = await db.collection('Agent').getFullList({
            sort: '-created',
            expand: 'Maison(agent)'
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des agents', error);
        return [];
    }
}

export async function getOffresByAgent(agentId) {
    try {
        let data = await db.collection('Maison').getFullList({
            filter: `agent = "${agentId}"`,
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant les offres de l\'agent', error);
        return [];
    }
}

export async function getFavoris() {
    try {
        let data = await db.collection('Maison').getFullList({
            filter: 'favori = true',
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant les maisons favorites', error);
        return [];
    }
}