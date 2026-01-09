'use client'

import { useState } from "react"

export default function PradoSpecs() {
  const [activeTab, setActiveTab] = useState<"specs" | "included">("specs")

  return (
    <section className="mb-16">
      <h2 className="mb-8 text-center font-serif text-4xl font-bold">
        Spécifications Techniques Toyota Prado
      </h2>
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("specs")}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              activeTab === "specs" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
            }`}
          >
            Spécifications
          </button>
          <button
            onClick={() => setActiveTab("included")}
            className={`flex-1 px-6 py-3 font-medium transition-colors ${
              activeTab === "included" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
            }`}
          >
            Inclus dans la Location
          </button>
        </div>
        <div className="p-6">
          {activeTab === "specs" ? (
            <table className="w-full">
              <tbody>
                <tr className="border-b"><td className="p-3 font-semibold bg-muted/50">Moteur</td><td className="p-3">3.0L Turbo Diesel</td></tr>
                <tr className="border-b"><td className="p-3 font-semibold bg-muted/50">Transmission</td><td className="p-3">Automatique 4x4</td></tr>
                <tr className="border-b"><td className="p-3 font-semibold bg-muted/50">Places</td><td className="p-3">5 Adultes</td></tr>
                <tr className="border-b"><td className="p-3 font-semibold bg-muted/50">Toit</td><td className="p-3">Toit Pop-Up Safari</td></tr>
                <tr className="border-b"><td className="p-3 font-semibold bg-muted/50">Réservoirs</td><td className="p-3">87L + 87L (Double)</td></tr>
                <tr><td className="p-3 font-semibold bg-muted/50">Garde au sol</td><td className="p-3">220 mm</td></tr>
              </tbody>
            </table>
          ) : (
            <ul className="space-y-3">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Navigation GPS</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Glacière</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Trousse de premiers secours</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Roue de secours & outils</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Assistance routière 24/7</li>
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}