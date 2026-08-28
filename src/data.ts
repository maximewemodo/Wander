import { City, Budget, Vibe, Theme, ItineraryStep } from './types';

export const CITIES: City[] = ['Paris', 'Berlin', 'Tokyo', 'Rome', 'New York'];
export const BUDGETS: Budget[] = ['Éco', 'Standard', 'Premium'];
export const VIBES: Vibe[] = ['Chill', 'Culture', 'Aventure'];
export const DAYS = [1, 2, 3];

export const CITY_IMAGES: Record<City, string> = {
  'Paris': 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80',
  'Berlin': 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80',
  'Tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
  'Rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
  'New York': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80'
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
