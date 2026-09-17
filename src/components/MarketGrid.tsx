import React, { useEffect, useState } from 'react';
import { getVerifiedTokens, getMarketPools, type TokenItem, type MarketPool } from '../lib/cookieClient';
import { TrendingUp, Coins, ExternalLink, RefreshCw } from 'lucide-react';

export const MarketGrid: React.FC = () => {
  const [tokens, setTokens] = useState<TokenItem[]>([]);
  const [pools, setPools] = useState<MarketPool[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [tList, pList] = await Promise.all([getVerifiedTokens(), getMarketPools()]);
      setTokens(tList.slice(0, 8));
      setPools(pList.slice(0, 6));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 font-mono">
      {/* Top Assets */}
      <div className="bg-[#0B0F19] rounded-2xl border border-gray-800 p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold text-white tracking-wide">Live Token Feeds (Cookie DAS API)</span>
          </div>
          <button
            onClick={loadData}
            disabled={loading}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition"
            title="Refresh"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {tokens.map((token) => (
            <div
              key={token.mint}
              className="p-3 bg-gray-950/80 rounded-xl border border-gray-800/80 hover:border-amber-500/40 transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={token.logo}
                    alt={token.symbol}
                    className="w-6 h-6 rounded-full bg-gray-800 object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                      ${token.symbol}
                    </span>
                    <p className="text-[10px] text-gray-500 truncate max-w-[80px]">{token.name}</p>
                  </div>
                </div>
                <span
                  className={`text-[11px] font-semibold ${
                    token.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {token.change24h >= 0 ? '+' : ''}
                  {token.change24h.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-gray-400 font-bold">${token.priceUsd < 0.01 ? token.priceUsd.toFixed(6) : token.priceUsd.toFixed(2)}</span>
                <span className="text-[10px] text-gray-500">{token.priceCook.toFixed(2)} COOK</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Liquidity Venues */}
      <div className="bg-[#0B0F19] rounded-2xl border border-gray-800 p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold text-white tracking-wide">Active Liquidity Pools (Cookiebox & Cookieswap)</span>
          </div>
          <span className="text-xs text-gray-500">{pools.length} Pools Tracked</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {pools.map((pool) => (
            <div
              key={pool.marketId}
              className="p-3 bg-gray-950/80 rounded-xl border border-gray-800/80 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">
                    {pool.baseSymbol} / {pool.quoteSymbol}
                  </span>
                  <span className="text-[10px] bg-gray-900 text-amber-400 px-1.5 py-0.5 rounded border border-gray-800">
                    {pool.type}
                  </span>
                </div>
                <span className="text-[11px] text-gray-500 mt-1 block">
                  Depth: {pool.liquidityDisplay}
                </span>
              </div>
              <a
                href={`https://cookiescan.io/address/${pool.marketId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-gray-400 hover:text-amber-400 transition"
                title="View on CookieScan"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
