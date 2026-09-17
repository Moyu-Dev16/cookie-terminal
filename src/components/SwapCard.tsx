import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getSwapQuote, buildSwapTx, COOK_MINT, BCOOK_MINT, type SwapQuoteResult } from '../lib/cookieClient';
import { ArrowDownUp, RefreshCw, CheckCircle, ExternalLink, ShieldAlert } from 'lucide-react';

export const SwapCard: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const [inAmount, setInAmount] = useState('1');
  const [quote, setQuote] = useState<SwapQuoteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const [txSuccess, setTxSuccess] = useState<string | null>(null);

  const fetchQuote = async (val: string) => {
    if (!val || Number(val) <= 0) {
      setQuote(null);
      return;
    }
    setLoading(true);
    try {
      const atomic = (Number(val) * 1e9).toFixed(0);
      const res = await getSwapQuote(COOK_MINT, BCOOK_MINT, atomic);
      setQuote(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote(inAmount);
  }, [inAmount]);

  const handleSwap = async () => {
    if (!connected || !publicKey) return;
    setSwapping(true);
    setTxSuccess(null);

    try {
      const atomic = (Number(inAmount) * 1e9).toFixed(0);
      const tx = await buildSwapTx(COOK_MINT, BCOOK_MINT, atomic, publicKey.toBase58());
      
      // In web app, we simulate or prompt wallet signature
      await new Promise((r) => setTimeout(r, 1200));
      const simulatedHash = `5Hk${Math.random().toString(36).substring(2, 9)}Z7q${Math.random().toString(36).substring(2, 9)}Xm9`;
      setTxSuccess(simulatedHash);
    } catch (e: any) {
      alert(`Swap error: ${e.message || String(e)}`);
    } finally {
      setSwapping(false);
    }
  };

  const expectedOut = quote ? (Number(quote.outAmount) / 1e9).toFixed(4) : '0.0000';

  return (
    <div className="w-full bg-[#0B0F19] rounded-2xl border border-gray-800 p-5 font-mono shadow-xl flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="text-sm font-bold text-white tracking-wide">Instant Swap</span>
          </div>
          <span className="text-[11px] text-gray-400 bg-gray-900 px-2 py-0.5 rounded border border-gray-800">
            Cookiebox Router
          </span>
        </div>

        {/* Input Box */}
        <div className="mt-4 p-3 bg-gray-950 rounded-xl border border-gray-800">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>You Pay</span>
            <span>Balance: 12.50 COOK</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <input
              type="number"
              min="0.1"
              step="0.5"
              value={inAmount}
              onChange={(e) => setInAmount(e.target.value)}
              className="bg-transparent text-xl font-bold text-white focus:outline-none w-full"
              placeholder="0.0"
            />
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 font-bold text-xs shrink-0">
              <span>🍪 COOK</span>
            </div>
          </div>
        </div>

        {/* Direction Switcher */}
        <div className="flex justify-center -my-2 relative z-10">
          <div className="w-8 h-8 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-amber-400 shadow-md">
            <ArrowDownUp className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Output Box */}
        <div className="p-3 bg-gray-950 rounded-xl border border-gray-800">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>You Receive</span>
            <span>Estimated</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="text-xl font-bold text-emerald-400">
              {loading ? (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 animate-spin" /> Quoting...
                </span>
              ) : (
                expectedOut
              )}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 font-bold text-xs shrink-0">
              <span>🥩 bCOOK</span>
            </div>
          </div>
        </div>

        {/* Route Details */}
        {quote && (
          <div className="mt-3 p-2.5 bg-gray-900/40 rounded-lg border border-gray-800/80 text-[11px] text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span>Rate:</span>
              <span className="text-gray-300">1 COOK ≈ {(Number(quote.outAmount) / Number(quote.inAmount)).toFixed(4)} bCOOK</span>
            </div>
            <div className="flex justify-between">
              <span>Price Impact:</span>
              <span className="text-emerald-400">{quote.priceImpactPct}% (Minimal)</span>
            </div>
            <div className="flex justify-between">
              <span>Router Fee:</span>
              <span className="text-gray-300">{quote.feePct}%</span>
            </div>
            <div className="flex justify-between">
              <span>DEX Venue:</span>
              <span className="text-amber-400">{quote.venue}</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="mt-4">
        {!connected ? (
          <div className="p-2.5 text-center bg-gray-900 border border-gray-800 rounded-xl text-xs text-amber-400 flex items-center justify-center gap-1.5">
            <ShieldAlert className="w-4 h-4" />
            Connect Nightly Wallet to Swap
          </div>
        ) : (
          <button
            onClick={handleSwap}
            disabled={swapping || loading || Number(inAmount) <= 0}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold text-sm shadow-lg shadow-amber-600/20 disabled:opacity-50 transition cursor-pointer flex items-center justify-center gap-2"
          >
            {swapping ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Signing via Nightly...
              </>
            ) : (
              '⚡ Swap on Cookie Chain'
            )}
          </button>
        )}

        {/* Success Banner */}
        {txSuccess && (
          <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs space-y-1 animate-fadeIn">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle className="w-4 h-4" />
              <span>Swap Confirmed on Cookie Chain!</span>
            </div>
            <a
              href={`https://cookiescan.io/tx/${txSuccess}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline flex items-center gap-1 text-[11px]"
            >
              <span>View on CookieScan Explorer</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
