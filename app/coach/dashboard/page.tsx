'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ArrowRight, Download, MessageSquare, ChevronDown } from 'lucide-react'

export default function CoachDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const pendingAnalyses = [
    { id: 1, player: "John Doe", type: "Hitting Analysis", date: "2024-11-20", status: "Pending" },
    { id: 2, player: "Jane Smith", type: "Pitching Analysis", date: "2024-11-21", status: "Pending" },
    { id: 3, player: "Mike Johnson", type: "Fielding Analysis", date: "2024-11-22", status: "Pending" },
  ]

  const currentAnalyses = [
    { id: 4, player: "Sarah Williams", type: "Swing Analysis", date: "2024-11-23", status: "In Progress" },
    { id: 5, player: "Tom Brown", type: "Pitching Analysis", date: "2024-11-24", status: "In Progress" },
  ]

  const pastAnalyses = [
    { id: 6, player: "Emily Davis", type: "Hitting Analysis", date: "2024-11-18", status: "Completed" },
    { id: 7, player: "Chris Wilson", type: "Fielding Analysis", date: "2024-11-19", status: "Completed" },
    { id: 8, player: "Alex Johnson", type: "Pitching Analysis", date: "2024-11-17", status: "Completed" },
  ]

  const recentChats = [
    { id: 1, player: "John Doe", message: "Thanks for the analysis!", time: "2h ago" },
    { id: 2, player: "Jane Smith", message: "When can we schedule our next session?", time: "5h ago" },
    { id: 3, player: "Mike Johnson", message: "I've uploaded new footage for review.", time: "1d ago" },
    { id: 4, player: "Sarah Williams", message: "Could you explain the last feedback in more detail?", time: "2d ago" },
    { id: 5, player: "Tom Brown", message: "Looking forward to our next session!", time: "3d ago" },
  ]

  const bookings = [
    { id: 1, player: "Sarah Williams", service: "Swing Analysis", date: "2024-11-25", time: "10:00 AM", status: "Confirmed" },
    { id: 2, player: "Tom Brown", service: "Pitching Analysis", date: "2024-11-26", time: "2:00 PM", status: "Pending" },
    { id: 3, player: "Emily Davis", service: "Hitting Analysis", date: "2024-11-27", time: "11:30 AM", status: "Confirmed" },
    { id: 4, player: "Michael Lee", service: "Fielding Analysis", date: "2024-11-28", time: "3:00 PM", status: "Cancelled" },
    { id: 5, player: "Laura Wilson", service: "Pitching Analysis", date: "2024-11-29", time: "1:00 PM", status: "Confirmed" },
    { id: 6, player: "Chris Anderson", service: "Swing Analysis", date: "2024-11-30", time: "9:00 AM", status: "Confirmed" },
    { id: 7, player: "Jessica Taylor", service: "Hitting Analysis", date: "2024-12-01", time: "4:00 PM", status: "Pending" },
  ]

  const handleDownloadBookings = () => {
    // Implement CSV download logic here
    console.log("Downloading bookings...")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6" onValueChange={(value) => setActiveTab(value)}>
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Analyses</CardTitle>
                  <CardDescription>Overview of all analyses</CardDescription>
                </CardHeader>
                <CardContent>
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <h3 className="text-lg font-semibold">Pending Analyses</h3>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <ScrollArea className="h-[200px] w-full">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Player</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {pendingAnalyses.map((analysis) => (
                              <TableRow key={analysis.id}>
                                <TableCell>{analysis.player}</TableCell>
                                <TableCell>{analysis.type}</TableCell>
                                <TableCell>{analysis.date}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">{analysis.status}</Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible className="mt-4">
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <h3 className="text-lg font-semibold">Current Analyses</h3>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <ScrollArea className="h-[200px] w-full">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Player</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {currentAnalyses.map((analysis) => (
                              <TableRow key={analysis.id}>
                                <TableCell>{analysis.player}</TableCell>
                                <TableCell>{analysis.type}</TableCell>
                                <TableCell>{analysis.date}</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">{analysis.status}</Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </CollapsibleContent>
                  </Collapsible>

                  <Collapsible className="mt-4">
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <h3 className="text-lg font-semibold">Past Analyses</h3>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <ScrollArea className="h-[200px] w-full">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Player</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {pastAnalyses.map((analysis) => (
                              <TableRow key={analysis.id}>
                                <TableCell>{analysis.player}</TableCell>
                                <TableCell>{analysis.type}</TableCell>
                                <TableCell>{analysis.date}</TableCell>
                                <TableCell>
                                  <Badge>{analysis.status}</Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </CollapsibleContent>
                  </Collapsible>

                  <Button className="w-full mt-4" variant="outline" asChild>
                    <Link href="/coach/analyses">
                      View all analyses
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Chats</CardTitle>
                  <CardDescription>Latest messages from players</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {recentChats.map((chat) => (
                        <div key={chat.id} className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg?text=${chat.player[0]}`} alt={chat.player} />
                            <AvatarFallback>{chat.player[0]}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{chat.player}</p>
                            <p className="text-sm text-muted-foreground">{chat.message}</p>
                            <p className="text-xs text-muted-foreground">{chat.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <Button className="w-full mt-4" variant="outline" asChild>
                    <Link href="/coach/chat">
                      View all messages
                      <MessageSquare className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle>Upcoming Bookings</CardTitle>
                  <CardDescription>Your scheduled analysis sessions</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleDownloadBookings}>
                  <Download className="mr-2 h-4 w-4" />
                  Download CSV
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Player</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>{booking.player}</TableCell>
                          <TableCell>{booking.service}</TableCell>
                          <TableCell>{booking.date}</TableCell>
                          <TableCell>{booking.time}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                booking.status === "Confirmed" ? "default" :
                                booking.status === "Pending" ? "secondary" : "destructive"
                              }
                            >
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <Link href="/coach/bookings">
                    View all bookings
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
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
              <CardHeader>
                <CardTitle>Services</CardTitle>
                <CardDescription>Manage your analysis services here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Services content placeholder</p>
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