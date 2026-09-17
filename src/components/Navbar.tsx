import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { getChainHealth, getWalletBalance, type ChainHealth } from '../lib/cookieClient';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const [health, setHealth] = useState<ChainHealth | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const h = await getChainHealth();
        setHealth(h);
      } catch (e) {
        console.error(e);
      }
    };
    fetchHealth();
    const timer = setInterval(fetchHealth, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (connected && publicKey) {
      getWalletBalance(publicKey.toBase58()).then(setBalance);
    } else {
      setBalance(null);
    }
  }, [connected, publicKey]);

  return (
    <header className="border-b border-gray-800 bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 text-xl">
            🍪
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white font-mono">CookieTerminal</span>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                SVM Mainnet
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono hidden sm:block">AI Copilot & On-Chain Terminal powered by cookie-mcp</p>
          </div>
        </div>

        {/* Telemetry Ticker */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono text-gray-300 bg-gray-900/60 px-4 py-1.5 rounded-lg border border-gray-800">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Zap className="w-3.5 h-3.5" />
            <span>Slot: {health ? health.currentSlot.toLocaleString() : '...'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Activity className="w-3.5 h-3.5" />
            <span>TPS: {health ? health.tps : '...'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>Latency: {health ? `${health.latencyMs}ms` : '...'}</span>
          </div>
        </div>

        {/* Wallet & Balance */}
        <div className="flex items-center gap-3">
          {connected && balance !== null && (
            <div className="hidden sm:flex flex-col items-end px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs font-mono">
              <span className="text-gray-400 text-[10px]">Cookie Balance</span>
              <span className="text-amber-300 font-bold">{balance} COOK</span>
            </div>
          )}
          <div className="nightly-btn-wrapper">
            <WalletMultiButton className="!bg-gradient-to-r !from-amber-600 !to-amber-500 hover:!from-amber-500 hover:!to-amber-400 !text-white !font-mono !text-xs !py-2 !px-4 !rounded-lg !shadow-md !shadow-amber-600/20 !transition-all" />
          </div>
        </div>
      </div>
    </header>
  );
};
