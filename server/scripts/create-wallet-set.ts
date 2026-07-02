import 'dotenv/config';
import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';

async function main() {
  const apiKey = process.env.CIRCLE_API_KEY;
  const entitySecret = process.env.CIRCLE_ENTITY_SECRET;
  if (!apiKey || !entitySecret) {
    throw new Error('Set CIRCLE_API_KEY and CIRCLE_ENTITY_SECRET in server/.env first');
  }

  const client = initiateDeveloperControlledWalletsClient({ apiKey, entitySecret });
  const response = await client.createWalletSet({ name: 'split-usdc' });
  console.log('Put this in server/.env as CIRCLE_WALLET_SET_ID:');
  console.log(response.data?.walletSet?.id);
}

main();
