import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  TrendingUp, 
  DollarSign,
  Target,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Mic,
  Paperclip,
  Sparkles,
  Brain,
  Zap
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  suggestions?: string[]
  actionItems?: ActionItem[]
}

interface ActionItem {
  id: string
  title: string
  description: string
  type: 'investment' | 'savings' | 'debt' | 'tax'
  priority: 'high' | 'medium' | 'low'
  completed: boolean
}

const quickPrompts = [
  "How can I optimize my portfolio for retirement?",
  "Should I pay off debt or invest more?",
  "What's my ideal emergency fund size?",
  "How can I reduce my tax burden this year?",
  "Is now a good time to rebalance my portfolio?",
  "What investment opportunities match my risk profile?"
]

const aiPersonalities = [
  { id: 'advisor', name: 'Financial Advisor', icon: TrendingUp, description: 'Conservative, long-term focused' },
  { id: 'analyst', name: 'Market Analyst', icon: Brain, description: 'Data-driven, technical analysis' },
  { id: 'coach', name: 'Money Coach', icon: Target, description: 'Motivational, goal-oriented' },
  { id: 'optimizer', name: 'Tax Optimizer', icon: Zap, description: 'Tax-efficient strategies' }
]

export function AIFinancialAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Financial Advisor. I have access to all your financial data and can help you make smarter money decisions. What would you like to discuss today?",
      timestamp: new Date(),
      suggestions: [
        "Analyze my investment performance",
        "Create a debt payoff plan",
        "Optimize my tax strategy",
        "Plan for retirement"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedPersonality, setSelectedPersonality] = useState('advisor')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
        suggestions: generateSuggestions(inputValue),
        actionItems: generateActionItems(inputValue)
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const generateAIResponse = (input: string): string => {
    const responses = {
      portfolio: "Based on your current portfolio allocation, I notice you're overweight in tech stocks (28.5%). Consider rebalancing by reducing tech exposure and increasing your international allocation to 15-20%. Your Sharpe ratio of 1.25 is excellent, but diversification could reduce volatility while maintaining returns.",
      debt: "Looking at your debt profile, I recommend the debt avalanche strategy. Focus on your highest APR debt first (American Express at 21.99%). By paying an extra $200/month toward this card, you could save $3,400 in interest and be debt-free 18 months sooner.",
      retirement: "Your retirement savings are on track! With $198k saved and 30 years to retirement, you're projected to have $2.6M. However, maxing out your 401(k) contribution could add an additional $400k to your retirement balance. Consider increasing your contribution by 2% annually.",
      tax: "I've identified $3,912 in potential tax savings. Priority actions: 1) Max out your 401(k) ($11k remaining = $2,640 savings), 2) Contribute to HSA ($2,300 remaining = $552 savings), 3) Tax-loss harvesting in your taxable account ($720 potential savings).",
      default: "I'd be happy to help you with that! Based on your financial profile, I can provide personalized recommendations. Could you be more specific about what aspect of your finances you'd like to focus on?"
    }

    const lowerInput = input.toLowerCase()
    if (lowerInput.includes('portfolio') || lowerInput.includes('invest')) return responses.portfolio
    if (lowerInput.includes('debt') || lowerInput.includes('pay off')) return responses.debt
    if (lowerInput.includes('retirement') || lowerInput.includes('retire')) return responses.retirement
    if (lowerInput.includes('tax') || lowerInput.includes('save')) return responses.tax
    return responses.default
  }

  const generateSuggestions = (input: string): string[] => {
    return [
      "Show me detailed analysis",
      "Create an action plan",
      "Compare alternatives",
      "Set up automated tracking"
    ]
  }

  const generateActionItems = (input: string): ActionItem[] => {
    return [
      {
        id: '1',
        title: 'Increase 401(k) contribution',
        description: 'Boost contribution from $12k to $18k annually',
        type: 'investment',
        priority: 'high',
        completed: false
      },
      {
        id: '2',
        title: 'Rebalance portfolio',
        description: 'Reduce tech allocation from 28.5% to 22%',
        type: 'investment',
        priority: 'medium',
        completed: false
      }
    ]
  }

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Financial Advisor</h1>
          <p className="text-muted-foreground">
            Your personal AI assistant with access to all your financial data
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {aiPersonalities.map((personality) => {
            const Icon = personality.icon
            return (
              <Button
                key={personality.id}
                variant={selectedPersonality === personality.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPersonality(personality.id)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{personality.name}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Chat */}
        <Card className="lg:col-span-3 flex flex-col h-[600px]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {aiPersonalities.find(p => p.id === selectedPersonality)?.name}
                  </CardTitle>
                  <CardDescription>
                    {aiPersonalities.find(p => p.id === selectedPersonality)?.description}
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Online
              </Badge>
            </div>
          </CardHeader>
          
          <Separator />
          
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      message.type === 'user' 
                        ? 'bg-blue-500' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    
                    <div className={`rounded-lg p-3 ${
                      message.type === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                      
                      {/* AI Suggestions */}
                      {message.type === 'ai' && message.suggestions && (
                        <div className="mt-3 space-y-1">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="mr-2 mb-1 h-7 text-xs"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                      
                      {/* Action Items */}
                      {message.type === 'ai' && message.actionItems && message.actionItems.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs font-medium text-muted-foreground">Recommended Actions:</p>
                          {message.actionItems.map((item) => (
                            <div key={item.id} className="flex items-center space-x-2 p-2 bg-background rounded border">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <div className="flex-1">
                                <p className="text-xs font-medium">{item.title}</p>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                              </div>
                              <Badge variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'default' : 'secondary'}>
                                {item.priority}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <Separator />
          
          {/* Input */}
          <div className="p-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about your finances..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="pr-20"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Paperclip className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Mic className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Prompts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Quick Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start h-auto p-2 text-xs"
                  onClick={() => handleQuickPrompt(prompt)}
                >
                  <MessageCircle className="h-3 w-3 mr-2 flex-shrink-0" />
                  <span className="truncate">{prompt}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Financial Insights */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Today's Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="text-xs font-medium">Portfolio up 2.3%</p>
                  <p className="text-xs text-muted-foreground">Strong tech performance</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-xs font-medium">Credit utilization high</p>
                  <p className="text-xs text-muted-foreground">Consider paying down cards</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs font-medium">Tax optimization opportunity</p>
                  <p className="text-xs text-muted-foreground">$3,912 potential savings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Capabilities */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">What I Can Help With</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-3 w-3 text-blue-500" />
                <span className="text-xs">Investment analysis & optimization</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-3 w-3 text-green-500" />
                <span className="text-xs">Debt payoff strategies</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-3 w-3 text-purple-500" />
                <span className="text-xs">Goal planning & tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calculator className="h-3 w-3 text-orange-500" />
                <span className="text-xs">Tax optimization</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}