import { useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable, FlatList, RefreshControl, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '../../config';
import Button from '../../components/Button';
import { colors, radii, spacing, typography } from '../../theme/theme';

type Transaction = {
  id: string;
  transactionType: 'INBOUND' | 'OUTBOUND';
  amounts: string[];
  state: string;
  createDate: string;
  sourceAddress?: string;
  destinationAddress?: string;
};

function truncate(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function WalletScreen() {
  const { walletId, walletAddress, balance, refreshBalance } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadTransactions = useCallback(async () => {
    if (!walletId) return;
    const data = await fetch(`${API_BASE_URL}/wallets/${walletId}/transactions`).then((res) => res.json());
    setTransactions(data);
  }, [walletId]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refreshBalance(), loadTransactions()]);
    setRefreshing(false);
  };

  const handleCopy = async () => {
    if (!walletAddress) return;
    await Clipboard.setStringAsync(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ví</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Số dư USDC</Text>
        <Text style={styles.balance}>{balance.toFixed(2)}</Text>
      </View>

      {walletAddress && (
        <Pressable style={styles.addressRow} onPress={handleCopy}>
          <Text style={styles.addressText}>{truncate(walletAddress)}</Text>
          <Text style={styles.copyLabel}>{copied ? 'Đã copy' : 'Copy'}</Text>
        </Pressable>
      )}

      <Text style={styles.sectionLabel}>Lịch sử giao dịch</Text>
      <FlatList
        style={styles.list}
        data={transactions}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        ListEmptyComponent={<Text style={styles.emptyText}>Chưa có giao dịch nào</Text>}
        renderItem={({ item }) => {
          const isOutbound = item.transactionType === 'OUTBOUND';
          const counterparty = isOutbound ? item.destinationAddress : item.sourceAddress;
          return (
            <View style={styles.txRow}>
              <View>
                <Text style={styles.txDirection}>{isOutbound ? 'Đã gửi' : 'Đã nhận'}</Text>
                <Text style={styles.txCounterparty}>{counterparty ? truncate(counterparty) : '—'}</Text>
              </View>
              <Text style={[styles.txAmount, isOutbound ? styles.txAmountOut : styles.txAmountIn]}>
                {isOutbound ? '-' : '+'}
                {item.amounts?.[0]} USDC
              </Text>
            </View>
          );
        }}
      />

      <Button title="Làm mới" variant="secondary" onPress={handleRefresh} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.md,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  balanceCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.xs,
  },
  balanceLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  balance: {
    ...typography.display,
    color: colors.primary,
  },
  addressRow: {
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
  },
  addressText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  copyLabel: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  sectionLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  list: {
    flex: 1,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  txRow: {
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  txDirection: {
    ...typography.body,
    color: colors.textPrimary,
  },
  txCounterparty: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  txAmount: {
    ...typography.body,
    fontWeight: '600',
  },
  txAmountOut: {
    color: colors.error,
  },
  txAmountIn: {
    color: colors.success,
  },
});
