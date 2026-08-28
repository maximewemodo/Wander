import { City, Budget, Vibe, Theme, ItineraryStep } from './types';

export const CITIES: City[] = ['Paris', 'Berlin', 'Tokyo', 'Rome', 'New York', 'Londres', 'Barcelone', 'Amsterdam', 'Lisbonne', 'Marrakech'];
export const BUDGETS: Budget[] = ['Éco', 'Standard', 'Premium'];
export const VIBES: Vibe[] = ['Chill', 'Culture', 'Aventure'];
export const DAYS = [1, 2, 3];

export const CITY_IMAGES: Record<City, string> = {
  'Paris': 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80',
  'Berlin': 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80',
  'Tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
  'Rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
  'New York': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
  'Londres': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
  'Barcelone': 'https://images.unsplash.com/photo-1583422409516-2895a77ef244?auto=format&fit=crop&w=1200&q=80',
  'Amsterdam': 'https://images.unsplash.com/photo-1517736996303-4eec4a66bb17?auto=format&fit=crop&w=1200&q=80',
  'Lisbonne': 'https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=1200&q=80',
  'Marrakech': 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80'
};

interface PlaceInfo {
  name: string;
  description: string;
}

const MOCK_PLACES: Record<City, Record<Theme, PlaceInfo[]>> = {
  'Paris': {
    'Culture': [
      { name: 'Musée du Louvre', description: "Découvrez La Joconde et des millénaires d'histoire de l'art." },
      { name: 'Sainte-Chapelle', description: "Émerveillez-vous devant les 1113 vitraux de ce joyau gothique." },
      { name: 'Fondation Louis Vuitton', description: "Art contemporain dans un écrin architectural signé Frank Gehry." }
    ],
    'Food': [
      { name: 'Bouillon Chartier', description: "Cuisine traditionnelle française dans un décor Belle Époque bouillonnant." },
      { name: "L'As du Fallafel", description: "Le sandwich emblématique du Marais, à déguster sur le pouce." },
      { name: 'Pink Mamma', description: "Trattoria italienne sur 4 étages avec une magnifique verrière." }
    ],
    'Détente': [
      { name: 'Jardin du Luxembourg', description: "Flânerie entre les statues de reines, le bassin et les chaises vertes." },
      { name: 'Canal Saint-Martin', description: "Balade bohème le long des écluses et des ponts tournants." },
      { name: 'Parc des Buttes-Chaumont', description: "Un écrin de verdure vallonné avec son temple de la Sibylle." }
    ]
  },
  'Berlin': {
    'Culture': [
      { name: 'East Side Gallery', description: "La plus longue section préservée du Mur, couverte de street art." },
      { name: 'Île aux Musées', description: "Un complexe unique de cinq musées de renommée mondiale." },
      { name: 'Reichstag', description: "Siège du parlement avec sa célèbre coupole en verre offrant une vue panoramique." }
    ],
    'Food': [
      { name: "Mustafa's Gemüse Kebap", description: "Le kebab le plus célèbre de la ville, réputé pour ses légumes grillés." },
      { name: 'Curry 36', description: "L'institution de la currywurst berlinoise depuis les années 80." },
      { name: 'Markthalle Neun', description: "Marché couvert historique vibrant, paradis de la street-food locale." }
    ],
    'Détente': [
      { name: 'Tempelhofer Feld', description: "Ancien aéroport transformé en un immense parc urbain." },
      { name: 'Mauerpark', description: "Parc animé connu pour son karaoké géant et son marché aux puces." },
      { name: 'Badeschiff', description: "Piscine flottante sur la Spree avec plage artificielle et vue urbaine." }
    ]
  },
  'Tokyo': {
    'Culture': [
      { name: 'Senso-ji (Asakusa)', description: "Le plus vieux et le plus coloré des temples bouddhistes de la ville." },
      { name: 'Meiji-jingu', description: "Sanctuaire shintoïste paisible niché dans une vaste forêt urbaine." },
      { name: 'teamLab Planets', description: "Musée d'art immersif où l'on marche dans l'eau parmi les œuvres lumineuses." }
    ],
    'Food': [
      { name: 'Ichiran Ramen', description: "Bols de ramen tonkotsu à déguster dans des cabines individuelles." },
      { name: 'Tsukiji Outer Market', description: "Le paradis des sushis frais et de la street-food de la mer." },
      { name: 'Omoide Yokocho', description: "Une ruelle nostalgique remplie de minuscules izakayas à yakitori." }
    ],
    'Détente': [
      { name: 'Shinjuku Gyoen', description: "Magnifique parc impérial, parfait pour admirer les cerisiers ou les érables." },
      { name: 'Thermae-Yu', description: "Un grand onsen (bain thermal) moderne en plein cœur de Shinjuku." },
      { name: 'Rivière Meguro', description: "Promenade apaisante le long du canal, bordée de cafés branchés." }
    ]
  },
  'Rome': {
    'Culture': [
      { name: 'Colisée & Forum', description: "Plongez dans la Rome antique au cœur du plus grand amphithéâtre jamais construit." },
      { name: 'Musées du Vatican', description: "Des collections inestimables couronnées par la Chapelle Sixtine." },
      { name: 'Galerie Borghèse', description: "Chefs-d'œuvre du Bernin et du Caravage dans une somptueuse villa." }
    ],
    'Food': [
      { name: 'Roscioli Salumeria', description: "Épicerie-restaurant culte proposant d'exceptionnelles pâtes à la carbonara." },
      { name: 'Giolitti', description: "L'une des plus anciennes et célèbres gelaterias artisanales de Rome." },
      { name: 'Pizzarium Bonci', description: "La référence incontestée de la pizza al taglio (à la coupe)." }
    ],
    'Détente': [
      { name: 'Villa Borghese', description: "Immense parc en forme de cœur offrant des jardins à l'anglaise." },
      { name: 'Jardin des Orangers', description: "Une terrasse panoramique parfumée offrant l'une des plus belles vues sur la ville." },
      { name: 'Trastevere', description: "Flânerie dans les ruelles pavées et colorées de ce quartier bohème." }
    ]
  },
  'New York': {
    'Culture': [
      { name: 'MoMA', description: "L'une des plus importantes collections d'art moderne et contemporain au monde." },
      { name: 'The Met', description: "Voyagez à travers 5000 ans d'art, de l'Égypte antique à nos jours." },
      { name: 'Mémorial du 11 Septembre', description: "Un lieu de recueillement poignant construit sur les fondations des tours jumelles." }
    ],
    'Food': [
      { name: "Katz's Delicatessen", description: "L'institution historique du mythique sandwich au pastrami." },
      { name: 'Chelsea Market', description: "Halle gourmande installée dans une ancienne usine Nabisco." },
      { name: 'Levain Bakery', description: "Célèbre pour ses cookies géants, fondants à l'intérieur." }
    ],
    'Détente': [
      { name: 'Central Park', description: "Le poumon vert de Manhattan, avec ses lacs, ponts et vastes pelouses." },
      { name: 'The High Line', description: "Promenade suspendue aménagée sur une ancienne voie ferrée aérienne." },
      { name: 'Brooklyn Bridge Park', description: "Parc au bord de l'eau offrant la meilleure vue sur la skyline." }
    ]
  },
  'Londres': {
    'Culture': [
      { name: 'British Museum', description: "Des momies égyptiennes à la pierre de Rosette, l'histoire de l'humanité." },
      { name: 'Tour de Londres', description: "Forteresse historique abritant les joyaux de la Couronne." },
      { name: 'Tate Modern', description: "Art contemporain dans une ancienne centrale électrique." }
    ],
    'Food': [
      { name: 'Borough Market', description: "Le paradis des gourmets sous les arches de chemin de fer." },
      { name: 'Dishoom', description: "Un hommage vibrant aux cafés iraniens de Bombay." },
      { name: 'Sketch', description: "Un tea-time féérique dans un décor rose poudré inoubliable." }
    ],
    'Détente': [
      { name: 'Hyde Park', description: "Promenade en barque sur la Serpentine ou balade à vélo." },
      { name: 'Notting Hill', description: "Flânerie entre les maisons pastel et le marché de Portobello." },
      { name: 'Sky Garden', description: "Une jungle urbaine offrant une vue panoramique sur la Tamise." }
    ]
  },
  'Barcelone': {
    'Culture': [
      { name: 'Sagrada Família', description: "Le chef-d'œuvre inachevé de Gaudí aux vitraux spectaculaires." },
      { name: 'Parc Güell', description: "Jardins féériques et mosaïques colorées sur les hauteurs de la ville." },
      { name: 'Musée Picasso', description: "La plus vaste collection des premières œuvres du peintre." }
    ],
    'Food': [
      { name: 'Mercado de la Boqueria', description: "Le marché historique vibrant sur les Ramblas." },
      { name: 'Cervecería Catalana', description: "L'une des meilleures adresses pour des tapas authentiques." },
      { name: 'La Xampanyeria', description: "Bar à cava et tapas traditionnel, bruyant et convivial." }
    ],
    'Détente': [
      { name: 'Plage de la Barceloneta', description: "Détente sur le sable et balade le long de la mer." },
      { name: 'Quartier Gothique (Barri Gòtic)', description: "Perdez-vous dans le labyrinthe des ruelles médiévales." },
      { name: 'Montjuïc', description: "Colline offrant parcs luxuriants et vues plongeantes sur le port." }
    ]
  },
  'Amsterdam': {
    'Culture': [
      { name: 'Musée Van Gogh', description: "La plus grande collection au monde des œuvres du maître néerlandais." },
      { name: 'Maison Anne Frank', description: "Le refuge historique où fut écrit le célèbre journal." },
      { name: 'Rijksmuseum', description: "Plongez dans le Siècle d'or néerlandais et admirez Rembrandt." }
    ],
    'Food': [
      { name: 'Foodhallen', description: "Marché couvert branché proposant des spécialités du monde entier." },
      { name: 'Pancake Bakery', description: "Dégustation de crêpes néerlandaises dans un entrepôt du 17e siècle." },
      { name: 'Vleminckx', description: "Institution servant les meilleures frites d'Amsterdam depuis 1957." }
    ],
    'Détente': [
      { name: 'Vondelpark', description: "Le plus grand parc de la ville, idéal pour un pique-nique ou du vélo." },
      { name: 'Quartier des Neuf Rues', description: "Flânerie charmante entre boutiques indépendantes et canaux." },
      { name: 'Croisière sur les canaux', description: "Une balade paisible au fil de l'eau pour admirer les façades." }
    ]
  },
  'Lisbonne': {
    'Culture': [
      { name: 'Tour de Belém', description: "L'emblème des grandes découvertes maritimes portugaises." },
      { name: 'Monastère des Hiéronymites', description: "Chef-d'œuvre de l'architecture manuéline." },
      { name: 'Alfama', description: "Le plus vieux quartier, berceau du fado aux ruelles escarpées." }
    ],
    'Food': [
      { name: 'Time Out Market', description: "Halle gourmande réunissant les meilleurs chefs de la ville." },
      { name: 'Pastéis de Belém', description: "La pâtisserie historique qui a inventé les fameux flans." },
      { name: 'Cervejaria Ramiro', description: "Une institution incontournable pour les fruits de mer." }
    ],
    'Détente': [
      { name: 'Miradouro da Senhora do Monte', description: "Le belvédère offrant la vue la plus spectaculaire sur Lisbonne." },
      { name: 'LX Factory', description: "Ancien complexe industriel transformé en repaire créatif et branché." },
      { name: 'Praça do Comércio', description: "Promenade grandiose face au fleuve Tage." }
    ]
  },
  'Marrakech': {
    'Culture': [
      { name: 'Jardin Majorelle', description: "Oasis botanique d'un bleu envoûtant, sauvée par Yves Saint Laurent." },
      { name: 'Palais Bahia', description: "Un joyau de l'architecture marocaine aux mosaïques éblouissantes." },
      { name: 'Médersa Ben Youssef', description: "Ancienne école coranique au décor arabo-andalou raffiné." }
    ],
    'Food': [
      { name: 'Place Jemaa el-Fna', description: "Immense marché en plein air bouillonnant de saveurs le soir." },
      { name: 'Nomad', description: "Cuisine marocaine moderne sur l'un des plus beaux rooftops de la médina." },
      { name: 'Café des Épices', description: "Une pause thé à la menthe parfaite pour observer l'agitation." }
    ],
    'Détente': [
      { name: 'Les Souks', description: "Flânerie sensorielle dans le labyrinthe des artisans." },
      { name: 'La Palmeraie', description: "Évasion paisible à l'ombre des milliers de palmiers." },
      { name: 'Un Hammam traditionnel', description: "Détente absolue entre rituels ancestraux et savon noir." }
    ]
  }
};

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getPriceMultiplier(budget: Budget): number {
  switch (budget) {
    case 'Éco': return 0.6;
    case 'Standard': return 1.2;
    case 'Premium': return 3.5;
  }
}

function getBasePrice(theme: Theme): number {
  switch (theme) {
    case 'Culture': return Math.floor(Math.random() * 10) + 15; // 15 - 25
    case 'Food': return Math.floor(Math.random() * 15) + 15; // 15 - 30
    case 'Détente': return Math.floor(Math.random() * 5); // 0 - 5
  }
}

export function generateItinerary(city: City, budget: Budget, vibe: Vibe, days: number): ItineraryStep[] {
  const steps: ItineraryStep[] = [];
  const multiplier = getPriceMultiplier(budget);

  for (let day = 1; day <= days; day++) {
    const dailyThemes: Theme[] = [];
    
    if (vibe === 'Culture') {
      dailyThemes.push('Culture', 'Food', 'Culture', 'Food');
    } else if (vibe === 'Chill') {
      dailyThemes.push('Détente', 'Food', 'Détente', 'Food');
    } else { // Aventure - Mix
      dailyThemes.push('Culture', 'Food', 'Détente', 'Food');
    }

    const times = ['10:00', '13:00', '16:00', '20:00'];
    const usedPlaces = new Set<string>();

    dailyThemes.forEach((theme, index) => {
      const places = MOCK_PLACES[city][theme];
      let place = getRandom(places);
      
      let attempts = 0;
      while (usedPlaces.has(place.name) && attempts < 5) {
        place = getRandom(places);
        attempts++;
      }
      usedPlaces.add(place.name);

      const basePrice = getBasePrice(theme);
      const finalPrice = Math.max(0, Math.round(basePrice * multiplier));
      const isFree = theme === 'Détente' && finalPrice < 5;

      steps.push({
        id: `d${day}-t${index}-${place.name.replace(/\s/g, '-')}`,
        day,
        time: times[index],
        title: place.name,
        description: place.description,
        theme,
        price: isFree ? 0 : finalPrice
      });
    });
  }

  return steps;
}
