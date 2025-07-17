import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  FileText,
  Target,
  AlertTriangle,
  CheckCircle,
  PieChart,
  BarChart3,
  Calendar,
  Lightbulb
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar,
  PieChart as RechartsPieChart, 
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
  Treemap
} from 'recharts'

// Tax bracket data for 2024
const taxBrackets = [
  { bracket: '10%', min: 0, max: 11000, rate: 0.10, color: '#10B981' },
  { bracket: '12%', min: 11000, max: 44725, rate: 0.12, color: '#3B82F6' },
  { bracket: '22%', min: 44725, max: 95375, rate: 0.22, color: '#F59E0B' },
  { bracket: '24%', min: 95375, max: 182050, rate: 0.24, color: '#EF4444' },
  { bracket: '32%', min: 182050, max: 231250, rate: 0.32, color: '#8B5CF6' },
  { bracket: '35%', min: 231250, max: 578125, rate: 0.35, color: '#06B6D4' },
  { bracket: '37%', min: 578125, max: Infinity, rate: 0.37, color: '#84CC16' },
]

// Current year tax projection
const currentIncome = 125000
const currentTaxOwed = 22500
const effectiveRate = (currentTaxOwed / currentIncome) * 100

// Tax optimization opportunities
const optimizationOpportunities = [
  {
    strategy: 'Max 401(k) Contribution',
    currentContribution: 12000,
    maxContribution: 23000,
    potentialSavings: 2640,
    difficulty: 'Easy',
    impact: 'High'
  },
  {
    strategy: 'HSA Maximization',
    currentContribution: 2000,
    maxContribution: 4300,
    potentialSavings: 552,
    difficulty: 'Easy',
    impact: 'Medium'
  },
  {
    strategy: 'Tax-Loss Harvesting',
    currentContribution: 0,
    maxContribution: 3000,
    potentialSavings: 720,
    difficulty: 'Medium',
    impact: 'Medium'
  },
  {
    strategy: 'Backdoor Roth IRA',
    currentContribution: 0,
    maxContribution: 7000,
    potentialSavings: 0,
    difficulty: 'Hard',
    impact: 'High'
  }
]

// Historical tax data
const historicalTaxData = [
  { year: '2020', income: 95000, taxOwed: 16200, effectiveRate: 17.1, marginalRate: 22 },
  { year: '2021', income: 105000, taxOwed: 19800, effectiveRate: 18.9, marginalRate: 22 },
  { year: '2022', income: 115000, taxOwed: 21850, effectiveRate: 19.0, marginalRate: 22 },
  { year: '2023', income: 120000, taxOwed: 22200, effectiveRate: 18.5, marginalRate: 22 },
  { year: '2024', income: 125000, taxOwed: 22500, effectiveRate: 18.0, marginalRate: 22 },
]

// Tax deductions breakdown
const deductionsData = [
  { category: 'Standard Deduction', amount: 14600, type: 'standard', color: '#3B82F6' },
  { category: 'Mortgage Interest', amount: 8500, type: 'itemized', color: '#10B981' },
  { category: 'State & Local Taxes', amount: 10000, type: 'itemized', color: '#F59E0B' },
  { category: 'Charitable Donations', amount: 3200, type: 'itemized', color: '#EF4444' },
  { category: 'Medical Expenses', amount: 1800, type: 'itemized', color: '#8B5CF6' },
]

// Quarterly tax estimates
const quarterlyEstimates = [
  { quarter: 'Q1 2024', estimated: 5625, paid: 5625, status: 'paid' },
  { quarter: 'Q2 2024', estimated: 5625, paid: 5625, status: 'paid' },
  { quarter: 'Q3 2024', estimated: 5625, paid: 0, status: 'due' },
  { quarter: 'Q4 2024', estimated: 5625, paid: 0, status: 'upcoming' },
]

// Tax-advantaged accounts
const taxAdvantaged = [
  {
    account: '401(k)',
    current: 12000,
    limit: 23000,
    taxSavings: 2880,
    type: 'Traditional',
    employer: 'Yes'
  },
  {
    account: 'HSA',
    current: 2000,
    limit: 4300,
    taxSavings: 480,
    type: 'Triple Tax-Free',
    employer: 'No'
  },
  {
    account: 'Traditional IRA',
    current: 0,
    limit: 7000,
    taxSavings: 0,
    type: 'Traditional',
    employer: 'No'
  },
  {
    account: 'Roth IRA',
    current: 6000,
    limit: 7000,
    taxSavings: 0,
    type: 'After-Tax',
    employer: 'No'
  }
]

// Tax bracket visualization data
const bracketVisualization = taxBrackets.map(bracket => ({
  ...bracket,
  width: bracket.max === Infinity ? 50000 : bracket.max - bracket.min,
  currentIncome: Math.min(Math.max(currentIncome - bracket.min, 0), bracket.max - bracket.min)
}))

export function TaxAnalysis() {
  const [taxYear, setTaxYear] = useState('2024')
  const [activeTab, setActiveTab] = useState('overview')

  const totalItemizedDeductions = deductionsData
    .filter(d => d.type === 'itemized')
    .reduce((sum, d) => sum + d.amount, 0)
  
  const shouldItemize = totalItemizedDeductions > 14600

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tax Analysis & Optimization</h1>
          <p className="text-muted-foreground">
            Comprehensive tax planning and optimization strategies
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={taxYear} onValueChange={setTaxYear}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Tax Documents
          </Button>
          <Button>
            <Calculator className="mr-2 h-4 w-4" />
            Tax Calculator
          </Button>
        </div>
      </div>

      {/* Key Tax Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Effective Tax Rate</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{effectiveRate.toFixed(1)}%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              -0.5% vs last year
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tax Owed</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentTaxOwed.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              On ${currentIncome.toLocaleString()} income
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Marginal Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22%</div>
            <div className="text-xs text-muted-foreground">Current bracket</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$3,912</div>
            <div className="text-xs text-muted-foreground">Through optimization</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,625</div>
            <div className="text-xs text-red-600">Due Sep 15, 2024</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="brackets">Tax Brackets</TabsTrigger>
          <TabsTrigger value="deductions">Deductions</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Historical Tax Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Tax History & Trends</CardTitle>
                <CardDescription>5-year tax liability and effective rate trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={historicalTaxData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="taxOwed" fill="#3B82F6" name="Tax Owed" />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="effectiveRate" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      name="Effective Rate %"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Quarterly Estimates */}
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Tax Estimates</CardTitle>
                <CardDescription>2024 estimated tax payment schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quarterlyEstimates.map((quarter, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">{quarter.quarter}</div>
                        <div className="text-sm text-muted-foreground">
                          ${quarter.estimated.toLocaleString()} estimated
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          ${quarter.paid.toLocaleString()}
                        </div>
                        <Badge 
                          variant={
                            quarter.status === 'paid' ? 'default' : 
                            quarter.status === 'due' ? 'destructive' : 
                            'secondary'
                          }
                        >
                          {quarter.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tax-Advantaged Accounts */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Tax-Advantaged Account Utilization</CardTitle>
                <CardDescription>Current contributions vs limits for tax-advantaged accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taxAdvantaged.map((account, index) => {
                    const utilizationPercent = (account.current / account.limit) * 100
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">{account.account}</span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {account.type}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              ${account.current.toLocaleString()} / ${account.limit.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Tax savings: ${account.taxSavings.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <Progress value={utilizationPercent} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {utilizationPercent.toFixed(0)}% utilized
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="brackets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Bracket Analysis</CardTitle>
              <CardDescription>Your income distribution across tax brackets</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={bracketVisualization} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="bracket" type="category" width={60} />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'width' ? `$${value.toLocaleString()}` : `$${value.toLocaleString()}`,
                      name === 'width' ? 'Bracket Range' : 'Your Income in Bracket'
                    ]}
                  />
                  <Bar dataKey="width" fill="#E5E7EB" name="Bracket Range" />
                  <Bar dataKey="currentIncome" fill="#3B82F6" name="Your Income" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Marginal vs Effective Rate</CardTitle>
                <CardDescription>Understanding your tax rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div>
                    <div className="font-medium">Marginal Tax Rate</div>
                    <div className="text-sm text-muted-foreground">
                      Rate on next dollar earned
                    </div>
                  </div>
                  <div className="text-2xl font-bold">22%</div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div>
                    <div className="font-medium">Effective Tax Rate</div>
                    <div className="text-sm text-muted-foreground">
                      Average rate on all income
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{effectiveRate.toFixed(1)}%</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Income Scenarios</CardTitle>
                <CardDescription>Tax impact of income changes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>$10k raise:</span>
                  <span className="text-red-600">+$2,200 tax</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>$20k raise:</span>
                  <span className="text-red-600">+$4,400 tax</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>$50k raise:</span>
                  <span className="text-red-600">+$12,000 tax</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Next bracket at:</span>
                  <span className="font-medium">$182,050</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deductions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Deduction Strategy</CardTitle>
                <CardDescription>Standard vs itemized deduction analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="font-medium">Standard Deduction</div>
                      <div className="text-sm text-muted-foreground">2024 single filer</div>
                    </div>
                    <div className="text-xl font-bold">$14,600</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="font-medium">Itemized Deductions</div>
                      <div className="text-sm text-muted-foreground">Total itemized amount</div>
                    </div>
                    <div className="text-xl font-bold">${totalItemizedDeductions.toLocaleString()}</div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-medium text-green-800">
                        {shouldItemize ? 'Itemize' : 'Take Standard'} Deduction
                      </span>
                    </div>
                    <div className="text-sm text-green-700 mt-1">
                      Save ${Math.abs(totalItemizedDeductions - 14600).toLocaleString()} vs alternative
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Itemized Deductions Breakdown</CardTitle>
                <CardDescription>Your potential itemized deductions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie
                      data={deductionsData.filter(d => d.type === 'itemized')}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="amount"
                    >
                      {deductionsData.filter(d => d.type === 'itemized').map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Deduction Opportunities</CardTitle>
              <CardDescription>Potential deductions you might be missing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="font-medium">Home Office</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Deduct $5/sq ft up to 300 sq ft for home office use
                  </div>
                  <div className="text-sm font-medium text-green-600 mt-2">
                    Potential: $1,500
                  </div>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="font-medium">Education Credits</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    American Opportunity or Lifetime Learning credits
                  </div>
                  <div className="text-sm font-medium text-green-600 mt-2">
                    Potential: $2,500
                  </div>
                </div>

                <div className="p-4 rounded-lg border">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="font-medium">Energy Credits</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Solar, heat pumps, and other energy improvements
                  </div>
                  <div className="text-sm font-medium text-green-600 mt-2">
                    Potential: 30% of cost
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Optimization Strategies</CardTitle>
              <CardDescription>Ranked by potential tax savings and implementation difficulty</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {optimizationOpportunities.map((opportunity, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="font-medium">{opportunity.strategy}</span>
                        <Badge variant="outline" className="ml-2">
                          {opportunity.difficulty}
                        </Badge>
                        <Badge 
                          variant={opportunity.impact === 'High' ? 'default' : 'secondary'} 
                          className="ml-2"
                        >
                          {opportunity.impact} Impact
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          ${opportunity.potentialSavings.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">potential savings</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Current: ${opportunity.currentContribution.toLocaleString()}</span>
                      <span>Max: ${opportunity.maxContribution.toLocaleString()}</span>
                    </div>
                    
                    <Progress 
                      value={(opportunity.currentContribution / opportunity.maxContribution) * 100} 
                      className="h-2 mt-2" 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Year-End Tax Planning</CardTitle>
                <CardDescription>Actions to take before December 31st</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Maximize retirement contributions</p>
                    <p className="text-xs text-muted-foreground">
                      Increase 401(k) to $23,000 limit by year-end
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Review tax-loss harvesting</p>
                    <p className="text-xs text-muted-foreground">
                      Realize losses to offset capital gains
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Bunch charitable deductions</p>
                    <p className="text-xs text-muted-foreground">
                      Consider donor-advised fund for larger deduction
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Multi-Year Tax Strategy</CardTitle>
                <CardDescription>Long-term tax planning considerations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="font-medium text-blue-800">Roth Conversion Ladder</div>
                  <div className="text-sm text-blue-700">
                    Convert traditional IRA to Roth during lower income years
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <div className="font-medium text-green-800">Tax Location Strategy</div>
                  <div className="text-sm text-green-700">
                    Optimize asset placement across account types
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="font-medium text-purple-800">Estate Tax Planning</div>
                  <div className="text-sm text-purple-700">
                    Consider gift tax exclusions and estate planning
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