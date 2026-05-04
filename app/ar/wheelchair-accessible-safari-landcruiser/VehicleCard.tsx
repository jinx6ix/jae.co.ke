'use client'

import { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Star, Award, MapPin, Users, Shield, Phone, Calendar, Heart, Zap, Car } from "lucide-react"

// بيانات المركبات الشاملة - التركيز على اللاندكروزر (بالعربية)
const vehicles = [
  {
    id: "safari-land-cruiser",
    name: "لاندكروزر سفاري متاحة للكراسي المتحركة – الأفضل في كينيا",
    type: "لاندكروزر سفاري فاخرة",
    capacity: "مستخدم كرسي متحرك + 5 مرافقين (6 أشخاص)",
    features: [
      "نظام رافعة هيدروليكية ألماني (سعة 400 كجم)",
      "أنظمة تثبيط طبية رباعية النقاط من Q'Straint",
      "سقف كامل قابل للرفع - مشاهدة الحياة البرية على مستوى الكرسي المتحرك",
      "فتحات كاميرا على مستوى عين الكرسي المتحرك (95-110 سم)",
      "تويوتا لاندكروزر 4×4 بقفل تفاضلي",
      "تعليق معزز لتضاريس كينيا",
      "محول طاقة 3 كيلوواط للمعدات الطبية",
      "تحكم ثنائي المنطقة بالمناخ مع ترشيح HEPA",
      "إنترنت ستارلينك عبر الأقمار الصناعية للمناطق النائية",
      "ثلاجة طبية مدمجة سعة 45 لترًا",
      "خزان وقود ممتد سعة 180 لترًا لرحلات سفاري طوال اليوم",
      "مرشد سفاري محترف مشمول"
    ],
    description: "أفضل لاندكروزر متاحة للكراسي المتحركة في كينيا مع نظام رافعة هيدروليكية هندسة ألمانية، وأنظمة تثبيط طبية، ومرشدين محترفين مدربين على الإعاقة. جرب ماساي مارا وأمبوسيلي وتسافو في إمكانية وصول كاملة مع لاندكروزر تويوتا المعتمدة لدينا.",
    image: "/WhatsApp Image 2025-09-02 at 11.43.25 AM.jpeg",
    alt: "تويوتا لاندكروزر كينيا متاحة للكراسي المتحركة برافعة هيدروليكية في منتزه ماساي مارا الوطني",
    price: "$195-350/يوم",
    bestFor: ["الهجرة الكبرى في ماساي مارا", "مشاهدة الأفيال في أمبوسيلي", "منتزه تسافو الوطني", "حياة برية سامبورو", "طيور الفلامنغو في بحيرة ناكورو", "رحلات سفاري التصوير الفوتوغرافي"],
    certifications: ["تعديل تويوتا معتمد", "ISO 9001:2015", "تثبيط Q'Straint معتمد", "سفاري كينيا معتمد"],
    stats: {
      usersServed: "2,800+",
      satisfaction: "99.2%",
      experience: "8 سنوات",
      support: "24/7"
    },
    coverage: ["ماساي مارا", "أمبوسيلي", "تسافو", "سامبورو", "بحيرة ناكورو", "محميات خاصة"],
    included: ["مرشد محترف", "جميع رسوم المتنزهات", "طاقة للمعدات الطبية", "إنترنت عبر الأقمار الصناعية", "دعم طوارئ", "معدات سفاري"],
    specifications: {
      vehicle: "تويوتا لاندكروزر V8 4.5L",
      lift: "رافعة هيدروليكية ألمانية 400 كجم",
      viewing: "سقف قابل للرفع ارتفاع الكرسي المتحرك",
      power: "محول طبي 3 كيلوواط",
      fuel: "مدى ممتد 180 لتر",
      communication: "ستارلينك عبر الأقمار الصناعية"
    }
  },
  {
    id: "premium-land-cruiser",
    name: "لاندكروزر فاخرة متاحة – كرسيان متحركان",
    type: "لاندكروزر سفاري فاخرة", 
    capacity: "مستخدمو كرسي متحرك + 4 مرافقين (6 أشخاص)",
    features: [
      "نظامي رافعة هيدروليكية مستقلين",
      "مقاعد جلدية تنفيذية بمساحة إضافية للأرجل",
      "تحكم متقدم بالمناخ بمناطق منفصلة",
      "واي فاي 4G LTE ونظام ترفيه",
      "حمام متاح مع شاشة خصوصية",
      "محطة مرشد محترف مع اتصالات",
      "مركز مشروبات على متن المركبة",
      "رؤية ليلية وكشاف للمشاهدة الليلية",
      "نظام صوت فاخر",
      "إعداد طاولة اجتماعات"
    ],
    description: "لاندكروزر الوحيدة في شرق أفريقيا المتاحة لكرسيين متحركين مع روافع هيدروليكية فردية، ميزات إمكانية وصول فاخرة، وراحة من الدرجة التنفيذية للسفر الجماعي ورحلات السفاري العائلية في جميع أنحاء كينيا.",
    image: "/WhatsApp Image 2025-10-14 at 21.12.12_ac59cc2c.jpg",
    alt: "تويوتا لاندكروزر كينيا متاحة لكرسيين متحركين - مركبة سفاري فاخرة",
    price: "$280-450/يوم", 
    bestFor: ["رحلات سفاري عائلية جماعية", "جولات كينيا الفاخرة", "سفر مؤسسي متاح", "رحلات متعددة الأجيال", "نقل مناسبات خاصة"],
    certifications: ["تويوتا بلاتينيوم معتمد", "سفر فاخر معتمد", "نقل تنفيذي معتمد"],
    stats: {
      usersServed: "1,450+",
      satisfaction: "99.5%", 
      experience: "6 سنوات",
      support: "24/7"
    },
    coverage: ["محميات خاصة", "نزل فاخرة", "مطارات تنفيذية", "مناطق أعمال"],
    included: ["فريق سائقين مزدوج", "وسائل راحة فاخرة", "تأمين فاخر", "خدمة كونسيرج"],
    specifications: {
      vehicle: "تويوتا لاندكروزر فاخرة",
      lift: "رافعة هيدروليكية مزدوجة 300 كجم لكل منها",
      viewing: "سقف قابل للرفع ممتد",
      power: "محول طبي 4 كيلوواط",
      fuel: "مدى ممتد 200 لتر", 
      communication: "نظام أقمار صناعية مزدوج"
    }
  }
]

type Vehicle = typeof vehicles[0]

export default function VehicleCard() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'جميع المركبات', count: vehicles.length },
    { id: 'land-cruiser', name: 'لاندكروزر', count: vehicles.filter(v => v.type.includes('لاندكروزر')).length },
    { id: 'safari', name: 'مركبات سفاري', count: vehicles.filter(v => v.type.includes('سفاري')).length },
    { id: 'premium', name: 'فاخرة', count: vehicles.filter(v => v.type.includes('فاخرة')).length }
  ]

  const filteredVehicles = selectedCategory === 'all' 
    ? vehicles 
    : vehicles.filter(vehicle => vehicle.type.toLowerCase().includes(selectedCategory === 'land-cruiser' ? 'لاندكروزر' : selectedCategory === 'safari' ? 'سفاري' : 'فاخرة'))

  return (
    <section className="mb-20" dir="rtl">
      {/* فلتر الفئات */}
      <div className="mb-12">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-8">أسطول لاندكروزر المتاحة للكراسي المتحركة لدينا</h2>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full border transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-white border-gray-200 hover:border-primary'
              }`}
            >
              <span className="font-semibold">{category.name}</span>
              <span className="mr-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* شبكة المركبات */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {filteredVehicles.map(vehicle => (
          <div key={vehicle.id} className="group overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-2xl">
            <div className="relative aspect-[16/10]">
              <Image
                src={vehicle.image}
                alt={vehicle.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform group-hover:scale-110 duration-700"
                priority={vehicle.id === "safari-land-cruiser"}
              />
              
              {/* شارات */}
              <div className="absolute left-4 top-4 rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white">
                {vehicle.type}
              </div>
              <div className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1 text-sm font-bold backdrop-blur-sm">
                {vehicle.price}
              </div>
              
              {/* الشهادات */}
              {vehicle.certifications && (
                <div className="absolute bottom-4 left-4 flex gap-1">
                  {vehicle.certifications.slice(0, 2).map((cert, index) => (
                    <div key={index} className="flex items-center gap-1 bg-black/70 rounded-full px-2 py-1">
                      <Award className="h-3 w-3 text-yellow-400" />
                      <span className="text-xs text-white">{cert.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* شارة تويوتا */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                تويوتا لاندكروزر
              </div>
            </div>

            <div className="p-6">
              {/* العنوان */}
              <h3 className="mb-2 text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                {vehicle.name}
              </h3>
              <p className="mb-3 text-sm text-muted-foreground font-semibold flex items-center gap-2">
                <Users className="h-4 w-4" />
                {vehicle.capacity}
              </p>
              
              <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                {vehicle.description}
              </p>

              {/* المواصفات */}
              {vehicle.specifications && (
                <div className="mb-4 grid grid-cols-2 gap-3 rounded-lg bg-primary/5 p-4">
                  {Object.entries(vehicle.specifications).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-sm font-bold text-primary">{value}</div>
                      <div className="text-xs text-muted-foreground">
                        {key === 'vehicle' ? 'المركبة' :
                         key === 'lift' ? 'الرافعة' :
                         key === 'viewing' ? 'المشاهدة' :
                         key === 'power' ? 'الطاقة' :
                         key === 'fuel' ? 'الوقود' :
                         key === 'communication' ? 'الاتصالات' : key}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* الإحصائيات */}
              {vehicle.stats && (
                <div className="mb-4 grid grid-cols-2 gap-3 rounded-lg bg-blue-50 p-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{vehicle.stats.usersServed}</div>
                    <div className="text-xs text-muted-foreground">مستخدم تم خدمته</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{vehicle.stats.satisfaction}</div>
                    <div className="text-xs text-muted-foreground">رضا</div>
                  </div>
                </div>
              )}

              {/* مناطق التغطية */}
              {vehicle.coverage && (
                <div className="mb-4">
                  <h4 className="mb-2 font-semibold text-sm flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    تغطية سفاري كينيا:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.coverage.slice(0, 4).map((area, i) => (
                      <span key={i} className="rounded-full bg-blue-50 text-blue-700 px-2 py-1 text-xs">
                        {area}
                      </span>
                    ))}
                    {vehicle.coverage.length > 4 && (
                      <span className="rounded-full bg-gray-100 text-gray-600 px-2 py-1 text-xs">
                        +{vehicle.coverage.length - 4} أكثر
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* مثالي لـ */}
              <div className="mb-4">
                <h4 className="mb-2 font-semibold text-sm flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  مثالي لـ كينيا:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {vehicle.bestFor.map((use, i) => (
                    <span key={i} className="rounded-full bg-secondary px-2 py-1 text-xs">
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              {/* الميزات الرئيسية */}
              <div className="mb-6">
                <h4 className="mb-3 font-semibold text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-500" />
                  ميزات اللاندكروزر:
                </h4>
                <ul className="space-y-2">
                  {vehicle.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {vehicle.features.length > 4 && (
                    <li className="text-sm text-muted-foreground">
                      +{vehicle.features.length - 4} ميزات إضافية للاندكروزر...
                    </li>
                  )}
                </ul>
              </div>

              {/* الخدمات المشمولة */}
              {vehicle.included && (
                <div className="mb-6 p-3 bg-green-50 rounded-lg">
                  <h4 className="mb-2 font-semibold text-sm text-green-800">مشمل في كينيا:</h4>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.included.map((service, i) => (
                      <span key={i} className="rounded-full bg-green-100 text-green-800 px-2 py-1 text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* أزرار الحث على الإجراء */}
              <div className="flex gap-3">
                <Button asChild className="flex-1 bg-green-600 hover:bg-green-700">
                  <Link href={`/ar/vehicles/${vehicle.id}`} className="flex items-center justify-center">
                    <Car className="ml-2 h-4 w-4" />
                    عرض تفاصيل اللاندكروزر
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/ar/book-now?vehicle=${vehicle.id}`} className="flex items-center">
                    <Phone className="ml-2 h-4 w-4" />
                    احجز الآن
                  </Link>
                </Button>
              </div>

              {/* شارة الثقة */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <span>تويوتا لاندكروزر معتمدة</span>
                <Heart className="h-3 w-3 mr-2" />
                <span>{vehicle.stats?.satisfaction} رضا</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* لا توجد نتائج */}
      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🚗</div>
          <h3 className="text-xl font-bold mb-2">لم يتم العثور على لاندكروزر</h3>
          <p className="text-muted-foreground">جرب اختيار فئة مختلفة أو اتصل بنا للحصول على حلول لاندكروزر مخصصة</p>
        </div>
      )}
    </section>
  )
}