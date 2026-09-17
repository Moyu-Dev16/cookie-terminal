import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { NightlyWalletAdapter } from '@solana/wallet-adapter-nightly';
import { COOKIE_RPC_URL } from '../lib/cookieClient';

import '@solana/wallet-adapter-react-ui/styles.css';

interface Props {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<Props> = ({ children }) => {
  const endpoint = useMemo(() => COOKIE_RPC_URL, []);
  const wallets = useMemo(() => [
    new NightlyWalletAdapter(),
  ], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};
