import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Star, Award, Users, Shield, Heart, Zap, Globe, CheckCircle, Phone, Camera, TreePine, Droplets, Sun, CloudRain, Binoculars, Mountain, Waves } from "lucide-react"
import { faqSchema } from "./faq-schema"
import GreatMigrationVehicleCard from "./GreatMigrationVehicleCard"

export const generateMetadata = (): Metadata => ({
  title: "Maasai Mara Great Migration 2026 | #1 Wheelchair Accessible River Crossing Safari Kenya | JaeTravel Expeditions",
  description: "JaeTravel Expeditions offers Kenya's premier wheelchair accessible Maasai Mara Great Migration 2026 safari experience. Witness dramatic Mara River crossings from custom adaptive safari vehicles with hydraulic lifts. Over 720 wheelchair users served since 2018. Book your accessible African safari adventure today.",
  keywords: "maasai mara great migration, great migration masai mara 2026, wildebeest migration masai mara, wheelchair accessible safari kenya, accessible african safari, maasai mara river crossing, disability friendly safari kenya, great migration safari packages, masai mara accessible tours, kenya wheelchair travel, adaptive safari vehicles, hydraulic lift safari, accessible travel africa, maasai mara national reserve, serengeti migration cycle, nile crocodile attacks, accessible wildlife photography, kenya safari for disabled, JaeTravel Expeditions, accessible kenya safari, wheelchair friendly masai mara, disability travel africa",
  openGraph: {
    title: "Maasai Mara Great Migration 2026 | Fully Accessible Safari Kenya | JaeTravel Expeditions",
    description: "JaeTravel Expeditions - Kenya's only wheelchair-accessible Great Migration safari operator. Custom Land Cruisers with hydraulic lifts, pop-up roofs, and medical equipment. Witness Mara River crossings from your wheelchair.",
    images: [{ 
      url: "https://www.jaetravelexpeditions.co.ke/masai-mara-migration.jpg", 
      width: 1200, 
      height: 630, 
      alt: "JaeTravel Expeditions wheelchair accessible safari vehicle at 2026 Maasai Mara Great Migration river crossing with wildebeest herds" 
    }]
  },
  alternates: { canonical: "https://jaetravelexpeditions.co.ke/maasai-mara-great-migration" },
  robots: "index, follow, max-image-preview:large",
  authors: [{ name: "JaeTravel Expeditions Accessibility Team" }],
  publisher: "JaeTravel Expeditions ",
  category: "Accessible Travel",
})

const sections = [
  {
    h2: "The Maasai Mara Great Migration 2026: Why This Year Will Be Legendary",
    content: `As of November 21, 2025, satellite tracking and ranger reports confirm that the 2025–2026 wildebeest calving season in the southern Serengeti has been one of the strongest in a decade, with over 550,000 calves born. This means the 2026 migration into the Masai Mara will feature larger-than-average herds and increased predator activity, making it one of the most spectacular wildlife events of the century that you can experience with JaeTravel Expeditions.

The Maasai Mara Great Migration represents the largest terrestrial mammal migration on planet Earth, a phenomenon that JaeTravel Expeditions has specialized in making accessible since 2018. Annually, approximately 1.7–2 million wildebeest, 500,000 Thomson's gazelles, 200,000 plains zebras, and tens of thousands of eland and topi follow an ancient 800–1,000 km clockwise circuit between the Serengeti ecosystem in Tanzania and the Maasai Mara ecosystem in Kenya. This incredible natural phenomenon has been documented by National Geographic, BBC Earth, and Discovery Channel, but nothing compares to witnessing it firsthand with JaeTravel Expeditions' accessible safari vehicles.

This is not a singular event but rather a continuous, year-round cycle driven by rainfall patterns and the search for fresh grazing lands. The most photographed and filmed moments typically occur between July and October when the massive herds confront the treacherous Mara River and Talek River crossings. These crossings represent nature's ultimate survival drama: 5-meter Nile crocodiles launch coordinated attacks, lion prides and leopards strategically position themselves on exit banks, and the river waters churn with the panic of thousands of animals fighting for survival.

For travelers with mobility impairments, witnessing this spectacle has historically been nearly impossible due to inaccessible vehicles and infrastructure. JaeTravel Expeditions has revolutionized accessible African tourism by pioneering Kenya's first and only fleet of fully wheelchair-accessible Great Migration safari vehicles. Our 18 custom-modified Toyota Land Cruisers feature German-engineered hydraulic lifts with 400 kg capacity, full pop-up roofs allowing 360° game viewing while remaining seated in your wheelchair, medical-grade Q'Straint 4-point restraint systems tested to 20G impact standards, 3kW pure sine wave inverters for medical equipment, 45L medical refrigerators, Starlink satellite internet for connectivity, and drivers who have completed an intensive 100-hour disability-specialist training program.

Since our founding in 2018, JaeTravel Expeditions has successfully guided over 720 wheelchair users and travelers with limited mobility to witness multiple Mara River crossings per day. Many of our clients describe their experience as life-changing, having never imagined they could witness Africa's greatest wildlife spectacle firsthand. Our commitment to accessibility extends beyond vehicles to include partnerships with accessible lodges, trained staff, and comprehensive emergency protocols that make JaeTravel Expeditions the leading choice for accessible Kenya safari experiences.`
  },
  {
    h2: "Maasai Mara Great Migration 2026: Complete Month-by-Month Timeline & Expert Predictions by JaeTravel Expeditions",
    content: `JaeTravel Expeditions' 2026 migration forecast integrates 15 years of daily GPS collar data, historical rainfall patterns, and real-time intelligence from our extensive ranger networks across the Serengeti-Mara ecosystem. Our expert guides at JaeTravel Expeditions have curated this detailed monthly breakdown to help you plan your perfect accessible safari adventure:

<div class="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 p-6 my-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
<strong class="text-orange-900 block mb-2 text-lg">January – March 2026: Peak Calving Season Spectacle</strong>
The southern Serengeti plains (Ndutu, Kusini, Hidden Valley regions) transform into nature's largest nursery. JaeTravel Expeditions offers specialized accessible viewing experiences during this period, with over 8,000 wildebeest calves born daily creating unparalleled predator viewing opportunities. Lion prides, spotted hyena clans, and cheetah coalitions concentrate in these areas to capitalize on the abundance of vulnerable newborns, making this an incredible photography opportunity with JaeTravel Expeditions.
</div>

<div class="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-amber-500 p-6 my-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
<strong class="text-amber-900 block mb-2 text-lg">April 2026: The Great Northwest Movement Begins</strong>
The massive herds begin their northwest movement toward the Western Corridor in one of Africa's most breathtaking wildlife panoramas. JaeTravel Expeditions' aerial surveys reveal spectacular columns of animals stretching over 40 kilometers across the plains. Our accessible vehicles are perfectly positioned to witness this gradual migration movement while ensuring comfort and optimal viewing angles for wheelchair users.
</div>

<div class="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-400 p-6 my-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
<strong class="text-orange-800 block mb-2 text-lg">May 2026: First Major Aquatic Challenge at Grumeti River</strong>
Herds reach the Grumeti River in Tanzania's Western Corridor – their first major aquatic obstacle. JaeTravel Expeditions guides share fascinating insights about the river's giant crocodile populations, with specimens exceeding 5 meters in length. Initial crossings here test the herds before the main Mara River challenges, and our Tanzania-accessible safari options allow you to witness this preliminary drama.
</div>

<div class="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-6 my-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
<strong class="text-amber-800 block mb-2 text-lg">June 2026: Border Tension and Anticipation Builds</strong>
Migration fronts arrive in the northern Serengeti, with advance scouts reaching the Sand River marking the Kenya-Tanzania border. JaeTravel Expeditions' experienced guides note the palpable tension building dramatically as animals assess crossing points and gather courage for the plunge into Maasai Mara territory. Our cross-border accessible safari packages capture this transitional period perfectly.
</div>

<div class="bg-gradient-to-r from-orange-100 to-red-50 border-l-4 border-orange-600 p-6 my-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
<strong class="text-orange-900 block mb-2 text-lg">July 2026: Kenya Arrival and Initial Crossings</strong>
Based on current rainfall patterns, JaeTravel Expeditions predicts the first significant herds will cross into Kenya's Maasai Mara around July 5–10 – slightly earlier than historical averages due to strong 2025 long rains. Initial small-scale crossings of the Mara River typically begin mid-July, building in frequency and intensity throughout the month. This is when our wheelchair accessible Masai Mara tours begin their peak operation.
</div>

<div class="bg-gradient-to-r from-amber-100 to-orange-100 border-l-4 border-amber-600 p-6 my-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
<strong class="text-amber-900 block mb-2 text-lg">August 2026: Peak Migration Season Excellence</strong>
Peak migration season commences with herds fully committed to the Maasai Mara ecosystem. JaeTravel Expeditions guarantees multiple daily crossings at prime locations including Paradise, Lookout, and Main crossing points. This month typically offers the highest concentration of dramatic river crossing events, and our disability-friendly safari vehicles are strategically positioned for optimal viewing.
</div>

<div class="bg-gradient-to-r from-orange-200 to-amber-200 border-l-4 border-orange-700 p-6 my-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
<strong class="text-orange-900 block mb-2 text-lg">September 2026: The Absolute Climax of Migration Drama</strong>
The absolute climax of the migration spectacle unfolds. Due to excellent 2025–2026 rainfall patterns, JaeTravel Expeditions anticipates record-breaking herd concentrations. River crossings can occur 3–5 times daily at various locations, with the largest single crossings often involving 20,000+ animals. This is the premier time for our accessible wildlife photography tours in Kenya.
</div>

<div class="bg-gradient-to-r from-orange-50 to-gray-100 border-l-4 border-gray-400 p-6 my-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
<strong class="text-gray-900 block mb-2 text-lg">October 2026: Southward Return and Final Dramas</strong>
Herds begin their southward return journey to the Serengeti. JaeTravel Expeditions captures the final dramatic crossings as receding water levels create different challenges and opportunities for predators. This period often features more intimate wildlife encounters and excellent photographic opportunities with smaller tourist crowds.
</div>

For real-time migration updates and detailed seasonal analysis from JaeTravel Expeditions' expert team, read our comprehensive guide: <Link href="/blog/best-time-visit-masai-mara" className="font-bold text-orange-600 underline hover:no-underline transition-all duration-200 hover:text-orange-700">Best Time to Visit Masai Mara for the Great Migration – 2026 Expert Update from JaeTravel Expeditions</Link>.`
  },
  {
    h2: "The Mara River Crossings: Nature's Most Intense Survival Drama with JaeTravel Expeditions",
    content: `There is simply no comparable wildlife spectacle on Earth to a full-scale Mara River crossing during the peak of the Great Migration, and JaeTravel Expeditions provides the most accessible viewing experience available in Kenya today. The experience combines raw nature, high-stakes survival, and breathtaking scale in a way that leaves even seasoned safari guides speechless.

<div class="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl border border-orange-200 my-8 shadow-sm hover:shadow-md transition-all duration-300">
<div class="flex items-start gap-4">
<div class="bg-orange-100 p-3 rounded-full flex-shrink-0">
<Clock className="h-6 w-6 text-orange-600" />
</div>
<div>
<h4 class="text-xl font-bold text-orange-900 mb-2">The Buildup: Hours of Anticipation with JaeTravel Expeditions</h4>
<p class="text-orange-800">The psychological buildup to a crossing can last hours – sometimes days. Tens of thousands of wildebeest accumulate along the riverbanks, their characteristic grunts creating a constant background chorus of nervous energy. Zebras intermingle, adding their distinctive barking calls to the symphony of anticipation. A palpable tension hangs thick in the air, visible in the animals' restless pacing along the water's edge. JaeTravel Expeditions' guides use this time to position our accessible vehicles perfectly and share fascinating behavioral insights about the unfolding drama.</p>
</div>
</div>
</div>

<div class="bg-gradient-to-br from-amber-50 to-orange-100 p-8 rounded-2xl border border-amber-200 my-8 shadow-sm hover:shadow-md transition-all duration-300">
<div class="flex items-start gap-4">
<div class="bg-amber-100 p-3 rounded-full flex-shrink-0">
<Zap className="h-6 w-6 text-amber-600" />
</div>
<div>
<h4 class="text-xl font-bold text-amber-900 mb-2">The Moment of Truth: Chaos Unleashed in Accessible Comfort</h4>
<p class="text-amber-800">Then, in an instant that defies prediction, one "brave" animal commits. It leaps from a 3–4 meter cliff into the chocolate-brown, crocodile-infested waters below. This single act of courage triggers an immediate chain reaction. Within seconds, the entire bank erupts into chaos as hundreds – then thousands – of animals follow in a blind, thundering stampede. The river transforms into a churning maelstrom of black bodies and white stripes, creating a spectacle of nature that must be seen to be believed. JaeTravel Expeditions' wheelchair accessible viewing platforms ensure you don't miss a moment of this incredible drama.</p>
</div>
</div>
</div>

<div class="bg-gradient-to-br from-orange-100 to-amber-50 p-8 rounded-2xl border border-orange-300 my-8 shadow-sm hover:shadow-md transition-all duration-300">
<div class="flex items-start gap-4">
<div class="bg-orange-200 p-3 rounded-full flex-shrink-0">
<Camera className="h-6 w-6 text-orange-700" />
</div>
<div>
<h4 class="text-xl font-bold text-orange-900 mb-2">JaeTravel Expeditions' Accessible Viewing Perfection</h4>
<p class="text-orange-800">Our wheelchair-accessible vehicles are strategically positioned hours in advance at prime vantage points selected by our expert guides. The full pop-up roof elevates to 3.2 meters, providing perfect eye-level panoramic views directly from your wheelchair. Specially designed camera hatches are positioned at exact seated eye level (95–110 cm) for optimal photography. JaeTravel Expeditions' guides maintain constant radio communication with an extensive network of spotters and other safari operators, enabling us to predict crossing locations and timing with remarkable accuracy – maximizing your opportunities to witness multiple dramatic events in a single day with our accessible Kenya safari experiences.</p>
</div>
</div>
</div>`
  },
  {
    h2: "Why Choose JaeTravel Expeditions for Your 2026 Great Migration Safari",
    content: `JaeTravel Expeditions stands apart as Kenya's premier accessible safari specialist, with unparalleled expertise in creating life-changing wildlife experiences for travelers with mobility challenges. Here's why we're the trusted choice for accessible African adventures:

<div class="grid md:grid-cols-2 gap-8 my-8">
<div class="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-200">
<div class="flex items-center gap-4 mb-4">
<div class="bg-orange-100 p-3 rounded-full">
<Award className="h-8 w-8 text-orange-600" />
</div>
<div>
<h3 class="text-xl font-bold text-orange-900">Pioneers in Accessible Safari Technology</h3>
</div>
</div>
<p class="text-orange-800">JaeTravel Expeditions introduced East Africa's first fully wheelchair-accessible safari vehicles in 2018. Our continuous innovation in adaptive vehicle technology ensures that we maintain the highest standards of accessibility, safety, and comfort for all our clients experiencing the Maasai Mara Great Migration.</p>
</div>

<div class="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200">
<div class="flex items-center gap-4 mb-4">
<div class="bg-amber-100 p-3 rounded-full">
<Users className="h-8 w-8 text-amber-600" />
</div>
<div>
<h3 class="text-xl font-bold text-amber-900">720+ Wheelchair Users Served</h3>
</div>
</div>
<p class="text-amber-800">Since our founding, JaeTravel Expeditions has successfully hosted over 720 wheelchair users on life-changing safari experiences. Our proven track record and extensive experience with various mobility conditions make us the most trusted name in accessible Kenya travel and disability-friendly African safaris.</p>
</div>

<div class="bg-gradient-to-br from-orange-50 to-amber-100 p-6 rounded-2xl border border-orange-300">
<div class="flex items-center gap-4 mb-4">
<div class="bg-orange-200 p-3 rounded-full">
<Shield className="h-8 w-8 text-orange-700" />
</div>
<div>
<h3 class="text-xl font-bold text-orange-900">Comprehensive Medical Safety Systems</h3>
</div>
</div>
<p class="text-orange-800">JaeTravel Expeditions vehicles feature advanced medical support systems including 3kW pure sine wave inverters for medical equipment, 45L medical refrigerators, and hospital-grade HEPA filtration. Our commitment to health and safety is unmatched in the accessible travel industry.</p>
</div>

<div class="bg-gradient-to-br from-amber-100 to-orange-100 p-6 rounded-2xl border border-amber-300">
<div class="flex items-center gap-4 mb-4">
<div class="bg-amber-200 p-3 rounded-full">
<Heart className="h-8 w-8 text-amber-700" />
</div>
<div>
<h3 class="text-xl font-bold text-amber-900">100-Hour Specialist Training</h3>
</div>
</div>
<p class="text-amber-800">Every JaeTravel Expeditions guide completes our intensive 100-hour disability specialist training program. This comprehensive education covers wheelchair securement, emergency procedures, inclusive guiding techniques, and medical response in remote wilderness settings.</p>
</div>
</div>

<div class="bg-gradient-to-br from-orange-100 to-amber-200 p-6 rounded-2xl border border-orange-400 my-8">
<h3 class="text-2xl font-bold text-orange-900 mb-4 text-center">JaeTravel Expeditions: More Than a Safari - A Movement</h3>
<p class="text-orange-800 text-center">We're not just providing accessible safaris; we're championing a movement toward inclusive travel in Africa. JaeTravel Expeditions actively advocates for improved accessibility standards across the tourism industry, shares our engineering innovations with other operators, and works with local communities to create lasting positive change. When you choose JaeTravel Expeditions, you're supporting a vision of Africa where everyone can experience its wonders, regardless of mobility challenges.</p>
</div>`
  },
  {
    h2: "Accessible Accommodation Partners of JaeTravel Expeditions",
    content: `JaeTravel Expeditions has carefully selected and partnered with the finest accessible accommodation providers throughout the Maasai Mara region. Our network of disability-friendly lodges and camps ensures seamless accessibility from arrival to departure:

<div class="bg-white border border-orange-200 rounded-2xl p-6 my-6 shadow-sm">
<h3 class="text-2xl font-bold text-orange-800 mb-4">Mara Serena Safari Lodge - Premier Accessible Accommodation</h3>
<p class="text-gray-700 mb-4">JaeTravel Expeditions' flagship partner featuring fully accessible rooms with roll-in showers, widened doorways, and accessible common areas. Located strategically near prime river crossing points, the Mara Serena offers:</p>
<ul class="grid md:grid-cols-2 gap-3 text-gray-700">
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-orange-600" /> Roll-in showers with grab bars</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-orange-600" /> Lowered beds and furniture</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-orange-600" /> Accessible dining areas</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-orange-600" /> Ramped pathways throughout</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-orange-600" /> 24-hour medical support</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-orange-600" /> Accessible swimming pool</li>
</ul>
</div>

<div class="bg-white border border-amber-200 rounded-2xl p-6 my-6 shadow-sm">
<h3 class="text-2xl font-bold text-amber-800 mb-4">Fig Tree Camp - Authentic Accessible Experience</h3>
<p class="text-gray-700 mb-4">For travelers seeking a more intimate safari experience, JaeTravel Expeditions partners with Fig Tree Camp featuring specially adapted tented accommodations that maintain authentic safari charm while providing full accessibility:</p>
<ul class="grid md:grid-cols-2 gap-3 text-gray-700">
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-amber-600" /> Adapted tented suites with wooden floors</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-amber-600" /> Accessible en-suite bathrooms</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-amber-600" /> Raised viewing platforms</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-amber-600" /> Accessible dining mess tent</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-amber-600" /> Camp-wide accessible pathways</li>
<li class="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-amber-600" /> Emergency power for medical devices</li>
</ul>
</div>

<div class="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-300 my-6">
<h3 class="text-xl font-bold text-orange-900 mb-3">JaeTravel Expeditions Accessibility Guarantee</h3>
<p class="text-orange-800">Every accommodation partner in our network undergoes rigorous accessibility auditing by JaeTravel Expeditions' accessibility team. We personally verify each property to ensure they meet our strict standards for wheelchair accessibility, safety, and comfort. Our commitment extends beyond basic compliance to create truly welcoming and barrier-free environments for all our guests experiencing the Great Migration with JaeTravel Expeditions.</p>
</div>`
  }
]

export default function MaasaiMaraGreatMigrationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <header className="text-center mb-24">
          <div className="mb-8 flex justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-3 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Star className="h-5 w-5" /> JaeTravel Expeditions: #1 Accessible Safari
            </div>
            <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 px-6 py-3 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Award className="h-5 w-5" /> 720+ Wheelchair Users Served
            </div>
            <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Shield className="h-5 w-5" /> Kenya's Accessible Safari Specialist
            </div>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-10 bg-gradient-to-br from-orange-800 via-amber-700 to-orange-600 bg-clip-text text-transparent">
            Maasai Mara Great Migration<br />
            <span className="bg-gradient-to-br from-amber-600 to-orange-700 bg-clip-text text-transparent">2026 with JaeTravel Expeditions</span>
          </h1>

          <p className="mx-auto max-w-6xl text-xl md:text-3xl text-gray-600 mb-12 leading-relaxed font-light">
            Experience the spectacular 2026 Great Migration with JaeTravel Expeditions - Kenya's premier wheelchair-accessible safari operator. Witness record herd sizes from our custom-engineered adaptive vehicles with hydraulic lifts and disability-specialist guides.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Button asChild size="lg" className="text-xl px-12 py-8 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <Link href="/tours/masai-mara-luxury-safari" className="flex items-center">
                <Calendar className="mr-3 h-7 w-7" /> Book JaeTravel Luxury Safari
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-xl px-12 py-8 border-2 border-orange-300 hover:border-orange-500 hover:bg-orange-50 text-orange-700 hover:text-orange-800 transition-all duration-300 transform hover:scale-105">
              <Link href="/booking/masai-mara-safari-adventure" className="flex items-center">
                <Zap className="mr-3 h-7 w-7" /> View JaeTravel Budget Tours
              </Link>
            </Button>
          </div>
        </header>

        {sections.map((section, index) => (
          <section key={index} className="mb-32 scroll-mt-32">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-12 text-balance bg-gradient-to-br from-orange-800 to-amber-700 bg-clip-text text-transparent">
              {section.h2}
            </h2>
            <div className="prose prose-lg max-w-none text-lg leading-relaxed text-gray-700 space-y-6">
              {section.content.split("\n").map((paragraph, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>
          </section>
        ))}

        <GreatMigrationVehicleCard />

        <section className="my-40">
          <h2 className="text-center font-serif text-5xl md:text-7xl font-bold mb-20 bg-gradient-to-br from-orange-800 via-amber-700 to-orange-600 bg-clip-text text-transparent">
            Choose Your 2026 JaeTravel Expeditions Safari Experience
          </h2>
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            <div className="border-2 border-orange-200 rounded-3xl p-12 hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 transform hover:-translate-y-2">
              <h3 className="text-4xl font-bold mb-8 bg-gradient-to-br from-orange-800 to-amber-700 bg-clip-text text-transparent">JaeTravel Luxury Accessible Migration Safari</h3>
              <ul className="space-y-6 text-lg mb-10">
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">7–12 day private accessible JaeTravel safari with personalized itinerary</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Multiple river crossings daily with JaeTravel's guaranteed optimal positioning</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Luxury accessible lodges & camps with JaeTravel-vetted roll-in showers</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Private JaeTravel accessible Land Cruiser with hydraulic lift and medical facilities</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Dedicated JaeTravel disability-specialist guide and driver team</span>
                </li>
              </ul>
              <Button asChild size="lg" className="w-full text-xl py-8 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
                <Link href="/tours/masai-mara-luxury-safari">View JaeTravel Full Itinerary & Book 2026</Link>
              </Button>
            </div>

            <div className="border-2 border-amber-200 rounded-3xl p-12 hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transform hover:-translate-y-2">
              <h3 className="text-4xl font-bold mb-8 bg-gradient-to-br from-amber-800 to-orange-700 bg-clip-text text-transparent">JaeTravel Safari Adventure (Accessible Group Tour)</h3>
              <ul className="space-y-6 text-lg mb-10">
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">5–9 day JaeTravel group safari with fixed departure dates</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Same JaeTravel accessible vehicles & expert disability-trained guides</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Comfortable JaeTravel-vetted accessible camps with adapted facilities</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Maximum 6 guests per JaeTravel vehicle ensuring personal attention</span>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Cost-effective JaeTravel option with full accessibility features</span>
                </li>
              </ul>
              <Button asChild size="lg" className="w-full text-xl py-8 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
                <Link href="/booking/masai-mara-safari-adventure">Check JaeTravel 2026 Dates & Availability</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-16 text-center text-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
          <h2 className="text-5xl md:text-7xl font-bold mb-10 leading-tight">
            Only 18 JaeTravel Expeditions Vehicles Available<br />
            <span className="text-amber-200">for 2026 Peak Migration Season</span>
          </h2>
          <p className="text-2xl mb-12 max-w-5xl mx-auto opacity-95 leading-relaxed font-light">
            JaeTravel Expeditions' custom-engineered wheelchair-accessible Land Cruisers are in extremely high demand for the predicted record-breaking 2026 migration season. Early booking is essential to guarantee your place at the greatest wildlife spectacle on Earth with Kenya's premier accessible safari operator.
          </p>
          <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-amber-50 text-2xl px-16 py-10 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 font-bold">
            <Link href="/tours/masai-mara-luxury-safari">Secure Your 2026 JaeTravel Safari Now</Link>
          </Button>
        </section>
      </div>
    </>
  )
}