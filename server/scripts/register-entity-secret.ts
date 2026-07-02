import 'dotenv/config';
import { registerEntitySecretCiphertext } from '@circle-fin/developer-controlled-wallets';

async function main() {
  const apiKey = process.env.CIRCLE_API_KEY;
  const entitySecret = process.env.CIRCLE_ENTITY_SECRET;
  if (!apiKey || !entitySecret) {
    throw new Error('Set CIRCLE_API_KEY and CIRCLE_ENTITY_SECRET in server/.env first');
  }

  const response = await registerEntitySecretCiphertext({ apiKey, entitySecret });
  console.log('Save this recovery file somewhere safe (do not commit it):');
  console.log(response.data?.recoveryFile);
}

main();
