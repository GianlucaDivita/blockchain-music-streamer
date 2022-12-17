// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract Platform {
    // Define the state variables
    address payable [] private artists;
    mapping(address => uint256) public artistInteractions;
    uint256 public totalInteractions;
    // uint256 public totalArtists;
    // test

    // Define a function to add an artist to the platform
    function addArtist(address payable artist) public {
        // Set the initial interaction count for the artist to 0
        artistInteractions[artist] = 0;
        artists.push(artist);
    }

    // Define a function to increment the interaction count for an artist
    function incrementArtistInteraction(address artist) public {
        // Increment the interaction count for the artist
        artistInteractions[artist]++;
        totalInteractions++;
    }

    // Define a function to deposit funds
    function deposit() public payable {
        // Add the deposit to the amount in the vault
        // amountInVault += msg.value;
    }

    function getContractBalance() public view returns(uint){
    return address(this).balance;
}

    function distributeFunds() public payable {
        // Calculate the total number of interactions
        // address payable artist;
        //uint256 totalInteractions = 10;

        // for (uint256 i = 0; i < totalInteractions; i++) {
        //     totalInteractions += artistInteractions[artist];
        // }

        // Calculate the amount to be sent to each artist
        uint256 amountPerInteraction = address(this).balance / totalInteractions;


        // Send the calculated amount to each artist
        for (uint256 i = 0; i < artists.length; i++) {
            // Check if the amount is greater than zero before sending
            uint artistPayment = artistInteractions[artists[i]] * amountPerInteraction;
            if (artistPayment > 0) {
                artists[i].transfer(artistPayment);
            }
        }
    }
}