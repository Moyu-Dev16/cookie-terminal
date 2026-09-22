import React, { createContext, useContext, useState, useEffect } from 'react';

export const DEMO_WALLET_ADDRESS = 'CookDemo888888888888888888888888888888888888';

interface SandboxContextType {
  isSandboxMode: boolean;
  sandboxBalance: number;
  sandboxBcookBalance: number;
  sandboxAddress: string;
  enableSandbox: () => void;
  disableSandbox: () => void;
  toggleSandbox: () => void;
  claimFaucet: (amount?: number) => void;
  deductBalance: (amount: number, token?: 'COOK' | 'bCOOK') => boolean;
  addBalance: (amount: number, token?: 'COOK' | 'bCOOK') => void;
}

const SandboxContext = createContext<SandboxContextType | undefined>(undefined);

export const SandboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSandboxMode, setIsSandboxMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('cookie_sandbox_mode');
    return saved !== null ? saved === 'true' : true; // Default to true for seamless judge/demo evaluation
  });
  const [sandboxBalance, setSandboxBalance] = useState<number>(() => {
    const saved = localStorage.getItem('cookie_sandbox_balance');
    if (saved) {
      const n = Number(saved);
      if (!isNaN(n) && n > 0) return n;
    }
    return 100.0;
  });
  const [sandboxBcookBalance, setSandboxBcookBalance] = useState<number>(() => {
    const saved = localStorage.getItem('cookie_sandbox_bcook_balance');
    if (saved) {
      const n = Number(saved);
      if (!isNaN(n) && n >= 0) return n;
    }
    return 25.0;
  });

  useEffect(() => {
    localStorage.setItem('cookie_sandbox_mode', String(isSandboxMode));
  }, [isSandboxMode]);

  useEffect(() => {
    localStorage.setItem('cookie_sandbox_balance', String(sandboxBalance));
  }, [sandboxBalance]);

  useEffect(() => {
    localStorage.setItem('cookie_sandbox_bcook_balance', String(sandboxBcookBalance));
  }, [sandboxBcookBalance]);

  const enableSandbox = () => setIsSandboxMode(true);
  const disableSandbox = () => setIsSandboxMode(false);
  const toggleSandbox = () => setIsSandboxMode((prev) => !prev);

  const claimFaucet = (amount: number = 100.0) => {
    setSandboxBalance((prev) => Number((prev + amount).toFixed(2)));
    setSandboxBcookBalance((prev) => Number((prev + 25.0).toFixed(2)));
    setIsSandboxMode(true);
  };

  const deductBalance = (amount: number, token: 'COOK' | 'bCOOK' = 'COOK'): boolean => {
    if (token === 'bCOOK') {
      if (sandboxBcookBalance < amount) return false;
      setSandboxBcookBalance((prev) => Number((prev - amount).toFixed(4)));
      return true;
    } else {
      if (sandboxBalance < amount) return false;
      setSandboxBalance((prev) => Number((prev - amount).toFixed(2)));
      return true;
    }
  };

  const addBalance = (amount: number, token: 'COOK' | 'bCOOK' = 'COOK') => {
    if (token === 'bCOOK') {
      setSandboxBcookBalance((prev) => Number((prev + amount).toFixed(4)));
    } else {
      setSandboxBalance((prev) => Number((prev + amount).toFixed(2)));
    }
  };

  return (
    <SandboxContext.Provider
      value={{
        isSandboxMode,
        sandboxBalance,
        sandboxBcookBalance,
        sandboxAddress: DEMO_WALLET_ADDRESS,
        enableSandbox,
        disableSandbox,
        toggleSandbox,
        claimFaucet,
        deductBalance,
        addBalance,
      }}
    >
      {children}
    </SandboxContext.Provider>
  );
};

export const useSandbox = () => {
  const context = useContext(SandboxContext);
  if (!context) {
    throw new Error('useSandbox must be used within a SandboxProvider');
  }
  return context;
};
