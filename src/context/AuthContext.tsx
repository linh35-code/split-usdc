import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type WalletOption = {
  id: string;
  name: string;
};

export const WALLET_OPTIONS: WalletOption[] = [
  { id: 'wallet-a', name: 'Ví A' },
  { id: 'wallet-b', name: 'Ví B' },
  { id: 'wallet-c', name: 'Ví C' },
];

type AuthContextValue = {
  walletAddress: string | null;
  isConnecting: boolean;
  connectWallet: (walletId: string) => Promise<void>;
  disconnectWallet: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = useCallback(async (walletId: string) => {
    setIsConnecting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setWalletAddress(`0xMOCK...${walletId.slice(-4).toUpperCase()}`);
    setIsConnecting(false);
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletAddress(null);
  }, []);

  return (
    <AuthContext.Provider value={{ walletAddress, isConnecting, connectWallet, disconnectWallet }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
