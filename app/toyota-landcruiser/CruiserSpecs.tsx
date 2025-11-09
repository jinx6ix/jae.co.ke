// app/vehicle-hire/toyota-landcruiser/CruiserSpecs.tsx
'use client'

const specs = [
  { label: "Model", value: "Toyota Land Cruiser (78 Series)" },
  { label: "Transmission", value: "Automatic / Manual" },
  { label: "Fuel Type", value: "Diesel" },
  { label: "Seating Capacity", value: "7 Passengers" },
  { label: "Drive Type", value: "4WD" },
  { label: "Roof", value: "Pop-Up Safari Roof" },
  { label: "Fuel Tank", value: "180L (Dual Tank)" },
  { label: "Daily Rate", value: "From $120/day" },
]

export default function CruiserSpecs() {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-center font-serif text-4xl font-bold">
        Vehicle Specifications
      </h2>
      <div className="overflow-hidden rounded-xl border bg-card">
        <table className="w-full text-sm">
          <tbody>
            {specs.map((spec, i) => (
              <tr
                key={i}
                className={`border-b last:border-none ${i % 2 === 0 ? "bg-muted/30" : "bg-background"}`}
              >
                <td className="px-4 py-3 font-medium">{spec.label}</td>
                <td className="px-4 py-3 text-muted-foreground">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}