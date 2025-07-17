import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Target,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Zap,
  DollarSign,
  Calendar,
  PieChart
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// Mock data for AI-powered budgeting
const budgetCategories = [
  { 
    id: '1',
    name: 'Housing', 
    budgeted: 2800, 
    spent: 2650, 
    remaining: 150,
    aiRecommended: true,
    aiConfidence: 0.92,
    lifestyleFactors: ['urban_living', 'single_person', 'tech_worker'],
    trend: 'stable'
  },
  { 
    id: '2',
    name: 'Food & Dining', 
    budgeted: 800, 
    spent: 920, 
    remaining: -120,
    aiRecommended: true,
    aiConfidence: 0.85,
    lifestyleFactors: ['busy_schedule', 'frequent_dining_out'],
    trend: 'increasing'
  },
  { 
    id: '3',
    name: 'Transportation', 
    budgeted: 600, 
    spent: 480, 
    remaining: 120,
    aiRecommended: false,
    aiConfidence: 0.78,
    lifestyleFactors: ['public_transport', 'occasional_rideshare'],
    trend: 'decreasing'
  },
  { 
    id: '4',
    name: 'Entertainment', 
    budgeted: 400, 
    spent: 350, 
    remaining: 50,
    aiRecommended: true,
    aiConfidence: 0.88,
    lifestyleFactors: ['social_person', 'weekend_activities'],
    trend: 'stable'
  },
  { 
    id: '5',
    name: 'Health & Fitness', 
    budgeted: 300, 
    spent: 280, 
    remaining: 20,
    aiRecommended: true,
    aiConfidence: 0.90,
    lifestyleFactors: ['gym_membership', 'health_conscious'],
    trend: 'stable'
  },
  { 
    id: '6',
    name: 'Shopping', 
    budgeted: 500, 
    spent: 650, 
    remaining: -150,
    aiRecommended: false,
    aiConfidence: 0.65,
    lifestyleFactors: ['impulse_buyer', 'fashion_conscious'],
    trend: 'increasing'
  }
]

const aiInsights = [
  {
    type: 'recommendation',
    title: 'Optimize Food Budget',
    description: 'Based on your busy lifestyle, consider meal prep services. This could save you $200/month while maintaining nutrition.',
    category: 'Food & Dining',
    priority: 'high',
    actionRequired: true,
    confidence: 0.89
  },
  {
    type: 'warning',
    title: 'Shopping Overspend Alert',
    description: 'You\'ve exceeded your shopping budget by 30%. Consider implementing a 24-hour rule for non-essential purchases.',
    category: 'Shopping',
    priority: 'medium',
    actionRequired: true,
    confidence: 0.92
  },
  {
    type: 'achievement',
    title: 'Transportation Savings',
    description: 'Great job! You\'ve saved $120 on transportation this month by using public transit more frequently.',
    category: 'Transportation',
    priority: 'low',
    actionRequired: false,
    confidence: 0.95
  }
]

const budgetTrendData = [
  { month: 'Jan', budgeted: 5400, actual: 5200 },
  { month: 'Feb', budgeted: 5400, actual: 5600 },
  { month: 'Mar', budgeted: 5400, actual: 5100 },
  { month: 'Apr', budgeted: 5400, actual: 5800 },
  { month: 'May', budgeted: 5400, actual: 5330 },
]

const lifestyleProfile = {
  primaryFactors: ['tech_worker', 'urban_living', 'health_conscious', 'social_person'],
  spendingPersonality: 'Balanced Spender',
  riskTolerance: 'Medium',
  financialGoals: ['emergency_fund', 'house_down_payment', 'retirement'],
  aiConfidence: 0.87
}

export function SmartBudgeting() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0)
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0)
  const totalRemaining = totalBudgeted - totalSpent

  const getProgressColor = (spent: number, budgeted: number) => {
    const percentage = (spent / budgeted) * 100
    if (percentage > 100) return 'bg-red-500'
    if (percentage > 80) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 text-green-500" />
      default:
        return <Target className="h-4 w-4 text-blue-500" />
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'recommendation':
        return <Lightbulb className="h-5 w-5 text-blue-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'achievement':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Brain className="h-5 w-5 text-purple-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-8 w-8 text-purple-500" />
            Smart Budgeting
          </h1>
          <p className="text-muted-foreground">
            AI-powered budgeting that adapts to your lifestyle, just like Lifesum for your finances
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Zap className="h-3 w-3" />
            AI Confidence: {Math.round(lifestyleProfile.aiConfidence * 100)}%
          </Badge>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budgeted</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudgeted.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month's budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
            <div className="flex items-center text-xs">
              {totalSpent > totalBudgeted ? (
                <span className="text-red-600">Over budget by ${(totalSpent - totalBudgeted).toLocaleString()}</span>
              ) : (
                <span className="text-green-600">{Math.round((totalSpent / totalBudgeted) * 100)}% of budget used</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalRemaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
              ${Math.abs(totalRemaining).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalRemaining < 0 ? 'Over budget' : 'Left to spend'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="budget" className="space-y-4">
        <TabsList>
          <TabsTrigger value="budget">Budget Overview</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="lifestyle">Lifestyle Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="budget" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Budget Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Categories</CardTitle>
                <CardDescription>AI-optimized budget based on your lifestyle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {budgetCategories.map((category) => {
                  const percentage = (category.spent / category.budgeted) * 100
                  return (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{category.name}</span>
                          {category.aiRecommended && (
                            <Badge variant="outline" className="text-xs">
                              <Brain className="h-3 w-3 mr-1" />
                              AI
                            </Badge>
                          )}
                          {getTrendIcon(category.trend)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ${category.spent} / ${category.budgeted}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <Progress 
                          value={Math.min(percentage, 100)} 
                          className="h-2"
                        />
                        <div className="flex justify-between text-xs">
                          <span className={percentage > 100 ? 'text-red-600' : 'text-muted-foreground'}>
                            {Math.round(percentage)}% used
                          </span>
                          <span className={category.remaining < 0 ? 'text-red-600' : 'text-green-600'}>
                            ${Math.abs(category.remaining)} {category.remaining < 0 ? 'over' : 'left'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Budget vs Actual Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Performance</CardTitle>
                <CardDescription>Monthly budget vs actual spending</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={budgetTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="budgeted" 
                      stroke="#3B82F6" 
                      strokeDasharray="5 5"
                      name="Budgeted"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#10B981" 
                      name="Actual"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                AI-Powered Insights
              </CardTitle>
              <CardDescription>
                Personalized recommendations based on your spending patterns and lifestyle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium">{insight.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={insight.priority === 'high' ? 'destructive' : insight.priority === 'medium' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {insight.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {Math.round(insight.confidence * 100)}% confidence
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                    {insight.actionRequired && (
                      <Button size="sm" variant="outline">
                        Take Action
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifestyle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Your Lifestyle Profile
              </CardTitle>
              <CardDescription>
                AI analysis of your spending personality and lifestyle factors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium mb-2">Spending Personality</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-sm">
                      {lifestyleProfile.spendingPersonality}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(lifestyleProfile.aiConfidence * 100)}% match
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Risk Tolerance</h4>
                  <Badge variant="outline">{lifestyleProfile.riskTolerance}</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Lifestyle Factors</h4>
                <div className="flex flex-wrap gap-2">
                  {lifestyleProfile.primaryFactors.map((factor) => (
                    <Badge key={factor} variant="outline" className="text-xs">
                      {factor.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Financial Goals</h4>
                <div className="flex flex-wrap gap-2">
                  {lifestyleProfile.financialGoals.map((goal) => (
                    <Badge key={goal} variant="secondary" className="text-xs">
                      {goal.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">AI Recommendation</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on your profile as a tech worker who values health and social activities, 
                  we recommend allocating 15% more to your emergency fund and considering automated 
                  investments to match your busy lifestyle.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}