# Forum post drafts for community.arc.io (post these yourself, one per day is plenty)

## Post 1 — Introduction (post this first)

**Title:** Building a stablecoin group-payments app on Arc — hi from a new Architect

Hey Arc House 👋

I'm building **split-usdc**, a group-expense app where splitting a bill and actually settling it happen in one step, using USDC + Circle Wallets/Paymaster on Arc. Spent the last few days shipping the full flow (groups, expenses, payments, leave-group debt guard) as a clickable prototype.

Excited to be here, happy to swap notes with anyone else building payments/fintech apps on Arc.

---

## Post 2 — Genuine technical question (real value, not just points)

**Title:** Best practice for wiring Circle Paymaster into an Expo/React Native app?

Right now my payment flow (confirm → processing → success/failure) is mocked — balance checks, double-submit protection, and status updates are all client-side state. Before I wire it to real Arc testnet contracts:

- Is there a recommended pattern for sponsoring gas via Circle Paymaster from a React Native / Expo client specifically (vs. a plain web dApp)?
- Any gotchas with Circle Wallets' embedded-wallet flow on mobile (deep links, redirect handling, etc.)?

Happy to share my current (mocked) implementation if useful context.

---

## Post 3 — Share what you built (feedback-seeking framing, not a link drop)

**Title:** Feedback wanted: split-usdc — settling group bills in USDC instead of just tracking them

Splitwise and its clones only calculate who owes whom — they never move money, so people still hunt down PayPal/bank details to settle. I built a prototype that collapses that into one step using Arc + Circle's stack (seedless Circle Wallets, gas-sponsored via Paymaster, USDC settlement).

Full flow is working end-to-end: create groups → split expenses (equal/custom) → pay with balance checks → leave-group debt guard.

Repo's public if anyone wants to poke at the code or has thoughts on the split-math edge cases (rounding remainders, partial payments): https://github.com/linh35-code/split-usdc

Genuinely looking for feedback, not just dropping a link — what would you want to see before trusting an app like this with real money?
