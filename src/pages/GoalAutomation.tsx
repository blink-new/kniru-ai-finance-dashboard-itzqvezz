import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  DollarSign,
  Zap,
  CheckCircle,
  Clock,
  AlertTriangle,
  Settings,
  Plus,
  Home,
  Car,
  GraduationCap,
  Plane,
  PiggyBank,
  Heart,
  Briefcase,
  Sparkles,
  BarChart3,
  ArrowRight,
  Repeat,
  Shield,
  Brain
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

interface Goal {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  targetDate: string
  category: string
  priority: 'high' | 'medium' | 'low'
  automationEnabled: boolean
  monthlyContribution: number
  icon: any
  color: string
  status: 'on-track' | 'behind' | 'ahead' | 'completed'
  aiOptimized: boolean
}

const goals: Goal[] = [
  {
    id: '1',
    title: 'Emergency Fund',
    description: '6 months of expenses for financial security',
    targetAmount: 30000,
    currentAmount: 22500,
    targetDate: '2024-12-31',
    category: 'Security',
    priority: 'high',
    automationEnabled: true,
    monthlyContribution: 1250,
    icon: Shield,
    color: '#10B981',
    status: 'on-track',
    aiOptimized: true
  },
  {
    id: '2',
    title: 'House Down Payment',
    description: '20% down payment for dream home',
    targetAmount: 80000,
    currentAmount: 45000,
    targetDate: '2025-06-30',
    category: 'Housing',
    priority: 'high',
    automationEnabled: true,
    monthlyContribution: 3200,
    icon: Home,
    color: '#3B82F6',
    status: 'behind',
    aiOptimized: true
  },
  {
    id: '3',
    title: 'New Car',
    description: 'Tesla Model 3 upgrade',
    targetAmount: 45000,
    currentAmount: 18000,
    targetDate: '2025-03-15',
    category: 'Transportation',
    priority: 'medium',
    automationEnabled: false,
    monthlyContribution: 0,
    icon: Car,
    color: '#F59E0B',
    status: 'behind',
    aiOptimized: false
  },
  {
    id: '4',
    title: 'European Vacation',
    description: '3-week trip across Europe',
    targetAmount: 12000,
    currentAmount: 8500,
    targetDate: '2024-09-01',
    category: 'Travel',
    priority: 'low',
    automationEnabled: true,
    monthlyContribution: 500,
    icon: Plane,
    color: '#8B5CF6',
    status: 'ahead',
    aiOptimized: true
  },
  {
    id: '5',
    title: 'MBA Program',
    description: 'Executive MBA at top business school',
    targetAmount: 120000,
    currentAmount: 35000,
    targetDate: '2026-08-31',
    category: 'Education',
    priority: 'medium',
    automationEnabled: true,
    monthlyContribution: 2800,
    icon: GraduationCap,
    color: '#EF4444',
    status: 'on-track',
    aiOptimized: true
  }
]

// AI optimization suggestions
const aiSuggestions = [
  {
    id: '1',
    goalId: '2',
    type: 'rebalance',
    title: 'Optimize House Down Payment Strategy',
    description: 'Switch from savings account (0.5% APY) to high-yield CD ladder (4.2% APY) to earn extra $2,400',
    impact: 2400,
    effort: 'Low',
    timeframe: 'This week'
  },
  {
    id: '2',
    goalId: '3',
    type: 'automation',
    title: 'Enable Car Fund Automation',
    description: 'Set up automatic transfers of $3,375/month to reach your Tesla goal on time',
    impact: 0,
    effort: 'Low',
    timeframe: 'Today'
  },
  {
    id: '3',
    goalId: '1',
    type: 'acceleration',
    title: 'Accelerate Emergency Fund',
    description: 'Redirect credit card rewards ($180/month) to complete emergency fund 3 months early',
    impact: 540,
    effort: 'Low',
    timeframe: 'This month'
  }
]

// Goal progress over time
const progressData = [
  { month: 'Jan', emergencyFund: 18000, houseDown: 38000, car: 12000, vacation: 6000, mba: 28000 },
  { month: 'Feb', emergencyFund: 19250, houseDown: 41200, car: 14000, vacation: 6500, mba: 30800 },
  { month: 'Mar', emergencyFund: 20500, houseDown: 44400, car: 15500, vacation: 7000, mba: 33600 },
  { month: 'Apr', emergencyFund: 21750, houseDown: 47600, car: 16800, vacation: 7500, mba: 36400 },
  { month: 'May', emergencyFund: 22500, houseDown: 45000, car: 18000, vacation: 8500, mba: 35000 },
]

// Automation rules
const automationRules = [
  {
    id: '1',
    name: 'Paycheck Split',
    description: 'Automatically allocate 15% of each paycheck to goals',
    enabled: true,
    frequency: 'Bi-weekly',
    amount: 1875
  },
  {
    id: '2',
    name: 'Round-up Savings',
    description: 'Round up purchases and save the difference',
    enabled: true,
    frequency: 'Daily',
    amount: 45
  },
  {
    id: '3',
    name: 'Bonus Allocation',
    description: 'Put 50% of bonuses toward high-priority goals',
    enabled: true,
    frequency: 'As needed',
    amount: 0
  },
  {
    id: '4',
    name: 'Tax Refund',
    description: 'Automatically invest tax refunds in goal accounts',
    enabled: false,
    frequency: 'Annually',
    amount: 2400
  }
]

export function GoalAutomation() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [newGoalAmount, setNewGoalAmount] = useState(10000)
  const [newGoalDate, setNewGoalDate] = useState('2025-12-31')

  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const totalMonthlyContribution = goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0)
  const overallProgress = (totalCurrentAmount / totalGoalAmount) * 100

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600 bg-green-50 border-green-200'
      case 'ahead': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'behind': return 'text-red-600 bg-red-50 border-red-200'
      case 'completed': return 'text-purple-600 bg-purple-50 border-purple-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'medium': return 'default'
      case 'low': return 'secondary'
      default: return 'outline'
    }
  }

  const calculateMonthsToGoal = (goal: Goal) => {
    if (goal.monthlyContribution === 0) return '∞'
    const remaining = goal.targetAmount - goal.currentAmount
    return Math.ceil(remaining / goal.monthlyContribution)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Goal Automation Center</h1>
          <p className="text-muted-foreground">
            AI-powered goal setting with automated savings and investment strategies
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Automation Rules
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Goal
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Goal Value</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalGoalAmount / 1000).toFixed(0)}k</div>
            <div className="text-xs text-muted-foreground">
              Across {goals.length} active goals
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress.toFixed(1)}%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              ${(totalCurrentAmount / 1000).toFixed(0)}k saved
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Automation</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalMonthlyContribution.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">
              Auto-saved per month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Optimizations</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aiSuggestions.length}</div>
            <div className="text-xs text-green-600">
              ${aiSuggestions.reduce((sum, s) => sum + s.impact, 0).toLocaleString()} potential savings
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">My Goals</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="ai-optimize">AI Optimize</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Goal Progress Chart */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Goal Progress Over Time</CardTitle>
                <CardDescription>Track your progress toward all financial goals</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="emergencyFund"
                      stackId="1"
                      stroke="#10B981"
                      fill="#10B981"
                      name="Emergency Fund"
                    />
                    <Area
                      type="monotone"
                      dataKey="houseDown"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      name="House Down Payment"
                    />
                    <Area
                      type="monotone"
                      dataKey="car"
                      stackId="1"
                      stroke="#F59E0B"
                      fill="#F59E0B"
                      name="New Car"
                    />
                    <Area
                      type="monotone"
                      dataKey="vacation"
                      stackId="1"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      name="Vacation"
                    />
                    <Area
                      type="monotone"
                      dataKey="mba"
                      stackId="1"
                      stroke="#EF4444"
                      fill="#EF4444"
                      name="MBA Program"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Goal Statistics</CardTitle>
                <CardDescription>Key metrics for your financial goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Goals on track</span>
                  <span className="font-medium">
                    {goals.filter(g => g.status === 'on-track').length} of {goals.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Automated goals</span>
                  <span className="font-medium">
                    {goals.filter(g => g.automationEnabled).length} of {goals.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">AI optimized</span>
                  <span className="font-medium">
                    {goals.filter(g => g.aiOptimized).length} of {goals.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Average completion</span>
                  <span className="font-medium">{overallProgress.toFixed(0)}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Automation Status */}
            <Card>
              <CardHeader>
                <CardTitle>Active Automation Rules</CardTitle>
                <CardDescription>Your automated savings strategies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {automationRules.filter(rule => rule.enabled).map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <div className="font-medium text-sm">{rule.name}</div>
                      <div className="text-xs text-muted-foreground">{rule.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {rule.amount > 0 ? `$${rule.amount}` : rule.frequency}
                      </div>
                      <div className="text-xs text-muted-foreground">{rule.frequency}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid gap-4">
            {goals.map((goal) => {
              const Icon = goal.icon
              const progress = (goal.currentAmount / goal.targetAmount) * 100
              const monthsToGoal = calculateMonthsToGoal(goal)
              
              return (
                <Card key={goal.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div 
                          className="flex h-12 w-12 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${goal.color}20`, color: goal.color }}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <CardTitle className="text-lg">{goal.title}</CardTitle>
                            {goal.aiOptimized && (
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                <Sparkles className="h-3 w-3 mr-1" />
                                AI Optimized
                              </Badge>
                            )}
                          </div>
                          <CardDescription>{goal.description}</CardDescription>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant={getPriorityColor(goal.priority)}>
                              {goal.priority} priority
                            </Badge>
                            <Badge variant="outline" className={getStatusColor(goal.status)}>
                              {goal.status}
                            </Badge>
                            <Badge variant="outline">{goal.category}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">${goal.currentAmount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">
                          of ${goal.targetAmount.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Target: {new Date(goal.targetDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{progress.toFixed(1)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Monthly Contribution</div>
                          <div className="font-medium">
                            {goal.monthlyContribution > 0 ? `$${goal.monthlyContribution.toLocaleString()}` : 'Not set'}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Months to Goal</div>
                          <div className="font-medium">{monthsToGoal}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Automation</div>
                          <div className="flex items-center space-x-1">
                            {goal.automationEnabled ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-green-600">Enabled</span>
                              </>
                            ) : (
                              <>
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-600">Disabled</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Settings className="mr-2 h-4 w-4" />
                            Edit Goal
                          </Button>
                          <Button variant="outline" size="sm">
                            <Zap className="mr-2 h-4 w-4" />
                            {goal.automationEnabled ? 'Manage' : 'Enable'} Automation
                          </Button>
                        </div>
                        <Button size="sm">
                          <DollarSign className="mr-2 h-4 w-4" />
                          Add Funds
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Automation Rules</CardTitle>
                <CardDescription>Configure how your money automatically flows to goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {automationRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <Switch checked={rule.enabled} />
                        <div>
                          <div className="font-medium">{rule.name}</div>
                          <div className="text-sm text-muted-foreground">{rule.description}</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {rule.amount > 0 ? `$${rule.amount}` : 'Variable'}
                      </div>
                      <div className="text-sm text-muted-foreground">{rule.frequency}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Smart Allocation</CardTitle>
                <CardDescription>AI-powered fund distribution across your goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {goals.filter(g => g.automationEnabled).map((goal) => {
                    const allocation = (goal.monthlyContribution / totalMonthlyContribution) * 100
                    return (
                      <div key={goal.id} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{goal.title}</span>
                          <span>{allocation.toFixed(0)}%</span>
                        </div>
                        <Progress value={allocation} className="h-2" />
                      </div>
                    )
                  })}
                </div>
                
                <div className="pt-4 border-t">
                  <Button className="w-full">
                    <Brain className="mr-2 h-4 w-4" />
                    Optimize Allocation with AI
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Automation Performance</CardTitle>
                <CardDescription>How automation is helping you reach your goals</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="emergencyFund" fill="#10B981" name="Emergency Fund" />
                    <Bar dataKey="houseDown" fill="#3B82F6" name="House Down Payment" />
                    <Line type="monotone" dataKey="vacation" stroke="#8B5CF6" name="Vacation Goal" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-optimize" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Optimization Recommendations</CardTitle>
              <CardDescription>Personalized suggestions to accelerate your goal achievement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiSuggestions.map((suggestion) => {
                const relatedGoal = goals.find(g => g.id === suggestion.goalId)
                return (
                  <div key={suggestion.id} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                          <Brain className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{suggestion.title}</div>
                          <div className="text-sm text-muted-foreground">{suggestion.description}</div>
                          {relatedGoal && (
                            <Badge variant="outline" className="mt-2">
                              {relatedGoal.title}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        {suggestion.impact > 0 && (
                          <div className="text-lg font-bold text-green-600">
                            +${suggestion.impact.toLocaleString()}
                          </div>
                        )}
                        <div className="text-sm text-muted-foreground">{suggestion.effort} effort</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{suggestion.timeframe}</span>
                        </div>
                        <Badge variant={suggestion.type === 'acceleration' ? 'default' : 'outline'}>
                          {suggestion.type}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                        <Button size="sm">
                          Apply Suggestion
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Goal Completion Forecast</CardTitle>
                <CardDescription>Projected completion dates based on current contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {goals.map((goal) => {
                    const monthsRemaining = calculateMonthsToGoal(goal)
                    const projectedDate = monthsRemaining !== '∞' 
                      ? new Date(Date.now() + parseInt(monthsRemaining) * 30 * 24 * 60 * 60 * 1000)
                      : null
                    
                    return (
                      <div key={goal.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: goal.color }}
                          ></div>
                          <span className="font-medium">{goal.title}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {projectedDate ? projectedDate.toLocaleDateString() : 'Not set'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {monthsRemaining} months
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Savings Rate Analysis</CardTitle>
                <CardDescription>How much of your income goes to goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">18.5%</div>
                    <div className="text-sm text-muted-foreground">of income saved for goals</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Monthly Income</span>
                      <span>$12,500</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Goal Contributions</span>
                      <span>${totalMonthlyContribution.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Savings Rate</span>
                      <span>18.5%</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="text-sm text-muted-foreground mb-2">Recommended: 20%</div>
                    <Progress value={18.5} className="h-2" />
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