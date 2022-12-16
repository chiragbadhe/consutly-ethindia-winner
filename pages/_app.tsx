import "../styles/globals.css";
import type { AppProps } from "next/app";

import {
  getHuddleClient,
  HuddleClientProvider,
} from "@huddle01/huddle01-client";

import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import MyCustomAvatar from "../components/elements/CustomAvatar";


const alchemyId = process.env.ALCHEMY_ID;

const client = createClient(
  getDefaultClient({
    appName: "Consultation App",
    alchemyId,
  })
);

export default function App({ Component, pageProps }: AppProps) {
  const huddleClient = getHuddleClient(
    "052d7c4930885c3e9d837eb1e1eeab370465806b3315e96dc6afd9a734bc9068"
  );

  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider
         options={{
          customAvatar: MyCustomAvatar,
        }}
        customTheme={{
          "--ck-connectbutton-border-radius": ".4rem",
        }}
      >
        <HuddleClientProvider value={huddleClient}>
          <Component {...pageProps} />
        </HuddleClientProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
