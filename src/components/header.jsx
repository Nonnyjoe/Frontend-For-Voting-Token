import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import votingTokenABI from "../utils/votingTokenABI.json";
import { useContractReads } from "wagmi";
import { useState, useEffect } from 'react';

const Header = () => {

//   const [tokenData2, setTokenData2] = useState({name: "", symbol:"", totalSupply: ""});
  const [name, setName] = useState(" ");
  const [symbol, setSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [ballotCreationPrice, setBallotPrice] = useState('');

  const TokenDetails = {
    address: "0x62f9d3a871cd539eef606cf3cdf77c30386128ab",
    abi: votingTokenABI,
  };

  const {
    data: tokenData,
    isError,
    isLoading,
  } = useContractReads({contracts: [
      {
        ...TokenDetails,
        functionName: 'name',
      },
      {
        ...TokenDetails,
        functionName: 'symbol',
      },
      {
        ...TokenDetails,
        functionName: 'totalSupply',
      },
     {
        ...TokenDetails,
        functionName: 'PoolCreationPrice',
      },
    ],
     onSuccess(tokenData) {
        // console.log(tokenData[0])
    },
})

useEffect(() => {
  if(tokenData){
    setName(tokenData[0]);
    setSymbol(tokenData[1]);
    setTotalSupply(Math.floor(tokenData[2]/1e18));
    setBallotPrice(tokenData[3].toString());
    console.log(name, symbol, totalSupply, ballotCreationPrice);
  }
},[tokenData, name, symbol,totalSupply, ballotCreationPrice]);



  return (
    <div className='font-mono'>
        <div className='flex justify-between align-center bg-[#2C3333] py-4 px-9 font-mono'>
            <h1 className='text-2xl text-white font-semibold'>VOTING PLATFORM</h1>
            <ConnectButton />
        </div>
        <div className="flex justify-around p-2 mb-4 bg-[#CBE4DE] shadow-black-500/40 shadow-md">
            <div className='flex flex-col'>
                <p className='font-bold'>Token Name</p>
                <p>{name}</p>
            </div>
             <div className='flex flex-col'>
                <p className='font-bold'>Token Symbol</p>
                <p>{symbol}</p>
            </div> 
            <div className='flex flex-col'>
                <p className='font-bold'>Token Total Supply</p>
                <p>{totalSupply}</p>
            </div>
            <div className='flex flex-col'>
                <p className='font-bold'>Ballot Creation Price</p>
                <p>{ballotCreationPrice}</p>
            </div>
        </div>
    </div>
    



  )
}

export default Header