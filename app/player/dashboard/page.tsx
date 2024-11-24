'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, BarChart2, History, Database, Brain, FileIcon, Download } from 'lucide-react'
import { uploadData } from '@/app/actions'

// Mock data for uploaded files
const uploadedFiles = [
  { id: 1, eventName: 'Spring Training Game', eventType: 'Game', date: '2024-03-15', dataSource: 'Team Stats', fileName: 'spring_training_stats.csv' },
  { id: 2, eventName: 'Batting Practice', eventType: 'Practice', date: '2024-03-20', dataSource: 'Personal Tracker', fileName: 'batting_practice_03202024.xlsx' },
  { id: 3, eventName: 'Regular Season Game 1', eventType: 'Game', date: '2024-04-01', dataSource: 'Official League Stats', fileName: 'game_1_official_stats.pdf' },
]

// Mock data for bookings
const bookings = [
  { id: 1, coach: 'John Smith', cost: 150, date: '2024-03-25', analysisStatus: 'Completed' },
  { id: 2, coach: 'Sarah Johnson', cost: 200, date: '2024-04-05', analysisStatus: 'In Progress' },
  { id: 3, coach: 'Mike Williams', cost: 175, date: '2024-04-15', analysisStatus: 'Scheduled' },
]

export default function PlayerDashboard() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsUploading(true)

    const formData = new FormData(event.currentTarget)

    try {
      await uploadData(formData)
      router.refresh()
      // Close the dialog programmatically (you might need to add state to control this)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Player Dashboard</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gray-900 text-white hover:bg-gray-800">
                <Upload className="mr-2 h-4 w-4" />
                Upload New Data
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload New Data</DialogTitle>
                <DialogDescription>
                  Enter the details of your new data and upload your file.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="eventName">Event Name</Label>
                  <Input id="eventName" name="eventName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type</Label>
                  <Select name="eventType">
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="game">Game</SelectItem>
                      <SelectItem value="practice">Practice</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataSource">Data Source</Label>
                  <Input id="dataSource" name="dataSource" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">File</Label>
                  <Input id="file" name="file" type="file" accept=".csv,.pdf,.xlsx,.xls" required />
                </div>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? 'Uploading...' : 'Upload'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BarChart2 className="h-5 w-5" />
                <CardTitle>Current Analysis</CardTitle>
              </div>
              <CardDescription>Your latest performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No current analysis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <History className="h-5 w-5" />
                <CardTitle>Past Analysis</CardTitle>
              </div>
              <CardDescription>Previous performance reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No past analyses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <CardTitle>Uploaded Data</CardTitle>
              </div>
              <CardDescription>Your baseball statistics and videos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No files uploaded</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <CardTitle>AI Analysis</CardTitle>
              </div>
              <CardDescription>Automated performance insights</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="profile" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="bg-background border-b rounded-none w-full justify-start h-auto p-0">
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-4 py-2"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="files"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-4 py-2"
            >
              Files
            </TabsTrigger>
            <TabsTrigger 
              value="bookings"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-4 py-2"
            >
              Bookings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Player Profile</CardTitle>
                <CardDescription>Your baseball profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Profile information will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files">
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Files</CardTitle>
                <CardDescription>Your uploaded data files and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                {uploadedFiles.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event Name</TableHead>
                        <TableHead>Event Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Data Source</TableHead>
                        <TableHead>File Name</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {uploadedFiles.map((file) => (
                        <TableRow key={file.id}>
                          <TableCell>{file.eventName}</TableCell>
                          <TableCell>{file.eventType}</TableCell>
                          <TableCell>{file.date}</TableCell>
                          <TableCell>{file.dataSource}</TableCell>
                          <TableCell className="flex items-center">
                            <FileIcon className="mr-2 h-4 w-4" />
                            {file.fileName}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground">No files uploaded yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Coaching Sessions</CardTitle>
                <CardDescription>Your booked coaching sessions and analysis status</CardDescription>
              </CardHeader>
              <CardContent>
                {bookings.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Coach</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Analysis Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>{booking.coach}</TableCell>
                          <TableCell>${booking.cost}</TableCell>
                          <TableCell>{booking.date}</TableCell>
                          <TableCell>{booking.analysisStatus}</TableCell>
                          <TableCell>
                            {booking.analysisStatus === 'Completed' && (
                              <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Download Analysis
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground">No coaching sessions booked yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}