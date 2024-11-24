'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Star, User } from 'lucide-react'

interface CoachExpertise {
  level: 'Expert' | 'Advanced' | 'Specialist' | 'Novice'
  area: 'Pitching' | 'Hitting' | 'Fielding' | 'Running' | 'Data Analysis'
  services: {
    name: string
    price: number
  }[]
}

interface Analyst {
  id: string
  name: string
  organization: string
  role: string
  experience: string
  rating: number
  insights: number
  bio: string
  expertise: CoachExpertise
  dataSources: string[]
  dataSourceTypes: string[]
  profileImage: string
}

// Updated mock data to use new expertise structure
const mockAnalysts: Analyst[] = [
  {
    id: '1',
    name: 'Hank Rowengardner',
    organization: 'Cleveland Guardians',
    role: 'AAA Pitching Coach',
    experience: '3 yrs',
    rating: 4.5,
    insights: 37,
    bio: 'Known for his analytical approach and ability to connect with pitchers on a personal level, "Rowy" has been instrumental in developing top prospects into MLB-ready talent. A former minor league pitcher himself, he combines firsthand experience with modern analytics to optimize performance and build lasting success on the mound.',
    expertise: {
      level: 'Expert',
      area: 'Pitching',
      services: [
        { name: 'Basic Analysis', price: 50 },
        { name: 'Advanced Analysis', price: 75 },
        { name: 'Complete Breakdown', price: 100 }
      ]
    },
    dataSources: ['Trackman', 'Rapsodo'],
    dataSourceTypes: ['Ball Tracking', 'Biomechanics'],
    profileImage: '/placeholder.svg'
  },
  // Clone the analyst twice more with different IDs
  {
    id: '2',
    name: 'Hank Rowengardner',
    organization: 'Cleveland Guardians',
    role: 'AAA Pitching Coach',
    experience: '3 yrs',
    rating: 4.5,
    insights: 37,
    bio: 'Known for his analytical approach and ability to connect with pitchers on a personal level, "Rowy" has been instrumental in developing top prospects into MLB-ready talent. A former minor league pitcher himself, he combines firsthand experience with modern analytics to optimize performance and build lasting success on the mound.',
    expertise: {
      level: 'Expert',
      area: 'Pitching',
      services: [
        { name: 'Basic Analysis', price: 50 },
        { name: 'Advanced Analysis', price: 75 },
        { name: 'Complete Breakdown', price: 100 }
      ]
    },
    dataSources: ['Trackman', 'Rapsodo'],
    dataSourceTypes: ['Ball Tracking', 'Biomechanics'],
    profileImage: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Hank Rowengardner',
    organization: 'Cleveland Guardians',
    role: 'AAA Pitching Coach',
    experience: '3 yrs',
    rating: 4.5,
    insights: 37,
    bio: 'Known for his analytical approach and ability to connect with pitchers on a personal level, "Rowy" has been instrumental in developing top prospects into MLB-ready talent. A former minor league pitcher himself, he combines firsthand experience with modern analytics to optimize performance and build lasting success on the mound.',
    expertise: {
      level: 'Expert',
      area: 'Pitching',
      services: [
        { name: 'Basic Analysis', price: 50 },
        { name: 'Advanced Analysis', price: 75 },
        { name: 'Complete Breakdown', price: 100 }
      ]
    },
    dataSources: ['Trackman', 'Rapsodo'],
    dataSourceTypes: ['Ball Tracking', 'Biomechanics'],
    profileImage: '/placeholder.svg'
  }
]

// Create pitching analysts with the same structure
const pitchingAnalysts: Analyst[] = Array(8).fill(null).map((_, index) => ({
  id: `p${index + 1}`,
  name: 'Hank Rowengardner',
  organization: 'Cleveland Guardians',
  role: 'AAA Pitching Coach',
  experience: '3 yrs',
  rating: 4.5,
  insights: 37,
  bio: 'Known for his analytical approach and ability to connect with pitchers on a personal level, "Rowy" has been instrumental in developing top prospects into MLB-ready talent.',
  expertise: {
    level: 'Expert',
    area: 'Pitching',
    services: [
      { name: 'Basic Analysis', price: 50 },
      { name: 'Advanced Analysis', price: 75 }
    ]
  },
  dataSources: ['Trackman', 'Rapsodo'],
  dataSourceTypes: ['Ball Tracking', 'Biomechanics'],
  profileImage: '/placeholder.svg'
}))

export default function Marketplace() {
  // ... (previous state management code remains the same)

  const AnalystCard = ({ analyst, condensed = false }: { analyst: Analyst, condensed?: boolean }) => {
    const minPrice = Math.min(...analyst.expertise.services.map(service => service.price))

    return (
      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <Image
              src={analyst.profileImage}
              alt={analyst.name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">{analyst.name}</h3>
              <p className="text-sm text-muted-foreground">{analyst.organization}</p>
              <p className="text-sm text-muted-foreground">
                {analyst.role} - {analyst.experience}
              </p>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(analyst.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm">
                  {analyst.rating} ({analyst.insights} Insights)
                </span>
              </div>
            </div>
          </div>
          <p className={`mt-4 text-sm text-muted-foreground ${condensed ? 'line-clamp-2' : ''}`}>
            {analyst.bio}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge 
              className="bg-gradient-to-br from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800"
            >
              {analyst.expertise.level}
            </Badge>
            <Badge 
              className="bg-gradient-to-br from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800"
            >
              {analyst.expertise.area}
            </Badge>
            <Badge 
              className="bg-gradient-to-br from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800"
            >
              ${minPrice}+
            </Badge>
          </div>
          <Button 
            className="w-full mt-4 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 hover:from-gray-200 hover:to-gray-300 border border-gray-300"
          >
            View Profile
          </Button>
        </div>
      </div>
    );
  };

  // ... (rest of the component remains the same)
}