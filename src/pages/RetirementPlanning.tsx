import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { 
  PiggyBank, 
  TrendingUp, 
  Target,
  Calendar,
  DollarSign,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Zap,
  Shield,
  Calculator,
  Lightbulb
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
  ComposedChart,
  ScatterChart,
  Scatter
} from 'recharts'

// Current retirement accounts
const retirementAccounts = [
  {
    type: '401(k)',
    provider: 'Fidelity',
    balance: 125000,
    contribution: 12000,
    employerMatch: 6000,
    limit: 23000,
    vested: 100,
    allocation: { stocks: 80, bonds: 15, international: 5 }
  },
  {
    type: 'Roth IRA',
    provider: 'Vanguard',
    balance: 45000,
    contribution: 6000,
    employerMatch: 0,
    limit: 7000,
    vested: 100,
    allocation: { stocks: 90, bonds: 5, international: 5 }
  },
  {
    type: 'Traditional IRA',
    provider: 'Schwab',
    balance: 28000,
    contribution: 0,
    employerMatch: 0,
    limit: 7000,
    vested: 100,
    allocation: { stocks: 70, bonds: 25, international: 5 }
  }
]

// Retirement projection scenarios
const projectionScenarios = [
  { scenario: 'Conservative (5%)', finalAmount: 1850000, monthlyIncome: 7400, probability: 90 },
  { scenario: 'Moderate (7%)', finalAmount: 2650000, monthlyIncome: 10600, probability: 70 },
  { scenario: 'Aggressive (9%)', finalAmount: 3850000, monthlyIncome: 15400, probability: 50 },
]

// Monte Carlo simulation results
const monteCarloData = [
  { percentile: '10th', amount: 1200000 },
  { percentile: '25th', amount: 1650000 },
  { percentile: '50th', amount: 2250000 },
  { percentile: '75th', amount: 3100000 },
  { percentile: '90th', amount: 4200000 },
]

// Retirement timeline projection
const retirementTimeline = [
  { age: 30, balance: 85000, contributions: 18000, growth: 6800 },
  { age: 35, balance: 198000, contributions: 18000, growth: 15840 },
  { age: 40, balance: 365000, contributions: 18000, growth: 29200 },
  { age: 45, balance: 612000, contributions: 18000, growth: 48960 },
  { age: 50, balance: 985000, contributions: 24000, growth: 78800 },
  { age: 55, balance: 1520000, contributions: 24000, growth: 121600 },
  { age: 60, balance: 2285000, contributions: 24000, growth: 182800 },
  { age: 65, balance: 3350000, contributions: 0, growth: 268000 },
  { age: 70, balance: 4200000, contributions: 0, growth: 336000 },
]

// Asset allocation over time
const allocationOverTime = [
  { age: 30, stocks: 90, bonds: 10, alternatives: 0 },
  { age: 40, stocks: 80, bonds: 15, alternatives: 5 },
  { age: 50, stocks: 70, bonds: 25, alternatives: 5 },
  { age: 60, stocks: 60, bonds: 35, alternatives: 5 },
  { age: 65, stocks: 50, bonds: 45, alternatives: 5 },
  { age: 70, stocks: 40, bonds: 55, alternatives: 5 },
]

// Withdrawal strategies
const withdrawalStrategies = [
  {
    strategy: '4% Rule',
    description: 'Withdraw 4% of initial balance, adjust for inflation',
    firstYear: 134000,
    year10: 156000,
    year20: 182000,
    sustainability: 95
  },
  {
    strategy: 'Dynamic Withdrawal',
    description: 'Adjust withdrawals based on portfolio performance',
    firstYear: 120000,
    year10: 165000,
    year20: 195000,
    sustainability: 98
  },
  {
    strategy: 'Bond Ladder',
    description: 'Use bonds and CDs for predictable income',
    firstYear: 110000,
    year10: 125000,
    year20: 142000,
    sustainability: 100
  },
  {
    strategy: 'Bucket Strategy',
    description: 'Separate short, medium, and long-term buckets',
    firstYear: 125000,
    year10: 155000,
    year20: 188000,
    sustainability: 97
  }
]

// Social Security projections
const socialSecurityData = [
  { age: 62, monthlyBenefit: 1850, reduction: 25 },
  { age: 65, monthlyBenefit: 2200, reduction: 13.3 },
  { age: 67, monthlyBenefit: 2500, reduction: 0 },
  { age: 70, monthlyBenefit: 3100, reduction: -24 },
]

// Healthcare cost projections
const healthcareCosts = [
  { age: 65, annual: 4800, cumulative: 4800 },
  { age: 70, annual: 6200, cumulative: 29800 },
  { age: 75, annual: 8100, cumulative: 69300 },
  { age: 80, annual: 10500, cumulative: 121800 },
  { age: 85, annual: 13800, cumulative: 190300 },
]

export function RetirementPlanning() {
  const [retirementAge, setRetirementAge] = useState(65)
  const [currentAge] = useState(35)
  const [activeTab, setActiveTab] = useState('overview')
  const [riskTolerance, setRiskTolerance] = useState(7)

  const totalBalance = retirementAccounts.reduce((sum, account) => sum + account.balance, 0)
  const totalContributions = retirementAccounts.reduce((sum, account) => sum + account.contribution, 0)
  const yearsToRetirement = retirementAge - currentAge
  const projectedBalance = projectionScenarios[1].finalAmount // Moderate scenario

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Retirement Planning Center</h1>
          <p className="text-muted-foreground">
            Comprehensive retirement analysis with Monte Carlo projections
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Retirement Age:</span>
            <Select value={retirementAge.toString()} onValueChange={(value) => setRetirementAge(parseInt(value))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="62">62</SelectItem>
                <SelectItem value="65">65</SelectItem>
                <SelectItem value="67">67</SelectItem>
                <SelectItem value="70">70</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline">
            <Calculator className="mr-2 h-4 w-4" />
            Calculator
          </Button>
          <Button>
            <Target className="mr-2 h-4 w-4" />
            Set Goals
          </Button>
        </div>
      </div>

      {/* Key Retirement Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBalance.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12.5% this year
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projected at {retirementAge}</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(projectedBalance / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">
              In {yearsToRetirement} years
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(projectedBalance * 0.04 / 12 / 1000).toFixed(0)}k</div>
            <div className="text-xs text-muted-foreground">
              4% withdrawal rule
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Contributions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalContributions.toLocaleString()}</div>
            <div className="text-xs text-green-600">
              +$6k employer match
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87%</div>
            <div className="text-xs text-muted-foreground">
              Monte Carlo analysis
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projections">Projections</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="withdrawal">Withdrawal</TabsTrigger>
          <TabsTrigger value="social-security">Social Security</TabsTrigger>
          <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Retirement Timeline */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Retirement Savings Projection</CardTitle>
                <CardDescription>Expected growth of retirement savings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={retirementTimeline}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.1}
                      strokeWidth={3}
                    />
                    <Bar dataKey="contributions" fill="#10B981" />
                    <Line type="monotone" dataKey="growth" stroke="#F59E0B" strokeWidth={2} />
                    <ReferenceLine x={retirementAge} stroke="#EF4444" strokeDasharray="5 5" label="Retirement" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Current Account Allocation */}
            <Card>
              <CardHeader>
                <CardTitle>Current Account Balances</CardTitle>
                <CardDescription>Breakdown by account type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={retirementAccounts}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="balance"
                      nameKey="type"
                    >
                      {retirementAccounts.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B'][index]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Balance']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Asset Allocation Strategy */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation Over Time</CardTitle>
                <CardDescription>Recommended allocation by age</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={allocationOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="stocks"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                    />
                    <Area
                      type="monotone"
                      dataKey="bonds"
                      stackId="1"
                      stroke="#10B981"
                      fill="#10B981"
                    />
                    <Area
                      type="monotone"
                      dataKey="alternatives"
                      stackId="1"
                      stroke="#F59E0B"
                      fill="#F59E0B"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projections" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Monte Carlo Results */}
            <Card>
              <CardHeader>
                <CardTitle>Monte Carlo Analysis</CardTitle>
                <CardDescription>Probability distribution of retirement outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monteCarloData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="percentile" type="category" width={60} />
                    <Tooltip formatter={(value) => [`$${(value / 1000000).toFixed(1)}M`, 'Balance']} />
                    <Bar dataKey="amount" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Scenario Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Return Scenarios</CardTitle>
                <CardDescription>Different market return assumptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectionScenarios.map((scenario, index) => (
                    <div key={index} className="p-3 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{scenario.scenario}</span>
                        <Badge variant={index === 1 ? 'default' : 'outline'}>
                          {scenario.probability}% likely
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Final Balance</div>
                          <div className="font-medium">${(scenario.finalAmount / 1000000).toFixed(1)}M</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Monthly Income</div>
                          <div className="font-medium">${scenario.monthlyIncome.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Tolerance Adjustment */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Risk Tolerance & Expected Returns</CardTitle>
                <CardDescription>Adjust your risk level to see impact on projections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Risk Level</span>
                      <span className="text-sm text-muted-foreground">{riskTolerance}/10</span>
                    </div>
                    <Slider
                      value={[riskTolerance]}
                      onValueChange={(value) => setRiskTolerance(value[0])}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-muted">
                      <div className="text-lg font-bold">{3 + riskTolerance * 0.7}%</div>
                      <div className="text-sm text-muted-foreground">Expected Return</div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted">
                      <div className="text-lg font-bold">{5 + riskTolerance * 1.5}%</div>
                      <div className="text-sm text-muted-foreground">Volatility</div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted">
                      <div className="text-lg font-bold">${((2000000 + riskTolerance * 200000) / 1000000).toFixed(1)}M</div>
                      <div className="text-sm text-muted-foreground">Projected Balance</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <div className="grid gap-4">
            {retirementAccounts.map((account, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{account.type}</CardTitle>
                      <CardDescription>{account.provider}</CardDescription>
                    </div>
                    <Badge variant="outline">{account.vested}% vested</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <div className="text-2xl font-bold">${account.balance.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Current Balance</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">${account.contribution.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Annual Contribution</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">${account.employerMatch.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Employer Match</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">${account.limit.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Annual Limit</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Contribution Utilization</span>
                      <span>{((account.contribution / account.limit) * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={(account.contribution / account.limit) * 100} className="h-2" />
                  </div>

                  <div className="mt-4">
                    <div className="text-sm font-medium mb-2">Asset Allocation</div>
                    <div className="flex space-x-4 text-sm">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        Stocks: {account.allocation.stocks}%
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        Bonds: {account.allocation.bonds}%
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        International: {account.allocation.international}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="withdrawal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Strategy Comparison</CardTitle>
              <CardDescription>Different approaches to retirement income</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Strategy</th>
                      <th className="text-left py-2">Description</th>
                      <th className="text-right py-2">Year 1</th>
                      <th className="text-right py-2">Year 10</th>
                      <th className="text-right py-2">Year 20</th>
                      <th className="text-right py-2">Success Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawalStrategies.map((strategy, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3">
                          <div className="font-medium">{strategy.strategy}</div>
                        </td>
                        <td className="py-3">
                          <div className="text-sm text-muted-foreground max-w-xs">
                            {strategy.description}
                          </div>
                        </td>
                        <td className="text-right py-3">${strategy.firstYear.toLocaleString()}</td>
                        <td className="text-right py-3">${strategy.year10.toLocaleString()}</td>
                        <td className="text-right py-3">${strategy.year20.toLocaleString()}</td>
                        <td className="text-right py-3">
                          <Badge variant={strategy.sustainability >= 95 ? 'default' : 'secondary'}>
                            {strategy.sustainability}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social-security" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Social Security Benefits by Age</CardTitle>
                <CardDescription>Monthly benefit amounts based on claiming age</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={socialSecurityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Monthly Benefit']} />
                    <Bar dataKey="monthlyBenefit" fill="#3B82F6" />
                    <ReferenceLine x={67} stroke="#10B981" strokeDasharray="5 5" label="Full Retirement Age" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Claiming Strategy Impact</CardTitle>
                <CardDescription>Lifetime benefit comparison</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialSecurityData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="font-medium">Claim at {data.age}</div>
                      <div className="text-sm text-muted-foreground">
                        {data.reduction > 0 ? `${data.reduction}% reduction` : 
                         data.reduction < 0 ? `${Math.abs(data.reduction)}% increase` : 
                         'Full benefit'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${data.monthlyBenefit.toLocaleString()}/mo</div>
                      <div className="text-sm text-muted-foreground">
                        ${(data.monthlyBenefit * 12).toLocaleString()}/year
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="healthcare" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Healthcare Cost Projections</CardTitle>
                <CardDescription>Estimated healthcare expenses in retirement</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={healthcareCosts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="annual" fill="#3B82F6" name="Annual Cost" />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="cumulative" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      name="Cumulative Cost"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Healthcare Planning Strategies</CardTitle>
                <CardDescription>Ways to prepare for healthcare costs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Maximize HSA contributions</p>
                    <p className="text-xs text-muted-foreground">
                      Triple tax advantage for healthcare expenses
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Consider long-term care insurance</p>
                    <p className="text-xs text-muted-foreground">
                      Protect against catastrophic care costs
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Plan for Medicare gaps</p>
                    <p className="text-xs text-muted-foreground">
                      Supplemental insurance may be needed
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="font-medium text-blue-800">Estimated Total</div>
                  <div className="text-2xl font-bold text-blue-900">$285,000</div>
                  <div className="text-sm text-blue-700">
                    Healthcare costs from age 65-85
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