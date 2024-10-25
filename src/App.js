// This app was tested locally. clone the irys bundle impl, and run `npm link @irys/bundles` to make package avaialable
import logo from './logo.svg';
import './App.css';
import { RpcProvider, WalletAccount } from "starknet";
import { connect } from "get-starknet";
import { InjectedStarknetSigner } from "@irys/bundles"
import { Buffer } from 'buffer';
window.Buffer = Buffer;

function App() {
  const provider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
  });

  const signMessage = async() => {
    const wallet = await connect({ modalMode: 'alwaysAsk', modalTheme: 'light'});

    const walletAccount = new WalletAccount({ nodeUrl: provider }, wallet);
    const signer = new InjectedStarknetSigner(provider, walletAccount);
    await signer.init();
    
    let signature = await signer.sign(Buffer.from("Hello Irys!"));
    console.log(Buffer.from(signature))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button className="button cursor-pointer px-5 pt-5 py-3 text-white bg-[#0C0C4F]" onClick={signMessage}>
          Connect & Sign
        </button>
      </header>
    </div>
  );
}

export default App;
