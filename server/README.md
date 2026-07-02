# split-usdc server

Backend for split-usdc. Wraps Circle's Developer-Controlled Wallets SDK so the mobile app never
touches API keys or the entity secret directly.

## Setup

1. Create a free sandbox account at [console.circle.com](https://console.circle.com) and generate an API key.
2. `cp .env.example .env` and paste your API key into `CIRCLE_API_KEY`.
3. `npm install`
4. `npm run generate-entity-secret` — copy the printed value into `CIRCLE_ENTITY_SECRET` in `.env`.
5. `npm run register-entity-secret` — writes a recovery file to `server/recovery_file.dat`. Back it up somewhere safe; it's the only way to recover the entity secret if you lose it.
6. `npm run create-wallet-set` — copy the printed ID into `CIRCLE_WALLET_SET_ID` in `.env`.
7. `npm run dev`

The first `POST /wallets` call creates one real wallet on Arc Testnet and caches it in
`primary-wallet.json` (gitignored) — this is a single-user prototype, so every "connect" reuses
that same wallet instead of minting a new empty one each time.

To fund the wallet with testnet USDC, use the public faucet at
[faucet.circle.com](https://faucet.circle.com) (select Arc Testnet, paste the wallet address) —
the SDK's built-in faucet endpoint requires a mainnet-upgraded account and will return 403 on a
sandbox key.

## Endpoints

- `POST /wallets` — get (or create, once) the primary wallet
- `GET /wallets/:id/balance` — native USDC balance on Arc Testnet
- `POST /wallets/:id/transfers` — send USDC to `destinationAddress`
