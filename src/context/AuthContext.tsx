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

const INITIAL_BALANCE = 30;

type AuthContextValue = {
  walletAddress: string | null;
  isConnecting: boolean;
  balance: number;
  connectWallet: (walletId: string) => Promise<void>;
  disconnectWallet: () => void;
  deductBalance: (amount: number) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState(INITIAL_BALANCE);

  const connectWallet = useCallback(async (walletId: string) => {
    setIsConnecting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setWalletAddress(`0xMOCK...${walletId.slice(-4).toUpperCase()}`);
    setIsConnecting(false);
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletAddress(null);
  }, []);

  const deductBalance = useCallback((amount: number) => {
    setBalance((prev) => prev - amount);
  }, []);

  return (
    <AuthContext.Provider
      value={{ walletAddress, isConnecting, balance, connectWallet, disconnectWallet, deductBalance }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
