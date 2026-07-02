import 'dotenv/config';
import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';

async function main() {
  const client = initiateDeveloperControlledWalletsClient({
    apiKey: process.env.CIRCLE_API_KEY!,
    entitySecret: process.env.CIRCLE_ENTITY_SECRET!,
  });
  const response = await client.getWalletTokenBalance({ id: process.argv[2] });
  console.log(JSON.stringify(response.data?.tokenBalances, null, 2));
}

main();
