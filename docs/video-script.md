# Video demo script (max 5 minutes)

Record your screen (e.g., OBS, or Windows' built-in Xbox Game Bar Win+Alt+R) while narrating.
Upload unlisted to YouTube or Google Drive, then paste the link into the form.

## 0:00–0:30 — Intro
"Hi, I'm [your name], building split-usdc — a group-expense app where splitting a bill and
settling it happen in the same step, in USDC, on Arc. Unlike Splitwise, which only calculates
who owes whom, every payment here is a real USDC transfer."

## 0:30–1:30 — Codebase walkthrough (required)
Open `server/src/circleClient.ts` and `server/src/index.ts` in your editor, screen-share them.

Say: "This is the backend, using Circle's Developer-Controlled Wallets SDK. Here we initiate the
client with an API key and entity secret [point to circleClient.ts]. This endpoint creates a
real wallet on ARC-TESTNET [point to `app.post('/wallets', ...)`]. This one reads the native USDC
balance — USDC is Arc's native gas token, so there's no separate gas token to manage [point to
`ARC_TESTNET_USDC_TOKEN_ID` and the balance endpoint]. And this one sends a real USDC transfer
[point to the `/transfers` endpoint using `createTransaction`]."

## 1:30–2:00 — App-side integration
Open `src/context/AuthContext.tsx` and `src/screens/payment/PaymentProcessingScreen.tsx`.

Say: "On the app side, connecting a wallet calls the backend to create or fetch the real Circle
wallet [point to `connectWallet`]. Paying an expense calls the transfer endpoint and waits for
the real result before marking it paid [point to the fetch call in PaymentProcessingScreen]."

## 2:00–4:00 — Live product demo (required)
Screen-record the actual running app (localhost:8082 or Expo Go):
1. Show the Welcome screen → connect wallet → land on Groups list
2. Open the **Ví** (Wallet) tab — show the real address, real USDC balance, and transaction history
3. Go into a group, tap **Trả** on an expense you owe
4. Show the confirm screen (real balance check), confirm, show "Đang xử lý"
5. Show the success screen with the real transaction ID
6. Go back to the **Ví** tab — balance updated, new transaction appears in history
7. (Optional but strong) Paste the transaction hash into testnet.arcscan.app to show it live on Arc's explorer

## 4:00–4:30 — What's planned, not yet built
"Circle Paymaster isn't wired in yet since USDC being Arc's native gas token already removes the
need for a separate gas token — but we'll add it as we expand to other chains where gas sponsorship
matters more."

## 4:30–5:00 — Close
"That's split-usdc — real USDC settlement for the most common shared-money problem there is.
Repo's linked in the application. Thanks for watching."
