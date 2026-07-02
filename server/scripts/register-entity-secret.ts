import 'dotenv/config';
import fs from 'node:fs';
import { registerEntitySecretCiphertext } from '@circle-fin/developer-controlled-wallets';

async function main() {
  const apiKey = process.env.CIRCLE_API_KEY;
  const entitySecret = process.env.CIRCLE_ENTITY_SECRET;
  if (!apiKey || !entitySecret) {
    throw new Error('Set CIRCLE_API_KEY and CIRCLE_ENTITY_SECRET in server/.env first');
  }

  const response = await registerEntitySecretCiphertext({ apiKey, entitySecret });
  fs.writeFileSync('recovery_file.dat', response.data?.recoveryFile ?? '');
  console.log('Registered. Recovery file written to server/recovery_file.dat — back it up somewhere safe.');
}

main();
