# Circle Developer Grant Application — split-usdc

Draft content for circle.com/grant. Fields marked [FILL IN] need your real info — nothing
fabricated goes in on your behalf.

## Project name
split-usdc

## One-line description
A group-expense app where splitting a bill and settling it happen in the same step, in USDC, on Arc — instead of just calculating who-owes-who like Splitwise.

## Team
[FILL IN: your name, email, and whether this is solo or a team — be honest, e.g. "Solo builder, self-taught, first project on Arc"]

## The problem
Splitwise and every clone like it only calculate who owes whom — they never move money. Users still hunt down PayPal/bank details to settle manually, with no proof it happened, and it breaks down completely for international groups without a shared banking system. This demand is visible in the wild: on Splitwise's own feedback board, users have written "Everyone I use this with settles in crypto already. Really frustrating it's not in the app."

## How Arc and Circle products are used
- **Circle Developer-Controlled Wallets** — every user gets a seedless embedded wallet, created and managed server-side via Circle's SDK. No seed phrases, no key management exposed to end users.
- **Arc Testnet** — USDC is Arc's native gas token, so users never need a separate gas token; wallet balance and spending power are the same number.
- **Real on-chain settlement** — every payment in the app is an actual USDC transfer between real Circle-managed wallets on Arc Testnet, verifiable on testnet.arcscan.app.

Arc isn't an add-on here — settlement *is* the product. The entire value proposition (pay instantly instead of just tracking debt) only works because Arc makes USDC-native payments fast and gas-frictionless.

## Current status
Working end-to-end prototype (React Native + Expo, TypeScript) with a Node backend on Circle's Developer-Controlled Wallets SDK:
- Wallet connect onboarding (real wallet creation)
- Group and member management
- Expense creation with equal/custom splits
- Full payment flow with real balance checks and real USDC transfers
- Transaction history and activity feed pulled from Circle's API
- Leave-group debt guard

Repo: https://github.com/linh35-code/split-usdc

## Product roadmap
- **Now → +4 weeks:** Move from single shared demo wallet to real per-user wallet provisioning (one Circle wallet per signed-up user instead of one shared prototype wallet); add push notifications for new expenses and incoming payments.
- **+4 → +8 weeks:** Support group invites via email/SMS with proper user accounts (currently invites are limited to a mock in-app directory); add multi-currency support if Arc/Circle add more native assets.
- **+8 → +12 weeks:** Mainnet readiness — security review of the payment flow, rate limiting, and a real onboarding flow (KYC-lite where required) before handling real user funds.

## Proposed grant milestones
1. **M1 — Real multi-user backend:** per-user Circle wallets, persistent accounts, replacing the current single-demo-wallet prototype.
2. **M2 — Mainnet-track hardening:** security review, rate limiting, error handling audit, real notification system.
3. **M3 — Public beta:** onboard a real first group of users (e.g., a friend group or small team) settling real recurring shared expenses on Arc mainnet.

## Why Circle/Arc should care
Group payments are a natural, high-frequency wedge for stablecoin-native UX — the app is used every time a bill needs splitting, which is often. It's a concrete, relatable demonstration of "USDC as the only balance that matters," aimed at mainstream users who've never touched crypto before, not crypto-native users.
