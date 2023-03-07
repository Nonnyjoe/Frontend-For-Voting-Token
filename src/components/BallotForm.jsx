import React, { useState } from "react";
import votingTokenABI from "../utils/votingTokenABI.json";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BallotForm = () => {
  const [voteId, setVoteId] = useState("");
  const [contender1, setContender1] = useState("");
  const [contender2, setContender2] = useState("");
  const [contender3, setContender3] = useState("");
  const notify = () => toast("Ballot Created Succesfully!");

  const { config } = usePrepareContractWrite({
    address: "0x62f9D3A871cd539EEF606cF3cdF77c30386128AB",
    abi: votingTokenABI,
    functionName: "createVotePool2",
    args:[voteId, contender1, contender2, contender3],
  });

  const {
    data: ballotData,
    isLoading: isLoadingballot,
    isSuccess,
    write: createVotePool2,
  } = useContractWrite(config);

  const { data:sendBallotData, isError:ballotDataError, isLoading:isLoadingBallot } = useWaitForTransaction({
    hash: ballotData?.hash,
    onSuccess(data) {
      console.log("success");
       notify();
    },
    onError(error) {
      console.log("error", ballotDataError);
    },
  });

  const handleBallot =(e) =>{
    e.preventDefault();
    setTimeout(()=>{
        console.log(voteId, contender1, contender2, contender3);
        createVotePool2?.();
    },1000)
  }

  return <div className=" font-mono bg-[#CBE4DE] py-3 flex">
   <div className="w-3/5 rounded-md shadow-md place-self-center m-auto bg-white py-5">
    <h2 className='text-4xl font-semibold mb-10 mt-30 font-mono'>CREATE BALLOT</h2>
    <form onSubmit={handleBallot}>
         <div className="mb-4 leading-7">
            <label className="mr-4">Vote Id</label>
            <input
                type="number"
                placeholder="Id of Vote Campaign"
                onChange={(e) => setVoteId(e.target.value)}
                className="px-3 py-2 border border-grey-300 rounded-md shadow-sm "
            />
        </div>

           <div className="mb-4 leading-7">
                <label className="mr-4">Contender One</label>
                <input
                    type="text"
                    placeholder="Contender one"
                    onChange={(e) => setContender1(e.target.value)}
                    className="px-3 py-2 border border-grey-300 rounded-md shadow-sm"
                />
        </div>

         <div className="mb-4 leading-7">
                <label className="mr-4">Contender Two</label>
                <input
                    type="text"
                    placeholder="Contender two"
                    onChange={(e) => setContender2(e.target.value)}
                    className="px-3 py-2 border border-grey-300 rounded-md shadow-sm"
                />
        </div>

          <div className="mb-4 leading-7">
                <label className="mr-4">Contender Three</label>
                <input
                    type="text"
                    placeholder="Contender three"
                    onChange={(e) => setContender3(e.target.value)}
                    className="px-3 py-2 border border-grey-300 rounded-md shadow-sm"
                />
        </div>
            <button type="submit" className="py-2 px-4 bg-[#2E4F4F] rounded-lg hover:bg-white hover:text-[#2E4F4F] hover:border hover:border-[#2E4F4F] text-white mt-3 ">
          {isLoadingBallot
            ? "...Processing"
            : ballotDataError
            ? "Error Occured"
            : "Create Ballot"}
        </button>
    </form>
    </div>
  </div>;
};

export default BallotForm;
