import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { API_BASE_URL } from '../config';

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
  walletId: string | null;
  walletAddress: string | null;
  isConnecting: boolean;
  balance: number;
  connectWallet: (walletId: string) => Promise<void>;
  disconnectWallet: () => void;
  refreshBalance: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [walletId, setWalletId] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState(0);

  const refreshBalance = useCallback(async () => {
    setWalletId((currentId) => {
      if (currentId) {
        fetch(`${API_BASE_URL}/wallets/${currentId}/balance`)
          .then((res) => res.json())
          .then((data) => setBalance(Number(data.balance)));
      }
      return currentId;
    });
  }, []);

  const connectWallet = useCallback(async (_walletOptionId: string) => {
    setIsConnecting(true);
    const created = await fetch(`${API_BASE_URL}/wallets`, { method: 'POST' }).then((res) => res.json());
    setWalletId(created.id);
    setWalletAddress(created.address);
    const balanceData = await fetch(`${API_BASE_URL}/wallets/${created.id}/balance`).then((res) => res.json());
    setBalance(Number(balanceData.balance));
    setIsConnecting(false);
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletId(null);
    setWalletAddress(null);
    setBalance(0);
  }, []);

  return (
    <AuthContext.Provider
      value={{ walletId, walletAddress, isConnecting, balance, connectWallet, disconnectWallet, refreshBalance }}
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
