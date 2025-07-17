import { useState, useEffect } from 'react'
import { blink } from '@/lib/blink'
import { AppSidebar } from '@/components/layout/AppSidebar'
import { Header } from '@/components/layout/Header'
import { AIChatWidget } from '@/components/ai/AIChatWidget'
import { Dashboard } from '@/pages/Dashboard'
import { AdvancedInvestments } from '@/pages/AdvancedInvestments'
import { CreditManagement } from '@/pages/CreditManagement'
import { TaxAnalysis } from '@/pages/TaxAnalysis'
import { RetirementPlanning } from '@/pages/RetirementPlanning'
import { AIFinancialAdvisor } from '@/pages/AIFinancialAdvisor'
import { MarketIntelligence } from '@/pages/MarketIntelligence'
import { GoalAutomation } from '@/pages/GoalAutomation'
import { SmartBudgeting } from '@/pages/SmartBudgeting'
import { Transactions } from '@/pages/Transactions'
import { Subscriptions } from '@/pages/Subscriptions'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'smart-budgeting':
        return <SmartBudgeting />
      case 'transactions':
        return <Transactions />
      case 'subscriptions':
        return <Subscriptions />
      case 'investments':
        return <AdvancedInvestments />
      case 'credit':
        return <CreditManagement />
      case 'tax':
        return <TaxAnalysis />
      case 'retirement':
        return <RetirementPlanning />
      case 'ai-advisor':
        return <AIFinancialAdvisor />
      case 'market-intelligence':
        return <MarketIntelligence />
      case 'goal-automation':
        return <GoalAutomation />
      case 'settings':
        return <div className="p-8 text-center text-muted-foreground">Settings page coming soon...</div>
      case 'help':
        return <div className="p-8 text-center text-muted-foreground">Help page coming soon...</div>
      default:
        return <Dashboard />
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your financial dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
              <svg className="h-8 w-8 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-4xl font-bold text-foreground">Kniru</span>
          </div>
          <h1 className="text-2xl font-bold">Welcome to Kniru</h1>
          <p className="text-muted-foreground max-w-md">
            Your AI-powered personal finance dashboard. Get comprehensive insights into your investments, 
            spending, and financial health with intelligent analysis and recommendations.
          </p>
          <div className="pt-4">
            <button 
              onClick={() => blink.auth.login()}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Sign In to Get Started
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onAIChatToggle={() => setIsChatOpen(!isChatOpen)} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>

      {/* AI Chat Widget */}
      <AIChatWidget 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  )
}

export default App