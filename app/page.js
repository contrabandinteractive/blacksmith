'use client'
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import Web3 from 'web3';
import { useRouter } from 'next/navigation'



export default function Home() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [imageUrl3, setImageUrl3] = useState('');
  const [chosenImg, setChosenImg] = useState('');
  const [nftID, setNftID] = useState(null)
  const [step1Done, setStep1Done] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);


  function generateRandom5DigitID() {
    const theID = Math.floor(10000 + Math.random() * 90000);
    setNftID(theID);
    return theID;
  }

  const handleSelectChange = (event) => {
    setChosenImg(event.target.value);
    console.log(chosenImg);
    setStep1Done(true);
  };

  const goToMarketplace = () => {
    router.push('/marketplace');
  };


  const handleGenerateImage = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate2d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputText }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      const generatedImageUrl1 = data.result.images[0]; 
      const generatedImageUrl2 = data.result.images[1]; 
      const generatedImageUrl3 = data.result.images[2]; 
      //console.log(data.result.images[0]);

      setImageUrl1('data:image/png;base64,'+generatedImageUrl1);
      setImageUrl2('data:image/png;base64,'+generatedImageUrl2);
      setImageUrl3('data:image/png;base64,'+generatedImageUrl3);
      setChosenImg(1);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else {
      console.warn('Please install MetaMask!');
    }
  }, []);

  const connectMetamask = async () => {
    if (web3) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    }
  };

  const mintNFT = async () => {
    if (!web3 || !account) return;

    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT;
    const contractABI = [{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721IncorrectOwner","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721InsufficientApproval","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC721InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"ERC721InvalidOperator","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721InvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC721InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC721InvalidSender","type":"error"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721NonexistentToken","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":!1,"inputs":[{"indexed":!0,"internalType":"address","name":"owner","type":"address"},{"indexed":!0,"internalType":"address","name":"approved","type":"address"},{"indexed":!0,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":!1,"inputs":[{"indexed":!0,"internalType":"address","name":"owner","type":"address"},{"indexed":!0,"internalType":"address","name":"operator","type":"address"},{"indexed":!1,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":!1,"inputs":[{"indexed":!1,"internalType":"uint256","name":"_fromTokenId","type":"uint256"},{"indexed":!1,"internalType":"uint256","name":"_toTokenId","type":"uint256"}],"name":"BatchMetadataUpdate","type":"event"},{"anonymous":!1,"inputs":[{"indexed":!1,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"MetadataUpdate","type":"event"},{"anonymous":!1,"inputs":[{"indexed":!0,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":!0,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":!1,"inputs":[{"indexed":!0,"internalType":"address","name":"from","type":"address"},{"indexed":!0,"internalType":"address","name":"to","type":"address"},{"indexed":!0,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"uri","type":"string"}],"name":"safeMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"initialOwner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ROYALTY_PERCENTAGE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
      const myNFTID = generateRandom5DigitID();
      
   
      //const symbol = await contract.methods.safeMint(account, myNFTID, "data:image/png;base64," + chosenImg).estimateGas();
      //console.log('Token Symbol:', symbol);

      const data = contract.methods.safeMint(account, myNFTID, inputText).encodeABI();

      const gasPrice = web3.utils.toWei('4000', 'gwei'); // Fixed gas price
      const gasLimit = 200000; // Fixed gas limit

      const tx = {
        from: account,
        to: contractAddress,
        gas: gasLimit,
        gasPrice: gasPrice,
        data: data
      };

      try {
        // Send the transaction
        const receipt = await web3.eth.sendTransaction(tx);
        
        if (receipt.status) {
          console.log('NFT Minted successfully', receipt);
          setNftID(myNFTID);
        } else {
          console.error('Transaction failed', receipt);
        }
      } catch (error) {
        console.error('Error sending transaction', error);
      }
  
    } catch (error) {
      console.error('Error minting NFT', error);
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-900 text-white">
      
      <div className="container mx-auto p-4 w-full">
        <div className="flex justify-center items-center pb-[20px] pt-[60px]">
        <img src="logo.png" className="max-w-[500px] w-[100%]" />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
        <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mb-[40px]">
          <p>NOTE: depending on when this demo is accessed (late July 2024), it is possible that our Theta EdgeCloud deployments have been deactivated in the event that our credits have expired.</p>
          <p className="pt-[20px] pb-[20px]">It is recommended to <a className="underline" target="_blank" href="https://github.com/contrabandinteractive/blacksmith">spin up your own instance of Blacksmith</a>.</p>
          <h2 className="text-3xl font-bold text-center mb-4">Step 1</h2>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Describe what you want to create..."
            rows={4}
            className="w-full bg-gray-700 text-white p-2 rounded-lg mb-4 resize-none"
          />
          <button
            onClick={handleGenerateImage}
            className="w-full bg-[#c940e6] hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Images'}
          </button>
          <div className="flex space-x-4">
          {imageUrl1 && (
            <div className="mt-4 flex-1">
              <img src={imageUrl1} alt="Generated Image" className="rounded-lg shadow-lg" />
              <p>Sketch #1</p>
              <a
                href={imageUrl1}
                download="generated_image.png"
                className="block mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-center"
              >
                Download
              </a>
            </div>
          )}
          {imageUrl2 && (
            <div className="mt-4 flex-1">
              <img src={imageUrl2} alt="Generated Image" className="rounded-lg shadow-lg" />
              <p>Sketch #2</p>
              <a
                href={imageUrl2}
                download="generated_image.png"
                className="block mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-center"
              >
                Download
              </a>
            </div>
          )}
          {imageUrl3 && (
            <div className="mt-4 flex-1">
              <img src={imageUrl3} alt="Generated Image" className="rounded-lg shadow-lg" />
              <p>Sketch #3</p>
              <a
                href={imageUrl3}
                download="generated_image.png"
                className="block mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-center"
              >
                Download
              </a>
            </div>
          )}
          </div>
          
          {imageUrl3 && (
          <div className="flex items-center justify-center pt-[40px]">
          <div className="w-64 flex flex-col items-center">
            <label htmlFor="image-select" className="block text-white mb-2">
              Choose an Image:
            </label>
            <select
              id="image-select"
              value={chosenImg}
              onChange={handleSelectChange}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
            >
              <option value="">Select an image</option>
              <option value={imageUrl1}>Sketch 1</option>
              <option value={imageUrl2}>Sketch 2</option>
              <option value={imageUrl3}>Sketch 3</option>
            </select>

         </div>
         </div>
          )}

        </div>
        </motion.div>
        
        {imageUrl3 && step1Done && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-4">Step 2</h2>
            <iframe src={process.env.NEXT_PUBLIC_SKETCHTO3D_URL} width="100%" height="800" />
          </div>
        </motion.div>
        )}
        
        {imageUrl3 && step1Done && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >

          <div className="w-full max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
            <h2 className="text-3xl font-bold text-center mb-4">Step 3: Connect to MetaMask</h2>
            <button
              onClick={connectMetamask}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Connect MetaMask
            </button>
            {account && (
              <div className="mt-4">
                <p>Connected account: {account}</p>
                <button
                  onClick={mintNFT}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mt-4"
                >
                  Mint NFT
                </button>
              </div>
            )}
          </div>
        </motion.div>
        )}

        {nftID && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >

          <div className="w-full max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mt-6 mb-[100px]">
            <h2 className="text-3xl font-bold text-center mb-4">Step 4: Success!</h2>
            <p> Your NFT has been minted on Theta Testnet!</p>
            
            <p>Contract: <a className="underline" href={"https://testnet-explorer.thetatoken.org/account/"+process.env.NEXT_PUBLIC_CONTRACT} target="_blank">{process.env.NEXT_PUBLIC_CONTRACT}</a></p>
            <p className="text-xl font-bold">ID: {nftID}</p>
            <p>You can use this ID to import into your wallet.</p>

            <p className="pt-5">Original NFT creators receive 5% royalties on secondary sales.</p>
            <button
                  onClick={goToMarketplace}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mt-4"
                >
                  View Marketplace
                </button>
          </div>
        </motion.div>
        )}

      </div>
    </div>
  );
}
