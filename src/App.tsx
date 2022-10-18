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
          swapAsset: 'ETH_*',
          userAddress: Accos,
          userEmailAddress: email?.toString(),
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
        <h1> RAMP NETWORK test environment</h1>
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
      </header>
    </div>
  );
}

export default App;
