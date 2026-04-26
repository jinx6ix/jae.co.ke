// app/ar/contact/ContactPageClient.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/ar/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "فشل في إرسال الرسالة");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Contact form error:", err);
      setError(err.message || "حدث خطأ ما. الرجاء المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16" dir="rtl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
            <CheckCircle className="h-10 w-10 text-orange-600" />
          </div>
          <h1 className="mb-4 font-serif text-4xl font-bold text-orange-800">
            تم إرسال الرسالة!
          </h1>
          <p className="mb-8 text-lg text-orange-700">
            شكرًا لك، <strong>{formData.name}</strong>! لقد تلقينا استفسارك وسنرد خلال <strong>24 ساعة</strong>.
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="border-orange-600 text-orange-600 hover:bg-orange-50"
          >
            إرسال رسالة أخرى
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16" dir="rtl">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold text-balance">
          تواصل معنا
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
          هل أنت مستعد لبدء التخطيط لرحلتك في شرق أفريقيا؟ فريقنا هنا لمساعدتك.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* نموذج الاتصال */}
        <div className="lg:col-span-2">
          <Card className="border-orange-200">
            <CardContent className="p-8">
              <h2 className="mb-6 font-serif text-2xl font-bold text-orange-800">
                أرسل لنا رسالة
              </h2>

              {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name" className="text-orange-800">الاسم الكامل *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-2 border-orange-300 focus:border-orange-500"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-orange-800">البريد الإلكتروني *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-2 border-orange-300 focus:border-orange-500"
                      placeholder="example@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="phone" className="text-orange-800">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-2 border-orange-300 focus:border-orange-500"
                      placeholder="+254 XXX XXX XXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-orange-800">الوجهة المهتم بها</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => setFormData({ ...formData, country: value })}
                    >
                      <SelectTrigger className="mt-2 border-orange-300">
                        <SelectValue placeholder="اختر الوجهة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kenya">سفاري في كينيا</SelectItem>
                        <SelectItem value="tanzania">سفاري في تنزانيا</SelectItem>
                        <SelectItem value="rwanda">تتبع الغوريلا في رواندا</SelectItem>
                        <SelectItem value="uganda">سفاري في أوغندا</SelectItem>
                        <SelectItem value="accessible">جولات ميسرة لذوي الإعاقة</SelectItem>
                        <SelectItem value="vehicle">تأجير سيارات سفاري</SelectItem>
                        <SelectItem value="custom">جولة مخصصة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-orange-800">رسالتك *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="mt-2 border-orange-300 focus:border-orange-500"
                    placeholder="أخبرنا عن رحلة أحلامك، حجم المجموعة، تواريخ السفر، أو أي متطلبات خاصة..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* معلومات الاتصال الجانبية */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-semibold">معلومات الاتصال</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 text-orange-600" />
                  <div>
                    <p className="font-medium">المكتب</p>
                    <p className="text-sm text-muted-foreground">نيروبي، كينيا</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 mt-0.5 text-orange-600" />
                  <div>
                    <p className="font-medium">الهاتف / واتساب</p>
                    <a href="tel:+254726485228" className="text-sm text-muted-foreground hover:text-orange-600">
                      +254 726 485 228
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 mt-0.5 text-orange-600" />
                  <div>
                    <p className="font-medium">البريد الإلكتروني</p>
                    <a href="mailto:info@jaetravel.co.ke" className="text-sm text-muted-foreground hover:text-orange-600">
                      info@jaetravel.co.ke
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 mt-0.5 text-orange-600" />
                  <div>
                    <p className="font-medium">ساعات العمل</p>
                    <p className="text-sm text-muted-foreground">الاثنين–الجمعة: 8:00 صباحًا – 6:00 مساءً (توقيت شرق أفريقيا)</p>
                    <p className="text-sm text-muted-foreground">السبت: 9:00 صباحًا – 2:00 مساءً (توقيت شرق أفريقيا)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#25D366]/10 border-green-200">
            <CardContent className="p-6">
              <h3 className="mb-3 font-semibold">دردشة سريعة عبر واتساب</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                احصل على إجابات فورية من متخصصي السفاري لدينا.
              </p>
              <Button asChild className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white">
                <a href="https://wa.me/+254726485228" target="_blank" rel="noopener noreferrer">
                  راسلنا على واتساب
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}