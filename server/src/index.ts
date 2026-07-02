import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import { circleClient, walletSetId } from './circleClient.js';

// Native USDC on Arc Testnet (USDC is Arc's native gas token) — fixed per network, not per-wallet.
const ARC_TESTNET_USDC_TOKEN_ID = '15dc2b5d-0994-58b0-bf8c-3a0501148ee8';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const primaryWalletFile = path.join(__dirname, '..', 'primary-wallet.json');

const app = express();
app.use(cors());
app.use(express.json());

// This is a single-user prototype: reuse the same wallet across "connects"
// instead of minting a fresh empty one every time.
app.post('/wallets', async (req, res) => {
  if (fs.existsSync(primaryWalletFile)) {
    const { id } = JSON.parse(fs.readFileSync(primaryWalletFile, 'utf-8'));
    const response = await circleClient.getWallet({ id });
    res.json(response.data?.wallet);
    return;
  }

  const response = await circleClient.createWallets({
    walletSetId,
    blockchains: ['ARC-TESTNET'],
    count: 1,
    accountType: 'SCA',
  });
  const wallet = response.data?.wallets?.[0];
  fs.writeFileSync(primaryWalletFile, JSON.stringify({ id: wallet?.id, address: wallet?.address }));
  res.json(wallet);
});

app.get('/wallets/:id/balance', async (req, res) => {
  const response = await circleClient.getWalletTokenBalance({ id: req.params.id });
  const usdc = response.data?.tokenBalances?.find((b) => b.token?.id === ARC_TESTNET_USDC_TOKEN_ID);
  res.json({ balance: usdc?.amount ?? '0' });
});

app.get('/wallets/:id/transactions', async (req, res) => {
  const response = await circleClient.listTransactions({ walletIds: [req.params.id] });
  res.json(response.data?.transactions ?? []);
});

app.post('/wallets/:id/transfers', async (req, res) => {
  const { destinationAddress, amount } = req.body;
  const response = await circleClient.createTransaction({
    walletId: req.params.id,
    tokenId: ARC_TESTNET_USDC_TOKEN_ID,
    destinationAddress,
    amount: [amount],
    fee: { type: 'level', config: { feeLevel: 'MEDIUM' } },
  });
  res.json(response.data);
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => console.log(`split-usdc server listening on :${port}`));
