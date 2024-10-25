// This app was tested locally. clone the irys bundle impl, and run `npm link @irys/bundles` to make package avaialable
import logo from './logo.svg';
import './App.css';
import { RpcProvider, WalletAccount } from "starknet";
import { connect } from "starknetkit";
import { InjectedStarknetSigner } from "@irys/bundles"
import { Buffer } from 'buffer';
window.Buffer = Buffer;

function App() {
  const provider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
  });

  let signature;
  const signMessage = async() => {
    const { wallet } = await connect({ modalMode: "alwaysAsk"});

    const walletAccount = new WalletAccount({ nodeUrl: provider }, wallet);

    const signer = new InjectedStarknetSigner(provider, walletAccount);
    await signer.init();
    
    const message = "Hello Irys!";
    signature = await signer.sign(Buffer.from(message));
    console.log(Buffer.from(signature))
  }

  const verifyMessage = async() => {
    const pubKey = "0x030572512eee445da3b22322ff07ebce73e2e46237c73d79a9a841620c3a092d79"; // replace with your public key
    const message = "Hello Irys!";

    const hexString = pubKey.startsWith("0x") ? pubKey.slice(2) : pubKey;
    const isValid = InjectedStarknetSigner.verify(Buffer.from(hexString, "hex"), Buffer.from(message), signature);
    console.log(isValid);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button className="button cursor-pointer px-5 pt-5 py-3 text-white bg-[#0C0C4F]" onClick={signMessage}>
          Connect & Sign
        </button>

        <button className="button cursor-pointer px-5 pt-5 py-3 text-white bg-[#0C0C4F]" onClick={verifyMessage}>
          Verify message
        </button>
      </header>
    </div>
  );
}

export default App;
