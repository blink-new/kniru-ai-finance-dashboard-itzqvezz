import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { 
  Search, 
  Plus, 
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Brain,
  Pause,
  Play,
  X,
  MoreHorizontal,
  Bell
} from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Mock subscription data
const subscriptions = [
  {
    id: '1',
    name: 'Netflix',
    amount: 15.99,
    billingCycle: 'monthly',
    nextBillingDate: '2024-02-15',
    category: 'Entertainment',
    status: 'active',
    autoRenewal: true,
    merchant: 'Netflix',
    description: 'Video streaming service',
    aiDetected: true,
    aiConfidence: 0.99,
    yearlyTotal: 191.88,
    daysUntilBilling: 12
  },
  {
    id: '2',
    name: 'Spotify Premium',
    amount: 9.99,
    billingCycle: 'monthly',
    nextBillingDate: '2024-02-08',
    category: 'Entertainment',
    status: 'active',
    autoRenewal: true,
    merchant: 'Spotify',
    description: 'Music streaming service',
    aiDetected: true,
    aiConfidence: 0.98,
    yearlyTotal: 119.88,
    daysUntilBilling: 5
  },
  {
    id: '3',
    name: 'Adobe Creative Cloud',
    amount: 52.99,
    billingCycle: 'monthly',
    nextBillingDate: '2024-02-20',
    category: 'Software',
    status: 'active',
    autoRenewal: true,
    merchant: 'Adobe',
    description: 'Creative software suite',
    aiDetected: true,
    aiConfidence: 0.95,
    yearlyTotal: 635.88,
    daysUntilBilling: 17
  },
  {
    id: '4',
    name: 'Equinox Gym',
    amount: 89.00,
    billingCycle: 'monthly',
    nextBillingDate: '2024-02-12',
    category: 'Health & Fitness',
    status: 'active',
    autoRenewal: true,
    merchant: 'Equinox',
    description: 'Premium gym membership',
    aiDetected: true,
    aiConfidence: 0.97,
    yearlyTotal: 1068.00,
    daysUntilBilling: 9
  },
  {
    id: '5',
    name: 'The New York Times',
    amount: 4.25,
    billingCycle: 'weekly',
    nextBillingDate: '2024-02-05',
    category: 'News & Media',
    status: 'active',
    autoRenewal: true,
    merchant: 'NYTimes',
    description: 'Digital news subscription',
    aiDetected: true,
    aiConfidence: 0.92,
    yearlyTotal: 221.00,
    daysUntilBilling: 2
  },
  {
    id: '6',
    name: 'iCloud Storage',
    amount: 2.99,
    billingCycle: 'monthly',
    nextBillingDate: '2024-02-18',
    category: 'Software',
    status: 'active',
    autoRenewal: true,
    merchant: 'Apple',
    description: '200GB cloud storage',
    aiDetected: true,
    aiConfidence: 0.99,
    yearlyTotal: 35.88,
    daysUntilBilling: 15
  },
  {
    id: '7',
    name: 'Headspace',
    amount: 12.99,
    billingCycle: 'monthly',
    nextBillingDate: '2024-02-25',
    category: 'Health & Fitness',
    status: 'paused',
    autoRenewal: false,
    merchant: 'Headspace',
    description: 'Meditation app',
    aiDetected: true,
    aiConfidence: 0.88,
    yearlyTotal: 155.88,
    daysUntilBilling: 22
  },
  {
    id: '8',
    name: 'Amazon Prime',
    amount: 139.00,
    billingCycle: 'yearly',
    nextBillingDate: '2024-08-15',
    category: 'Shopping',
    status: 'active',
    autoRenewal: true,
    merchant: 'Amazon',
    description: 'Prime membership benefits',
    aiDetected: true,
    aiConfidence: 0.99,
    yearlyTotal: 139.00,
    daysUntilBilling: 198
  }
]

const categorySpending = [
  { category: 'Entertainment', amount: 311.76, count: 2, color: '#3B82F6' },
  { category: 'Software', amount: 671.76, count: 2, color: '#10B981' },
  { category: 'Health & Fitness', amount: 1223.88, count: 2, color: '#F59E0B' },
  { category: 'News & Media', amount: 221.00, count: 1, color: '#EF4444' },
  { category: 'Shopping', amount: 139.00, count: 1, color: '#8B5CF6' }
]

const monthlyTrend = [
  { month: 'Sep', amount: 185.20 },
  { month: 'Oct', amount: 185.20 },
  { month: 'Nov', amount: 198.19 },
  { month: 'Dec', amount: 198.19 },
  { month: 'Jan', amount: 185.20 }
]

const upcomingBills = subscriptions
  .filter(sub => sub.status === 'active')
  .sort((a, b) => a.daysUntilBilling - b.daysUntilBilling)
  .slice(0, 5)

export function Subscriptions() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = subscription.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.merchant.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || subscription.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || subscription.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const totalMonthly = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((sum, sub) => {
      if (sub.billingCycle === 'monthly') return sum + sub.amount
      if (sub.billingCycle === 'yearly') return sum + (sub.amount / 12)
      if (sub.billingCycle === 'weekly') return sum + (sub.amount * 4.33)
      return sum
    }, 0)

  const totalYearly = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((sum, sub) => sum + sub.yearlyTotal, 0)

  const activeCount = subscriptions.filter(sub => sub.status === 'active').length
  const pausedCount = subscriptions.filter(sub => sub.status === 'paused').length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'paused':
        return 'bg-yellow-500'
      case 'cancelled':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getBillingCycleText = (cycle: string, amount: number) => {
    switch (cycle) {
      case 'monthly':
        return `$${amount}/month`
      case 'yearly':
        return `$${amount}/year`
      case 'weekly':
        return `$${amount}/week`
      default:
        return `$${amount}`
    }
  }

  const getDaysUntilText = (days: number) => {
    if (days === 0) return 'Today'
    if (days === 1) return 'Tomorrow'
    if (days < 7) return `${days} days`
    if (days < 30) return `${Math.floor(days / 7)} weeks`
    return `${Math.floor(days / 30)} months`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage and track all your recurring subscriptions and memberships
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Subscription
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalMonthly.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yearly Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalYearly.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCount}</div>
            <p className="text-xs text-muted-foreground">Subscriptions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paused</CardTitle>
            <Pause className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pausedCount}</div>
            <p className="text-xs text-muted-foreground">Subscriptions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subscriptions">All Subscriptions</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Bills</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Upcoming Bills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-500" />
                  Upcoming Bills
                </CardTitle>
                <CardDescription>Next 5 subscription payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingBills.map((subscription) => (
                  <div key={subscription.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(subscription.status)}`} />
                      <div>
                        <div className="font-medium">{subscription.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {getDaysUntilText(subscription.daysUntilBilling)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${subscription.amount}</div>
                      <div className="text-sm text-muted-foreground">{subscription.billingCycle}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>Annual subscription costs</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categorySpending}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="amount"
                    >
                      {categorySpending.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Subscription Costs</CardTitle>
              <CardDescription>Subscription spending over the last 5 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Monthly Cost']} />
                  <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters & Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search subscriptions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Health & Fitness">Health & Fitness</SelectItem>
                    <SelectItem value="News & Media">News & Media</SelectItem>
                    <SelectItem value="Shopping">Shopping</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Subscriptions Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Subscriptions</CardTitle>
              <CardDescription>
                {filteredSubscriptions.length} subscriptions found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Next Bill</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Auto-Renewal</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(subscription.status)}`} />
                          <div>
                            <div className="font-medium">{subscription.name}</div>
                            <div className="text-sm text-muted-foreground">{subscription.merchant}</div>
                            {subscription.aiDetected && (
                              <Badge variant="secondary" className="text-xs mt-1">
                                <Brain className="h-3 w-3 mr-1" />
                                AI Detected
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{subscription.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {getBillingCycleText(subscription.billingCycle, subscription.amount)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ${subscription.yearlyTotal}/year
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm">
                              {new Date(subscription.nextBillingDate).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {getDaysUntilText(subscription.daysUntilBilling)}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={subscription.status === 'active' ? 'default' : 
                                  subscription.status === 'paused' ? 'secondary' : 'destructive'}
                        >
                          {subscription.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Switch 
                          checked={subscription.autoRenewal} 
                          disabled={subscription.status !== 'active'}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {subscription.status === 'active' ? (
                            <Button variant="outline" size="sm">
                              <Pause className="h-3 w-3" />
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Play className="h-3 w-3" />
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bills Calendar</CardTitle>
              <CardDescription>
                All upcoming subscription payments for the next 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingBills.map((subscription) => (
                  <div key={subscription.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {new Date(subscription.nextBillingDate).getDate()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(subscription.nextBillingDate).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{subscription.name}</div>
                        <div className="text-sm text-muted-foreground">{subscription.description}</div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {subscription.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">${subscription.amount}</div>
                      <div className="text-sm text-muted-foreground">{subscription.billingCycle}</div>
                      <div className="text-xs text-muted-foreground">
                        {getDaysUntilText(subscription.daysUntilBilling)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Category Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Category Analysis</CardTitle>
                <CardDescription>Annual spending breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categorySpending.map((category) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.category}</span>
                        <span className="text-sm text-muted-foreground">
                          ${category.amount.toLocaleString()} ({category.count} services)
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${(category.amount / totalYearly) * 100}%`,
                            backgroundColor: category.color 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cost Optimization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  AI Optimization Tips
                </CardTitle>
                <CardDescription>Ways to save on your subscriptions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 p-3 rounded-lg border">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Consider Annual Plans</p>
                    <p className="text-xs text-muted-foreground">
                      Switch Netflix and Spotify to annual billing to save $47/year
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg border">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Bundle Opportunities</p>
                    <p className="text-xs text-muted-foreground">
                      Apple One bundle could save you $15/month on multiple services
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 rounded-lg border">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Unused Subscription</p>
                    <p className="text-xs text-muted-foreground">
                      Headspace has been paused for 2 months. Consider canceling.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}