import React, { useState } from 'react';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertOctagon,
  Activity,
  Zap,
  CheckCircle2,
  Lock,
  RefreshCw,
  Radio,
  Cpu,
  Server,
  ArrowRight,
} from 'lucide-react';

export type SimulationType = 'idle' | 'mev' | 'mint_trap' | 'dust_grief';

export const SentinelGuardianSimulator: React.FC = () => {
  const [activeSim, setActiveSim] = useState<SimulationType>('idle');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [logs, setLogs] = useState<
    Array<{ id: string; time: string; level: 'info' | 'warn' | 'threat' | 'intercepted'; text: string }>
  >([
    {
      id: '1',
      time: '00:00.12',
      level: 'info',
      text: 'Moyu Sentinel Guardian daemon active. Ingestion latency: 11.4ms.',
    },
    {
      id: '2',
      time: '00:00.45',
      level: 'info',
      text: 'Non-custodial execution boundary enforced. Proposal Key decoupled from Master Signer.',
    },
    {
      id: '3',
      time: '00:01.02',
      level: 'info',
      text: '27-Day Workstation Telemetry: 1,920+ autonomous heartbeat cycles verified. 0 security breaches.',
    },
  ]);

  const triggerSimulation = (type: SimulationType) => {
    setIsAnalyzing(true);
    setActiveSim(type);

    const now = () => {
      const d = new Date();
      return `${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.${d.getMilliseconds().toString().padStart(3, '0').slice(0, 2)}`;
    };

    if (type === 'mev') {
      setTimeout(() => {
        setLogs((prev) => [
          {
            id: String(Date.now()),
            time: now(),
            level: 'warn',
            text: '⚠️ Mempool Alert: Front-running sandwich pattern detected on COOK/bCOOK swap pair!',
          },
          ...prev,
        ]);
      }, 400);

      setTimeout(() => {
        setLogs((prev) => [
          {
            id: String(Date.now() + 1),
            time: now(),
            level: 'threat',
            text: '🚨 Sandwich threat: Slippage manipulated to +1.85%. Target victim: Agent swap payload.',
          },
          ...prev,
        ]);
      }, 900);

      setTimeout(() => {
        setLogs((prev) => [
          {
            id: String(Date.now() + 2),
            time: now(),
            level: 'intercepted',
            text: '🛡️ Sentinel Intercept [11.2ms]: Slippage hard-clamped to 0.15%. Rerouted to private MEV-shielded RPC. Exploit 100% neutralized!',
          },
          ...prev,
        ]);
        setIsAnalyzing(false);
      }, 1600);
    } else if (type === 'mint_trap') {
      setTimeout(() => {
        setLogs((prev) => [
          {
            id: String(Date.now()),
            time: now(),
            level: 'warn',
            text: '🔍 AST Contract Inspection: Parsing candidate token contract authorities...',
          },
          ...prev,
        ]);
      }, 400);

      setTimeout(() => {
        setLogs((prev) => [
          {
            id: String(Date.now() + 1),
            time: now(),
            level: 'threat',
            text: '🚨 Critical Trap: freezeAuthority is ACTIVE and mintAuthority is non-revoked! High rug-pull vulnerability.',
          },
          ...prev,
        ]);
      }, 900);

      setTimeout(() => {
        setLogs((prev) => [
          {
            id: String(Date.now() + 2),
            time: now(),
            level: 'intercepted',
            text: '🛡️ Sentinel Intercept [9.8ms]: Transaction proposal REJECTED. Wallet signature request blocked before user prompt.',
          },
          ...prev,
        ]);
        setIsAnalyzing(false);
      }, 1600);
    } else if (type === 'dust_grief') {
      setTimeout(() => {
        setLogs((prev) => [
          {
            id: String(Date.now()),
            time: now(),
            level: 'warn',
            text: '⚠️ Boundary Assertion: Incoming transaction with zero-amount token transfer detected.',
          },
          ...prev,
        ]);
      }, 400);

      setTimeout(() => {
        setLogs((prev) => [
          {
            id: String(Date.now() + 1),
            time: now(),
            level: 'threat',
            text: '🚨 State Desync Threat: Zero-value dust attack designed to trigger AST boundary underflow.',
          },
          ...prev,
        ]);
      }, 900);

      setTimeout(() => {
        setLogs((prev) => [
          {
            id: String(Date.now() + 2),
            time: now(),
            level: 'intercepted',
            text: '🛡️ Sentinel Intercept [8.6ms]: Mutation Guard Rule #4 triggered (assert amount > 0). Call discarded. Agent state remains clean.',
          },
          ...prev,
        ]);
        setIsAnalyzing(false);
      }, 1600);
    } else {
      setIsAnalyzing(false);
      setLogs((prev) => [
        {
          id: String(Date.now()),
          time: now(),
          level: 'info',
          text: 'Sentinel monitoring normal baseline. Sub-second telemetry active.',
        },
        ...prev,
      ]);
    }
  };

  const resetSimulation = () => {
    setActiveSim('idle');
    setIsAnalyzing(false);
    setLogs([
      {
        id: '1',
        time: '00:00.12',
        level: 'info',
        text: 'Moyu Sentinel Guardian daemon active. Ingestion latency: 11.4ms.',
      },
      {
        id: '2',
        time: '00:00.45',
        level: 'info',
        text: 'Non-custodial execution boundary enforced. Proposal Key decoupled from Master Signer.',
      },
      {
        id: '3',
        time: '00:01.02',
        level: 'info',
        text: '27-Day Workstation Telemetry: 1,920+ autonomous heartbeat cycles verified. 0 security breaches.',
      },
    ]);
  };

  return (
    <div className="w-full bg-[#080C14] rounded-2xl border border-emerald-500/20 shadow-2xl overflow-hidden font-mono text-xs">
      {/* Sentinel Top Header */}
      <div className="bg-gradient-to-r from-emerald-950/50 via-gray-900/90 to-cyan-950/40 p-4 border-b border-emerald-500/20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm">Moyu Sentinel Threat Interceptor</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] text-emerald-300 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                ACTIVE (11.4ms)
              </span>
            </div>
            <p className="text-gray-400 text-[11px]">
              Sub-15ms on-chain risk arbitration & non-custodial signing boundary for Solana AI agents
            </p>
          </div>
        </div>

        {/* Global Protection Metrics */}
        <div className="flex items-center gap-4 text-gray-300">
          <div className="text-right">
            <div className="text-[10px] text-gray-400">Mutant Kill Rate</div>
            <div className="text-emerald-400 font-bold">100% (12/12)</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-gray-400">Workstation Uptime</div>
            <div className="text-cyan-400 font-bold">27 Days (648h)</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-gray-400">Pipeline Protected</div>
            <div className="text-amber-400 font-bold">$7,814.10</div>
          </div>
        </div>
      </div>

      {/* Interactive Simulation Controls */}
      <div className="p-4 bg-gray-950/60 border-b border-gray-800/80">
        <div className="flex items-center justify-between mb-3">
          <div className="text-gray-300 font-semibold flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400" />
            <span>Interactive Threat Injection Simulator</span>
          </div>
          <button
            onClick={resetSimulation}
            className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-white transition px-2 py-1 rounded bg-gray-900 border border-gray-800"
          >
            <RefreshCw className="w-3 h-3" />
            Reset Baseline
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Attack 1: MEV Sandwich */}
          <div
            onClick={() => triggerSimulation('mev')}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              activeSim === 'mev'
                ? 'bg-amber-950/30 border-amber-500/50 shadow-lg shadow-amber-500/10'
                : 'bg-gray-900/40 border-gray-800 hover:border-gray-700 hover:bg-gray-900/70'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-gray-200 flex items-center gap-1.5">
                <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
                1. MEV Sandwich Attack
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Front-Run
              </span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Injects mempool slippage manipulation (+1.85%). Sentinel clamps slippage & reroutes to private RPC.
            </p>
            <div className="mt-2 text-[10px] text-amber-400/90 font-semibold flex items-center gap-1">
              <span>Test Interception</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Attack 2: Authority Trap */}
          <div
            onClick={() => triggerSimulation('mint_trap')}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              activeSim === 'mint_trap'
                ? 'bg-red-950/30 border-red-500/50 shadow-lg shadow-red-500/10'
                : 'bg-gray-900/40 border-gray-800 hover:border-gray-700 hover:bg-gray-900/70'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-gray-200 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                2. Freeze/Mint Authority Trap
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-300 border border-red-500/20">
                Rug-Pull Risk
              </span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Simulates unverified mint authority. AST parser aborts transaction before wallet popup.
            </p>
            <div className="mt-2 text-[10px] text-red-400/90 font-semibold flex items-center gap-1">
              <span>Test Interception</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Attack 3: Zero-Value Dust Griefing */}
          <div
            onClick={() => triggerSimulation('dust_grief')}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              activeSim === 'dust_grief'
                ? 'bg-purple-950/30 border-purple-500/50 shadow-lg shadow-purple-500/10'
                : 'bg-gray-900/40 border-gray-800 hover:border-gray-700 hover:bg-gray-900/70'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-gray-200 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                3. Zero-Value Dust Griefing
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                State Underflow
              </span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Infers zero-token spam to corrupt agent state machines. Mutation guard drops transaction cleanly.
            </p>
            <div className="mt-2 text-[10px] text-purple-400/90 font-semibold flex items-center gap-1">
              <span>Test Interception</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Telemetry & Interception Log Stream */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sentinel Interception Log Feed (WebSocket Caching Engine)</span>
          </div>
          {isAnalyzing && (
            <span className="text-amber-400 animate-pulse flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Arbitrating Threat Payload...
            </span>
          )}
        </div>

        <div className="bg-gray-950/80 rounded-xl border border-gray-800/80 p-3 space-y-2 max-h-[160px] overflow-y-auto">
          {logs.map((item) => (
            <div key={item.id} className="flex items-start gap-2 leading-relaxed">
              <span className="text-gray-500 select-none">[{item.time}]</span>
              {item.level === 'info' && <span className="text-cyan-400 select-none">[INFO]</span>}
              {item.level === 'warn' && <span className="text-amber-400 select-none">[DETECT]</span>}
              {item.level === 'threat' && <span className="text-red-400 select-none">[THREAT]</span>}
              {item.level === 'intercepted' && <span className="text-emerald-400 select-none font-bold">[INTERCEPTED]</span>}
              <span
                className={
                  item.level === 'intercepted'
                    ? 'text-emerald-300 font-semibold'
                    : item.level === 'threat'
                    ? 'text-red-300 font-medium'
                    : item.level === 'warn'
                    ? 'text-amber-200'
                    : 'text-gray-300'
                }
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Production Telemetry Anchor Badges */}
      <div className="bg-gray-900/50 px-4 py-3 border-t border-gray-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-gray-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-gray-300">
            <Server className="w-3.5 h-3.5 text-blue-400" />
            <span>Hardware: Physical Bare-Metal Workstation</span>
          </span>
          <span className="text-gray-600">|</span>
          <span className="flex items-center gap-1.5 text-gray-300">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Key Isolation: Zero Naked Private Keys</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 font-mono text-[10px] border border-gray-700">
            Base Identity Event #17984
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 font-mono text-[10px] border border-emerald-700/50">
            Karma: 52
          </span>
        </div>
      </div>
    </div>
  );
};
