# Circle Developer Grant Application — split-usdc

Field-by-field answers for the actual Questbook form
(circle.questbook.app/proposal_form/?grantId=6992785dfb7e884efacadb1e&chainId=10).

## Company info

- **Company Legal Entity Name:** *(leave blank — no company)*
- **Company Doing-Business-As (DBA) name:** `split-usdc`
- **Founder names, roles, bios:** *[FILL IN: your real name, "Founder & Developer", your city/country — kept out of this public repo, see private chat for the drafted sentence]*
- **Project website:** `https://github.com/linh35-code/split-usdc`
- **Project X handle:** *(leave blank if none)*
- **Where are you and your founders located?:** *[FILL IN: same real name/location as above]*
- **Where is your business located?:** *[FILL IN: your country]*
- **Is your business incorporated?:** No

## Project Abstract

- **Project Name:** `split-usdc`
- **One-liner:** `split-usdc lets groups split a bill and settle it instantly in USDC on Arc, instead of just tracking who owes whom like Splitwise.`

**What problem are you solving and why is it important?**
Splitwise and every clone like it only calculate who owes whom — they never move money. Users still hunt down PayPal/bank details to settle manually, with no proof it happened, and it breaks down completely for international groups without a shared banking system. This demand is visible in the wild: on Splitwise's own feedback board, users have written "Everyone I use this with settles in crypto already. Really frustrating it's not in the app."

**What is your solution to that problem?**
A group-expense app where the split *is* the payment: Circle Developer-Controlled Wallets give every user a seedless embedded wallet with no key management exposed to them, USDC is Arc's native gas token so there's no separate gas token to hold, and every payment is a real on-chain USDC transfer verifiable on testnet.arcscan.app — not just a tracked balance.

**Why hasn't this problem been solved yet? What are the barriers?**
General-purpose crypto wallets force users to manage seed phrases and hold a separate gas token — a dealbreaker for someone who just wants to split a dinner bill. Earlier "crypto Splitwise" attempts hit the same wall: different users end up on different wallets, tokens, and chains, so there's no single trustless way to settle. Arc removes both blockers — USDC is the native gas token, and Circle's Developer-Controlled Wallets remove the seed-phrase requirement entirely.

**Why are you and your team uniquely suited to solve this problem?**
I'm not a crypto-native builder — I work outside tech and I'm self-taught, so I'm building this as close to the real target user as possible: someone who wants to split a bill, not someone comfortable managing a wallet. That constraint directly shaped the product — no manual wallet addresses, no gas token to think about, balance checks before sending — because I ran into that confusion myself while building it.

## Product Alignment Track

- **Is your project currently live in production?:** No
- **Are you live on Arc?:** Yes
- **Which other chain(s) are you currently live on?:** *(blank)*
- **Which Circle products are currently integrated?:** USDC, Wallets
- **Which Circle products do you plan to integrate?:** Paymaster (real gas sponsorship for mainnet), Gateway (optional, future multi-chain balance)

Note: the form says the video submission needs to validate the Circle products checked — check whether there's a video upload field further down before submitting.

## Milestones

1. **Real multi-user backend** — per-user Circle wallets, persistent accounts, replacing the current single shared demo wallet.
2. **Mainnet-track hardening** — security review, rate limiting, real notification system.
3. **Public beta** — onboard a real first group of users settling real shared expenses on Arc mainnet.

## Project Traction and Roadmap

**Current traction:** No live users yet — this is a working prototype, built and tested end-to-end, including real USDC transactions on Arc Testnet via Circle Developer-Controlled Wallets (verifiable on testnet.arcscan.app). No MAU/AUM/volume metrics yet since it hasn't launched publicly.

**Dune Analytics / public dashboard link:** N/A

**Are you funded?:** No

**Technical roadmap with Circle integration timeline:** Weeks 1–4: migrate from a single shared demo wallet to per-user Circle Developer-Controlled Wallets with persistent accounts; add push notifications for expenses/payments. Weeks 4–8: integrate Circle Paymaster for true gas sponsorship as the product expands beyond Arc; support group invites via email with real user accounts. Weeks 8–12: security review and rate limiting on the payment flow; prepare for Arc mainnet deployment with real funds.

**How will this grant support your roadmap?:** Grant funding would cover engineering time to build a production-grade multi-user backend (currently a single-wallet prototype), a security review before handling real user funds on mainnet, and infrastructure/Circle API costs during public beta.

## Deck and Demo

- **Video demo:** see `video-script.md` for a shot-by-shot recording script (record it yourself, then paste the link here)
- **Investor deck:** a slide-style deck is available as a Claude artifact — see chat for the link, make sure sharing is turned on before submitting

## Conflict of Interest

**No** — confirm this is accurate for you before submitting.

## Reference: fuller narrative (if long-form fields appear)

**Current status:** Working end-to-end prototype (React Native + Expo, TypeScript) with a Node backend on Circle's Developer-Controlled Wallets SDK — wallet connect onboarding, group/member management, equal/custom expense splits, full payment flow with real balance checks and real USDC transfers, transaction history from Circle's API, leave-group debt guard.

**Why Circle/Arc should care:** Group payments are a natural, high-frequency wedge for stablecoin-native UX — the app is used every time a bill needs splitting, which is often. It's a concrete, relatable demonstration of "USDC as the only balance that matters," aimed at mainstream users who've never touched crypto before.
