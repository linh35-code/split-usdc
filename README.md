# split-usdc

Settle group expenses instantly, in USDC, on Arc.

Splitting a group bill and actually paying it back happen in the same tap — no more "I'll send it later and forget."

## The problem

Splitwise and every clone like it only *calculate* who owes whom. They don't move a single dollar. Users still have to dig up each other's PayPal/bank details and settle manually, with zero proof it ever happened — and it falls apart completely for international friend groups who don't share a banking system.

Straight from Splitwise's own feedback board:

> "Everyone I use this with settles in crypto already. Really frustrating it's not in the app."

## The solution

A group-expense app where the split *is* the payment, built on Arc + Circle's stack:

- **Circle Developer-Controlled Wallets** — seedless onboarding, no key management for the user
- **USDC as Arc's native gas token** — no separate gas token to hold or manage
- **USDC on Arc** — instant, deterministic settlement

## Features

1. **Onboarding & Auth** — wallet connect flow
2. **Groups dashboard** — total owed / owed-to-you, per-group balances
3. **Group & member management** — create groups, invite by username/email (no manual wallet addresses)
4. **Add & split expenses** — equal or custom split, remainder absorbed by whoever fronted the money
5. **Full payment flow** — confirm → processing → success/failure, balance checks before sending, double-submit protection
6. **Leave-group guard** — can't exit a group while you still owe money in it

## Stack

- React Native + Expo (TypeScript) — app in the repo root
- React Navigation (native stack + bottom tabs)
- Context-based state management
- `server/` — Node.js backend using Circle's Developer-Controlled Wallets SDK, talking to real Arc Testnet

Wallet creation, balance reads, and USDC transfers are real: the backend creates an actual developer-controlled wallet on Arc Testnet via Circle's SDK, and payments are genuine on-chain USDC transfers you can look up on [Arc Testnet's explorer](https://testnet.arcscan.app).

## Running locally

```bash
npm install
npm start          # then press w for web, or scan the QR with Expo Go
```

Requires the backend running too — see [`server/README.md`](server/README.md) for setup (needs a free Circle Developer sandbox account).

## Project docs

- [`docs/spec.md`](docs/spec.md) — full product & UI spec
- [`docs/showcase.md`](docs/showcase.md) — project pitch for community/hackathon submissions

## Status

MVP complete — every feature above is implemented and manually tested end-to-end, backed by real Circle Wallets on Arc Testnet.
