import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart,
  BarChart3,
  Plus
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const portfolioData = [
  { month: 'Jan', value: 145000 },
  { month: 'Feb', value: 152000 },
  { month: 'Mar', value: 148000 },
  { month: 'Apr', value: 158000 },
  { month: 'May', value: 165000 },
]

const allocationData = [
  { name: 'Stocks', value: 60, amount: 99000, color: '#3B82F6' },
  { name: 'Bonds', value: 30, amount: 49500, color: '#10B981' },
  { name: 'Real Estate', value: 7, amount: 11550, color: '#F59E0B' },
  { name: 'Commodities', value: 3, amount: 4950, color: '#EF4444' },
]

const holdings = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, price: 175.43, value: 8771.50, change: 2.34, changePercent: 1.35 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 30, price: 334.69, value: 10040.70, change: -1.23, changePercent: -0.37 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 25, price: 138.21, value: 3455.25, change: 4.56, changePercent: 3.41 },
  { symbol: 'TSLA', name: 'Tesla Inc.', shares: 15, price: 248.50, value: 3727.50, change: -8.90, changePercent: -3.46 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 20, price: 127.74, value: 2554.80, change: 2.15, changePercent: 1.71 },
]

const performanceMetrics = [
  { metric: 'Total Return', value: '+12.5%', period: 'YTD', isPositive: true },
  { metric: 'Annualized Return', value: '+8.7%', period: '3Y', isPositive: true },
  { metric: 'Sharpe Ratio', value: '1.24', period: '1Y', isPositive: true },
  { metric: 'Max Drawdown', value: '-8.2%', period: '1Y', isPositive: false },
]

export function Investments() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investment Portfolio</h1>
          <p className="text-muted-foreground">
            Track your investments and portfolio performance
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Investment
        </Button>
      </div>

      {/* Portfolio Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$165,000</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +4.4% this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+$18,250</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12.5% total return
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Day's Change</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+$1,245</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +0.76% today
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dividend Income</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,840</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +15.2% YTD
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Key performance indicators for your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {performanceMetrics.map((metric) => (
              <div key={metric.metric} className="text-center">
                <div className={`text-2xl font-bold ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.value}
                </div>
                <div className="text-sm font-medium">{metric.metric}</div>
                <div className="text-xs text-muted-foreground">{metric.period}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Portfolio Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Portfolio value over the past 5 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Asset Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Current portfolio allocation by asset class</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Holdings</CardTitle>
          <CardDescription>Your individual stock positions and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Symbol</th>
                  <th className="text-left py-2">Company</th>
                  <th className="text-right py-2">Shares</th>
                  <th className="text-right py-2">Price</th>
                  <th className="text-right py-2">Value</th>
                  <th className="text-right py-2">Change</th>
                  <th className="text-right py-2">% Change</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => (
                  <tr key={holding.symbol} className="border-b">
                    <td className="py-3">
                      <div className="font-medium">{holding.symbol}</div>
                    </td>
                    <td className="py-3">
                      <div className="text-sm text-muted-foreground">{holding.name}</div>
                    </td>
                    <td className="text-right py-3">{holding.shares}</td>
                    <td className="text-right py-3">${holding.price.toFixed(2)}</td>
                    <td className="text-right py-3">${holding.value.toLocaleString()}</td>
                    <td className={`text-right py-3 ${holding.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {holding.change >= 0 ? '+' : ''}${holding.change.toFixed(2)}
                    </td>
                    <td className={`text-right py-3 ${holding.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <Badge variant={holding.changePercent >= 0 ? 'default' : 'destructive'} className="text-xs">
                        {holding.changePercent >= 0 ? '+' : ''}{holding.changePercent.toFixed(2)}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}