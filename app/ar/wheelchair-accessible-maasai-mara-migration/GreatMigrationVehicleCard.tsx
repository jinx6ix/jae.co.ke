import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, Shield, Zap, Camera, Users, Globe } from "lucide-react"

export default function GreatMigrationVehicleCard() {
  return (
    <section className="my-40 py-20 bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-serif text-5xl md:text-6xl font-bold mb-20">
          المركبة الوحيدة المتاحة للكراسي المتحركة لرحلة الهجرة الكبرى في كينيا
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div className="order-2 lg:order-1">
            <Image
              src="/WhatsApp Image 2025-09-02 at 11.43.25 AM.jpeg"
              alt="سيارة لاندكروزر 4x4 متاحة للكراسي المتحركة برافعة هيدروليكية وسقف قابل للرفع عند معبر نهر مارا خلال الهجرة الكبرى"
              width={800}
              height={600}
              className="rounded-3xl shadow-2xl object-cover"
              priority
            />
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="text-4xl font-bold mb-8">تويوتا لاندكروزر مخصصة – صُممت خصيصًا لمعابر النهر 2026</h3>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              صُممت من الصفر لمستخدمي الكراسي المتحركة لتجربة كل لحظة دراماتيكية من الهجرة الكبرى في ماساي مارا – بما في ذلك معابر نهر مارا المتعددة يوميًا – دون مغادرة كرسيك المتحرك أبدًا.
            </p>

            <ul className="space-y-6 mb-12">
              <li className="flex items-start gap-4 text-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
                <span><strong>رافعة هيدروليكية ألمانية جانبية</strong> – سعة 400 كجم، تعمل على ضفاف الأنهار شديدة الانحدار</span>
              </li>
              <li className="flex items-start gap-4 text-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
                <span><strong>سقف كامل قابل للرفع</strong> – ابق جالسًا لمشاهدة الحياة البرية بزاوية 360 درجة دون عوائق</span>
              </li>
              <li className="flex items-start gap-4 text-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
                <span><strong>فتحات كاميرا على مستوى عين الكرسي المتحرك</strong> (95-110 سم) لتصوير مثالي</span>
              </li>
              <li className="flex items-start gap-4 text-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
                <span><strong>أنظمة تثبيط Q'Straint طبية المستوى</strong> – مختبرة لصدمات 20 جي</span>
              </li>
              <li className="flex items-start gap-4 text-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
                <span><strong>محول طاقة 3 كيلوواط + ثلاجة طبية 45 لترًا</strong> – تشغل أجهزة التنفس الصناعي وتحافظ على برودة الأدوية</span>
              </li>
              <li className="flex items-start gap-4 text-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
                <span><strong>إنترنت ستارلينك عبر الأقمار الصناعية</strong> – ابق متصلاً في مواقع مارا النائية</span>
              </li>
            </ul>

            <Button asChild size="lg" className="w-full text-xl py-8 bg-green-600 hover:bg-green-700">
              <Link href="/ar/tours/masai-mara-luxury-safari">
                <Calendar className="mr-3 h-7 w-7" />
                احجز هذه المركبة للهجرة الكبرى 2026
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}