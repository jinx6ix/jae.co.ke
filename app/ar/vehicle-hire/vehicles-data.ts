// app/ar/lib/vehicles-data.ts

export type Vehicle = {
  id: string;
  name: string;
  slug: string;
  image: string;
  capacity: string;
  specifications: { luggage: string };
  description: string;
  pricePerDay: string;
  brand?: string;
  model?: string;
  available?: boolean;
  useCases?: string[];
};

export const vehicles: Vehicle[] = [
  {
    id: "landcruiser-prado",
    name: "تويوتا لاند كروزر برادو TX",
    slug: "toyota-landcruiser-prado",
    image: "/vehicles/landcruiser-prado.jpg",
    capacity: "5 ركاب",
    specifications: { luggage: "4 حقائب كبيرة" },
    description: "مركبة سفاري 4x4 المثالية لمغامرات شرق أفريقيا. تتميز بسقف قابل للرفع لمشاهدة مثالية للحياة البرية، ومكيف هواء، وموثوقية تويوتا الأسطورية. مركبة سفاري مثالية لماساي مارا وسيرينجيتي واستكشاف المتنزهات النائية بمقاعد مريحة ورؤية ممتازة.",
    pricePerDay: "95",
    brand: "Toyota",
    model: "Land Cruiser Prado TX",
    available: true,
    useCases: ["safari", "self-drive", "guided"],
  },
  {
    id: "landcruiser-78",
    name: "تويوتا لاند كروزر 78 سيريز",
    slug: "landcruiser-78-series",
    image: "/vehicles/landcruiser-78.jpg",
    capacity: "6 ركاب",
    specifications: { luggage: "6 حقائب متوسطة" },
    description: "مركبة سفاري ممتدة بسعة إضافية للمقاعد والتخزين. نظام دفع رباعي ثقيل بهيكل معزز، مثالي للرحلات الجماعية والرحلات البرية لمسافات طويلة. تتعامل مركبة السفاري هذه مع أصعب التضاريس الأفريقية بسهولة مع الحفاظ على راحة الركاب.",
    pricePerDay: "120",
    brand: "Toyota",
    model: "Land Cruiser 78 Series",
    available: true,
    useCases: ["safari", "group", "guided"],
  },
  {
    id: "safari-van",
    name: "تويوتا هايس سفاري فان",
    slug: "safari-minivan",
    image: "/vehicles/safari-van.jpg",
    capacity: "7 ركاب",
    specifications: { luggage: "7 حقائب صغيرة" },
    description: "مركبة سفاري مريحة واقتصادية مثالية للنقل من وإلى المطار والجولات السياحية ودوائر السفاري القصيرة في كينيا وتنزانيا. تتميز بسقف مرتفع لرؤية أفضل ومقاعد مريحة. مركبة سفاري موثوقة للمغامرات العائلية والمسافرين المهتمين بالميزانية.",
    pricePerDay: "80",
    brand: "Toyota",
    model: "Hiace Safari Van",
    available: true,
    useCases: ["transfer", "budget", "guided"],
  },
  {
    id: "rooftop-tent-4x4",
    name: "لاند كروزر 4x4 مع خيمة سقف",
    slug: "4x4-rooftop-tent",
    image: "/vehicles/rooftop-tent.jpg",
    capacity: "4 ركاب",
    specifications: { luggage: "معدات تخييم مشمولة" },
    description: "مركبة سفاري برية كاملة مجهزة بالكامل لمغامرات التخييم. تشمل خيمة سقف وثلاجة ومعدات طهي ومعدات استرداد. مركبة السفاري المثالية للقيادة الذاتية للمسافرين المستقلين الذين يريدون استكشاف الأماكن الأكثر برية في شرق أفريقيا في وتيرتهم الخاصة.",
    pricePerDay: "110",
    brand: "Toyota",
    model: "Land Cruiser with Rooftop Tent",
    available: true,
    useCases: ["self-drive", "camping", "overland"],
  },
  {
    id: "accessible-van",
    name: "فان سفاري متاح لذوي الإعاقة (كراسي متحركة)",
    slug: "accessible-van",
    image: "/vehicles/accessible-van.jpg",
    capacity: "1 كرسي متحرك + 4 ركاب",
    specifications: { luggage: "3 حقائب متوسطة" },
    description: "مركبة سفاري معدلة خصيصًا مع منحدر هيدروليكي، وأنظمة تثبيت للكراسي المتحركة، وسائقين مدربين على المساعدة. تحافظ على جميع ميزات مركبة السفاري الأساسية مع توفير وصول خالٍ من العوائق. مثالية للسفر الشامل وضمان قدرة الجميع على تجربة حياة شرق أفريقيا البرية.",
    pricePerDay: "130",
    brand: "Toyota",
    model: "Accessible Safari Van",
    available: true,
    useCases: ["accessible", "inclusive", "guided"],
  },
  {
    id: "luxury-range-rover",
    name: "رينج روفر سبورت فاخر",
    slug: "range-rover-sport",
    image: "/vehicles/range-rover.jpg",
    capacity: "4 ركاب",
    specifications: { luggage: "3 حقائب كبيرة" },
    description: "مركبة سفاري فاخرة بمقاعد جلدية وواي فاي داخلي وتحكم متقدم في المناخ وميزات راحة فائقة. تجمع مركبة السفاري الراقية هذه بين القدرة على الطرق الوعرة والراحة التنفيذية، مثالية لرحلات السفاري الفاخرة والمناسبات الخاصة والمسافرين المميزين الذين يبحثون عن تجربة سفاري فائقة.",
    pricePerDay: "180",
    brand: "Range Rover",
    model: "Sport",
    available: true,
    useCases: ["luxury", "special occasion", "guided"],
  },
];