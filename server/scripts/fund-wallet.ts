import 'dotenv/config';
import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';

async function main() {
  const address = process.argv[2];
  if (!address) {
    throw new Error('Usage: tsx scripts/fund-wallet.ts <wallet-address>');
  }

  const apiKey = process.env.CIRCLE_API_KEY!;
  const entitySecret = process.env.CIRCLE_ENTITY_SECRET!;
  const client = initiateDeveloperControlledWalletsClient({ apiKey, entitySecret });

  const response = await client.requestTestnetTokens({
    address,
    blockchain: 'ARC-TESTNET',
    usdc: true,
  });
  console.log('Faucet request status:', response.status);
}

main();
