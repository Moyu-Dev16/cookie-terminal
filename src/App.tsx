import React from 'react';
import { WalletProvider } from './components/WalletProvider';
import { Navbar } from './components/Navbar';
import { AgentTerminal } from './components/AgentTerminal';
import { SwapCard } from './components/SwapCard';
import { MarketGrid } from './components/MarketGrid';
import { Footer } from './components/Footer';
import { Sparkles, Terminal, Cpu, ArrowUpRight } from 'lucide-react';

export function AppContent() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        {/* Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-950/40 via-gray-900/60 to-emerald-950/30 border border-amber-500/20 p-6 sm:p-8 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Cookie Chain SVM Ecosystem cApp</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              Autonomous AI Copilot & Terminal for <span className="text-amber-400">Cookie Chain</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 font-mono leading-relaxed">
              Interact with sub-second finality, query real-time DAS market data, quote multi-venue DEX swaps, and sign non-custodial transactions directly via <span className="text-amber-300 font-bold">Nightly Wallet</span> and <span className="text-emerald-400 font-bold">cookie-mcp</span>.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 bg-gray-900/80 px-3 py-1 rounded-lg border border-gray-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Sub-Second Finality
              </span>
              <span className="flex items-center gap-1.5 bg-gray-900/80 px-3 py-1 rounded-lg border border-gray-800">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                ~$0.0001 Gas Fees
              </span>
              <span className="flex items-center gap-1.5 bg-gray-900/80 px-3 py-1 rounded-lg border border-gray-800">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Nightly Standard Wallet
              </span>
              <span className="flex items-center gap-1.5 bg-gray-900/80 px-3 py-1 rounded-lg border border-gray-800">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                cookie-mcp External-Signer
              </span>
            </div>
          </div>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Agent Terminal (8 cols) */}
          <div className="lg:col-span-8">
            <AgentTerminal />
          </div>

          {/* Swap Widget (4 cols) */}
          <div className="lg:col-span-4">
            <SwapCard />
          </div>
        </div>

        {/* Live Ecosystem Market Grid */}
        <div>
          <MarketGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
}
