"use client"

import { useState, useCallback, useRef, useEffect } from 'react'
import { ChevronDown, Search, X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { allCountries, searchCountries, getCountryById, type Country } from '@/lib/countries'
import { getAllStates, getLgasByStateId, type State, type LocalGovernmentArea } from '@/lib/nigeria-locations'

interface SearchableSelectProps {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  label?: string
  required?: boolean
  disabled?: boolean
  searchable?: boolean
}

export function SearchableSelect({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  label,
  required = false,
  disabled = false,
  searchable = true,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredOptions = searchable && searchQuery
    ? options.filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options

  const selectedOption = options.find(opt => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
    setSearchQuery('')
  }

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          setIsOpen(!isOpen)
          if (!isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100)
          }
        }}
        className={cn(
          "w-full flex items-center justify-between h-10 px-3 py-2 text-sm rounded-md border border-input bg-background",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          disabled && "opacity-50 cursor-not-allowed",
          !selectedOption && "text-muted-foreground"
        )}
      >
        <span className={cn(!selectedOption && "text-muted-foreground")}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-md border shadow-lg">
          {searchable && (
            <div className="p-2 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full h-8 pl-9 pr-3 text-sm rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
          
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-sm text-center text-gray-500">No results found</div>
            ) : (
              filteredOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-gray-100",
                    option.value === value && "bg-blue-50"
                  )}
                >
                  <span>{option.label}</span>
                  {option.value === value && <Check className="h-4 w-4 text-blue-600" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Country selector with Nigerian state and LGA cascade
interface CountrySelectorProps {
  countryValue: string
  stateValue: string
  lgaValue: string
  onCountryChange: (value: string) => void
  onStateChange: (value: string) => void
  onLgaChange: (value: string) => void
  required?: boolean
}

export function CountryStateLGA({
  countryValue,
  stateValue,
  lgaValue,
  onCountryChange,
  onStateChange,
  onLgaChange,
  required = true,
}: CountrySelectorProps) {
  const isNigeria = countryValue === 'ng'
  
  const countryOptions = allCountries.map(c => ({
    value: c.id,
    label: c.name,
  }))

  const states = getAllStates()
  const stateOptions = states.map(s => ({
    value: s.id,
    label: s.name,
  }))

  const lgas = stateValue ? getLgasByStateId(stateValue) : []
  const lgaOptions = lgas.map(l => ({
    value: l.id,
    label: l.name,
  }))

  const handleCountryChange = (countryId: string) => {
    onCountryChange(countryId)
    onStateChange('')
    onLgaChange('')
  }

  const handleStateChange = (stateId: string) => {
    onStateChange(stateId)
    onLgaChange('')
  }

  return (
    <div className="space-y-4">
      {/* Country Selector */}
      <SearchableSelect
        value={countryValue}
        onChange={handleCountryChange}
        options={countryOptions}
        placeholder="Select your country"
        label="Nationality / Country"
        required={required}
        searchable={true}
      />

      {/* State Selector - Only visible for Nigeria */}
      {isNigeria && (
        <SearchableSelect
          value={stateValue}
          onChange={handleStateChange}
          options={stateOptions}
          placeholder="Select your state of origin"
          label="State of Origin"
          required={required}
          searchable={true}
          disabled={!countryValue}
        />
      )}

      {/* LGA Selector - Only visible for Nigeria when state is selected */}
      {isNigeria && stateValue && (
        <SearchableSelect
          value={lgaValue}
          onChange={onLgaChange}
          options={lgaOptions}
          placeholder="Select your local government"
          label="Local Government Area"
          required={required}
          searchable={true}
          disabled={!stateValue}
        />
      )}
    </div>
  )
}

// Compact version for forms
interface LocationSelectProps {
  value: {
    country: string
    state: string
    lga: string
  }
  onChange: (value: { country: string; state: string; lga: string }) => void
  required?: boolean
}

export function LocationSelect({ value, onChange, required = true }: LocationSelectProps) {
  const isNigeria = value.country === 'ng'
  
  const handleCountryChange = (country: string) => {
    onChange({ country, state: '', lga: '' })
  }

  const handleStateChange = (state: string) => {
    onChange({ ...value, state, lga: '' })
  }

  return (
    <CountryStateLGA
      countryValue={value.country}
      stateValue={value.state}
      lgaValue={value.lga}
      onCountryChange={handleCountryChange}
      onStateChange={handleStateChange}
      onLgaChange={(lga) => onChange({ ...value, lga })}
      required={required}
    />
  )
}

// Utility function to reset location when country changes
export function getLocationDefaults(countryId: string): { country: string; state: string; lga: string } {
  return {
    country: countryId,
    state: '',
    lga: '',
  }
}