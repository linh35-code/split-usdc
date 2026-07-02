import 'dotenv/config';
import express from 'express';
import { circleClient, walletSetId } from './circleClient.js';

const app = express();
app.use(express.json());

app.post('/wallets', async (req, res) => {
  const response = await circleClient.createWallets({
    walletSetId,
    blockchains: ['ARC-TESTNET'],
    count: 1,
    accountType: 'SCA',
  });
  res.json(response.data?.wallets?.[0]);
});

app.get('/wallets/:id/balance', async (req, res) => {
  const response = await circleClient.getWalletTokenBalance({ id: req.params.id });
  const usdc = response.data?.tokenBalances?.find((b) => b.token?.symbol === 'USDC');
  res.json({ balance: usdc?.amount ?? '0' });
});

app.post('/wallets/:id/transfers', async (req, res) => {
  const { destinationAddress, amount, tokenId } = req.body;
  const response = await circleClient.createTransaction({
    walletId: req.params.id,
    tokenId,
    destinationAddress,
    amount: [amount],
    fee: { type: 'level', config: { feeLevel: 'MEDIUM' } },
  });
  res.json(response.data);
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => console.log(`split-usdc server listening on :${port}`));
