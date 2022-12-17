import React from 'react';
import { ethers } from 'ethers';

// Replace with your Goreli testnet provider URL
const provider = new ethers.providers.Web3Provider(window.ethereum);

// Replace with your contract address
const contractAddress = '0x1B21D88EDF0Ac2FF1ba6AdDc57C07F49704DF560';

// Replace with your contract ABI
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "artist",
				"type": "address"
			}
		],
		"name": "addArtist",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "distributeFunds",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "artist",
				"type": "address"
			}
		],
		"name": "incrementArtistInteraction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "artistInteractions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalInteractions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// Create a contract object
const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());

function App() {
  const [artistAddress, setArtistAddress] = React.useState('');
  const [artists, setArtists] = React.useState([]);
  const [depositAmount, setDepositAmount] = React.useState('');
  const [balance, setBalance] = React.useState(0);
  const [valueSent, setValueSent] = React.useState(0);


    // Call the addArtist function of the contract
    const addArtist = async () => {
      try {
        await window.ethereum.sendAsync({ method: 'eth_requestAccounts' });
        await contract.addArtist(artistAddress);
        const artistInteractions = await contract.artistInteractions(artistAddress);
        setArtists([...artists, { address: artistAddress, interactions: artistInteractions.toString() }]);
      } catch (error) {
        console.error(error);
      }
    };


  // Call the incrementInteractions function of the contract
  const incrementArtistInteraction = async (artistIndex) => {
    try {
      await window.ethereum.sendAsync({ method: 'eth_requestAccounts' });
      const artist = artists[artistIndex];
      await contract.incrementArtistInteraction(artist.address);
      const updatedInteractions = await contract.artistInteractions(artist.address);
      const updatedArtists = [...artists];
      updatedArtists[artistIndex] = { ...artist, interactions: updatedInteractions.toString() };
      setArtists(updatedArtists);
    } catch (error) {
      console.error(error);
    }
  };

  // Call the deposit function of the contract
  const deposit = async () => {
    try {
      await window.ethereum.sendAsync({ method: 'eth_requestAccounts' });
      await contract.deposit({ value: ethers.utils.parseEther(depositAmount) });
      const updatedBalance = await contract.getContractBalance();
      setBalance(updatedBalance);
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
    const gasLimit = getBlock.gasLimit 
    

    // Send the transaction with the gas limit specified
    await window.ethereum.sendAsync({ method: 'eth_requestAccounts', gasLimit});
    await contract.distributeFunds();
    const updatedBalance = await contract.getContractBalance();
    const valueSent = initialBalance.sub(updatedBalance);

    setBalance(updatedBalance);
    setValueSent(valueSent);
  } catch (error) {
    console.error(error);
  }
};



  React.useEffect((artistInfo, setArtistInfo) => {
    const updateInteractions = async () => {
      const artistInteractions = await contract.artistInteractions(artistAddress);
      setArtistInfo({
        ...artistInfo,
        interactions: artistInteractions.toString()
      });
    };
    if (artistAddress) {
      updateInteractions();
    }
  }, [artistAddress]);


  return (
    <div>
      <input
        type="text"
        placeholder="Enter artist address"
        value={artistAddress}
        onChange={(event) => setArtistAddress(event.target.value)}
      />
      <button onClick={addArtist}>Add artist</button>

      <ul>
        {artists.map((artist, index) => (
          <li key={artist.address}>
            {artist.address}: {artist.interactions}
            <button onClick={() => incrementArtistInteraction(index)}>Increment interactions</button>
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
