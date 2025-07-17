import { useState, useRef, useEffect } from 'react'
import { Send, X, Minimize2, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface AIChatWidgetProps {
  isOpen: boolean
  onClose: () => void
}

export function AIChatWidget({ isOpen, onClose }: AIChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI financial assistant. I can help you analyze your finances, answer questions about your investments, spending patterns, and provide personalized insights. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('investment') || lowerQuery.includes('portfolio')) {
      return "Based on your current portfolio, you have a well-diversified mix with 60% stocks, 30% bonds, and 10% alternatives. Your YTD return is +12.5%, outperforming the S&P 500. Consider rebalancing if your risk tolerance has changed."
    }
    
    if (lowerQuery.includes('spending') || lowerQuery.includes('expense')) {
      return "Your spending analysis shows you're spending 15% more on dining out compared to last month. Your largest categories are: Housing (35%), Food (18%), and Transportation (12%). I recommend setting a dining budget of $400/month."
    }
    
    if (lowerQuery.includes('debt') || lowerQuery.includes('loan')) {
      return "You currently have $45,000 in total debt across 3 accounts. Your debt-to-income ratio is 28%, which is healthy. I recommend focusing on paying off your credit card with 18.9% APR first using the avalanche method."
    }
    
    if (lowerQuery.includes('net worth') || lowerQuery.includes('wealth')) {
      return "Your net worth has grown by $15,000 (8.2%) over the past year to $198,500. This puts you in the 75th percentile for your age group. Your assets are growing faster than your liabilities, which is excellent progress."
    }
    
    return "I can help you with questions about your investments, spending patterns, debt management, net worth tracking, and financial planning. What specific area would you like to explore?"
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={cn(
        "w-96 shadow-lg transition-all duration-200",
        isMinimized ? "h-14" : "h-96"
      )}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">AI Financial Assistant</CardTitle>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-6 w-6 p-0"
            >
              {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="flex flex-col h-80">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-start space-x-2",
                      message.isUser ? "justify-end" : "justify-start"
                    )}
                  >
                    {!message.isUser && (
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                          AI
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                        message.isUser
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {message.content}
                    </div>
                    {message.isUser && (
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          U
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="flex items-center space-x-2 pt-4">
              <Input
                placeholder="Ask about your finances..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
              />
              <Button
                size="sm"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}