'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, Database, Search, FileText, CheckCircle, Eye } from "lucide-react"

export default function ArchivePage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, portalId } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')

  useState(() => {
    if (!isLoading && (!isAuthenticated || portalId !== 'management' || user?.role !== 'admission_officer')) {
      router.push("/auth/login")
    }
  })

  const archivedRecords = [
    { id: '1', type: 'Application', count: 2500, lastUpdated: '2024-01-15', size: '1.2 GB' },
    { id: '2', type: 'Uploaded Documents', count: 15000, lastUpdated: '2024-01-14', size: '8.5 GB' },
    { id: '3', type: 'Verification Reports', count: 3200, lastUpdated: '2024-01-13', size: '2.1 GB' },
    { id: '4', type: 'Admission Decisions', count: 2800, lastUpdated: '2024-01-12', size: '500 MB' },
    { id: '5', type: 'Admission Letters', count: 2400, lastUpdated: '2024-01-11', size: '800 MB' },
    { id: '6', type: 'Statistics Reports', count: 365, lastUpdated: '2024-01-10', size: '250 MB' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Archive Records</h1>
          <p className="text-muted-foreground">Institutional records for accreditation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Export Archive
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-blue-100">
          <CardContent className="p-4 text-center">
            <Database className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">13.4 GB</p>
            <p className="text-xs text-muted-foreground">Total Storage</p>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">25,365</p>
            <p className="text-xs text-muted-foreground">Total Records</p>
          </CardContent>
        </Card>
        <Card className="border-purple-100">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">100%</p>
            <p className="text-xs text-muted-foreground">Data Integrity</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-orange-600" />
              Archived Data Categories
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search archives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {archivedRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Database className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{record.type}</p>
                    <p className="text-sm text-muted-foreground">{record.count.toLocaleString()} records</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm">Last Updated: {record.lastUpdated}</p>
                    <p className="text-sm text-muted-foreground">Size: {record.size}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}