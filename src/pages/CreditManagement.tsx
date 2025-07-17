import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Home,
  Car,
  GraduationCap,
  Calculator,
  Target,
  Calendar,
  DollarSign
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar,
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  ReferenceLine,
  ComposedChart
} from 'recharts'

// Credit Score History
const creditScoreHistory = [
  { month: 'Jan', score: 742, utilization: 28 },
  { month: 'Feb', score: 748, utilization: 25 },
  { month: 'Mar', score: 751, utilization: 22 },
  { month: 'Apr', score: 756, utilization: 18 },
  { month: 'May', score: 763, utilization: 15 },
  { month: 'Jun', score: 768, utilization: 12 },
  { month: 'Jul', score: 775, utilization: 8 },
]

// Credit Cards Data
const creditCards = [
  {
    name: 'Chase Sapphire Preferred',
    balance: 2850,
    limit: 15000,
    utilization: 19,
    apr: 18.24,
    minPayment: 85,
    dueDate: '2024-08-15',
    rewards: 'Travel Points',
    status: 'good'
  },
  {
    name: 'American Express Gold',
    balance: 1240,
    limit: 10000,
    utilization: 12.4,
    apr: 21.99,
    minPayment: 35,
    dueDate: '2024-08-20',
    rewards: 'Membership Rewards',
    status: 'excellent'
  },
  {
    name: 'Citi Double Cash',
    balance: 890,
    limit: 8000,
    utilization: 11.1,
    apr: 16.49,
    minPayment: 25,
    dueDate: '2024-08-18',
    rewards: 'Cash Back',
    status: 'excellent'
  },
  {
    name: 'Capital One Venture',
    balance: 0,
    limit: 12000,
    utilization: 0,
    apr: 19.99,
    minPayment: 0,
    dueDate: null,
    rewards: 'Travel Miles',
    status: 'excellent'
  }
]

// Loans Data
const loans = [
  {
    type: 'Mortgage',
    lender: 'Wells Fargo',
    balance: 285000,
    originalAmount: 320000,
    rate: 3.25,
    payment: 1890,
    term: 30,
    remaining: 27.5,
    icon: Home,
    status: 'current'
  },
  {
    type: 'Auto Loan',
    lender: 'Toyota Financial',
    balance: 18500,
    originalAmount: 28000,
    rate: 2.9,
    payment: 485,
    term: 5,
    remaining: 3.2,
    icon: Car,
    status: 'current'
  },
  {
    type: 'Student Loan',
    lender: 'Federal Direct',
    balance: 12800,
    originalAmount: 25000,
    rate: 4.5,
    payment: 145,
    term: 10,
    remaining: 6.8,
    icon: GraduationCap,
    status: 'current'
  }
]

// Debt Payoff Scenarios
const payoffScenarios = [
  { strategy: 'Minimum Payments', totalInterest: 45280, payoffTime: 8.5, monthlyPayment: 2520 },
  { strategy: 'Debt Avalanche', totalInterest: 32150, payoffTime: 6.2, monthlyPayment: 2800 },
  { strategy: 'Debt Snowball', totalInterest: 34890, payoffTime: 6.8, monthlyPayment: 2800 },
  { strategy: 'Extra $500/month', totalInterest: 28940, payoffTime: 5.1, monthlyPayment: 3020 },
]

// Credit Utilization by Card
const utilizationData = creditCards.map(card => ({
  name: card.name.split(' ').slice(-1)[0],
  utilization: card.utilization,
  balance: card.balance,
  limit: card.limit
}))

// Monthly Debt Payments
const monthlyPayments = [
  { month: 'Jan', mortgage: 1890, auto: 485, student: 145, credit: 145, total: 2665 },
  { month: 'Feb', mortgage: 1890, auto: 485, student: 145, credit: 125, total: 2645 },
  { month: 'Mar', mortgage: 1890, auto: 485, student: 145, credit: 110, total: 2630 },
  { month: 'Apr', mortgage: 1890, auto: 485, student: 145, credit: 95, total: 2615 },
  { month: 'May', mortgage: 1890, auto: 485, student: 145, credit: 85, total: 2605 },
  { month: 'Jun', mortgage: 1890, auto: 485, student: 145, credit: 75, total: 2595 },
  { month: 'Jul', mortgage: 1890, auto: 485, student: 145, credit: 65, total: 2585 },
]

// Credit Score Factors
const scoreFactors = [
  { factor: 'Payment History', impact: 35, score: 'Excellent', color: '#10B981' },
  { factor: 'Credit Utilization', impact: 30, score: 'Good', color: '#F59E0B' },
  { factor: 'Length of History', impact: 15, score: 'Very Good', color: '#3B82F6' },
  { factor: 'Credit Mix', impact: 10, score: 'Good', color: '#8B5CF6' },
  { factor: 'New Credit', impact: 10, score: 'Excellent', color: '#06B6D4' },
]

export function CreditManagement() {
  const [activeTab, setActiveTab] = useState('overview')
  
  const totalCreditLimit = creditCards.reduce((sum, card) => sum + card.limit, 0)
  const totalCreditBalance = creditCards.reduce((sum, card) => sum + card.balance, 0)
  const overallUtilization = (totalCreditBalance / totalCreditLimit) * 100
  const totalDebt = loans.reduce((sum, loan) => sum + loan.balance, 0) + totalCreditBalance
  const currentScore = creditScoreHistory[creditScoreHistory.length - 1].score

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Credit Management Hub</h1>
        <p className="text-muted-foreground">
          Comprehensive credit monitoring, debt management, and optimization tools
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{currentScore}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +33 points this year
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Utilization</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallUtilization.toFixed(1)}%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              -20% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDebt.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              -2.1% this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,585</div>
            <div className="text-xs text-muted-foreground">Across all debts</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Credit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalCreditLimit - totalCreditBalance).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              {((1 - overallUtilization/100) * 100).toFixed(0)}% of total limit
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="credit-cards">Credit Cards</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="score">Credit Score</TabsTrigger>
          <TabsTrigger value="payoff">Debt Payoff</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Credit Score Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Credit Score Trend</CardTitle>
                <CardDescription>Score improvement over the past 7 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={creditScoreHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" domain={[700, 800]} />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="score"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.1}
                      strokeWidth={3}
                    />
                    <Bar yAxisId="right" dataKey="utilization" fill="#3B82F6" opacity={0.6} />
                    <ReferenceLine yAxisId="left" y={750} stroke="#F59E0B" strokeDasharray="5 5" label="Excellent Threshold" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Credit Utilization by Card */}
            <Card>
              <CardHeader>
                <CardTitle>Credit Utilization by Card</CardTitle>
                <CardDescription>Individual card utilization rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={utilizationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'utilization' ? `${value}%` : `$${value.toLocaleString()}`,
                        name === 'utilization' ? 'Utilization' : name === 'balance' ? 'Balance' : 'Limit'
                      ]}
                    />
                    <ReferenceLine y={30} stroke="#F59E0B" strokeDasharray="5 5" label="30% Threshold" />
                    <Bar dataKey="utilization" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Debt Payments */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Debt Payment Breakdown</CardTitle>
                <CardDescription>Payment allocation across different debt types</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyPayments}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Payment']} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="mortgage"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                    />
                    <Area
                      type="monotone"
                      dataKey="auto"
                      stackId="1"
                      stroke="#10B981"
                      fill="#10B981"
                    />
                    <Area
                      type="monotone"
                      dataKey="student"
                      stackId="1"
                      stroke="#F59E0B"
                      fill="#F59E0B"
                    />
                    <Area
                      type="monotone"
                      dataKey="credit"
                      stackId="1"
                      stroke="#EF4444"
                      fill="#EF4444"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="credit-cards" className="space-y-4">
          <div className="grid gap-4">
            {creditCards.map((card, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{card.name}</CardTitle>
                    <Badge 
                      variant={card.status === 'excellent' ? 'default' : card.status === 'good' ? 'secondary' : 'destructive'}
                    >
                      {card.status}
                    </Badge>
                  </div>
                  <CardDescription>{card.rewards}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <div className="text-2xl font-bold">${card.balance.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Current Balance</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">${card.limit.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Credit Limit</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{card.apr}%</div>
                      <div className="text-sm text-muted-foreground">APR</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">${card.minPayment}</div>
                      <div className="text-sm text-muted-foreground">Min Payment</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Utilization</span>
                      <span className={card.utilization > 30 ? 'text-red-600' : 'text-green-600'}>
                        {card.utilization}%
                      </span>
                    </div>
                    <Progress 
                      value={card.utilization} 
                      className={`h-2 ${card.utilization > 30 ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500'}`}
                    />
                  </div>

                  {card.dueDate && (
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Next Due Date</span>
                      <span className="text-sm font-medium">{card.dueDate}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="loans" className="space-y-4">
          <div className="grid gap-4">
            {loans.map((loan, index) => {
              const Icon = loan.icon
              const progressPercent = ((loan.originalAmount - loan.balance) / loan.originalAmount) * 100
              
              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <CardTitle className="text-lg">{loan.type}</CardTitle>
                          <CardDescription>{loan.lender}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{loan.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-5">
                      <div>
                        <div className="text-2xl font-bold">${loan.balance.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Remaining Balance</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{loan.rate}%</div>
                        <div className="text-sm text-muted-foreground">Interest Rate</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">${loan.payment}</div>
                        <div className="text-sm text-muted-foreground">Monthly Payment</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{loan.remaining}y</div>
                        <div className="text-sm text-muted-foreground">Time Remaining</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{progressPercent.toFixed(0)}%</div>
                        <div className="text-sm text-muted-foreground">Paid Off</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Loan Progress</span>
                        <span>${(loan.originalAmount - loan.balance).toLocaleString()} of ${loan.originalAmount.toLocaleString()}</span>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="score" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Credit Score Factors */}
            <Card>
              <CardHeader>
                <CardTitle>Credit Score Factors</CardTitle>
                <CardDescription>What impacts your credit score</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={scoreFactors}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="impact"
                    >
                      {scoreFactors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Impact']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Score Improvement Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Score Improvement Recommendations</CardTitle>
                <CardDescription>Personalized tips to boost your credit score</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Excellent payment history</p>
                    <p className="text-xs text-muted-foreground">
                      Keep making on-time payments to maintain this strength.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Lower credit utilization further</p>
                    <p className="text-xs text-muted-foreground">
                      Aim for under 10% utilization to maximize your score potential.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Consider increasing credit limits</p>
                    <p className="text-xs text-muted-foreground">
                      Request limit increases to improve your utilization ratio.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payoff" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Debt Payoff Strategy Comparison</CardTitle>
              <CardDescription>Compare different approaches to eliminate your debt</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Strategy</th>
                      <th className="text-right py-2">Monthly Payment</th>
                      <th className="text-right py-2">Payoff Time</th>
                      <th className="text-right py-2">Total Interest</th>
                      <th className="text-right py-2">Savings vs Minimum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payoffScenarios.map((scenario, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3">
                          <div className="font-medium">{scenario.strategy}</div>
                        </td>
                        <td className="text-right py-3">${scenario.monthlyPayment}</td>
                        <td className="text-right py-3">{scenario.payoffTime} years</td>
                        <td className="text-right py-3">${scenario.totalInterest.toLocaleString()}</td>
                        <td className="text-right py-3">
                          {index === 0 ? (
                            <span className="text-muted-foreground">-</span>
                          ) : (
                            <span className="text-green-600">
                              ${(payoffScenarios[0].totalInterest - scenario.totalInterest).toLocaleString()}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}