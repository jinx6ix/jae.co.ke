"use client"

import React, { useState, useEffect, useRef, useMemo } from "react"
import { parsePhoneNumberFromString, isValidPhoneNumber, AsYouType, getCountryCallingCode } from "libphonenumber-js"
import { Check, ChevronDown, Search, Phone, AlertCircle } from "lucide-react"

// Comprehensive country list with flags, names, ISO codes, and calling codes
export interface CountryOption {
  code: string // ISO 2-letter code e.g. "KE"
  name: string
  dialCode: string // e.g. "+254"
  flag: string // Emoji flag
}

const COUNTRIES: CountryOption[] = [
  { code: "KE", name: "Kenya", dialCode: "+254", flag: "🇰🇪" },
  { code: "UG", name: "Uganda", dialCode: "+256", flag: "🇺🇬" },
  { code: "TZ", name: "Tanzania", dialCode: "+255", flag: "🇹🇿" },
  { code: "RW", name: "Rwanda", dialCode: "+250", flag: "🇷🇼" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
  { code: "GH", name: "Ghana", dialCode: "+233", flag: "🇬🇭" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭" },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
  { code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰" },
  { code: "FI", name: "Finland", dialCode: "+358", flag: "🇫🇮" },
  { code: "BE", name: "Belgium", dialCode: "+32", flag: "🇧🇪" },
  { code: "AT", name: "Austria", dialCode: "+43", flag: "🇦🇹" },
  { code: "IE", name: "Ireland", dialCode: "+353", flag: "🇮🇪" },
  { code: "NZ", name: "New Zealand", dialCode: "+64", flag: "🇳🇿" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
  { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳" },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
  { code: "PK", name: "Pakistan", dialCode: "+92", flag: "🇵🇰" },
  { code: "BD", name: "Bangladesh", dialCode: "+880", flag: "🇧🇩" },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
  { code: "MA", name: "Morocco", dialCode: "+212", flag: "🇲🇦" },
  { code: "ET", name: "Ethiopia", dialCode: "+251", flag: "🇪🇹" },
  { code: "ZM", name: "Zambia", dialCode: "+260", flag: "🇿🇲" },
  { code: "ZW", name: "Zimbabwe", dialCode: "+263", flag: "🇿🇼" },
  { code: "BW", name: "Botswana", dialCode: "+267", flag: "🇧🇼" },
  { code: "NA", name: "Namibia", dialCode: "+264", flag: "🇳🇦" },
  { code: "MU", name: "Mauritius", dialCode: "+230", flag: "🇲🇺" },
  { code: "SC", name: "Seychelles", dialCode: "+248", flag: "🇸🇨" },
]

interface InternationalPhoneInputProps {
  value: string // E.164 or raw number
  onChange: (value: string, isValid: boolean) => void
  defaultCountry?: string // ISO code e.g. "KE"
  required?: boolean
  disabled?: boolean
  placeholder?: string
  className?: string
}

export function InternationalPhoneInput({
  value,
  onChange,
  defaultCountry = "KE",
  required = false,
  disabled = false,
  placeholder = "712 345 678",
  className = "",
}: InternationalPhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(
    () => COUNTRIES.find((c) => c.code === defaultCountry) || COUNTRIES[0]
  )
  const [nationalNumber, setNationalNumber] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Initialize or sync from value prop
  useEffect(() => {
    if (!value) {
      setNationalNumber("")
      return
    }

    // Try parsing as full international number first
    try {
      const parsed = parsePhoneNumberFromString(value)
      if (parsed && parsed.country) {
        const found = COUNTRIES.find((c) => c.code === parsed.country)
        if (found) {
          setSelectedCountry(found)
          setNationalNumber(parsed.nationalNumber)
          return
        }
      }
    } catch {
      // ignore
    }

    // Fallback if value is just national number or starts with dial code
    if (value.startsWith("+")) {
      for (const c of COUNTRIES) {
        if (value.startsWith(c.dialCode)) {
          setSelectedCountry(c)
          setNationalNumber(value.slice(c.dialCode.length).trim())
          return
        }
      }
    }

    setNationalNumber(value)
  }, [value])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50)
    } else {
      setSearchQuery("")
    }
  }, [isOpen])

  // Filter countries for search
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRIES
    const q = searchQuery.toLowerCase().trim()
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.dialCode.includes(q)
    )
  }, [searchQuery])

  // Handle national number input & auto-detection of international pasting/typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value

    // Check if user pasted or typed an international number starting with '+'
    if (raw.startsWith("+")) {
      // Try to match against country dial codes (sort by dialCode length desc to match +1 vs +12, etc.)
      const sortedCountries = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length)
      for (const c of sortedCountries) {
        if (raw.startsWith(c.dialCode)) {
          setSelectedCountry(c)
          raw = raw.slice(c.dialCode.length).trim()
          break
        }
      }
    }

    setNationalNumber(raw)

    // Construct full number for validation and update parent
    const fullNumber = `${selectedCountry.dialCode}${raw.replace(/\D/g, "")}`
    const isValid = isValidPhoneNumber(fullNumber, selectedCountry.code as any)

    // Pass formatted/normalized E.164 if valid or raw full number
    const parsed = parsePhoneNumberFromString(fullNumber, selectedCountry.code as any)
    const output = parsed ? parsed.formatIntl() : fullNumber
    onChange(output, isValid)
  }

  // Handle country selection from dropdown
  const handleSelectCountry = (country: CountryOption) => {
    setSelectedCountry(country)
    setIsOpen(false)

    // Re-evaluate with new country dial code
    const fullNumber = `${country.dialCode}${nationalNumber.replace(/\D/g, "")}`
    const isValid = isValidPhoneNumber(fullNumber, country.code as any)
    const parsed = parsePhoneNumberFromString(fullNumber, country.code as any)
    const output = parsed ? parsed.formatIntl() : fullNumber
    onChange(output, isValid)
  }

  // Validate current state
  const currentFullNumber = `${selectedCountry.dialCode}${nationalNumber.replace(/\D/g, "")}`
  const isValid = nationalNumber ? isValidPhoneNumber(currentFullNumber, selectedCountry.code as any) : !required

  return (
    <div className={`relative flex rounded-md shadow-sm ${className}`} ref={dropdownRef}>
      {/* Country Selector Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex items-center gap-1.5 px-3 py-2.5 rounded-l-md border border-r-0 border-orange-300 bg-orange-50/80 text-sm font-medium text-gray-800 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 transition-colors"
        aria-label="Select country"
      >
        <span className="text-lg leading-none">{selectedCountry.flag}</span>
        <span className="font-mono text-xs">{selectedCountry.dialCode}</span>
        <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
      </button>

      {/* Country Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 w-72 rounded-lg border border-orange-200 bg-white shadow-xl">
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country, code (+254)..."
                className="w-full pl-9 pr-3 py-1.5 text-sm rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto p-1">
            {filteredCountries.length === 0 ? (
              <div className="py-4 text-center text-xs text-gray-500">No country found</div>
            ) : (
              filteredCountries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleSelectCountry(c)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md text-left hover:bg-orange-50 transition-colors ${
                    selectedCountry.code === c.code ? "bg-orange-100 font-semibold text-orange-900" : "text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg leading-none">{c.flag}</span>
                    <span>{c.name}</span>
                  </div>
                  <span className="font-mono text-xs text-gray-500">{c.dialCode}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Phone Number Input */}
      <div className="relative flex-1">
        <input
          type="tel"
          value={nationalNumber}
          onChange={handleInputChange}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full h-11 px-3 py-2.5 rounded-r-md border border-orange-300 bg-white text-sm text-gray-950 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
        />
      </div>
    </div>
  )
}
