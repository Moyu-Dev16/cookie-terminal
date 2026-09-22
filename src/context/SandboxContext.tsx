import React, { createContext, useContext, useState, useEffect } from 'react';

export const DEMO_WALLET_ADDRESS = 'CookDemo888888888888888888888888888888888888';

interface SandboxContextType {
  isSandboxMode: boolean;
  sandboxBalance: number;
  sandboxAddress: string;
  enableSandbox: () => void;
  disableSandbox: () => void;
  toggleSandbox: () => void;
  claimFaucet: (amount?: number) => void;
  deductBalance: (amount: number) => boolean;
}

const SandboxContext = createContext<SandboxContextType | undefined>(undefined);

export const SandboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSandboxMode, setIsSandboxMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('cookie_sandbox_mode');
    return saved !== null ? saved === 'true' : true; // Default to true for seamless judge/demo evaluation
  });
  const [sandboxBalance, setSandboxBalance] = useState<number>(() => {
    const saved = localStorage.getItem('cookie_sandbox_balance');
    return saved ? Number(saved) : 100.0;
  });

  useEffect(() => {
    localStorage.setItem('cookie_sandbox_mode', String(isSandboxMode));
  }, [isSandboxMode]);

  useEffect(() => {
    localStorage.setItem('cookie_sandbox_balance', String(sandboxBalance));
  }, [sandboxBalance]);

  const enableSandbox = () => setIsSandboxMode(true);
  const disableSandbox = () => setIsSandboxMode(false);
  const toggleSandbox = () => setIsSandboxMode((prev) => !prev);

  const claimFaucet = (amount: number = 100.0) => {
    setSandboxBalance((prev) => Number((prev + amount).toFixed(2)));
    setIsSandboxMode(true);
  };

  const deductBalance = (amount: number): boolean => {
    if (sandboxBalance < amount) return false;
    setSandboxBalance((prev) => Number((prev - amount).toFixed(2)));
    return true;
  };

  return (
    <SandboxContext.Provider
      value={{
        isSandboxMode,
        sandboxBalance,
        sandboxAddress: DEMO_WALLET_ADDRESS,
        enableSandbox,
        disableSandbox,
        toggleSandbox,
        claimFaucet,
        deductBalance,
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
