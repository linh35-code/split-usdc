# split-usdc — Settle group expenses instantly, in USDC, on Arc

**One-liner:** Splitting a group bill and actually paying it back happen in the same tap — no more "I'll send it later and forget."

## The problem

Splitwise and every clone like it only *calculate* who owes whom. They don't move a single dollar. Users still have to dig up each other's PayPal/bank details and settle manually, with zero proof it ever happened — and it falls apart completely for international friend groups who don't share a banking system.

This demand is already visible in the wild — straight from Splitwise's own feedback board:

> "Everyone I use this with settles in crypto already. Really frustrating it's not in the app."

## The solution

A group-expense app where the split *is* the payment, built natively on Arc + Circle's stack:

- **Circle Wallets** — embedded, seedless onboarding. Users tap "Connect Wallet," no seed phrase, no gas token to manage.
- **Circle Paymaster** — every payment is gas-sponsored, so USDC is the only balance a user ever thinks about.
- **USDC on Arc** — instant, deterministic settlement instead of "I'll Venmo you Friday."

## What's built (fully working end-to-end)

1. **Onboarding & Auth** — wallet connect flow
2. **Groups dashboard** — total owed / owed-to-you at a glance, per-group balances
3. **Group & member management** — create groups, invite members by username/email (no manual wallet addresses, ever)
4. **Add & split expenses** — equal split by default, custom split supported, remainder always absorbed by the person who fronted the money
5. **Full payment flow** — confirm → processing → success/failure, with balance checks *before* a transaction is sent and double-submit protection
6. **Leave-group guard** — you can't exit a group while you still owe money in it

Every feature was built spec-first (product spec + UX/edge-case/security review done before a line of code), then implemented logic-first and styled second, screen by screen.

## Stack

React Native + Expo (TypeScript), React Navigation, Context-based state management. Currently a fully clickable prototype with mocked Circle Wallets/Paymaster calls — architected to swap in real Arc testnet contracts next.

## Try it

Repo: https://github.com/linh35-code/split-usdc

Happy to walk through the code or demo it live — feedback from the Arc community very welcome.
