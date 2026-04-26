// app/zh/contact/page.tsx
import type { Metadata } from "next"
import { buildHreflangAlternates, BASE_URL } from "@/lib/i18n/config"

export const metadata: Metadata = {
  title: "联系我们 | JaeTravel",
  description: "联系捷旅团队规划您的梦想野生动物园。我们在24小时内回复。",
  alternates: { canonical: `${BASE_URL}/zh/contact`, languages: buildHreflangAlternates("/contact") },
  openGraph: { title: "联系我们 | JaeTravel", url: `${BASE_URL}/zh/contact`, locale: "zh_CN", type: "website", images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "联系我们" }] },
}

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16" dir="ltr">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">联系我们</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">联系捷旅团队规划您的梦想野生动物园。我们在24小时内回复。</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="block text-sm font-medium text-gray-700 mb-2">您的姓名</label><input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">电子邮件地址</label><input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">电话（可选）</label><input type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">留言</label><textarea rows={5} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 resize-none" /></div>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors">发送消息</button>
        </div>
        <div className="space-y-8">
          <p className="text-lg font-semibold text-gray-700">或直接联系我们</p>
          <div className="space-y-4">
            <a href="https://wa.me/254726485228" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors">
              <span className="text-2xl">💬</span>
              <div><p className="font-bold text-green-800">💬 WhatsApp</p><p className="text-green-600">+254 726 485 228</p></div>
            </a>
            <a href="mailto:info@jaetravel.co.ke" className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-colors">
              <span className="text-2xl">✉️</span>
              <div><p className="font-bold text-orange-800">Email</p><p className="text-orange-600">info@jaetravel.co.ke</p></div>
            </a>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="font-bold mb-4">JaeTravel Expeditions</h3>
            <p className="text-gray-600 text-sm">Nairobi, Kenya</p>
            <p className="text-gray-600 text-sm mt-1">Mon-Sun: 07:00 - 20:00 EAT</p>
          </div>
        </div>
      </div>
    </div>
  )
}
