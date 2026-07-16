import { NextResponse } from "next/server";

// ─── Tour data ────────────────────────────────────────────────────────────────
// Keep this in sync with your tour pages. Each entry maps directly to a
// Google Merchant Center product row.

type Tour = {
  id: string;
  title: string;
  description: string;
  link: string;
  image_link: string;
  price: number; // USD
  destination: "Kenya" | "Tanzania" | "Rwanda" | "Uganda";
  labels: [string, string, string, string, string]; // custom_label_0–4
};

const BASE = "https://www.jaetravel.co.ke";
const DEFAULT_IMG = `${BASE}/grace-nandi-KzxdgYVkSdY-unsplash-1-scaled.jpg`;
const MARA_IMG    = `${BASE}/fantasticafrica-20240806-0001.jpg`;
const KE_IMG      = `${BASE}/kenya-safari-landscape.jpg`;
const TZ_IMG      = `${BASE}/tanzania-serengeti.jpg`;
const RW_IMG      = `${BASE}/rwanda-mountain-gorillas.jpg`;
const UG_IMG      = `${BASE}/uganda-wildlife.jpg`;

const TOURS: Tour[] = [
  // ── BUDGET TOURS (Kenya) ──────────────────────────────────────────────────
  {
    id: "jae-bgt-mara-3d-standard",
    title: "Masai Mara 3-Day Budget Land Cruiser Safari Kenya 2026",
    description: "Affordable 3-day Masai Mara shared group safari. Big Five game drives in shared 4x4 Land Cruiser, budget camp accommodation, all meals included. Perfect first safari from $950.",
    link: `${BASE}/budget-tours/masai-mara-3-days-budget-land-cruiser-safari`,
    image_link: MARA_IMG, price: 950, destination: "Kenya",
    labels: ["budget-safari", "3-days", "masai-mara", "shared-group", "big-five"],
  },
  {
    id: "jae-bgt-mara-3d-superior",
    title: "Masai Mara 3-Day Superior Budget Shared Safari Kenya 2026",
    description: "Upgraded 3-day Masai Mara shared safari with better budget camp accommodation and enhanced amenities. Shared Land Cruiser, expert guide, all meals. From $730.",
    link: `${BASE}/budget-tours/masai-mara-3-days-superior-budget-shared-land-cruiser-safari`,
    image_link: MARA_IMG, price: 730, destination: "Kenya",
    labels: ["budget-safari", "3-days", "masai-mara", "superior", "shared-group"],
  },
  {
    id: "jae-bgt-samburu-3d",
    title: "Samburu 3-Day Private Safari Kenya 2026 – Special Five",
    description: "Exclusive 3-day private safari to Samburu National Reserve. Dedicated vehicle and guide for the Special Five: Grevy's zebra, reticulated giraffe, Somali ostrich, gerenuk, Beisa oryx. From $690.",
    link: `${BASE}/budget-tours/samburu-3-days-private-safari`,
    image_link: DEFAULT_IMG, price: 690, destination: "Kenya",
    labels: ["budget-safari", "3-days", "samburu", "private", "special-five"],
  },
  {
    id: "jae-bgt-mara-nakuru-4d",
    title: "Masai Mara & Nakuru 4-Day Budget Shared Safari Kenya 2026",
    description: "4-day two-park budget safari combining Masai Mara Big Five with Lake Nakuru flamingos and rhinos. Shared Land Cruiser, budget camps, all meals. From $610.",
    link: `${BASE}/budget-tours/masai-mara-nakuru-4-days-budget-shared-safari`,
    image_link: MARA_IMG, price: 610, destination: "Kenya",
    labels: ["budget-safari", "4-days", "masai-mara", "nakuru", "two-park"],
  },
  {
    id: "jae-bgt-mara-naivasha-4d",
    title: "Masai Mara & Naivasha 4-Day Budget Shared Safari Kenya 2026",
    description: "4-day budget safari combining Masai Mara predator drives with Lake Naivasha hippo boat safari. Shared groups, budget accommodation, all meals, park fees. From $610.",
    link: `${BASE}/budget-tours/masai-mara-naivasha-4-days-budget-shared-safari`,
    image_link: MARA_IMG, price: 610, destination: "Kenya",
    labels: ["budget-safari", "4-days", "masai-mara", "naivasha", "two-park"],
  },
  {
    id: "jae-bgt-mara-nakuru-naivasha-5d",
    title: "Masai Mara, Nakuru & Naivasha 5-Day Shared Safari Kenya 2026",
    description: "5-day three-park budget shared safari. Masai Mara Big Five, Lake Nakuru flamingos & rhinos, Lake Naivasha hippo boat ride. All meals, park fees, budget camp. From $680.",
    link: `${BASE}/budget-tours/masai-mara-nakuru-naivasha-5-days-shared-land-cruiser-safari`,
    image_link: DEFAULT_IMG, price: 680, destination: "Kenya",
    labels: ["budget-safari", "5-days", "three-park", "shared-group", "big-five"],
  },
  {
    id: "jae-bgt-mara-nakuru-amboseli-6d",
    title: "Masai Mara, Nakuru & Amboseli 6-Day Shared Safari Kenya 2026",
    description: "6-day three-park budget shared safari: Masai Mara predators, Lake Nakuru flamingos, Amboseli elephants with Kilimanjaro views. All meals, budget accommodation. From $850.",
    link: `${BASE}/budget-tours/masai-mara-nakuru-amboseli-6-days-shared-safari`,
    image_link: MARA_IMG, price: 850, destination: "Kenya",
    labels: ["budget-safari", "6-days", "three-park", "amboseli", "kilimanjaro"],
  },
  {
    id: "jae-bgt-best-kenya-7d",
    title: "Best of Kenya 7-Day Budget Shared Safari 2026 – Full Circuit",
    description: "Complete 7-day Kenya wildlife circuit: Masai Mara, Lake Nakuru, Lake Naivasha, and Amboseli. Maximum diversity, shared groups, budget camps, all meals. From $1504.",
    link: `${BASE}/budget-tours/best-of-kenya-7-days-budget-shared-safari`,
    image_link: MARA_IMG, price: 1504, destination: "Kenya",
    labels: ["budget-safari", "7-days", "full-circuit", "shared-group", "all-parks"],
  },
  {
    id: "jae-bgt-big5-7d",
    title: "Kenya Big Five 7-Day Budget Safari 2026",
    description: "7-day budget safari focused on Big Five photography across multiple Kenya parks. Specialized tracking, extended game drives, expert guide, shared group. From $2,530.",
    link: `${BASE}/budget-tours/kenya-big-5-7-days-budget-safari`,
    image_link: DEFAULT_IMG, price: 2530, destination: "Kenya",
    labels: ["budget-safari", "7-days", "big-five", "photography", "specialist"],
  },
  {
    id: "jae-bgt-big5-8d",
    title: "Kenya 8-Day Budget Big Five Safari 2026 – Extended Adventure",
    description: "Extended 8-day budget Big Five safari across multiple Kenyan parks. More time for tracking, behavioral observation, and photography. Shared groups, specialist guide. From $2,930.",
    link: `${BASE}/budget-tours/kenya-8-days-budget-big-5-safari`,
    image_link: DEFAULT_IMG, price: 2930, destination: "Kenya",
    labels: ["budget-safari", "8-days", "big-five", "extended", "specialist"],
  },
  {
    id: "jae-bgt-kenya-best-10d",
    title: "Kenya's Best 10-Day Budget Safari 2026 – Ultimate Complete Tour",
    description: "Ultimate 10-day budget safari: Masai Mara, Lake Nakuru, Lake Naivasha, Amboseli, and Samburu. Five parks, shared groups, budget camps. From $3,190.",
    link: `${BASE}/budget-tours/kenyas-best-10-days-budget-safari`,
    image_link: DEFAULT_IMG, price: 3190, destination: "Kenya",
    labels: ["budget-safari", "10-days", "five-parks", "complete", "shared-group"],
  },
  {
    id: "jae-bgt-mara-3d-alt",
    title: "3-Day Masai Mara Budget Safari 2026 – Wildlife Adventure",
    description: "3-day Masai Mara budget safari with Big Five game drives, savannah landscapes, expert guide, shared group, budget accommodation. From $790.",
    link: `${BASE}/budget-tours/3-day-masai-mara-budget-safari`,
    image_link: DEFAULT_IMG, price: 790, destination: "Kenya",
    labels: ["budget-safari", "3-days", "masai-mara", "big-five", "shared-group"],
  },
  {
    id: "jae-bgt-mara-nakuru-amboseli-6d-v2",
    title: "6-Day Masai Mara, Nakuru & Amboseli Budget Safari 2026",
    description: "Classic Kenya circuit: Masai Mara Big Five, Lake Nakuru flamingos and rhinos, Amboseli elephants with Kilimanjaro backdrop. Shared group, budget camps. From $1,490.",
    link: `${BASE}/budget-tours/6-day-masai-mara-nakuru-amboseli-budget-safari`,
    image_link: DEFAULT_IMG, price: 1490, destination: "Kenya",
    labels: ["budget-safari", "6-days", "three-park", "kilimanjaro", "classic"],
  },
  {
    id: "jae-bgt-mara-naivasha-amboseli-5d",
    title: "5-Day Masai Mara, Naivasha & Amboseli Budget Safari 2026",
    description: "5-day budget safari: Masai Mara Big Five, Lake Naivasha hippos and boat safari, Amboseli elephants with Kilimanjaro views. Shared group, diverse ecosystems. From $1,190.",
    link: `${BASE}/budget-tours/5-day-masai-mara-naivasha-amboseli-budget-safari`,
    image_link: DEFAULT_IMG, price: 1190, destination: "Kenya",
    labels: ["budget-safari", "5-days", "three-park", "naivasha", "amboseli"],
  },

  // ── KENYA TOURS ───────────────────────────────────────────────────────────
  {
    id: "jae-ke-mara-luxury",
    title: "Masai Mara Luxury Safari Kenya",
    description: "Premium Masai Mara safari with luxury lodge, expert guides, game drives, all meals, and Big Five wildlife encounters.",
    link: `${BASE}/tours/masai-mara-luxury-safari`,
    image_link: KE_IMG, price: 3500, destination: "Kenya",
    labels: ["luxury", "masai-mara", "big-five", "lodge", "premium"],
  },
  {
    id: "jae-ke-amboseli-adv",
    title: "Amboseli Safari Adventure Kenya – Mount Kilimanjaro Views",
    description: "Guided Amboseli National Park safari with spectacular Mount Kilimanjaro views and elephant encounters. Game drives, accommodation, all meals.",
    link: `${BASE}/tours/amboseli-safari`,
    image_link: DEFAULT_IMG, price: 2800, destination: "Kenya",
    labels: ["mid-range", "amboseli", "elephants", "kilimanjaro", "guided"],
  },
  {
    id: "jae-ke-mara-adventure",
    title: "Masai Mara Safari Adventure Kenya – Big Five & Great Migration",
    description: "Experience the Great Migration and Big Five in Kenya's most iconic national reserve. Expert guides, lodge, game drives, all meals.",
    link: `${BASE}/tours/masai-mara-safari-adventure`,
    image_link: DEFAULT_IMG, price: 1200, destination: "Kenya",
    labels: ["mid-range", "masai-mara", "big-five", "migration", "lodge"],
  },
  {
    id: "jae-ke-amboseli-elephant",
    title: "Amboseli Elephant Safari Kenya – Kilimanjaro Backdrop",
    description: "Get close to vast elephant herds against the iconic Mount Kilimanjaro backdrop. Game drives, accommodation, all meals.",
    link: `${BASE}/tours/amboseli-elephant-safari`,
    image_link: DEFAULT_IMG, price: 980, destination: "Kenya",
    labels: ["mid-range", "amboseli", "elephants", "kilimanjaro", "photography"],
  },
  {
    id: "jae-ke-samburu",
    title: "Samburu Game Reserve Safari Kenya",
    description: "Discover the Special Five in northern Kenya's Samburu Game Reserve: Grevy's zebra, reticulated giraffe, Somali ostrich, gerenuk, and Beisa oryx.",
    link: `${BASE}/tours/samburu-game-reserve`,
    image_link: DEFAULT_IMG, price: 750, destination: "Kenya",
    labels: ["mid-range", "samburu", "special-five", "northern-kenya", "unique"],
  },
  {
    id: "jae-ke-nakuru-flamingo",
    title: "Lake Nakuru Flamingo Tour Kenya – Rhino Sanctuary",
    description: "Witness flamingo flocks at Lake Nakuru National Park. Black and white rhino sanctuary viewing, diverse birdlife, park fees and meals included.",
    link: `${BASE}/tours/lake-nakuru-flamingo-spectacle`,
    image_link: DEFAULT_IMG, price: 450, destination: "Kenya",
    labels: ["budget", "nakuru", "flamingos", "rhino", "birdwatching"],
  },
  {
    id: "jae-ke-tsavo",
    title: "Tsavo East & West Safari Kenya – Kenya's Largest Park",
    description: "Explore Kenya's vast Tsavo parks. Red elephants, maneless lions, Mzima Springs, and diverse wildlife across Kenya's biggest wilderness.",
    link: `${BASE}/tours/tsavo-east-west-adventure`,
    image_link: DEFAULT_IMG, price: 1350, destination: "Kenya",
    labels: ["mid-range", "tsavo", "big-five", "red-elephants", "wilderness"],
  },
  {
    id: "jae-ke-mombasa-beach",
    title: "Mombasa Beach & Safari Kenya – Tsavo & Indian Ocean",
    description: "Combine Tsavo East safari with Mombasa beach relaxation. Game drives in Kenya's largest park followed by Indian Ocean coast.",
    link: `${BASE}/tours/mombasa-coastal-safari`,
    image_link: DEFAULT_IMG, price: 1600, destination: "Kenya",
    labels: ["mid-range", "mombasa", "tsavo", "beach", "combo"],
  },
  {
    id: "jae-ke-mt-kenya",
    title: "Mount Kenya Climbing Expedition – Africa's Second Highest Peak",
    description: "Challenge yourself on Africa's second highest mountain. Expert guides, technical and trekking routes, camping equipment, and acclimatisation support.",
    link: `${BASE}/tours/mount-kenya-climbing-expedition`,
    image_link: DEFAULT_IMG, price: 1100, destination: "Kenya",
    labels: ["adventure", "mount-kenya", "climbing", "trekking", "alpine"],
  },
  {
    id: "jae-ke-laikipia",
    title: "Laikipia Conservancy Safari Kenya – Conservation in Action",
    description: "Exclusive Laikipia Plateau conservancy with rare wildlife including wild dogs, reticulated giraffe, and Grevy's zebra. Community conservation.",
    link: `${BASE}/tours/laikipia-conservancy`,
    image_link: DEFAULT_IMG, price: 1250, destination: "Kenya",
    labels: ["mid-range", "laikipia", "conservation", "rare-wildlife", "exclusive"],
  },
  {
    id: "jae-ke-hellsgate",
    title: "Hell's Gate & Lake Naivasha Adventure Kenya",
    description: "Bike and hike through Hell's Gate National Park's dramatic gorges and volcanic landscapes, then boat safari on Lake Naivasha.",
    link: `${BASE}/tours/hell-gate-lake-naivasha-adventure`,
    image_link: DEFAULT_IMG, price: 380, destination: "Kenya",
    labels: ["budget", "hells-gate", "cycling", "hiking", "naivasha"],
  },
  {
    id: "jae-ke-maasai-culture",
    title: "Maasai Cultural Experience Kenya – Authentic Village Immersion",
    description: "Immerse in authentic Maasai culture. Traditional ceremonies, bead jewelry, village tour, warrior demonstrations, and pastoralist lifestyle.",
    link: `${BASE}/tours/maasai-cultural-experience`,
    image_link: DEFAULT_IMG, price: 650, destination: "Kenya",
    labels: ["cultural", "maasai", "village", "traditions", "authentic"],
  },
  {
    id: "jae-ke-aberdare",
    title: "Aberdare National Park Safari Kenya – Mountain Forest",
    description: "Mountain forest safari in Aberdare National Park. Tree hotels, night game viewing, black rhino, bongo antelope, and leopard.",
    link: `${BASE}/tours/aberdare-national-park-safari`,
    image_link: DEFAULT_IMG, price: 720, destination: "Kenya",
    labels: ["mid-range", "aberdare", "mountain-forest", "tree-hotel", "rhino"],
  },
  {
    id: "jae-ke-diani-combo",
    title: "Diani Beach Safari Combo Kenya – Tsavo West & Coast",
    description: "Tsavo West safari followed by Diani Beach on Kenya's most beautiful Indian Ocean coastline. Accommodation, meals, and park fees included.",
    link: `${BASE}/tours/diani-beach-safari-combo`,
    image_link: DEFAULT_IMG, price: 1800, destination: "Kenya",
    labels: ["mid-range", "diani", "tsavo", "beach", "combo"],
  },
  {
    id: "jae-ke-naivasha-boat",
    title: "Lake Naivasha Boat Safari Kenya – Hippos & Crescent Island",
    description: "Boat safari on freshwater Lake Naivasha with hippos and fish eagles. Guided walking safari on Crescent Island among giraffe and zebras.",
    link: `${BASE}/tours/lake-naivasha-boat-safari`,
    image_link: DEFAULT_IMG, price: 150, destination: "Kenya",
    labels: ["budget", "naivasha", "boat-safari", "hippos", "crescent-island"],
  },
  {
    id: "jae-ke-accessible-safari",
    title: "Accessible Kenya Safari Experience – Wheelchair-Friendly",
    description: "7-day fully accessible Kenya safari. Wheelchair-adapted vehicles, accessible lodges, and tailored Big Five wildlife viewing for mobility-impaired travelers.",
    link: `${BASE}/tours/kenya-disability-safari`,
    image_link: DEFAULT_IMG, price: 2450, destination: "Kenya",
    labels: ["accessible", "wheelchair", "adapted", "big-five", "inclusive"],
  },
  {
    id: "jae-ke-accessible-mara",
    title: "4-Day Accessible Masai Mara Safari Kenya",
    description: "4-day wheelchair-accessible Masai Mara safari with adapted vehicles, accessible tented camps, and front-row Great Migration viewing.",
    link: `${BASE}/tours/accessible-masai-mara-safari`,
    image_link: DEFAULT_IMG, price: 1450, destination: "Kenya",
    labels: ["accessible", "masai-mara", "wheelchair", "adapted", "migration"],
  },
  {
    id: "jae-ke-carnivore",
    title: "Carnivore Restaurant Experience Nairobi Kenya",
    description: "Unique dining adventure at Nairobi's legendary Carnivore Restaurant. Extensive BBQ meats and vibrant Kenyan hospitality.",
    link: `${BASE}/tour/carnivore-experience`,
    image_link: DEFAULT_IMG, price: 150, destination: "Kenya",
    labels: ["experience", "nairobi", "dining", "carnivore", "half-day"],
  },
  {
    id: "jae-ke-safari-madoa-doa",
    title: "Safari Madoa Doa Kenya – Big Five Across Premier Reserves",
    description: "Exclusive 7-day Big Five safari through Kenya's premier wildlife reserves. Expert guide, quality accommodation, all meals included.",
    link: `${BASE}/tour/safari-madoa-doa`,
    image_link: DEFAULT_IMG, price: 3200, destination: "Kenya",
    labels: ["luxury", "big-five", "multi-reserve", "7-days", "exclusive"],
  },
  {
    id: "jae-ke-sky-safari",
    title: "Classic Sky Safari Kenya – Luxury Air Safari Amboseli Meru Mara",
    description: "10-day luxury fly-in safari to Amboseli, Meru, and Masai Mara. Stay in top lodges and soar above East Africa's iconic landscapes.",
    link: `${BASE}/tour/classic-sky-safari-2`,
    image_link: DEFAULT_IMG, price: 6500, destination: "Kenya",
    labels: ["luxury", "fly-in", "air-safari", "10-days", "ultra-premium"],
  },
  {
    id: "jae-ke-nairobi-np",
    title: "Nairobi National Park Half-Day Tour – Wildlife in the City",
    description: "Explore the world's only national park inside a capital city. Rhinos, lions, giraffes, and savannah views with Nairobi's skyline.",
    link: `${BASE}/tour/nairobi-national-park-tour`,
    image_link: DEFAULT_IMG, price: 200, destination: "Kenya",
    labels: ["budget", "nairobi", "half-day", "rhino", "city-safari"],
  },
  {
    id: "jae-ke-nakuru-rhino",
    title: "Lake Nakuru Rhino Sanctuary 3-Day Experience Kenya",
    description: "3-day rhino tracking and birdwatching at Lake Nakuru. Both black and white rhino, flamingos, pelicans, and alkaline lake ecosystem.",
    link: `${BASE}/tour/lake-nakuru-rhino-sanctuary`,
    image_link: DEFAULT_IMG, price: 1200, destination: "Kenya",
    labels: ["mid-range", "nakuru", "rhino", "3-days", "birdwatching"],
  },
  {
    id: "jae-ke-big5-mara-7d",
    title: "7-Day Big Five Masai Mara Safari Kenya",
    description: "7-day safari focused on Kenya's highest Big Five concentration in Masai Mara. Extended tracking, expert guide, quality lodge.",
    link: `${BASE}/tour/big-five-masai-mara`,
    image_link: DEFAULT_IMG, price: 2850, destination: "Kenya",
    labels: ["mid-range", "masai-mara", "big-five", "7-days", "specialist"],
  },
  {
    id: "jae-ke-amboseli-elephant-5d",
    title: "5-Day Amboseli Elephant Focus Safari Kenya",
    description: "Specialist 5-day elephant safari in Amboseli. Africa's largest herds, unparalleled Kilimanjaro photography, and close elephant encounters.",
    link: `${BASE}/tour/big-five-amboseli-elephant`,
    image_link: DEFAULT_IMG, price: 1950, destination: "Kenya",
    labels: ["mid-range", "amboseli", "elephants", "5-days", "photography"],
  },
  {
    id: "jae-ke-tsavo-big5-6d",
    title: "6-Day Tsavo Big Five Adventure Kenya",
    description: "6-day Big Five safari through Tsavo East and West. Red elephants, maneless lions, volcanic landscapes, Mzima Springs.",
    link: `${BASE}/tour/big-five-tsavo-adventure`,
    image_link: DEFAULT_IMG, price: 2450, destination: "Kenya",
    labels: ["mid-range", "tsavo", "big-five", "6-days", "maneless-lions"],
  },
  {
    id: "jae-ke-mara-1d",
    title: "Masai Mara 1-Day Safari from Nairobi",
    description: "Full-day Masai Mara safari from Nairobi. Morning and afternoon game drives, picnic lunch inside the reserve. Optional Maasai village visit.",
    link: `${BASE}/tour/from-nairobi-maasai-mara-1-day-safari`,
    image_link: DEFAULT_IMG, price: 420, destination: "Kenya",
    labels: ["budget", "masai-mara", "1-day", "nairobi", "day-trip"],
  },

  // ── TANZANIA TOURS ────────────────────────────────────────────────────────
  {
    id: "jae-tz-serengeti-migration",
    title: "Serengeti Great Migration Safari Tanzania 2026",
    description: "Witness the Great Migration in Serengeti. Expert guides, comfortable lodges, daily game drives, all meals. Africa's greatest wildlife spectacle.",
    link: `${BASE}/tours/serengeti-migration-tour`,
    image_link: TZ_IMG, price: 4200, destination: "Tanzania",
    labels: ["luxury", "serengeti", "migration", "wildebeest", "big-five"],
  },
  {
    id: "jae-tz-ngorongoro-luxury",
    title: "Ngorongoro Crater Safari Tanzania – World's Best Wildlife",
    description: "Explore the world's largest intact caldera. Over 25,000 large animals, luxury lodge, guided game drives. Ideal for families and photographers.",
    link: `${BASE}/tours/ngorongoro-crater-safari`,
    image_link: DEFAULT_IMG, price: 2800, destination: "Tanzania",
    labels: ["luxury", "ngorongoro", "crater", "big-five", "photography"],
  },
  {
    id: "jae-tz-serengeti-wildlife",
    title: "Serengeti Wildlife Safari Tanzania – Endless Plains",
    description: "Explore the endless Serengeti plains and witness incredible wildlife diversity across grassland ecosystems. Big Five, cheetah, and wild dog.",
    link: `${BASE}/tours/serengeti-wildlife-safari`,
    image_link: DEFAULT_IMG, price: 1800, destination: "Tanzania",
    labels: ["mid-range", "serengeti", "wildlife", "big-five", "plains"],
  },
  {
    id: "jae-tz-ngorongoro-tour",
    title: "Ngorongoro Crater Tour Tanzania – World's Largest Caldera",
    description: "Visit the world's largest intact caldera. Spectacular wildlife density, rhino, flamingo, and Big Five within one ancient volcanic crater.",
    link: `${BASE}/tours/ngorongoro-crater-tour`,
    image_link: DEFAULT_IMG, price: 950, destination: "Tanzania",
    labels: ["mid-range", "ngorongoro", "crater", "rhino", "big-five"],
  },
  {
    id: "jae-tz-kilimanjaro",
    title: "Kilimanjaro Climbing Expedition Tanzania – Roof of Africa",
    description: "Conquer Africa's highest peak. Expert high-altitude guides, multiple route options, all climbing equipment, and park fees. Summit at 5,895m.",
    link: `${BASE}/tours/kilimanjaro-climbing-expedition`,
    image_link: DEFAULT_IMG, price: 2200, destination: "Tanzania",
    labels: ["adventure", "kilimanjaro", "climbing", "trekking", "summit"],
  },
  {
    id: "jae-tz-tarangire",
    title: "Tarangire Elephant Safari Tanzania – Africa's Largest Herds",
    description: "Africa's largest elephant concentrations in Tarangire National Park. Massive baobab trees, diverse birdlife, and reliable year-round wildlife.",
    link: `${BASE}/tours/tarangire-national-park-safari`,
    image_link: DEFAULT_IMG, price: 1100, destination: "Tanzania",
    labels: ["mid-range", "tarangire", "elephants", "baobabs", "birdwatching"],
  },
  {
    id: "jae-tz-lake-manyara",
    title: "Lake Manyara Tree-Climbing Lions Safari Tanzania",
    description: "Tanzania's unique tree-climbing lions at Lake Manyara. Flamingos, hippos, diverse birdlife, and scenic Rift Valley escarpment views.",
    link: `${BASE}/tours/lake-manyara-national-park-safari`,
    image_link: DEFAULT_IMG, price: 580, destination: "Tanzania",
    labels: ["budget", "lake-manyara", "tree-lions", "flamingos", "rift-valley"],
  },
  {
    id: "jae-tz-zanzibar",
    title: "Zanzibar Spice Island Holiday Tanzania",
    description: "Tropical spice island paradise. Historic Stone Town, pristine beaches, spice tours, dhow cruises, and vibrant Indian Ocean culture.",
    link: `${BASE}/tours/zanzibar-beach-holiday`,
    image_link: DEFAULT_IMG, price: 1300, destination: "Tanzania",
    labels: ["mid-range", "zanzibar", "beach", "stone-town", "spice"],
  },
  {
    id: "jae-tz-ruaha",
    title: "Ruaha National Park Safari Tanzania – Remote Wilderness",
    description: "Tanzania's largest national park. Remote wilderness with enormous elephant herds, great lion prides, and wild dog packs.",
    link: `${BASE}/tours/ruaha-national-park-safari`,
    image_link: DEFAULT_IMG, price: 1450, destination: "Tanzania",
    labels: ["mid-range", "ruaha", "remote", "wild-dogs", "elephants"],
  },
  {
    id: "jae-tz-selous",
    title: "Selous Game Reserve Safari Tanzania – Africa's Largest Reserve",
    description: "Africa's largest game reserve. Boat safaris on the Rufiji River, walking safaris, and massive wildlife concentrations including wild dogs.",
    link: `${BASE}/tours/selous-game-reserve-safari`,
    image_link: DEFAULT_IMG, price: 1350, destination: "Tanzania",
    labels: ["mid-range", "selous", "boat-safari", "wild-dogs", "walking"],
  },
  {
    id: "jae-tz-mikumi",
    title: "Mikumi National Park Safari Tanzania",
    description: "Accessible wildlife viewing in Mikumi National Park. Lions, elephants, hippos, and savannah grasslands close to Dar es Salaam.",
    link: `${BASE}/tours/mikumi-national-park`,
    image_link: DEFAULT_IMG, price: 750, destination: "Tanzania",
    labels: ["budget", "mikumi", "accessible", "lions", "grassland"],
  },
  {
    id: "jae-tz-arusha-cultural",
    title: "Arusha Cultural Tour Tanzania – Local Life & Heritage",
    description: "Authentic Tanzanian culture in Arusha. Local markets, Meru tribal villages, cultural center, coffee farms, and Chagga traditions.",
    link: `${BASE}/tours/arusha-cultural-tour`,
    image_link: DEFAULT_IMG, price: 420, destination: "Tanzania",
    labels: ["cultural", "arusha", "culture", "heritage", "half-day"],
  },
  {
    id: "jae-tz-katavi",
    title: "Katavi National Park Safari Tanzania – Remote Wilderness",
    description: "Remote Tanzania wilderness in Katavi. Enormous hippo congregations, vast buffalo herds, tree-climbing lions, and off-the-beaten-path Africa.",
    link: `${BASE}/tours/katavi-national-park-safari`,
    image_link: DEFAULT_IMG, price: 1600, destination: "Tanzania",
    labels: ["mid-range", "katavi", "remote", "hippos", "wilderness"],
  },
  {
    id: "jae-tz-mahale-chimp",
    title: "Mahale Mountains Chimpanzee Trekking Tanzania",
    description: "Trek wild chimpanzees in Mahale Mountains on the shores of Lake Tanganyika. Africa's most intimate chimp experience in pristine forest.",
    link: `${BASE}/tours/mahale-mountains-national-park-chimpanzee-trekking`,
    image_link: DEFAULT_IMG, price: 2100, destination: "Tanzania",
    labels: ["premium", "mahale", "chimpanzees", "primates", "lake-tanganyika"],
  },
  {
    id: "jae-tz-pemba-diving",
    title: "Pemba Island Diving Tanzania – World-Class Indian Ocean",
    description: "World-class scuba diving off Pemba Island with pristine coral walls and crystal clear Indian Ocean waters. All dive equipment included.",
    link: `${BASE}/tours/pemba-island-diving`,
    image_link: DEFAULT_IMG, price: 980, destination: "Tanzania",
    labels: ["adventure", "pemba", "diving", "coral", "ocean"],
  },
  {
    id: "jae-tz-stone-town",
    title: "Stone Town Heritage Tour Zanzibar – UNESCO World Heritage",
    description: "Guided walking tour of Zanzibar's UNESCO World Heritage Stone Town. Swahili architecture, slave history, spice markets, and Arab fort.",
    link: `${BASE}/tours/stone-town-heritage-tour`,
    image_link: DEFAULT_IMG, price: 350, destination: "Tanzania",
    labels: ["cultural", "stone-town", "zanzibar", "heritage", "walking"],
  },
  {
    id: "jae-tz-northern-circuit",
    title: "Northern Circuit Safari Tanzania – Serengeti Ngorongoro Tarangire",
    description: "Complete Northern Tanzania circuit: Serengeti, Ngorongoro Crater, Tarangire, and Lake Manyara. Best of Tanzania's wildlife in one comprehensive itinerary.",
    link: `${BASE}/tours/northern-circuit-safari`,
    image_link: DEFAULT_IMG, price: 2800, destination: "Tanzania",
    labels: ["premium", "northern-circuit", "serengeti", "ngorongoro", "complete"],
  },
  {
    id: "jae-tz-accessible",
    title: "Tanzania Accessible Safari – Serengeti & Ngorongoro Inclusive",
    description: "8-day inclusive Tanzania safari through Serengeti and Ngorongoro Crater. Adapted safari vehicles, wheelchair-accessible lodges, and expert guides.",
    link: `${BASE}/tours/tanzania-accessible-safari`,
    image_link: DEFAULT_IMG, price: 2950, destination: "Tanzania",
    labels: ["accessible", "wheelchair", "serengeti", "ngorongoro", "inclusive"],
  },
  {
    id: "jae-tz-best-zanzibar",
    title: "Best of Zanzibar 8-Day Cultural & Beach Tour Tanzania",
    description: "Stone Town heritage, pristine beaches, spice tours, dhow sailing, snorkelling, and vibrant Swahili culture in 8 unforgettable days.",
    link: `${BASE}/tour/best-of-zanzibar`,
    image_link: DEFAULT_IMG, price: 2500, destination: "Tanzania",
    labels: ["mid-range", "zanzibar", "beach", "culture", "8-days"],
  },
  {
    id: "jae-tz-beach-relaxation",
    title: "East Africa Beach Relaxation – Coastal Retreat",
    description: "5-day beach retreat on East Africa's pristine Indian Ocean coast. White sand beaches, water sports, and serene tropical setting.",
    link: `${BASE}/tour/relaxation-at-the-beach`,
    image_link: DEFAULT_IMG, price: 1200, destination: "Tanzania",
    labels: ["leisure", "beach", "relaxation", "5-days", "ocean"],
  },
  {
    id: "jae-tz-safari-dwika",
    title: "Safari Dwika Tanzania – Iconic Parks Wildlife Adventure",
    description: "7-day adventurous safari through Tanzania's iconic national parks. Diverse wildlife, stunning landscapes, and expert guiding.",
    link: `${BASE}/tour/safari-dwika`,
    image_link: DEFAULT_IMG, price: 3500, destination: "Tanzania",
    labels: ["mid-range", "safari", "7-days", "multi-park", "wildlife"],
  },

  // ── RWANDA TOURS ──────────────────────────────────────────────────────────
  {
    id: "jae-rw-gorilla-safari",
    title: "Rwanda Gorilla Safari – Volcanoes National Park",
    description: "Trek endangered mountain gorillas in Rwanda's Volcanoes National Park. Gorilla permits, cultural experiences, lodge accommodation, all meals.",
    link: `${BASE}/tours/volcanoes-national-park-safari`,
    image_link: RW_IMG, price: 3800, destination: "Rwanda",
    labels: ["premium", "gorillas", "volcanoes", "primates", "trekking"],
  },
  {
    id: "jae-rw-gorilla-experience",
    title: "Rwanda Gorilla Trekking Experience – Volcanoes Park",
    description: "Get up close with endangered mountain gorillas. Expert guides, gorilla family tracking, permits, lodge accommodation, and meals. Rated 5 stars.",
    link: `${BASE}/tours/gorilla-trekking-experience`,
    image_link: DEFAULT_IMG, price: 2500, destination: "Rwanda",
    labels: ["premium", "gorillas", "trekking", "volcanoes", "conservation"],
  },
  {
    id: "jae-rw-nyungwe",
    title: "Nyungwe Forest Canopy Walk Rwanda",
    description: "Walk the suspension bridge canopy in Nyungwe Forest. Chimpanzees, colobus monkeys, 275 bird species in Rwanda's ancient rainforest.",
    link: `${BASE}/tours/nyungwe-forest-canopy-walk`,
    image_link: DEFAULT_IMG, price: 450, destination: "Rwanda",
    labels: ["mid-range", "nyungwe", "canopy-walk", "chimpanzees", "rainforest"],
  },
  {
    id: "jae-rw-lake-kivu",
    title: "Lake Kivu Relaxation Rwanda – Great Lake Shore",
    description: "Relax on the scenic shores of Lake Kivu, one of Africa's Great Lakes. Boat trips, kayaking, island visits, and highland landscapes.",
    link: `${BASE}/tours/lake-kivu-relaxation`,
    image_link: DEFAULT_IMG, price: 380, destination: "Rwanda",
    labels: ["leisure", "lake-kivu", "relaxation", "great-lake", "kayaking"],
  },
  {
    id: "jae-rw-akagera",
    title: "Akagera National Park Safari Rwanda – Big Five Savanna",
    description: "Rwanda's only savanna national park. Big Five including reintroduced lions and rhinos, boat safari on Lake Ihema, and diverse birdlife.",
    link: `${BASE}/tours/akagera-national-park-safari`,
    image_link: DEFAULT_IMG, price: 520, destination: "Rwanda",
    labels: ["mid-range", "akagera", "savanna", "big-five", "rhino"],
  },
  {
    id: "jae-rw-kigali",
    title: "Kigali City Tour Rwanda – Genocide Memorial & Culture",
    description: "Full-day Kigali city tour. Genocide Memorial, local markets, Inema Arts Centre, Kimironko market, and Rwanda's remarkable modern culture.",
    link: `${BASE}/tours/kigali-city-tour`,
    image_link: DEFAULT_IMG, price: 150, destination: "Rwanda",
    labels: ["cultural", "kigali", "city-tour", "genocide-memorial", "culture"],
  },
  {
    id: "jae-rw-golden-monkey",
    title: "Golden Monkey Tracking Rwanda – Rare Primate Adventure",
    description: "Track rare golden monkeys in Volcanoes National Park. Intimate encounters with these playful bamboo-dwelling primates in volcanic forests.",
    link: `${BASE}/tours/golden-monkey-tracking`,
    image_link: DEFAULT_IMG, price: 680, destination: "Rwanda",
    labels: ["mid-range", "golden-monkey", "primates", "volcanoes", "rare"],
  },
  {
    id: "jae-rw-distillery",
    title: "Thousand Hills Distilleries Tour Rwanda",
    description: "Experience Rwanda's artisanal spirit scene. Tour Thousand Hills Distilleries, learn about craft production, and taste premium local beverages.",
    link: `${BASE}/tour/visit-a-thousand-hills-distilleries`,
    image_link: DEFAULT_IMG, price: 100, destination: "Rwanda",
    labels: ["cultural", "distillery", "tasting", "craft", "half-day"],
  },
  {
    id: "jae-rw-womens-center",
    title: "Nyamirambo Women's Center Cultural Tour Kigali Rwanda",
    description: "Half-day cultural tour at Nyamirambo Women's Center. Local crafts, community initiatives, cooking demonstrations, and Rwandan women entrepreneurs.",
    link: `${BASE}/tour/this-is-africa-nyamirambo-womens-center`,
    image_link: DEFAULT_IMG, price: 80, destination: "Rwanda",
    labels: ["cultural", "kigali", "womens-center", "crafts", "community"],
  },
  {
    id: "jae-rw-accessible-gorilla",
    title: "Rwanda Accessible Gorilla Safari – Wheelchair-Friendly Trekking",
    description: "4-day accessible mountain gorilla trek in Volcanoes National Park. Shorter trails, vehicle support, premium lodges for mobility-impaired travelers.",
    link: `${BASE}/tour/rwanda-accessible-gorilla-safari`,
    image_link: DEFAULT_IMG, price: 4500, destination: "Rwanda",
    labels: ["accessible", "gorillas", "wheelchair", "volcanoes", "premium"],
  },

  // ── UGANDA TOURS ──────────────────────────────────────────────────────────
  {
    id: "jae-ug-bwindi-v1",
    title: "Bwindi Gorilla Trekking Uganda – Impenetrable Forest",
    description: "Trek mountain gorillas in Bwindi Impenetrable National Park. Expert guides, gorilla permits, lodge accommodation, full-board meals in UNESCO forest.",
    link: `${BASE}/tours/bwindi-gorilla-trek`,
    image_link: UG_IMG, price: 3200, destination: "Uganda",
    labels: ["premium", "gorillas", "bwindi", "primates", "trekking"],
  },
  {
    id: "jae-ug-bwindi-v2",
    title: "Bwindi Mountain Gorilla Trekking Uganda 2026",
    description: "Intimate mountain gorilla trekking in Bwindi Impenetrable Forest. Gorilla permits, expert guides, comfortable lodge, all meals and park fees.",
    link: `${BASE}/tours/bwindi-gorilla-trekking`,
    image_link: DEFAULT_IMG, price: 2200, destination: "Uganda",
    labels: ["premium", "gorillas", "bwindi", "forest", "conservation"],
  },
  {
    id: "jae-ug-queen-elizabeth",
    title: "Queen Elizabeth National Park Safari Uganda",
    description: "Diverse wildlife at Queen Elizabeth NP. Tree-climbing lions, hippos, elephants, chimpanzees, and famous Kazinga Channel boat safari.",
    link: `${BASE}/tours/queen-elizabeth-national-park-safari`,
    image_link: DEFAULT_IMG, price: 1150, destination: "Uganda",
    labels: ["mid-range", "queen-elizabeth", "tree-lions", "kazinga", "boat"],
  },
  {
    id: "jae-ug-murchison",
    title: "Murchison Falls Adventure Uganda – World's Most Powerful Falls",
    description: "Witness the world's most powerful waterfall. Big Five, boat safari to the base of the falls, giraffe tracking, and spectacular Nile scenery.",
    link: `${BASE}/tours/murchison-falls-national-park-safari`,
    image_link: DEFAULT_IMG, price: 980, destination: "Uganda",
    labels: ["mid-range", "murchison-falls", "nile", "big-five", "boat"],
  },
  {
    id: "jae-ug-kibale-chimp",
    title: "Kibale Forest Chimpanzee Tracking Uganda",
    description: "Track our closest relatives in Kibale National Park — Africa's highest chimpanzee concentration. Expert guides, permits, lodge accommodation.",
    link: `${BASE}/tours/kibale-national-park-chimpanzee-trekking`,
    image_link: DEFAULT_IMG, price: 750, destination: "Uganda",
    labels: ["mid-range", "kibale", "chimpanzees", "primates", "forest"],
  },
  {
    id: "jae-ug-lake-mburo",
    title: "Lake Mburo National Park Safari Uganda",
    description: "Compact Uganda park with zebra, impala, hippos, topi, and Uganda's only eland. Boat safari, night drives, and walking safaris.",
    link: `${BASE}/tours/lake-mburo-national-park-safari`,
    image_link: DEFAULT_IMG, price: 420, destination: "Uganda",
    labels: ["budget", "lake-mburo", "zebra", "hippos", "walking"],
  },
  {
    id: "jae-ug-rwenzori",
    title: "Rwenzori Mountains Hiking Uganda – Mountains of the Moon",
    description: "Hike the legendary Mountains of the Moon. Afro-alpine vegetation, glaciers, stunning valleys, and the challenge of Africa's most beautiful range.",
    link: `${BASE}/tours/rwenzori-mountains-hiking`,
    image_link: DEFAULT_IMG, price: 1800, destination: "Uganda",
    labels: ["adventure", "rwenzori", "mountains", "hiking", "glaciers"],
  },
  {
    id: "jae-ug-jinja-rafting",
    title: "Jinja White Water Rafting Uganda – Source of the Nile",
    description: "Thrilling white water rafting at the Source of the Nile in Jinja. Grade 5 rapids, kayaking, bungee jumping, and adventure sports.",
    link: `${BASE}/tours/jinja-adventure-tour`,
    image_link: DEFAULT_IMG, price: 350, destination: "Uganda",
    labels: ["adventure", "jinja", "rafting", "nile", "source"],
  },
  {
    id: "jae-ug-lake-bunyonyi",
    title: "Lake Bunyonyi Relaxation Uganda – Africa's Deepest Lake",
    description: "Relax by Uganda's deepest and most scenic lake. Island hopping, canoe rides, birdwatching, and peaceful highland scenery.",
    link: `${BASE}/tours/lake-bunyonyi-relaxation-tour`,
    image_link: DEFAULT_IMG, price: 450, destination: "Uganda",
    labels: ["leisure", "lake-bunyonyi", "relaxation", "islands", "birdwatching"],
  },
  {
    id: "jae-ug-ssese-islands",
    title: "Ssese Islands Beach Holiday Uganda – Lake Victoria Paradise",
    description: "Beach paradise on Lake Victoria's Ssese Islands. White sand beaches, forest walks, birdwatching, and relaxed island pace.",
    link: `${BASE}/tours/ssese-islands-beach-holiday`,
    image_link: DEFAULT_IMG, price: 650, destination: "Uganda",
    labels: ["leisure", "ssese-islands", "beach", "lake-victoria", "relaxation"],
  },
  {
    id: "jae-ug-accessible-primate",
    title: "5-Day Uganda Accessible Primate Safari – Wheelchair-Friendly",
    description: "5-day wheelchair-accessible primate safari through Kibale Forest and Queen Elizabeth NP. Adapted vehicles, accessible lodges, chimpanzee tracking.",
    link: `${BASE}/tour/uganda-accessible-primate-safari`,
    image_link: DEFAULT_IMG, price: 3150, destination: "Uganda",
    labels: ["accessible", "primates", "chimpanzees", "wheelchair", "5-days"],
  },
];

// ─── TSV serialiser ───────────────────────────────────────────────────────────

function buildTsvRow(tour: Tour): string {
  const dest = tour.destination;
  const isBudget = tour.id.startsWith("jae-bgt-");

  const productType = isBudget
    ? "Safari Tours > Kenya Safaris > Budget Safaris"
    : `Safari Tours > ${dest} Tours`;

  const fields = [
    tour.id,
    tour.title,
    tour.description,
    tour.link,
    tour.image_link,
    "in stock",
    `${tour.price.toFixed(2)} USD`,
    `${tour.price.toFixed(2)} USD`,   // sale_price same as price
    "JaeTravel Expeditions",
    "new",
    productType,
    "1",                              // google_product_category: Arts & Entertainment
    ...tour.labels,
    "KE:::0 USD",                     // free "shipping" (service, not physical)
    "no",                             // identifier_exists
  ];

  // Escape any tabs or newlines inside field values
  return fields
    .map((f) => String(f).replace(/\t/g, " ").replace(/\n/g, " "))
    .join("\t");
}

const TSV_HEADER = [
  "id", "title", "description", "link", "image_link",
  "availability", "price", "sale_price", "brand", "condition",
  "product_type", "google_product_category",
  "custom_label_0", "custom_label_1", "custom_label_2",
  "custom_label_3", "custom_label_4",
  "shipping", "identifier_exists",
].join("\t");

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET() {
  const rows = [TSV_HEADER, ...TOURS.map(buildTsvRow)];
  const tsv = rows.join("\n");

  return new NextResponse(tsv, {
    status: 200,
    headers: {
      "Content-Type": "text/tab-separated-values; charset=utf-8",
      // Tell GMC (and browsers) the filename
      "Content-Disposition": 'attachment; filename="jaetravel-gmc-feed.txt"',
      // Cache for 24 h on CDN, revalidate in background — keeps GMC fetches fast
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}