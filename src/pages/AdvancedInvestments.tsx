import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target,
  Globe,
  Building,
  Zap,
  Shield,
  Plus,
  Filter,
  Download
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
  Brush,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  TreeMap
} from 'recharts'

// Enhanced data with more sophisticated metrics
const portfolioPerformanceData = [
  { date: '2024-01', portfolio: 145000, benchmark: 142000, drawdown: -2.1 },
  { date: '2024-02', portfolio: 152000, benchmark: 148000, drawdown: -1.8 },
  { date: '2024-03', portfolio: 148000, benchmark: 145000, drawdown: -4.2 },
  { date: '2024-04', portfolio: 158000, benchmark: 152000, drawdown: -2.5 },
  { date: '2024-05', portfolio: 165000, benchmark: 158000, drawdown: -1.2 },
  { date: '2024-06', portfolio: 172000, benchmark: 163000, drawdown: -0.8 },
  { date: '2024-07', portfolio: 168000, benchmark: 160000, drawdown: -3.1 },
]

const sectorAllocationData = [
  { name: 'Technology', value: 28.5, amount: 47025, color: '#3B82F6', performance: 15.2 },
  { name: 'Healthcare', value: 18.2, amount: 30030, color: '#10B981', performance: 8.7 },
  { name: 'Financial', value: 15.8, amount: 26070, color: '#F59E0B', performance: 12.1 },
  { name: 'Consumer Disc.', value: 12.4, amount: 20460, color: '#EF4444', performance: -2.3 },
  { name: 'Industrials', value: 10.1, amount: 16665, color: '#8B5CF6', performance: 6.8 },
  { name: 'Energy', value: 8.3, amount: 13695, color: '#06B6D4', performance: 22.4 },
  { name: 'Materials', value: 4.2, amount: 6930, color: '#84CC16', performance: 4.1 },
  { name: 'Utilities', value: 2.5, amount: 4125, color: '#F97316', performance: 1.9 },
]

const geographicAllocationData = [
  { name: 'US', value: 65.2, amount: 107580, color: '#3B82F6' },
  { name: 'Europe', value: 18.5, amount: 30525, color: '#10B981' },
  { name: 'Asia Pacific', value: 12.8, amount: 21120, color: '#F59E0B' },
  { name: 'Emerging Markets', value: 3.5, amount: 5775, color: '#EF4444' },
]

const riskMetricsData = [
  { metric: 'Volatility', value: 85, benchmark: 100, label: '12.4%' },
  { metric: 'Beta', value: 92, benchmark: 100, label: '0.92' },
  { metric: 'Sharpe Ratio', value: 125, benchmark: 100, label: '1.25' },
  { metric: 'Max Drawdown', value: 75, benchmark: 100, label: '-8.2%' },
  { metric: 'Alpha', value: 115, benchmark: 100, label: '2.8%' },
  { metric: 'Information Ratio', value: 110, benchmark: 100, label: '0.65' },
]

const topHoldings = [
  { symbol: 'AAPL', name: 'Apple Inc.', weight: 8.2, value: 13530, sector: 'Technology', country: 'US', pe: 28.5, dividend: 0.44 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', weight: 7.8, value: 12870, sector: 'Technology', country: 'US', pe: 32.1, dividend: 0.68 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', weight: 6.1, value: 10065, sector: 'Technology', country: 'US', pe: 24.2, dividend: 0.00 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', weight: 5.4, value: 8910, sector: 'Consumer Disc.', country: 'US', pe: 45.8, dividend: 0.00 },
  { symbol: 'TSLA', name: 'Tesla Inc.', weight: 4.2, value: 6930, sector: 'Consumer Disc.', country: 'US', pe: 65.2, dividend: 0.00 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', weight: 3.8, value: 6270, sector: 'Technology', country: 'US', pe: 58.4, dividend: 0.16 },
  { symbol: 'JNJ', name: 'Johnson & Johnson', weight: 3.2, value: 5280, sector: 'Healthcare', country: 'US', pe: 15.8, dividend: 2.95 },
  { symbol: 'V', name: 'Visa Inc.', weight: 2.9, value: 4785, sector: 'Financial', country: 'US', pe: 35.2, dividend: 1.50 },
]

const performanceAttribution = [
  { factor: 'Asset Allocation', contribution: 2.8, color: '#3B82F6' },
  { factor: 'Security Selection', contribution: 1.4, color: '#10B981' },
  { factor: 'Sector Allocation', contribution: 0.8, color: '#F59E0B' },
  { factor: 'Currency Effect', contribution: -0.3, color: '#EF4444' },
  { factor: 'Interaction Effect', contribution: 0.1, color: '#8B5CF6' },
]

const correlationData = [
  { asset: 'Portfolio', portfolio: 1.00, sp500: 0.85, bonds: -0.12, gold: 0.23, reits: 0.68 },
  { asset: 'S&P 500', portfolio: 0.85, sp500: 1.00, bonds: -0.18, gold: 0.15, reits: 0.72 },
  { asset: 'Bonds', portfolio: -0.12, sp500: -0.18, bonds: 1.00, gold: 0.45, reits: -0.25 },
  { asset: 'Gold', portfolio: 0.23, sp500: 0.15, bonds: 0.45, gold: 1.00, reits: 0.18 },
  { asset: 'REITs', portfolio: 0.68, sp500: 0.72, bonds: -0.25, gold: 0.18, reits: 1.00 },
]

export function AdvancedInvestments() {
  const [timeframe, setTimeframe] = useState('1Y')
  const [viewMode, setViewMode] = useState('performance')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Advanced Investment Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive portfolio analysis with institutional-grade metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1M">1M</SelectItem>
              <SelectItem value="3M">3M</SelectItem>
              <SelectItem value="6M">6M</SelectItem>
              <SelectItem value="1Y">1Y</SelectItem>
              <SelectItem value="3Y">3Y</SelectItem>
              <SelectItem value="5Y">5Y</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Position
          </Button>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$168,000</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +15.8% YTD
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alpha</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+2.8%</div>
            <div className="text-xs text-muted-foreground">vs S&P 500</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sharpe Ratio</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.25</div>
            <div className="text-xs text-green-600">Excellent</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beta</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.92</div>
            <div className="text-xs text-muted-foreground">Lower volatility</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Max Drawdown</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">-8.2%</div>
            <div className="text-xs text-muted-foreground">Past 12 months</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs value={viewMode} onValueChange={setViewMode} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="attribution">Attribution</TabsTrigger>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Portfolio vs Benchmark */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Portfolio Performance vs Benchmark</CardTitle>
                <CardDescription>Cumulative returns with drawdown analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={portfolioPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'drawdown' ? `${value}%` : `$${value.toLocaleString()}`, 
                        name === 'portfolio' ? 'Portfolio' : name === 'benchmark' ? 'S&P 500' : 'Drawdown'
                      ]} 
                    />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="portfolio"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.1}
                      strokeWidth={3}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="benchmark"
                      stroke="#10B981"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="drawdown"
                      stroke="#EF4444"
                      strokeWidth={2}
                    />
                    <Brush dataKey="date" height={30} stroke="#3B82F6" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Sector Allocation */}
            <Card>
              <CardHeader>
                <CardTitle>Sector Allocation</CardTitle>
                <CardDescription>Portfolio breakdown by sector with performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={sectorAllocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {sectorAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name, props) => [
                        `${value}% ($${props.payload.amount.toLocaleString()})`,
                        props.payload.name
                      ]} 
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Geographic Allocation */}
            <Card>
              <CardHeader>
                <CardTitle>Geographic Allocation</CardTitle>
                <CardDescription>Portfolio distribution by region</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={geographicAllocationData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                    <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Sector Performance Heatmap */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Sector Performance Analysis</CardTitle>
                <CardDescription>Allocation vs performance by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={sectorAllocationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="value" name="Allocation %" />
                    <YAxis dataKey="performance" name="Performance %" />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'value' ? `${value}%` : `${value}%`,
                        name === 'value' ? 'Allocation' : 'Performance'
                      ]}
                      labelFormatter={(label) => sectorAllocationData.find(d => d.value === label)?.name}
                    />
                    <Scatter dataKey="performance" fill="#3B82F6" />
                    <ReferenceLine x={0} stroke="#666" strokeDasharray="2 2" />
                    <ReferenceLine y={0} stroke="#666" strokeDasharray="2 2" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Risk Metrics Radar */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Profile Analysis</CardTitle>
                <CardDescription>Portfolio vs benchmark risk metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={riskMetricsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={90} domain={[0, 150]} />
                    <Radar
                      name="Portfolio"
                      dataKey="value"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Benchmark"
                      dataKey="benchmark"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.1}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Correlation Matrix */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Correlation Matrix</CardTitle>
                <CardDescription>Correlation coefficients between asset classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {correlationData.map((row, i) => (
                    <div key={row.asset} className="grid grid-cols-6 gap-1 text-xs">
                      <div className="font-medium text-right pr-2">{row.asset}</div>
                      {Object.entries(row).slice(1).map(([key, value], j) => (
                        <div
                          key={key}
                          className={`text-center p-1 rounded ${
                            value > 0.7 ? 'bg-red-100 text-red-800' :
                            value > 0.3 ? 'bg-yellow-100 text-yellow-800' :
                            value > -0.3 ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {value.toFixed(2)}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Attribution Analysis</CardTitle>
              <CardDescription>Breakdown of portfolio performance by contributing factors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceAttribution} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="factor" type="category" width={120} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Contribution']} />
                  <ReferenceLine x={0} stroke="#666" strokeWidth={2} />
                  <Bar 
                    dataKey="contribution" 
                    fill={(entry) => entry.contribution >= 0 ? '#10B981' : '#EF4444'}
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="holdings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Holdings Analysis</CardTitle>
              <CardDescription>Detailed breakdown of largest positions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Symbol</th>
                      <th className="text-left py-2">Company</th>
                      <th className="text-right py-2">Weight</th>
                      <th className="text-right py-2">Value</th>
                      <th className="text-left py-2">Sector</th>
                      <th className="text-left py-2">Country</th>
                      <th className="text-right py-2">P/E</th>
                      <th className="text-right py-2">Dividend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topHoldings.map((holding) => (
                      <tr key={holding.symbol} className="border-b hover:bg-muted/50">
                        <td className="py-3">
                          <div className="font-medium">{holding.symbol}</div>
                        </td>
                        <td className="py-3">
                          <div className="text-sm">{holding.name}</div>
                        </td>
                        <td className="text-right py-3">{holding.weight}%</td>
                        <td className="text-right py-3">${holding.value.toLocaleString()}</td>
                        <td className="py-3">
                          <Badge variant="outline" className="text-xs">
                            {holding.sector}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center">
                            <Globe className="mr-1 h-3 w-3" />
                            {holding.country}
                          </div>
                        </td>
                        <td className="text-right py-3">{holding.pe}</td>
                        <td className="text-right py-3">
                          {holding.dividend > 0 ? `$${holding.dividend}` : '-'}
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