import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { getChainHealth, getWalletBalance, type ChainHealth } from '../lib/cookieClient';
import { useSandbox } from '../context/SandboxContext';
import { Activity, ShieldCheck, Zap, Droplets } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const { isSandboxMode, sandboxBalance, toggleSandbox, claimFaucet } = useSandbox();
  const [health, setHealth] = useState<ChainHealth | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [faucetClaimed, setFaucetClaimed] = useState(false);

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

  const handleFaucet = () => {
    claimFaucet(100);
    setFaucetClaimed(true);
    setTimeout(() => setFaucetClaimed(false), 1500);
  };

  return (
    <header className="border-b border-gray-800 bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
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
        <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-gray-300 bg-gray-900/60 px-4 py-1.5 rounded-lg border border-gray-800">
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

        {/* Wallet & Sandbox Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode Switcher & Faucet Button */}
          <div className="flex items-center bg-gray-950/80 border border-gray-800 rounded-lg p-1 text-xs font-mono">
            <button
              onClick={toggleSandbox}
              title={isSandboxMode ? 'Sandbox Demo Mode active (click to toggle)' : 'Live Nightly Wallet active (click to toggle)'}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition cursor-pointer text-[11px] ${
                isSandboxMode
                  ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{isSandboxMode ? 'Sandbox' : 'Live'}</span>
            </button>

            {isSandboxMode && (
              <button
                onClick={handleFaucet}
                title="Claim 100 COOK from test faucet"
                className="flex items-center gap-1 px-2 py-1 ml-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold transition cursor-pointer"
              >
                <Droplets className="w-3 h-3 text-emerald-400" />
                <span>{faucetClaimed ? '+100 Added!' : '+100 Faucet'}</span>
              </button>
            )}
          </div>

          {/* Balance Indicator */}
          {isSandboxMode ? (
            <div className="hidden sm:flex flex-col items-end px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs font-mono">
              <span className="text-gray-400 text-[10px]">Demo Balance</span>
              <span className="text-amber-300 font-bold">{sandboxBalance.toFixed(2)} COOK</span>
            </div>
          ) : (
            connected && balance !== null && (
              <div className="hidden sm:flex flex-col items-end px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs font-mono">
                <span className="text-gray-400 text-[10px]">Cookie Balance</span>
                <span className="text-amber-300 font-bold">{balance} COOK</span>
              </div>
            )
          )}

          <div className="nightly-btn-wrapper">
            <WalletMultiButton className="!bg-gradient-to-r !from-amber-600 !to-amber-500 hover:!from-amber-500 hover:!to-amber-400 !text-white !font-mono !text-xs !py-2 !px-3 sm:!px-4 !rounded-lg !shadow-md !shadow-amber-600/20 !transition-all" />
          </div>
        </div>
      </div>
    </header>
  );
};
