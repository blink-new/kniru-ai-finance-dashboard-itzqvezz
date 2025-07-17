import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Globe,
  Search,
  Bell,
  Zap,
  Eye,
  Users,
  MessageSquare,
  Heart,
  Share,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Newspaper,
  BarChart3,
  LineChart,
  PieChart,
  Target
} from 'lucide-react'
import { 
  LineChart as RechartsLineChart, 
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
  ScatterChart,
  Scatter
} from 'recharts'

// Real-time market data
const marketData = [
  { symbol: 'SPY', name: 'S&P 500 ETF', price: 445.67, change: 2.34, changePercent: 0.53, volume: '45.2M' },
  { symbol: 'QQQ', name: 'Nasdaq 100 ETF', price: 378.92, change: -1.45, changePercent: -0.38, volume: '32.1M' },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.45, change: 3.21, changePercent: 1.72, volume: '52.8M' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 342.18, change: 1.89, changePercent: 0.56, volume: '28.4M' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 138.76, change: -2.14, changePercent: -1.52, volume: '24.7M' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.32, change: 8.45, changePercent: 3.52, volume: '89.3M' },
]

// Market news with sentiment
const marketNews = [
  {
    id: '1',
    title: 'Fed Signals Potential Rate Cut in Q4 2024',
    summary: 'Federal Reserve officials hint at possible monetary policy easing amid cooling inflation data.',
    source: 'Reuters',
    timestamp: '2 hours ago',
    sentiment: 'positive',
    impact: 'high',
    relevantSymbols: ['SPY', 'QQQ'],
    readTime: '3 min'
  },
  {
    id: '2',
    title: 'Tech Earnings Season Shows Mixed Results',
    summary: 'Major tech companies report varied quarterly performance with AI investments showing promise.',
    source: 'Bloomberg',
    timestamp: '4 hours ago',
    sentiment: 'neutral',
    impact: 'medium',
    relevantSymbols: ['AAPL', 'MSFT', 'GOOGL'],
    readTime: '5 min'
  },
  {
    id: '3',
    title: 'Electric Vehicle Sales Surge 40% YoY',
    summary: 'Global EV adoption accelerates with new government incentives and improved charging infrastructure.',
    source: 'CNBC',
    timestamp: '6 hours ago',
    sentiment: 'positive',
    impact: 'medium',
    relevantSymbols: ['TSLA'],
    readTime: '4 min'
  },
  {
    id: '4',
    title: 'Geopolitical Tensions Impact Energy Sector',
    summary: 'Rising tensions in key regions drive oil prices higher, affecting energy stock valuations.',
    source: 'Wall Street Journal',
    timestamp: '8 hours ago',
    sentiment: 'negative',
    impact: 'high',
    relevantSymbols: ['XLE'],
    readTime: '6 min'
  }
]

// AI-powered alerts
const aiAlerts = [
  {
    id: '1',
    type: 'opportunity',
    title: 'AAPL Oversold Signal',
    description: 'Technical indicators suggest Apple may be oversold. RSI at 28, potential bounce opportunity.',
    confidence: 78,
    timeframe: '1-3 days',
    action: 'Consider buying',
    timestamp: '15 minutes ago'
  },
  {
    id: '2',
    type: 'risk',
    title: 'Portfolio Concentration Risk',
    description: 'Your tech allocation (28.5%) exceeds recommended maximum. Consider rebalancing.',
    confidence: 92,
    timeframe: 'This week',
    action: 'Rebalance portfolio',
    timestamp: '1 hour ago'
  },
  {
    id: '3',
    type: 'news',
    title: 'Fed Meeting Impact',
    description: 'Upcoming Fed decision likely to impact your bond holdings. Monitor for volatility.',
    confidence: 85,
    timeframe: 'Next 2 days',
    action: 'Monitor positions',
    timestamp: '3 hours ago'
  }
]

// Social sentiment data
const socialSentiment = [
  { symbol: 'AAPL', bullish: 68, bearish: 32, mentions: 15420, trending: true },
  { symbol: 'TSLA', bullish: 72, bearish: 28, mentions: 23150, trending: true },
  { symbol: 'MSFT', bullish: 61, bearish: 39, mentions: 8930, trending: false },
  { symbol: 'GOOGL', bullish: 45, bearish: 55, mentions: 12340, trending: false },
  { symbol: 'SPY', bullish: 58, bearish: 42, mentions: 18750, trending: true },
]

// Market heat map data
const sectorPerformance = [
  { sector: 'Technology', performance: 2.3, size: 28.5, color: '#10B981' },
  { sector: 'Healthcare', performance: 1.1, size: 18.2, color: '#3B82F6' },
  { sector: 'Financial', performance: -0.8, size: 15.8, color: '#EF4444' },
  { sector: 'Consumer Disc.', performance: 0.9, size: 12.4, color: '#F59E0B' },
  { sector: 'Industrials', performance: 1.5, size: 10.1, color: '#8B5CF6' },
  { sector: 'Energy', performance: 3.2, size: 8.3, color: '#06B6D4' },
  { sector: 'Materials', performance: -1.2, size: 4.2, color: '#84CC16' },
  { sector: 'Utilities', performance: 0.3, size: 2.5, color: '#F97316' },
]

// Fear & Greed Index data
const fearGreedData = [
  { date: '2024-07-01', value: 45 },
  { date: '2024-07-08', value: 52 },
  { date: '2024-07-15', value: 38 },
  { date: '2024-07-22', value: 61 },
  { date: '2024-07-29', value: 58 },
]

export function MarketIntelligence() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')
  const [currentFearGreed] = useState(58) // Current Fear & Greed Index

  const getFearGreedLabel = (value: number) => {
    if (value <= 25) return { label: 'Extreme Fear', color: 'text-red-600' }
    if (value <= 45) return { label: 'Fear', color: 'text-orange-600' }
    if (value <= 55) return { label: 'Neutral', color: 'text-gray-600' }
    if (value <= 75) return { label: 'Greed', color: 'text-green-600' }
    return { label: 'Extreme Greed', color: 'text-green-700' }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50 border-green-200'
      case 'negative': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'risk': return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return <Bell className="h-4 w-4 text-blue-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Market Intelligence Hub</h1>
          <p className="text-muted-foreground">
            Real-time market data, AI-powered insights, and social sentiment analysis
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks, news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1D">1D</SelectItem>
              <SelectItem value="1W">1W</SelectItem>
              <SelectItem value="1M">1M</SelectItem>
              <SelectItem value="3M">3M</SelectItem>
              <SelectItem value="1Y">1Y</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button>
            <Bell className="mr-2 h-4 w-4" />
            Alerts
          </Button>
        </div>
      </div>

      {/* Market Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">S&P 500</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,456.78</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +0.53% (+23.45)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fear & Greed Index</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentFearGreed}</div>
            <div className={`text-xs ${getFearGreedLabel(currentFearGreed).color}`}>
              {getFearGreedLabel(currentFearGreed).label}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VIX (Volatility)</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.45</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +2.1% (Low volatility)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aiAlerts.length}</div>
            <div className="text-xs text-muted-foreground">
              {aiAlerts.filter(a => a.type === 'opportunity').length} opportunities
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          <TabsTrigger value="news">News & Sentiment</TabsTrigger>
          <TabsTrigger value="alerts">AI Alerts</TabsTrigger>
          <TabsTrigger value="social">Social Trading</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Market Heat Map */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Sector Performance Heat Map</CardTitle>
                <CardDescription>Real-time sector performance with market cap weighting</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={sectorPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="size" name="Market Cap %" />
                    <YAxis dataKey="performance" name="Performance %" />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'performance' ? `${value}%` : `${value}%`,
                        name === 'performance' ? 'Performance' : 'Market Cap'
                      ]}
                      labelFormatter={(label) => sectorPerformance.find(d => d.performance === label)?.sector}
                    />
                    <Scatter dataKey="performance" fill="#3B82F6" />
                    <ReferenceLine x={0} stroke="#666" strokeDasharray="2 2" />
                    <ReferenceLine y={0} stroke="#666" strokeDasharray="2 2" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Fear & Greed Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Fear & Greed Index Trend</CardTitle>
                <CardDescription>Market sentiment over the past month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={fearGreedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                    <ReferenceLine y={25} stroke="#EF4444" strokeDasharray="5 5" label="Extreme Fear" />
                    <ReferenceLine y={75} stroke="#10B981" strokeDasharray="5 5" label="Extreme Greed" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Movers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Movers</CardTitle>
                <CardDescription>Biggest gainers and losers today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {marketData.slice(0, 5).map((stock) => (
                    <div key={stock.symbol} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{stock.symbol}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-32">
                          {stock.name}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${stock.price}</div>
                        <div className={`text-sm flex items-center ${
                          stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stock.change >= 0 ? (
                            <TrendingUp className="mr-1 h-3 w-3" />
                          ) : (
                            <TrendingDown className="mr-1 h-3 w-3" />
                          )}
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="watchlist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Watchlist</CardTitle>
              <CardDescription>Real-time quotes for your tracked securities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Symbol</th>
                      <th className="text-left py-2">Name</th>
                      <th className="text-right py-2">Price</th>
                      <th className="text-right py-2">Change</th>
                      <th className="text-right py-2">Change %</th>
                      <th className="text-right py-2">Volume</th>
                      <th className="text-right py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketData.map((stock) => (
                      <tr key={stock.symbol} className="border-b hover:bg-muted/50">
                        <td className="py-3">
                          <div className="font-medium">{stock.symbol}</div>
                        </td>
                        <td className="py-3">
                          <div className="text-sm">{stock.name}</div>
                        </td>
                        <td className="text-right py-3 font-medium">${stock.price}</td>
                        <td className={`text-right py-3 ${
                          stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change}
                        </td>
                        <td className={`text-right py-3 ${
                          stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                        </td>
                        <td className="text-right py-3 text-sm text-muted-foreground">
                          {stock.volume}
                        </td>
                        <td className="text-right py-3">
                          <div className="flex items-center justify-end space-x-1">
                            <Button variant="ghost" size="sm">
                              <LineChart className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Bell className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              {marketNews.map((news) => (
                <Card key={news.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight">{news.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className={getSentimentColor(news.sentiment)}>
                            {news.sentiment}
                          </Badge>
                          <Badge variant={news.impact === 'high' ? 'destructive' : news.impact === 'medium' ? 'default' : 'secondary'}>
                            {news.impact} impact
                          </Badge>
                          <span className="text-sm text-muted-foreground">{news.source}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{news.timestamp}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-4">
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{news.summary}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Relevant:</span>
                        {news.relevantSymbols.map((symbol) => (
                          <Badge key={symbol} variant="outline" className="text-xs">
                            {symbol}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{news.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Sentiment Sidebar */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Social Sentiment</CardTitle>
                  <CardDescription>Real-time social media sentiment analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {socialSentiment.map((sentiment) => (
                    <div key={sentiment.symbol} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{sentiment.symbol}</span>
                          {sentiment.trending && (
                            <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {sentiment.mentions.toLocaleString()} mentions
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${sentiment.bullish}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-green-600">
                          {sentiment.bullish}%
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trending Topics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">#FedMeeting</Badge>
                    <span className="text-sm text-muted-foreground">12.4k posts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">#TechEarnings</Badge>
                    <span className="text-sm text-muted-foreground">8.7k posts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">#EVStocks</Badge>
                    <span className="text-sm text-muted-foreground">6.2k posts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">#MarketVolatility</Badge>
                    <span className="text-sm text-muted-foreground">4.8k posts</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4">
            {aiAlerts.map((alert) => (
              <Card key={alert.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div>
                        <CardTitle className="text-lg">{alert.title}</CardTitle>
                        <CardDescription>{alert.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {alert.confidence}% confidence
                      </Badge>
                      <span className="text-sm text-muted-foreground">{alert.timestamp}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Timeframe:</span>
                        <span className="ml-2 font-medium">{alert.timeframe}</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Recommended Action:</span>
                        <span className="ml-2 font-medium">{alert.action}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                      <Button size="sm">
                        Take Action
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Traders to Follow</CardTitle>
                <CardDescription>High-performing traders in your network</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Sarah Chen', handle: '@sarahtrader', performance: '+24.5%', followers: '12.4k', verified: true },
                  { name: 'Mike Rodriguez', handle: '@miketech', performance: '+18.2%', followers: '8.7k', verified: false },
                  { name: 'Alex Kim', handle: '@alexvalue', performance: '+15.8%', followers: '15.2k', verified: true },
                ].map((trader, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">{trader.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">{trader.name}</span>
                          {trader.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                        </div>
                        <div className="text-sm text-muted-foreground">{trader.handle}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">{trader.performance}</div>
                      <div className="text-sm text-muted-foreground">{trader.followers} followers</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Trades</CardTitle>
                <CardDescription>Latest trades from your network</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { trader: 'Sarah Chen', action: 'BOUGHT', symbol: 'AAPL', amount: '$5,000', time: '2h ago' },
                  { trader: 'Mike Rodriguez', action: 'SOLD', symbol: 'TSLA', amount: '$3,200', time: '4h ago' },
                  { trader: 'Alex Kim', action: 'BOUGHT', symbol: 'MSFT', amount: '$7,500', time: '6h ago' },
                ].map((trade, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <div className="font-medium">{trade.trader}</div>
                      <div className="text-sm text-muted-foreground">
                        <span className={trade.action === 'BOUGHT' ? 'text-green-600' : 'text-red-600'}>
                          {trade.action}
                        </span>
                        {' '}{trade.symbol} • {trade.amount}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{trade.time}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}