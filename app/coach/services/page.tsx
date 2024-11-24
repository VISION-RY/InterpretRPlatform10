'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash } from 'lucide-react'

type Service = {
  id: number;
  title: string;
  price: number;
  dataSources: string[];
  minLevel: string;
}

const serviceOptions = [
  'Pitching Analysis',
  'Hitting Analysis',
  'Fielding Analysis',
  'Pitch Design',
  'Swing Design',
  'Biomechanics Analysis',
  'PDF Analysis - Showcase',
  'PDF Analysis - Tournament',
  'PDF Analysis - BP',
  'PDF Analysis - Bullpen',
  'Video Analysis',
  'Throwing Plan',
  'Strength Plan',
  'Hitting Plan'
]

const dataSourceOptions = [
  'Rapsodo',
  'Trackman',
  'Hawk-Eye',
  'FlightScope',
  'Blast Motion',
  'Diamond Kinetics',
  'K-Motion',
  'Video',
  'HitTrax',
  'Synergy Sports',
  'KinaTrax',
  'Motus',
  'Driveline TRAQ',
  'ProPlayAI',
  'Yakkertech',
  '4D Motion',
  'Kinetyx',
  'Uplift Capture',
  'Simi Motion',
  'Qualisys',
  'Vicon',
  'Optitrack',
  'Noitom',
  'Catapult',
  'Kinexon',
  'Polar Team Pro',
  'Firstbeat',
  'Kitman Labs',
  'Sparta Science',
  'Force Plates',
  'Bat Sensors',
  'Mound Sensors'
]

const playerLevels = [
  'Youth',
  'High School',
  'College',
  'Minor League',
  'Major League'
]

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [newService, setNewService] = useState<Partial<Service>>({ dataSources: [] })
  const [activeTab, setActiveTab] = useState('services')

  const handleAddService = () => {
    if (newService.title && newService.price && newService.dataSources && newService.dataSources.length > 0 && newService.minLevel) {
      setServices([...services, { id: Date.now(), ...newService as Service }])
      setNewService({ dataSources: [] })
    }
  }

  const handleDeleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id))
  }

  const handleDataSourceChange = (checked: boolean, dataSource: string) => {
    if (checked) {
      setNewService({ ...newService, dataSources: [...(newService.dataSources || []), dataSource] })
    } else {
      setNewService({ ...newService, dataSources: newService.dataSources?.filter(ds => ds !== dataSource) || [] })
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Tabs defaultValue="services" className="space-y-6" onValueChange={(value) => setActiveTab(value)}>
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>View your coach dashboard here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Dashboard content placeholder</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Bookings</CardTitle>
                <CardDescription>Manage your analysis bookings here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Bookings content placeholder</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle>Services</CardTitle>
                  <CardDescription>Manage your analysis services and pricing</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Service
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Service</DialogTitle>
                      <DialogDescription>
                        Create a new analysis service. Select options and set pricing.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="service-type">Service Type</Label>
                        <Select onValueChange={(value) => setNewService({ ...newService, title: value })}>
                          <SelectTrigger id="service-type">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceOptions.map((option) => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="min-level">Minimum Player Level</Label>
                        <Select onValueChange={(value) => setNewService({ ...newService, minLevel: value })}>
                          <SelectTrigger id="min-level">
                            <SelectValue placeholder="Select minimum level" />
                          </SelectTrigger>
                          <SelectContent>
                            {playerLevels.map((level) => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Data Source Technology</Label>
                        <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
                          {dataSourceOptions.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <Checkbox 
                                id={option} 
                                onCheckedChange={(checked) => handleDataSourceChange(checked as boolean, option)}
                              />
                              <Label htmlFor={option}>{option}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="49.99"
                          onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleAddService}>Add Service</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {services.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    No services added yet. Click "Add Service" to get started.
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Service Title</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Data Sources</TableHead>
                          <TableHead>Minimum Level</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {services.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell className="font-medium">{service.title}</TableCell>
                            <TableCell>${service.price.toFixed(2)}</TableCell>
                            <TableCell>{service.dataSources.join(', ')}</TableCell>
                            <TableCell>{service.minLevel}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteService(service.id)}>
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your coach profile and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Profile content placeholder</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}