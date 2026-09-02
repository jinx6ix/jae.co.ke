// app/vehicle-hire/toyota-prado/PradoSpecs.tsx
'use client'

import { useState } from "react"

export default function PradoSpecs() {
  const [activeTab, setActiveTab] = useState<"specs" | "included">("specs")

  return (
    <section className="mb-16">
      <h2 className="mb-8 text-center font-serif text-4xl font-bold">
        Toyota Prado Technical Specifications
      </h2>
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("specs")}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              activeTab === "specs" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab("included")}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              activeTab === "included" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
            }`}
          >
            What's Included
          </button>
        </div>
        <div className="p-6">
          {activeTab === "specs" ? (
            <table className="w-full">
              <tbody>
                <tr className="border-b"><td className="p-3 font-semibold bg-muted/50">Engine</td><td className="p-3">3.0L Turbo Diesel</td></tr>
                <tr className="border-b"><td className="p-3 font-semibold bg-muted/50">Transmission</td><td className="p-3">Automatic 4x4</td></tr>
                <tr className="border-b"><td className="p-3 font-semibold bg-muted/50">Seating</td><td className="p-3">5 Adults</td></tr>
                <tr className="border-b"><td className="p-3 font-semibold bg-muted/50">Roof</td><td className="p-3">Pop-Up Safari Roof</td></tr>
                <tr className="border-b"><td className="p-3 font-semibold bg-muted/50">Fuel Tank</td><td className="p-3">87L + 87L (Dual)</td></tr>
                <tr><td className="p-3 font-semibold bg-muted/50">Clearance</td><td className="p-3">220 mm</td></tr>
              </tbody>
            </table>
          ) : (
            <ul className="space-y-3">
              <li className="flex items-center gap-2"><span className="text-green-500">Check</span> GPS Navigation</li>
              <li className="flex items-center gap-2"><span className="text-green-500">Check</span> Cooler Box</li>
              <li className="flex items-center gap-2"><span className="text-green-500">Check</span> First Aid Kit</li>
              <li className="flex items-center gap-2"><span className="text-green-500">Check</span> Spare Tire & Tools</li>
              <li className="flex items-center gap-2"><span className="text-green-500">Check</span> 24/7 Roadside Support</li>
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}