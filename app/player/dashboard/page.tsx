'use client'

import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
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
// const uploadedFiles = [
  { id: 1, eventName: 'Spring Training Game', eventType: 'Game', date: '2024-03-15', dataSource: 'Team Stats', fileName: 'spring_training_stats.csv' },
  { id: 2, eventName: 'Batting Practice', eventType: 'Practice', date: '2024-03-20', dataSource: 'Personal Tracker', fileName: 'batting_practice_03202024.xlsx' },
  { id: 3, eventName: 'Regular Season Game 1', eventType: 'Game', date: '2024-04-01', dataSource: 'Official League Stats', fileName: 'game_1_official_stats.pdf' },
]

// Mock data for bookings
//const bookings = [
{ id: 1, coach: 'John Smith', cost: 150, date: '2024-03-25', analysisStatus: 'Completed' },
{ id: 2, coach: 'Sarah Johnson', cost: 200, date: '2024-04-05', analysisStatus: 'In Progress' },
{ id: 3, coach: 'Mike Williams', cost: 175, date: '2024-04-15', analysisStatus: 'Scheduled' },
]
const [files, setFiles] = useState<UploadedFile[]>([])
const [bookings, setBookings] = useState<Booking[]>([])

interface PlayerProfile {
  id: string
  age?: string
  graduation_year?: string
  bat_throw?: string
  height?: string
  weight?: string
  positions?: string[]
  school?: string
  gpa?: string
  sat_score?: string
  act_score?: string
  current_level?: string
}

interface UploadedFile {
  id: string
  event_name: string
  event_type: string
  event_date: string
  data_source: string
  file_name: string
  file_path: string
  created_at: string
}

interface Booking {
  id: string
  coach_id: string
  cost: number
  booking_date: string
  analysis_status: string
  coach: {
    profiles: {
      full_name: string
    }
  }
}

export default function PlayerDashboard() {
  const { user, loading, userType } = useAuth()
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])

  // Modify your existing handleUpload function:
  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsUploading(true)

    const formData = new FormData(event.currentTarget)
    const file = formData.get('file') as File
    const eventName = formData.get('eventName') as string
    const eventType = formData.get('eventType') as string
    const date = formData.get('date') as string
    const dataSource = formData.get('dataSource') as string

    try {
      // 1. Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `${user?.id}/${fileName}`
      const [isDialogOpen, setIsDialogOpen] = useState(false)
      const [uploadError, setUploadError] = useState<string | null>(null)

      const { data: storageData, error: storageError } = await supabase
        .storage
        .from('player-uploads')
        .upload(filePath, file)

      if (storageError) throw storageError

      // 2. Create database entry
      const { data: fileData, error: dbError } = await supabase
        .from('uploaded_files')
        .insert([
          {
            player_id: user?.id,
            event_name: eventName,
            event_type: eventType,
            event_date: date,
            data_source: dataSource,
            file_name: file.name,
            file_path: filePath
          }
        ])
        .select()
        .single()

      if (dbError) throw dbError

      // 3. Add new file to state
      setFiles(prevFiles => [...prevFiles, fileData])

      // 4. Reset form and close dialog
      event.currentTarget.reset()
      // You'll need to add state for the dialog
      setIsDialogOpen(false)

    } catch (error) {
      console.error('Upload failed:', error)
      // You might want to add error state to show to the user
      setUploadError('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login')
        return
      }
      if (userType !== 'player') {
        router.push('/login')
        return
      }
    }
  }, [user, loading, userType, router])

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        // Fetch player profile
        const { data: profileData, error: profileError } = await supabase
          .from('player_profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError) throw profileError
        setPlayerProfile(profileData)

        // Fetch files
        const { data: filesData, error: filesError } = await supabase
          .from('uploaded_files')
          .select('*')
          .eq('player_id', user.id)
          .order('created_at', { ascending: false })

        if (filesError) throw filesError
        setFiles(filesData)

        // Fetch bookings
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select(`
            id,
            coach_id,
            cost,
            booking_date,
            analysis_status,
            coach:coach_id (
              profiles:profiles (
                full_name
              )
            )
          `)
          .eq('player_id', user.id)
          .order('booking_date', { ascending: false })

        if (bookingsError) throw bookingsError
        setBookings(bookingsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchData()
    }
  }, [user])

  if (loading || isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-full">
            <p>Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Player Dashboard</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                {/* Your existing form fields */}

                {uploadError && (
                  <p className="text-sm text-red-500">{uploadError}</p>
                )}

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
                {playerProfile ? (
                  <div className="space-y-4">
                    <p><strong>Age:</strong> {playerProfile.age || 'Not set'}</p>
                    <p><strong>Graduation Year:</strong> {playerProfile.graduation_year || 'Not set'}</p>
                    <p><strong>School:</strong> {playerProfile.school || 'Not set'}</p>
                    <p><strong>Bat/Throw:</strong> {playerProfile.bat_throw || 'Not set'}</p>
                    <p><strong>Height:</strong> {playerProfile.height || 'Not set'}</p>
                    <p><strong>Weight:</strong> {playerProfile.weight || 'Not set'}</p>
                    <p><strong>GPA:</strong> {playerProfile.gpa || 'Not set'}</p>
                    <p><strong>SAT Score:</strong> {playerProfile.sat_score || 'Not set'}</p>
                    <p><strong>ACT Score:</strong> {playerProfile.act_score || 'Not set'}</p>
                    <p><strong>Current Level:</strong> {playerProfile.current_level || 'Not set'}</p>
                    <p><strong>Positions:</strong> {playerProfile.positions?.join(', ') || 'Not set'}</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Profile information will be displayed here</p>
                )}
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
                {files.length > 0 ? (
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
                        {files.map((file) => (
                          <TableRow key={file.id}>
                            <TableCell>{file.event_name}</TableCell>
                            <TableCell>{file.event_type}</TableCell>
                            <TableCell>{new Date(file.event_date).toLocaleDateString()}</TableCell>
                            <TableCell>{file.data_source}</TableCell>
                            <TableCell className="flex items-center">
                              <FileIcon className="mr-2 h-4 w-4" />
                              {file.file_name}
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
                            <TableCell>{booking.coach?.profiles?.full_name}</TableCell>
                            <TableCell>${booking.cost}</TableCell>
                            <TableCell>{new Date(booking.booking_date).toLocaleDateString()}</TableCell>
                            <TableCell>{booking.analysis_status}</TableCell>
                            <TableCell>
                              {booking.analysis_status === 'Completed' && (
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