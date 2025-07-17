import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  Filter, 
  Download, 
  Upload,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Brain,
  Tag,
  Building,
  CreditCard,
  Repeat
} from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Mock transaction data
const transactions = [
  {
    id: '1',
    date: '2024-01-15',
    description: 'Starbucks Coffee',
    merchant: 'Starbucks',
    amount: -5.47,
    category: 'Food & Dining',
    subcategory: 'Coffee',
    accountType: 'credit_card',
    accountName: 'Chase Sapphire',
    transactionType: 'debit',
    isRecurring: false,
    aiCategorized: true,
    aiConfidence: 0.95,
    tags: ['coffee', 'morning']
  },
  {
    id: '2',
    date: '2024-01-15',
    description: 'Salary Deposit',
    merchant: 'TechCorp Inc',
    amount: 4500.00,
    category: 'Income',
    subcategory: 'Salary',
    accountType: 'checking',
    accountName: 'Chase Checking',
    transactionType: 'credit',
    isRecurring: true,
    aiCategorized: true,
    aiConfidence: 0.99,
    tags: ['salary', 'income']
  },
  {
    id: '3',
    date: '2024-01-14',
    description: 'Uber Ride',
    merchant: 'Uber',
    amount: -18.50,
    category: 'Transportation',
    subcategory: 'Rideshare',
    accountType: 'credit_card',
    accountName: 'Chase Sapphire',
    transactionType: 'debit',
    isRecurring: false,
    aiCategorized: true,
    aiConfidence: 0.92,
    tags: ['transportation', 'work']
  },
  {
    id: '4',
    date: '2024-01-14',
    description: 'Whole Foods Market',
    merchant: 'Whole Foods',
    amount: -87.32,
    category: 'Food & Dining',
    subcategory: 'Groceries',
    accountType: 'debit_card',
    accountName: 'Chase Checking',
    transactionType: 'debit',
    isRecurring: false,
    aiCategorized: true,
    aiConfidence: 0.88,
    tags: ['groceries', 'healthy']
  },
  {
    id: '5',
    date: '2024-01-13',
    description: 'Netflix Subscription',
    merchant: 'Netflix',
    amount: -15.99,
    category: 'Entertainment',
    subcategory: 'Streaming',
    accountType: 'credit_card',
    accountName: 'Chase Sapphire',
    transactionType: 'debit',
    isRecurring: true,
    aiCategorized: true,
    aiConfidence: 0.99,
    tags: ['subscription', 'entertainment']
  },
  {
    id: '6',
    date: '2024-01-12',
    description: 'Gym Membership',
    merchant: 'Equinox',
    amount: -89.00,
    category: 'Health & Fitness',
    subcategory: 'Gym',
    accountType: 'credit_card',
    accountName: 'Chase Sapphire',
    transactionType: 'debit',
    isRecurring: true,
    aiCategorized: true,
    aiConfidence: 0.97,
    tags: ['fitness', 'health', 'subscription']
  },
  {
    id: '7',
    date: '2024-01-12',
    description: 'Amazon Purchase',
    merchant: 'Amazon',
    amount: -45.67,
    category: 'Shopping',
    subcategory: 'Online',
    accountType: 'credit_card',
    accountName: 'Chase Sapphire',
    transactionType: 'debit',
    isRecurring: false,
    aiCategorized: true,
    aiConfidence: 0.75,
    tags: ['online', 'shopping']
  },
  {
    id: '8',
    date: '2024-01-11',
    description: 'Electric Bill',
    merchant: 'ConEd',
    amount: -125.43,
    category: 'Bills & Utilities',
    subcategory: 'Electricity',
    accountType: 'checking',
    accountName: 'Chase Checking',
    transactionType: 'debit',
    isRecurring: true,
    aiCategorized: true,
    aiConfidence: 0.98,
    tags: ['utilities', 'bills']
  }
]

const categorySpending = [
  { category: 'Food & Dining', amount: 387.23, color: '#3B82F6' },
  { category: 'Transportation', amount: 156.50, color: '#10B981' },
  { category: 'Entertainment', amount: 89.97, color: '#F59E0B' },
  { category: 'Health & Fitness', amount: 89.00, color: '#EF4444' },
  { category: 'Shopping', amount: 245.67, color: '#8B5CF6' },
  { category: 'Bills & Utilities', amount: 325.43, color: '#6B7280' }
]

const dailySpending = [
  { date: '01/11', amount: 125.43 },
  { date: '01/12', amount: 134.67 },
  { date: '01/13', amount: 15.99 },
  { date: '01/14', amount: 105.82 },
  { date: '01/15', amount: 5.47 }
]

export function Transactions() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAccount, setSelectedAccount] = useState('all')
  const [dateRange, setDateRange] = useState('30')

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory
    const matchesAccount = selectedAccount === 'all' || transaction.accountName === selectedAccount
    
    return matchesSearch && matchesCategory && matchesAccount
  })

  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0))
  const netCashFlow = totalIncome - totalExpenses

  const getAccountIcon = (accountType: string) => {
    switch (accountType) {
      case 'credit_card':
        return <CreditCard className="h-4 w-4" />
      case 'checking':
      case 'debit_card':
        return <Building className="h-4 w-4" />
      default:
        return <DollarSign className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            View, search, and analyze all your financial transactions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Cash Flow</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${netCashFlow.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">All Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="recurring">Recurring</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
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
                      placeholder="Search transactions..."
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
                    <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Health & Fitness">Health & Fitness</SelectItem>
                    <SelectItem value="Shopping">Shopping</SelectItem>
                    <SelectItem value="Bills & Utilities">Bills & Utilities</SelectItem>
                    <SelectItem value="Income">Income</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Accounts</SelectItem>
                    <SelectItem value="Chase Sapphire">Chase Sapphire</SelectItem>
                    <SelectItem value="Chase Checking">Chase Checking</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="365">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                {filteredTransactions.length} transactions found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Tags</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground">{transaction.merchant}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{transaction.category}</Badge>
                          {transaction.aiCategorized && (
                            <Badge variant="secondary" className="text-xs">
                              <Brain className="h-3 w-3 mr-1" />
                              AI
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getAccountIcon(transaction.accountType)}
                          <span className="text-sm">{transaction.accountName}</span>
                          {transaction.isRecurring && (
                            <Repeat className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className={`text-right font-medium ${
                        transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {transaction.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              <Tag className="h-2 w-2 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                          {transaction.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{transaction.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Spending by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>This month's expense breakdown</CardDescription>
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

            {/* Daily Spending Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Spending</CardTitle>
                <CardDescription>Last 5 days spending pattern</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailySpending}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Spent']} />
                    <Bar dataKey="amount" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recurring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recurring Transactions</CardTitle>
              <CardDescription>
                Automatically detected recurring payments and subscriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Next Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.filter(t => t.isRecurring).map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground">{transaction.merchant}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{transaction.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">Monthly</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Feb 15, 2024</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}