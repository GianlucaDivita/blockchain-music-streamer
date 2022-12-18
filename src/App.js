import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Platform from "./artifacts/contracts/Platform.sol/Platform.json";

// Replace with your contract address
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [artistAddress, setArtistAddress] = useState("");
  const [artists, setArtists] = useState([]);
  const [depositAmount, setDepositAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [valueSent, setValueSent] = useState(0);

  const [metaMask, setMetaMask] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  async function requestAccount() {
    setMetaMask(
      await window.ethereum.request({
        method: "eth_requestAccounts",
      })
    );
  }
  async function requestProvider() {
    let prov = new ethers.providers.Web3Provider(window.ethereum);
    console.log(prov);
    setProvider(prov);
  }
  async function requestContract() {
    let getContract = new ethers.Contract(
      contractAddress,
      Platform.abi,
      provider.getSigner()
    );
    console.log(getContract);
    setContract(getContract);
  }

  useEffect(() => {
    requestAccount();
  }, []);

  useEffect(() => {
    if (metaMask === null) return;
    requestProvider();
  }, [metaMask]);
  useEffect(() => {
    if (provider === null) return;
    requestContract();
  }, [provider]);

  const getBalance = async () => {
    try {
      let bal = await contract.getContractBalance();
      console.log(bal);
      setBalance(bal);
    } catch (error) {
      console.log(error);
    }
  };
  const addArtist = async () => {
    try {
      // await window.ethereum.sendAsync({ method: "eth_requestAccounts" });
      let artist = await contract.addArtist(artistAddress);
      console.log(artist);
      const artistInteractions = await contract.artistInteractions(
        artistAddress
      );
      console.log(artistInteractions);
      setArtists([
        ...artists,
        { address: artistAddress, interactions: artistInteractions.toString() },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  // Call the incrementInteractions function of the contract
  const incrementArtistInteraction = async (artistIndex) => {
    try {
      await window.ethereum.sendAsync({ method: "eth_requestAccounts" });
      const artist = artists[artistIndex];
      await contract.incrementArtistInteraction(artist.address);
      const updatedInteractions = await contract.artistInteractions(
        artist.address
      );
      const updatedArtists = [...artists];
      updatedArtists[artistIndex] = {
        ...artist,
        interactions: updatedInteractions.toString(),
      };
      setArtists(updatedArtists);
    } catch (error) {
      console.error(error);
    }
  };

  // Call the deposit function of the contract
  const deposit = async () => {
    try {
      await window.ethereum.sendAsync({ method: "eth_requestAccounts" });
      await contract.deposit({ value: ethers.utils.parseEther(depositAmount) });
      const updatedBalance = await contract.getContractBalance();
      // setBalance(updatedBalance);
      getBalance();
    } catch (error) {
      console.error(error);
    }
  };

  // Call the distributeFunds function of the contract
  const distributeFunds = async () => {
    try {
      const initialBalance = await contract.getContractBalance();

      // Get the current block and the gas limit
      const getBlock = await provider.getBlock();
      const gasLimit = getBlock.gasLimit;

      // Send the transaction with the gas limit specified
      await window.ethereum.sendAsync({
        method: "eth_requestAccounts",
        gasLimit,
      });
      console.log(await contract.distributeFunds());
      const updatedBalance = await contract.getContractBalance();
      const valueSent = initialBalance.sub(updatedBalance);

      // setBalance(updatedBalance);
      getBalance();
      setValueSent(valueSent);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(
    (artistInfo, setArtistInfo) => {
      const updateInteractions = async () => {
        const artistInteractions = await contract.artistInteractions(
          artistAddress
        );
        setArtistInfo({
          ...artistInfo,
          interactions: artistInteractions.toString(),
        });
      };
      if (artistAddress) {
        updateInteractions();
      }
    },
    [artistAddress]
  );

  return (
    <div>
      <button
        onClick={() => {
          getBalance();
        }}
      >
        Update Balance
      </button>
      <br />
      <input
        type="text"
        placeholder="Enter artist address"
        value={artistAddress}
        onChange={(e) => setArtistAddress(e.target.value)}
      />
      <button
        onClick={() => {
          addArtist();
        }}
      >
        Add artist
      </button>

      <ul>
        {artists.map((artist, index) => (
          <li key={artist.address}>
            {artist.address}: {artist.interactions}
            <button onClick={() => incrementArtistInteraction(index)}>
              Increment interactions
            </button>
            <p>Value sent to recipients: {valueSent}</p>
          </li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Enter deposit amount"
        value={depositAmount}
        onChange={(event) => setDepositAmount(event.target.value)}
      />
      <button onClick={deposit}>Deposit</button>

      <p>Balance: {balance.toString()}</p>
      <button onClick={distributeFunds}>Distribute funds</button>
    </div>
  );
}

export default App;
