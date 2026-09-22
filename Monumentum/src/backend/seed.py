import asyncio

from sqlmodel import select

from db.database import async_session
from models.monument import Monument, Rarete


monuments = [
    # =========================
    # CHÂTEAUX
    # =========================

    Monument(
        titre="Tour Eiffel",
        categorie="Monument",
        description="Grande tour métallique construite pour l'Exposition universelle de 1889.",
        image_url="https://example.com/tour-eiffel.jpg",
        annee=1889,
        ville="Paris",
        architecte="Gustave Eiffel",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Château de Chambord",
        categorie="Château",
        description="Grand château de la Loire construit à partir du règne de François Ier.",
        image_url="https://example.com/chambord.jpg",
        annee=1519,
        ville="Chambord",
        architecte="Domenico da Cortona",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Château de Versailles",
        categorie="Château",
        description="Ancienne résidence royale située à proximité de Paris.",
        image_url="https://example.com/versailles.jpg",
        annee=1623,
        ville="Versailles",
        architecte="Louis Le Vau",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Château de Fontainebleau",
        categorie="Château",
        description="Ancienne résidence royale et impériale située en Seine-et-Marne.",
        image_url="https://example.com/fontainebleau.jpg",
        annee=1137,
        ville="Fontainebleau",
        architecte="Plusieurs architectes",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Château de Chenonceau",
        categorie="Château",
        description="Château construit sur le Cher et surnommé le château des Dames.",
        image_url="https://example.com/chenonceau.jpg",
        annee=1513,
        ville="Chenonceaux",
        architecte="Thomas Bohier",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Château de Villandry",
        categorie="Château",
        description="Château de la Renaissance célèbre notamment pour ses jardins.",
        image_url="https://example.com/villandry.jpg",
        annee=1536,
        ville="Villandry",
        architecte="Jean Le Breton",
        rarete=Rarete.SUPER_RARE,
    ),

    Monument(
        titre="Château d'Azay-le-Rideau",
        categorie="Château",
        description="Château de la Renaissance construit sur une île de l'Indre.",
        image_url="https://example.com/azay-le-rideau.jpg",
        annee=1518,
        ville="Azay-le-Rideau",
        architecte="Gilles Berthelot",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Château de Pierrefonds",
        categorie="Château",
        description="Château médiéval restauré au XIXe siècle sous la direction de Viollet-le-Duc.",
        image_url="https://example.com/pierrefonds.jpg",
        annee=1396,
        ville="Pierrefonds",
        architecte="Eugène Viollet-le-Duc",
        rarete=Rarete.SUPER_RARE,
    ),

    Monument(
        titre="Château de Vaux-le-Vicomte",
        categorie="Château",
        description="Château du XVIIe siècle considéré comme un modèle de l'architecture classique française.",
        image_url="https://example.com/vaux-le-vicomte.jpg",
        annee=1656,
        ville="Maincy",
        architecte="Louis Le Vau",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Château de Blois",
        categorie="Château",
        description="Château royal situé au cœur de la ville de Blois.",
        image_url="https://example.com/blois.jpg",
        annee=1390,
        ville="Blois",
        architecte="Plusieurs architectes",
        rarete=Rarete.SUPER_RARE,
    ),

    # =========================
    # CATHÉDRALES
    # =========================

    Monument(
        titre="Cathédrale Notre-Dame de Paris",
        categorie="Cathédrale",
        description="Cathédrale gothique située sur l'île de la Cité à Paris.",
        image_url="https://example.com/notre-dame-paris.jpg",
        annee=1163,
        ville="Paris",
        architecte="Architectes médiévaux",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Cathédrale Notre-Dame de Chartres",
        categorie="Cathédrale",
        description="Cathédrale gothique célèbre pour ses vitraux et son architecture.",
        image_url="https://example.com/chartres.jpg",
        annee=1194,
        ville="Chartres",
        architecte="Architectes médiévaux",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Cathédrale Notre-Dame d'Amiens",
        categorie="Cathédrale",
        description="L'une des plus grandes cathédrales gothiques de France.",
        image_url="https://example.com/amiens.jpg",
        annee=1220,
        ville="Amiens",
        architecte="Robert de Luzarches",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Cathédrale Notre-Dame de Reims",
        categorie="Cathédrale",
        description="Grande cathédrale gothique où furent couronnés de nombreux rois de France.",
        image_url="https://example.com/reims.jpg",
        annee=1211,
        ville="Reims",
        architecte="Jean d'Orbais",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Cathédrale Saint-Étienne de Bourges",
        categorie="Cathédrale",
        description="Cathédrale gothique remarquable par son architecture et ses vitraux.",
        image_url="https://example.com/bourges.jpg",
        annee=1195,
        ville="Bourges",
        architecte="Architectes médiévaux",
        rarete=Rarete.SUPER_RARE,
    ),

    Monument(
        titre="Cathédrale Saint-Front de Périgueux",
        categorie="Cathédrale",
        description="Cathédrale reconnaissable à ses nombreuses coupoles.",
        image_url="https://example.com/perigueux.jpg",
        annee=1120,
        ville="Périgueux",
        architecte="Architectes médiévaux",
        rarete=Rarete.SUPER_RARE,
    ),

    Monument(
        titre="Cathédrale Notre-Dame de Strasbourg",
        categorie="Cathédrale",
        description="Cathédrale gothique célèbre pour sa flèche et son horloge astronomique.",
        image_url="https://example.com/strasbourg.jpg",
        annee=1015,
        ville="Strasbourg",
        architecte="Erwin de Steinbach",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Cathédrale Saint-Gatien de Tours",
        categorie="Cathédrale",
        description="Cathédrale gothique située au cœur de la ville de Tours.",
        image_url="https://example.com/tours.jpg",
        annee=1170,
        ville="Tours",
        architecte="Architectes médiévaux",
        rarete=Rarete.SUPER_RARE,
    ),

    # =========================
    # FORTIFICATIONS
    # =========================

    Monument(
        titre="Cité de Carcassonne",
        categorie="Fortification",
        description="Ensemble médiéval fortifié dominant la ville de Carcassonne.",
        image_url="https://example.com/carcassonne.jpg",
        annee=1000,
        ville="Carcassonne",
        architecte="Viollet-le-Duc",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Fort Boyard",
        categorie="Fortification",
        description="Fort construit au XIXe siècle entre l'île d'Aix et l'île d'Oléron.",
        image_url="https://example.com/fort-boyard.jpg",
        annee=1801,
        ville="Île-d'Aix",
        architecte="François Le Prestre de Vauban",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Citadelle de Besançon",
        categorie="Fortification",
        description="Forteresse construite par Vauban dominant la ville de Besançon.",
        image_url="https://example.com/besancon.jpg",
        annee=1668,
        ville="Besançon",
        architecte="Vauban",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Citadelle de Saint-Martin-de-Ré",
        categorie="Fortification",
        description="Fortification conçue par Vauban sur l'île de Ré.",
        image_url="https://example.com/saint-martin-de-re.jpg",
        annee=1681,
        ville="Saint-Martin-de-Ré",
        architecte="Vauban",
        rarete=Rarete.SUPER_RARE,
    ),

    Monument(
        titre="Château de Vincennes",
        categorie="Fortification",
        description="Ancienne résidence royale fortifiée située à l'est de Paris.",
        image_url="https://example.com/vincennes.jpg",
        annee=1337,
        ville="Vincennes",
        architecte="Architectes médiévaux",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Forteresse de Salses",
        categorie="Fortification",
        description="Forteresse construite à la fin du XVe siècle dans le Roussillon.",
        image_url="https://example.com/salses.jpg",
        annee=1497,
        ville="Salses-le-Château",
        architecte="Francisco Ramiro López",
        rarete=Rarete.GATEKEEPED,
    ),

    # =========================
    # ABBAYES
    # =========================

    Monument(
        titre="Abbaye du Mont-Saint-Michel",
        categorie="Abbaye",
        description="Abbaye médiévale construite sur le Mont-Saint-Michel.",
        image_url="https://example.com/mont-saint-michel.jpg",
        annee=966,
        ville="Le Mont-Saint-Michel",
        architecte="Architectes médiévaux",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Abbaye de Fontevraud",
        categorie="Abbaye",
        description="Grande abbaye fondée au début du XIIe siècle dans le Val de Loire.",
        image_url="https://example.com/fontevraud.jpg",
        annee=1101,
        ville="Fontevraud-l'Abbaye",
        architecte="Robert d'Arbrissel",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Abbaye de Sénanque",
        categorie="Abbaye",
        description="Abbaye cistercienne située dans le Vaucluse et entourée de champs de lavande.",
        image_url="https://example.com/senanque.jpg",
        annee=1148,
        ville="Gordes",
        architecte="Architectes cisterciens",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Abbaye de Cluny",
        categorie="Abbaye",
        description="Ancienne abbaye bénédictine qui fut l'un des grands centres religieux de l'Europe médiévale.",
        image_url="https://example.com/cluny.jpg",
        annee=910,
        ville="Cluny",
        architecte="Architectes médiévaux",
        rarete=Rarete.SUPER_RARE,
    ),

    Monument(
        titre="Abbaye de Noirlac",
        categorie="Abbaye",
        description="Abbaye cistercienne remarquablement conservée dans le Cher.",
        image_url="https://example.com/noirlac.jpg",
        annee=1136,
        ville="Bruère-Allichamps",
        architecte="Architectes cisterciens",
        rarete=Rarete.GATEKEEPED,
    ),

    # =========================
    # MONUMENTS
    # =========================

    Monument(
        titre="Arc de Triomphe",
        categorie="Monument",
        description="Arc monumental situé au centre de la place Charles-de-Gaulle à Paris.",
        image_url="https://example.com/arc-de-triomphe.jpg",
        annee=1806,
        ville="Paris",
        architecte="Jean-François-Thérèse Chalgrin",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Panthéon",
        categorie="Monument",
        description="Monument parisien consacré aux grandes figures de la nation française.",
        image_url="https://example.com/pantheon.jpg",
        annee=1758,
        ville="Paris",
        architecte="Jacques-Germain Soufflot",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Palais des Papes",
        categorie="Monument",
        description="Ancienne résidence des papes construite au XIVe siècle à Avignon.",
        image_url="https://example.com/palais-papes.jpg",
        annee=1335,
        ville="Avignon",
        architecte="Pierre Poisson",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Pont du Gard",
        categorie="Monument",
        description="Ancien aqueduc romain construit au-dessus du Gardon.",
        image_url="https://example.com/pont-du-gard.jpg",
        annee=50,
        ville="Vers-Pont-du-Gard",
        architecte="Architectes romains",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Dôme des Invalides",
        categorie="Monument",
        description="Église monumentale de l'Hôtel des Invalides à Paris.",
        image_url="https://example.com/invalides.jpg",
        annee=1677,
        ville="Paris",
        architecte="Jules Hardouin-Mansart",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Basilique du Sacré-Cœur",
        categorie="Monument",
        description="Basilique blanche construite au sommet de la butte Montmartre.",
        image_url="https://example.com/sacre-coeur.jpg",
        annee=1875,
        ville="Paris",
        architecte="Paul Abadie",
        rarete=Rarete.COMMUN,
    ),

    # =========================
    # ANTIQUITÉ
    # =========================

    Monument(
        titre="Arènes de Nîmes",
        categorie="Antiquité",
        description="Amphithéâtre romain remarquablement conservé au cœur de Nîmes.",
        image_url="https://example.com/arenes-nimes.jpg",
        annee=100,
        ville="Nîmes",
        architecte="Architectes romains",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Théâtre antique d'Orange",
        categorie="Antiquité",
        description="Théâtre romain célèbre pour son immense mur de scène.",
        image_url="https://example.com/orange.jpg",
        annee=10,
        ville="Orange",
        architecte="Architectes romains",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Maison Carrée",
        categorie="Antiquité",
        description="Temple romain remarquablement conservé situé à Nîmes.",
        image_url="https://example.com/maison-carree.jpg",
        annee=-16,
        ville="Nîmes",
        architecte="Architectes romains",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Théâtre antique de Vienne",
        categorie="Antiquité",
        description="Ancien théâtre romain construit sur les pentes de Vienne.",
        image_url="https://example.com/theatre-vienne.jpg",
        annee=40,
        ville="Vienne",
        architecte="Architectes romains",
        rarete=Rarete.SUPER_RARE,
    ),

    Monument(
        titre="Temple de Diane",
        categorie="Antiquité",
        description="Vestige romain situé dans les jardins de la Fontaine à Nîmes.",
        image_url="https://example.com/temple-diane.jpg",
        annee=100,
        ville="Nîmes",
        architecte="Architectes romains",
        rarete=Rarete.GATEKEEPED,
    ),
]


async def seed() -> None:
    async with async_session() as session:
        for monument in monuments:
            result = await session.execute(
                select(Monument).where(Monument.titre == monument.titre)
            )

            existing_monument = result.scalar_one_or_none()

            if existing_monument is None:  # relance seed sans créer de doublons
                session.add(monument)

        await session.commit()  # valide les modifications de la DB


if __name__ == "__main__":  # si seed exécuté directement => exécute seed()
    asyncio.run(seed())