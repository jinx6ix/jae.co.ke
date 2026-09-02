import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Compass, Home, MapPin } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-white px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Safari Compass Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse bg-orange-200 rounded-full blur-xl opacity-50"></div>
            <Compass className="w-24 h-24 text-orange-600 relative animate-spin-slow" />
          </div>
        </div>

        {/* 404 Error */}
        <h1 className="text-8xl font-bold text-orange-600 mb-4 font-serif">
          404
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 font-serif">
          Safari Trail Lost
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Oops! It seems this page has wandered off into the savanna. 
          Even the best safari guides sometimes lose the trail.
        </p>

        {/* Suggested Destinations */}
        <div className="grid md:grid-cols-3 gap-4 mb-8 text-left">
          <Link 
            href="/tours" 
            className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100"
          >
            <MapPin className="w-5 h-5 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900">Safari Tours</h3>
            <p className="text-sm text-gray-500">Explore our adventures</p>
          </Link>
          
          <Link 
            href="/destinations" 
            className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100"
          >
            <MapPin className="w-5 h-5 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900">Destinations</h3>
            <p className="text-sm text-gray-500">Kenya, Tanzania, Rwanda</p>
          </Link>
          
          <Link 
            href="/contact" 
            className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100"
          >
            <MapPin className="w-5 h-5 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900">Contact Us</h3>
            <p className="text-sm text-gray-500">Plan your safari</p>
          </Link>
        </div>

        {/* Home Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Return to Base Camp
            </Link>
          </Button>
          
          <Button asChild size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
            <Link href="/tours/popular">
              <Compass className="mr-2 h-5 w-5" />
              Popular Safaris
            </Link>
          </Button>
        </div>

        {/* Safari Quote */}
        <p className="mt-12 text-sm text-gray-500 italic">
          "Not all who wander are lost — but this page definitely is."
        </p>
      </div>
    </div>
  )
}