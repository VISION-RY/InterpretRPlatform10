'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface PlayerProfileProps {
  initialData?: PlayerProfile
  onSave?: (data: PlayerProfile) => void
}

interface PlayerProfile {
  age: string
  graduationYear: string
  batThrow: string
  height: string
  weight: string
  positions: string[]
  school: string
  gpa: string
  satScore: string
  actScore: string
  currentLevel: string
}

export default function PlayerProfile({ initialData, onSave }: PlayerProfileProps) {
  const [positions, setPositions] = React.useState<string[]>(initialData?.positions || [])
  const [newPosition, setNewPosition] = React.useState('')

  const handleAddPosition = (position: string) => {
    if (position && !positions.includes(position)) {
      setPositions([...positions, position])
    }
    setNewPosition('')
  }

  const handleRemovePosition = (position: string) => {
    setPositions(positions.filter(p => p !== position))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      age: formData.get('age') as string,
      graduationYear: formData.get('graduationYear') as string,
      batThrow: formData.get('batThrow') as string,
      height: formData.get('height') as string,
      weight: formData.get('weight') as string,
      positions: positions,
      school: formData.get('school') as string,
      gpa: formData.get('gpa') as string,
      satScore: formData.get('satScore') as string,
      actScore: formData.get('actScore') as string,
      currentLevel: formData.get('currentLevel') as string,
    }
    onSave?.(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Profile</CardTitle>
        <p className="text-sm text-muted-foreground">Your baseball profile information</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                defaultValue={initialData?.age || '16'}
                placeholder="Enter age"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Input
                id="graduationYear"
                name="graduationYear"
                defaultValue={initialData?.graduationYear || '2026'}
                placeholder="Enter graduation year"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="batThrow">Bat/Throw</Label>
              <Select name="batThrow" defaultValue={initialData?.batThrow || 'R/R'}>
                <SelectTrigger>
                  <SelectValue placeholder="Select bat/throw" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="R/R">R/R</SelectItem>
                  <SelectItem value="R/L">R/L</SelectItem>
                  <SelectItem value="L/R">L/R</SelectItem>
                  <SelectItem value="L/L">L/L</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                name="height"
                defaultValue={initialData?.height || "6'2\""}
                placeholder="Enter height"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input
                id="weight"
                name="weight"
                placeholder="Enter weight"
                defaultValue={initialData?.weight}
              />
            </div>

            <div className="space-y-2">
              <Label>Positions</Label>
              <div className="flex flex-wrap gap-2">
                {positions.map((position) => (
                  <Badge key={position} variant="secondary">
                    {position}
                    <button
                      type="button"
                      onClick={() => handleRemovePosition(position)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <Select
                  value={newPosition}
                  onValueChange={(value) => handleAddPosition(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Add position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pitcher">Pitcher</SelectItem>
                    <SelectItem value="Catcher">Catcher</SelectItem>
                    <SelectItem value="First Base">First Base</SelectItem>
                    <SelectItem value="Second Base">Second Base</SelectItem>
                    <SelectItem value="Third Base">Third Base</SelectItem>
                    <SelectItem value="Shortstop">Shortstop</SelectItem>
                    <SelectItem value="Left Field">Left Field</SelectItem>
                    <SelectItem value="Center Field">Center Field</SelectItem>
                    <SelectItem value="Right Field">Right Field</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="school">School</Label>
              <Input
                id="school"
                name="school"
                placeholder="Enter school name"
                defaultValue={initialData?.school}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gpa">GPA</Label>
              <Input
                id="gpa"
                name="gpa"
                placeholder="Enter GPA"
                defaultValue={initialData?.gpa}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="satScore">SAT Score</Label>
              <Input
                id="satScore"
                name="satScore"
                placeholder="Enter SAT score"
                defaultValue={initialData?.satScore}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actScore">ACT Score</Label>
              <Input
                id="actScore"
                name="actScore"
                placeholder="Enter ACT score"
                defaultValue={initialData?.actScore}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentLevel">Current Level</Label>
              <Select name="currentLevel" defaultValue={initialData?.currentLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youth">Youth</SelectItem>
                  <SelectItem value="hs_freshman">HS Freshman</SelectItem>
                  <SelectItem value="hs_jv">HS JV</SelectItem>
                  <SelectItem value="hs_varsity">HS Varsity</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full">Save Profile</Button>
        </form>
      </CardContent>
    </Card>
  )
}