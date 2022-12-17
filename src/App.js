import React from "react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Import the contract artifact
import MyMusicStreamingService from "contract/MyMusicStreamingService.json";

function App() {
  // Declare state variables
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [artistAddress, setArtistAddress] = useState("");
  const [artistInteractions, setArtistInteractions] = useState(null);
  const [totalInteractions, setTotalInteractions] = useState(null);
  const [contractBalance, setContractBalance] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    // Connect to the Ethereum provider
    async function requestAccount() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      // Get the contract address from the deployment
      const contractAddress = "0xec30b61495d0053874251a9925c6cbf5";

      // Connect to the contract
      const contract = new ethers.Contract(
        contractAddress,
        MyMusicStreamingService.abi,
        provider.getSigner()
      );
      setContract(contract);

      // Get the artist interactions and total interactions from the
      // Get the artist interactions and total interactions from the contract
      const [artistInteractions, totalInteractions] = await Promise.all([
        contract.artistInteractions(),
        contract.totalInteractions(),
      ]);
      setArtistInteractions(artistInteractions);
      setTotalInteractions(totalInteractions);

      // Get the contract balance from the contract
      const contractBalance = await contract.getContractBalance();
      setContractBalance(contractBalance);
    }
  }, []);

  // Function to add an artist to the platform
  async function handleAddArtist(artistAddress) {
    // Call the contract's addArtist function
    await contract.addArtist(artistAddress);
    setArtistAddress("");

    // Update the artist interactions and total interactions
    const [artistInteractions, totalInteractions] = await Promise.all([
      contract.artistInteractions(),
      contract.totalInteractions(),
    ]);
    setArtistInteractions(artistInteractions);
    setTotalInteractions(totalInteractions);
  }

  // Function to increment the interaction count for an artist
  async function handleIncrementArtistInteraction(artistAddress) {
    // Call the contract's incrementArtistInteraction function
    await contract.incrementArtistInteraction(artistAddress);

    // Update the artist interactions and total interactions
    const [artistInteractions, totalInteractions] = await Promise.all([
      contract.artistInteractions(),
      contract.totalInteractions(),
    ]);
    setArtistInteractions(artistInteractions);
    setTotalInteractions(totalInteractions);
  }

  // Function to deposit funds to the contract
  async function handleDeposit(amount) {
    // Call the contract's deposit function
    await contract.deposit({ value: amount });

    // Update the contract balance
    const contractBalance = await contract.getContractBalance();
    setContractBalance(contractBalance);
  }

  // Function to distribute funds to the artists
  async function handleDistributeFunds() {
    // Call the contract's distributeFunds function
    await contract.distributeFunds();

    // Update the contract balance
    const contractBalance = await contract.getContractBalance();
    setContractBalance(contractBalance);
  }

  return (
    <div className="App">
      <h1>My Music Streaming Service</h1>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleAddArtist(artistAddress);
          }}
        >
          <label>
            Add artist:
            <input
              type="text"
              value={artistAddress}
              onChange={(e) => setArtistAddress(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      {artistInteractions
        ? Object.keys(artistInteractions).map((artist) => (
            <p key={artist}>
              <button onClick={() => handleIncrementArtistInteraction(artist)}>
                Increment Artist Interaction
              </button>{" "}
              {artist}: {artistInteractions[artist]}
            </p>
          ))
        : null}
      {totalInteractions ? (
        <p>
          <strong>Total Interactions:</strong> {totalInteractions}
        </p>
      ) : null}
      {contractBalance ? (
        <p>
          <strong>Contract Balance:</strong> {contractBalance}
        </p>
      ) : null}
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleDeposit(amount);
          }}
        >
          <label>
            Deposit:
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <p>
        <button onClick={() => handleDistributeFunds()}>
          Distribute Funds
        </button>
      </p>
    </div>
  );
}

export default App;
