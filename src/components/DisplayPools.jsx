import React from 'react'
import votingTokenABI from "../utils/votingTokenABI.json";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead
} from "wagmi";
import { useState, useEffect } from 'react';


const DisplayPools = () => {

const GetId =(i) =>{
  const {
  data: tokenData,
  isError,
  isLoading,
} = useContractRead({
  address: "0x62f9D3A871cd539EEF606cF3cdF77c30386128AB",
  abi: votingTokenABI,
  functionName: 'vottingPools',
  args: [i],
})
return tokenData
}


let ballotIds=[]; 

async function BreakThings() {
  for(let i = 0; i < 9; i++){
   let tData = await GetId(i);
   if(tData < 0){
    console.log(tData);
   }
  }
  console.log(ballotIds);
}

BreakThings();  

  return (
    <div>
      
    </div>
  )
}

export default DisplayPools
