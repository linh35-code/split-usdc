import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';

const apiKey = process.env.CIRCLE_API_KEY;
const entitySecret = process.env.CIRCLE_ENTITY_SECRET;

if (!apiKey || !entitySecret) {
  throw new Error('Missing CIRCLE_API_KEY or CIRCLE_ENTITY_SECRET in server/.env');
}

export const circleClient = initiateDeveloperControlledWalletsClient({ apiKey, entitySecret });

const rawWalletSetId = process.env.CIRCLE_WALLET_SET_ID;
if (!rawWalletSetId) {
  throw new Error('Missing CIRCLE_WALLET_SET_ID in server/.env — run `npm run create-wallet-set` first');
}
export const walletSetId: string = rawWalletSetId;
