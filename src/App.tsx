import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';
import {Magic} from 'magic-sdk';
import { setMaxListeners } from 'events';

const { ethers } = require("ethers");

const ListOfNetworks = {
  ETH : {
    network : {
      rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
      chainId: 80001
    }   
  },
  MATIC : {
    network : {
      rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
      chainId: 80001
    }   
  }
}



function App() {
  const [user, setUser] = useState('');
  const [email, setEmail ] = useState('chanchaldelsonmail@gmail.com');
  let Accos;
  let VAR = 'ETH';
  let RPC_URL;
  let CHAIN_ID;
  let netSwitch = 0;
  
  let magic:any; 

  function logout(){
     magic.user.logout();    
  }
  
  

    let  ethersProvider:any;  
    


     console.log(user);

    async function openRampEthereum(){
      let details = await magic.user.getMetadata();
      console.log(details);
      let email = details.email;
      console.log(email);
      Accos= await ethersProvider.listAccounts();      
        new RampInstantSDK({
          hostAppName: 'your dApp',
          hostLogoUrl: 'https://yourdapp.com/yourlogo.png',
          // swapAmount: '1500000000000000000', // 150 ETH in wei
          // swapAsset: 'ETH_*',
          userAddress: Accos,
          userEmailAddress: email?.toString(),
          url: 'https://ri-widget-staging.firebaseapp.com/',
          // hostApiKey: 'key'
          
        })
          .on('*', (event) => console.log(event))
          .show();

      }

      async function openRampPolygon(){
        let details = await magic.user.getMetadata();
        console.log(details);
        let email = details.email;
        console.log(email);
        Accos= await ethersProvider.listAccounts();      
          new RampInstantSDK({
            hostAppName: 'your dApp',
            hostLogoUrl: 'https://yourdapp.com/yourlogo.png',
            // swapAmount: '1500000000000000000', // 150 ETH in wei
            swapAsset: 'MATIC_*',
            userAddress: Accos,
            userEmailAddress: email?.toString()
            
          })
            .on('*', (event) => console.log(event))
            .show();
  
        }

  function handleChange(event:any){
   setEmail(event.target.value);
  }

  async function connectMagicEthereum(){
    magic  = new Magic('magickey');    
    ethersProvider = new ethers.providers.Web3Provider(magic.rpcProvider);
    await magic.auth.loginWithMagicLink({email : email });

  }

  async function connectMagicPolygon(){

    magic  = new Magic('magickey', {
      network : {
        rpcUrl: 'https://polygon-rpc.com/', // Polygon RPC URL
        chainId: 137, // Polygon chain id
      }
    }); 
    ethersProvider = new ethers.providers.Web3Provider(magic.rpcProvider);
    await magic.auth.loginWithMagicLink({email : email });
    netSwitch = 1;
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1> RAMP NETWORK staging: Goerli environment</h1>
       {/* <input type='text' onChange={handleChange}>Email ID </input> */}
       <div className='Magic'>
        <h5> STEP 1 : Connect MAGIC </h5>
       <button onClick={connectMagicEthereum}>Connect MAGIC ETHEREUM</button>
        <button onClick={connectMagicPolygon}>Connect MAGIC POLYGON</button>
        </div>
        <div className='Ramp'>
        <h5> STEP 2 : Open RAMP </h5>
        <button onClick={openRampEthereum}>OPEN RAMP ETHEREUEM</button>
        <button onClick={openRampPolygon}>OPEN RAMP POLYGON</button>
        </div>       
        <div className='logout'>
        <button onClick={logout}> LOGOUT MAGIC</button>
        </div>
        <div> <h3>Workaround</h3><br></br>
           You can make a test purchase without having to connect your own payment method (staging environments only): <br/>
           <p><ol>
          <li>Add a new payment method, select "Manual Bank Transfer" (switch country to any European country if your country doesn't have that option).</li><br/>
         <li>You should be back to the confirmation screen with "Any currency account" manual bank transfer payment method selected.</li> <br/>
         <li> Continue, the purchase will be created.</li><br/>
        <li> Tick the box that says that you've transferred the funds and continue.</li> <br/>
         <li>Open the transaction summary link.</li> <br/>
         <li>Click the manual test release button at the bottom of the summary and wait a few moments until the confirmation is processed.</li> 
          </ol></p></div>
      </header>
    </div>
  );
}

export default App;
