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
        image_url="https://i.pinimg.com/1200x/ba/66/76/ba667625a1511bb595e9f86f939245dc.jpg",
        annee=1889,
        ville="Paris",
        architecte="Gustave Eiffel",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Château de Chambord",
        categorie="Château",
        description="Grand château de la Loire construit à partir du règne de François Ier.",
        image_url="https://i.pinimg.com/1200x/bf/d1/bb/bfd1bbb8dee1d116040140ec576eae1c.jpg",
        annee=1519,
        ville="Chambord",
        architecte="Domenico da Cortona",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Château de Versailles",
        categorie="Château",
        description="Ancienne résidence royale située à proximité de Paris.",
        image_url="https://i.pinimg.com/736x/53/41/34/534134ab4b7c6d74867bbb8705096389.jpg",
        annee=1623,
        ville="Versailles",
        architecte="Louis Le Vau",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Château de Fontainebleau",
        categorie="Château",
        description="Ancienne résidence royale et impériale située en Seine-et-Marne.",
        image_url="https://i.pinimg.com/1200x/44/8e/0f/448e0f3eb8cb6634f16911c238131cfe.jpg",
        annee=1137,
        ville="Fontainebleau",
        architecte="Plusieurs architectes",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Château de Chenonceau",
        categorie="Château",
        description="Château construit sur le Cher et surnommé le château des Dames.",
        image_url="https://i.pinimg.com/736x/60/0b/4c/600b4c349c401b8359c81150a08779df.jpg",
        annee=1513,
        ville="Chenonceaux",
        architecte="Thomas Bohier",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Château de Villandry",
        categorie="Château",
        description="Château de la Renaissance célèbre notamment pour ses jardins.",
        image_url="https://i.pinimg.com/736x/16/67/65/16676587841f09f7bddb2aa068247aba.jpg",
        annee=1536,
        ville="Villandry",
        architecte="Jean Le Breton",
        rarete=Rarete.SUPER_RARE,
    ),

    Monument(
        titre="Château d'Azay-le-Rideau",
        categorie="Château",
        description="Château de la Renaissance construit sur une île de l'Indre.",
        image_url="https://i.pinimg.com/1200x/2c/51/50/2c51502bd7b160e02970e759d3607e20.jpg",
        annee=1518,
        ville="Azay-le-Rideau",
        architecte="Gilles Berthelot",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Château de Pierrefonds",
        categorie="Château",
        description="Château médiéval restauré au XIXe siècle sous la direction de Viollet-le-Duc.",
        image_url="https://i.pinimg.com/1200x/59/7c/e2/597ce2106352f48f7f3e0901fbd1f4e5.jpg",
        annee=1396,
        ville="Pierrefonds",
        architecte="Eugène Viollet-le-Duc",
        rarete=Rarete.SUPER_RARE,
    ),

    Monument(
        titre="Château de Vaux-le-Vicomte",
        categorie="Château",
        description="Château du XVIIe siècle considéré comme un modèle de l'architecture classique française.",
        image_url="https://i.pinimg.com/1200x/cc/fe/71/ccfe718616f8c93f0f09ffc1488a1db1.jpg",
        annee=1656,
        ville="Maincy",
        architecte="Louis Le Vau",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Château de Blois",
        categorie="Château",
        description="Château royal situé au cœur de la ville de Blois.",
        image_url="https://i.pinimg.com/736x/bb/a8/fd/bba8fd3c18b34c3791f55c92542bb8ab.jpg",
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
        image_url="https://i.pinimg.com/1200x/03/a1/fa/03a1faade7fa22188faad537d62ce4cc.jpg",
        annee=1163,
        ville="Paris",
        architecte="Architectes médiévaux",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Cathédrale Notre-Dame de Chartres",
        categorie="Cathédrale",
        description="Cathédrale gothique célèbre pour ses vitraux et son architecture.",
        image_url="https://i.pinimg.com/1200x/23/de/45/23de45dd7fc149aec0da451d42570233.jpg",
        annee=1194,
        ville="Chartres",
        architecte="Architectes médiévaux",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Cathédrale Notre-Dame d'Amiens",
        categorie="Cathédrale",
        description="L'une des plus grandes cathédrales gothiques de France.",
        image_url="https://i.pinimg.com/1200x/95/be/54/95be54320d2ca3b3ce8d3d02631f37b1.jpg",
        annee=1220,
        ville="Amiens",
        architecte="Robert de Luzarches",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Cathédrale Notre-Dame de Reims",
        categorie="Cathédrale",
        description="Grande cathédrale gothique où furent couronnés de nombreux rois de France.",
        image_url="https://i.pinimg.com/736x/35/0f/ed/350fedc109d74a9e83f32ceaca1156b0.jpg",
        annee=1211,
        ville="Reims",
        architecte="Jean d'Orbais",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Cathédrale Saint-Étienne de Bourges",
        categorie="Cathédrale",
        description="Cathédrale gothique remarquable par son architecture et ses vitraux.",
        image_url="https://i.pinimg.com/736x/69/5f/f1/695ff122a719f42d395ae65323e61851.jpg",
        annee=1195,
        ville="Bourges",
        architecte="Architectes médiévaux",
        rarete=Rarete.SUPER_RARE,
    ),

    Monument(
        titre="Cathédrale Saint-Front de Périgueux",
        categorie="Cathédrale",
        description="Cathédrale reconnaissable à ses nombreuses coupoles.",
        image_url="https://i.pinimg.com/736x/fa/6a/b3/fa6ab3f59d5cec013a0b88ff16a00b19.jpg",
        annee=1120,
        ville="Périgueux",
        architecte="Architectes médiévaux",
        rarete=Rarete.SUPER_RARE,
    ),

    Monument(
        titre="Cathédrale Notre-Dame de Strasbourg",
        categorie="Cathédrale",
        description="Cathédrale gothique célèbre pour sa flèche et son horloge astronomique.",
        image_url="https://i.pinimg.com/736x/f2/da/03/f2da03320d1b462425f48c50a3c75a56.jpg",
        annee=1015,
        ville="Strasbourg",
        architecte="Erwin de Steinbach",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Cathédrale Saint-Gatien de Tours",
        categorie="Cathédrale",
        description="Cathédrale gothique située au cœur de la ville de Tours.",
        image_url="https://i.pinimg.com/736x/4e/e9/83/4ee98373ad2fc733f2daf5a06d6e1c32.jpg",
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
        image_url="https://i.pinimg.com/1200x/66/d6/a4/66d6a4e22deebdacb23636a2a3c0ad7b.jpg",
        annee=1000,
        ville="Carcassonne",
        architecte="Viollet-le-Duc",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Fort Boyard",
        categorie="Fortification",
        description="Fort construit au XIXe siècle entre l'île d'Aix et l'île d'Oléron.",
        image_url="https://i.pinimg.com/736x/5b/a9/2c/5ba92cacb940221e900590388c30a6f8.jpg",
        annee=1801,
        ville="Île-d'Aix",
        architecte="François Le Prestre de Vauban",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Citadelle de Besançon",
        categorie="Fortification",
        description="Forteresse construite par Vauban dominant la ville de Besançon.",
        image_url="https://www.madec-vacances.com/wp-content/uploads/2017/08/visite-citadelle-de-besancon-vacances-france-1024x576.jpg",
        annee=1668,
        ville="Besançon",
        architecte="Vauban",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Citadelle de Saint-Martin-de-Ré",
        categorie="Fortification",
        description="Fortification conçue par Vauban sur l'île de Ré.",
        image_url="https://i.pinimg.com/736x/da/a3/98/daa39809fdac193f3e2b0a12e9737e88--fortification-saint-martin.jpg",
        annee=1681,
        ville="Saint-Martin-de-Ré",
        architecte="Vauban",
        rarete=Rarete.SUPER_RARE,
    ),

    Monument(
        titre="Château de Vincennes",
        categorie="Fortification",
        description="Ancienne résidence royale fortifiée située à l'est de Paris.",
        image_url="https://i.pinimg.com/1200x/fa/e7/61/fae761bce52884ec59b6b3c4439a315b.jpg",
        annee=1337,
        ville="Vincennes",
        architecte="Architectes médiévaux",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Forteresse de Salses",
        categorie="Fortification",
        description="Forteresse construite à la fin du XVe siècle dans le Roussillon.",
        image_url="https://i.pinimg.com/736x/7e/2c/91/7e2c91f9b590ba971e5ccfba611e8fa2.jpg",
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
        image_url="https://i.pinimg.com/736x/5d/7b/ff/5d7bff43c3ee1b547c014f1df3619d26.jpg",
        annee=966,
        ville="Le Mont-Saint-Michel",
        architecte="Architectes médiévaux",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Abbaye de Fontevraud",
        categorie="Abbaye",
        description="Grande abbaye fondée au début du XIIe siècle dans le Val de Loire.",
        image_url="https://i.pinimg.com/736x/7b/88/7d/7b887df7e8419fc691af730469fa2026.jpg",
        annee=1101,
        ville="Fontevraud-l'Abbaye",
        architecte="Robert d'Arbrissel",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Abbaye de Sénanque",
        categorie="Abbaye",
        description="Abbaye cistercienne située dans le Vaucluse et entourée de champs de lavande.",
        image_url="https://i.pinimg.com/736x/fb/4e/f1/fb4ef19293ca0652d8ac79305fcca559.jpg",
        annee=1148,
        ville="Gordes",
        architecte="Architectes cisterciens",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Abbaye de Cluny",
        categorie="Abbaye",
        description="Ancienne abbaye bénédictine qui fut l'un des grands centres religieux de l'Europe médiévale.",
        image_url="https://i.pinimg.com/736x/2a/c3/9d/2ac39d7043963577d749a8cd6aa5691c.jpg",
        annee=910,
        ville="Cluny",
        architecte="Architectes médiévaux",
        rarete=Rarete.SUPER_RARE,
    ),

    Monument(
        titre="Abbaye de Noirlac",
        categorie="Abbaye",
        description="Abbaye cistercienne remarquablement conservée dans le Cher.",
        image_url="https://i.pinimg.com/1200x/87/1d/93/871d934db9d9bc7eaaee5060278d2798.jpg",
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
        image_url="https://i.pinimg.com/1200x/4e/b9/d5/4eb9d5e3e69cece4f615d67e56a30613.jpg",
        annee=1806,
        ville="Paris",
        architecte="Jean-François-Thérèse Chalgrin",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Panthéon",
        categorie="Monument",
        description="Monument parisien consacré aux grandes figures de la nation française.",
        image_url="https://i.pinimg.com/1200x/59/4f/0a/594f0a9d14fdbe71fc1fc83eb94de624.jpg",
        annee=1758,
        ville="Paris",
        architecte="Jacques-Germain Soufflot",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Palais des Papes",
        categorie="Monument",
        description="Ancienne résidence des papes construite au XIVe siècle à Avignon.",
        image_url="https://i.pinimg.com/736x/ac/0a/cc/ac0acc0e1267fa6b2b7361eb553e3a8d.jpg",
        annee=1335,
        ville="Avignon",
        architecte="Pierre Poisson",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Pont du Gard",
        categorie="Monument",
        description="Ancien aqueduc romain construit au-dessus du Gardon.",
        image_url="https://i.pinimg.com/736x/81/73/b3/8173b3c7516b0b658e5d7bc93c7afb1b.jpg",
        annee=50,
        ville="Vers-Pont-du-Gard",
        architecte="Architectes romains",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Dôme des Invalides",
        categorie="Monument",
        description="Église monumentale de l'Hôtel des Invalides à Paris.",
        image_url="https://thumbs.dreamstime.com/b/paris-france-may-general-view-dome-des-invalides-its-golden-cupola-former-church-which-houses-tomb-napoleon-218548964.jpg",
        annee=1677,
        ville="Paris",
        architecte="Jules Hardouin-Mansart",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Basilique du Sacré-Cœur",
        categorie="Monument",
        description="Basilique blanche construite au sommet de la butte Montmartre.",
        image_url="https://i.pinimg.com/1200x/17/b1/ac/17b1acfa4315ea23474e6a3b119cf2cc.jpg",
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
        image_url="https://i.pinimg.com/736x/98/d4/ef/98d4efcf778b6309e81728948f944bd0.jpg",
        annee=100,
        ville="Nîmes",
        architecte="Architectes romains",
        rarete=Rarete.COMMUN,
    ),

    Monument(
        titre="Théâtre antique d'Orange",
        categorie="Antiquité",
        description="Théâtre romain célèbre pour son immense mur de scène.",
        image_url="https://i.pinimg.com/1200x/fc/32/b3/fc32b30234a1c37271b31ba367d57e24.jpg",
        annee=10,
        ville="Orange",
        architecte="Architectes romains",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Maison Carrée",
        categorie="Antiquité",
        description="Temple romain remarquablement conservé situé à Nîmes.",
        image_url="https://i.pinimg.com/736x/00/30/15/003015d722f26d69c8bfb279c57a0129.jpg",
        annee=-16,
        ville="Nîmes",
        architecte="Architectes romains",
        rarete=Rarete.RARE,
    ),

    Monument(
        titre="Théâtre antique de Vienne",
        categorie="Antiquité",
        description="Ancien théâtre romain construit sur les pentes de Vienne.",
        image_url="https://www.vienne-condrieu.com/cache/images/16306301_apidae-main-nocrop.jpg",
        annee=40,
        ville="Vienne",
        architecte="Architectes romains",
        rarete=Rarete.SUPER_RARE,
    ),

    Monument(
        titre="Temple de Diane",
        categorie="Antiquité",
        description="Vestige romain situé dans les jardins de la Fontaine à Nîmes.",
        image_url="https://i.pinimg.com/1200x/81/d9/72/81d97243457cb480cdec836010c5d422.jpg",
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

            if existing_monument is None:  # Ajoute sans créer de doublons
                session.add(monument)
                # AJOUT LISA
            else:  # Met à jour la photo du monument existant
                existing_monument.image_url = monument.image_url
                # AJOUT LISA
        await session.commit()  # Enregistre les modifications


if __name__ == "__main__":  # si seed exécuté directement => exécute seed()
    asyncio.run(seed())