import { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  CreditCard, 
  Calculator, 
  PieChart, 
  PiggyBank,
  MessageCircle,
  Home,
  Settings,
  HelpCircle,
  Target,
  Brain,
  Receipt,
  Repeat
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

interface AppSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'smart-budgeting', label: 'Smart Budgeting', icon: Brain },
  { id: 'transactions', label: 'Transactions', icon: Receipt },
  { id: 'subscriptions', label: 'Subscriptions', icon: Repeat },
  { id: 'investments', label: 'Advanced Investments', icon: TrendingUp },
  { id: 'credit', label: 'Credit Management', icon: CreditCard },
  { id: 'tax', label: 'Tax Analysis', icon: Calculator },
  { id: 'retirement', label: 'Retirement Planning', icon: PiggyBank },
  { id: 'ai-advisor', label: 'AI Financial Advisor', icon: MessageCircle },
  { id: 'market-intelligence', label: 'Market Intelligence', icon: BarChart3 },
  { id: 'goal-automation', label: 'Goal Automation', icon: Target },
]

const bottomItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help', icon: HelpCircle },
]

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <PieChart className="h-5 w-5 text-accent-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Kniru</span>
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  activeTab === item.id && 'bg-accent text-accent-foreground'
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            )
          })}
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  activeTab === item.id && 'bg-accent text-accent-foreground'
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}