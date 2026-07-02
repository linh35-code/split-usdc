# split-usdc — Settle group expenses instantly, in USDC, on Arc

**Short version (for character-limited forms):**

split-usdc — split group bills and settle them instantly in USDC on Arc, no more IOUs. Splitwise only calculates who owes whom; it never moves money, so people still hunt down PayPal/bank details to settle. We fix that with Circle Developer-Controlled Wallets on Arc Testnet, where USDC is the native gas token, so it's the only balance anyone thinks about. Fully working flow: create groups, split expenses (equal or custom), pay with real on-chain transfers and balance checks, leave-group debt guard.

Repo: https://github.com/linh35-code/split-usdc

---

**Full version (for Discord posts / no character limit):**

**One-liner:** Splitting a group bill and actually paying it back happen in the same tap — no more "I'll send it later and forget."

**The problem**

Splitwise and every clone like it only *calculate* who owes whom. They don't move a single dollar. Users still have to dig up each other's PayPal/bank details and settle manually, with zero proof it ever happened — and it falls apart completely for international friend groups who don't share a banking system.

This demand is already visible in the wild — straight from Splitwise's own feedback board:

> "Everyone I use this with settles in crypto already. Really frustrating it's not in the app."

**The solution**

A group-expense app where the split *is* the payment, built natively on Arc + Circle's stack:

- **Circle Developer-Controlled Wallets** — seedless onboarding, no key management for the user.
- **USDC as Arc's native gas token** — no separate gas token to hold or manage.
- **USDC on Arc** — instant, deterministic settlement instead of "I'll Venmo you Friday."

**What's built (fully working end-to-end)**

1. Onboarding & Auth — wallet connect flow
2. Groups dashboard — total owed / owed-to-you, per-group balances
3. Group & member management — create groups, invite by username/email (no manual wallet addresses, ever)
4. Add & split expenses — equal or custom split, remainder absorbed by whoever fronted the money
5. Full payment flow — confirm → processing → success/failure, balance checks before sending, double-submit protection
6. Leave-group guard — can't exit a group while you still owe money in it

**Stack:** React Native + Expo (TypeScript), React Navigation, Context state, with a small Node backend on Circle's Developer-Controlled Wallets SDK. Wallet creation, balances, and transfers are real — every payment is an actual USDC transaction on Arc Testnet, checkable on [testnet.arcscan.app](https://testnet.arcscan.app).

**Repo:** https://github.com/linh35-code/split-usdc

Happy to walk through the code or demo it live — feedback from the Arc community very welcome.
