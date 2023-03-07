import "./App.css";
import Header from "./components/header";
import votingTokenABI from "./utils/votingTokenABI.json";
import { useContractRead } from "wagmi";
import BallotForm from "./components/BallotForm";
import DisplayPools from "./components/DisplayPools";
function App() {
  // const TokenDetails = {
  //   address: "0x62f9d3a871cd539eef606cf3cdf77c30386128ab",
  //   abi: votingTokenABI,
  // };
  // const {
  //   data: totalSupplyData,
  //   isError,
  //   isLoading,
  // } = useContractRead({
  //   ...TokenDetails,
  //   functionName: "totalSupply",
  // });

  // if (totalSupplyData) {
  //   console.log(totalSupplyData.toString());
  // }

  return (
    <div className="App">
      <Header />
      <BallotForm />
      <DisplayPools />
    </div>
  );
}

export default App;
