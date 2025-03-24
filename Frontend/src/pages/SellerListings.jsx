import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import RealEstateTokenAbi from "../abi/RealEstateToken";

const SellerListings = () => {
  const { id } = useParams();
  const [sellers, setSellers] = useState([
    {
      seller: "0xA1B2C3D4E5F678901234567890ABCDEFFEDCBA98",
      tokensForSale: "500",
      price: "1.2",
    },
    {
      seller: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      tokensForSale: "1200",
      price: "0.9",
    },
    {
      seller: "0xC3D4E5F6A789B01234567890ABCDEFFEDCBA9876",
      tokensForSale: "250",
      price: "2.5",
    },
    {
      seller: "0xD4E5F6A789B0C1234567890ABCDEFFEDCBA98765",
      tokensForSale: "800",
      price: "1.8",
    },
  ]);
  const [tokenPrice, setTokenPrice] = useState(null);
  const [contract, setContract] = useState(null);
  const [buyAmount, setBuyAmount] = useState({});
  const [spvAddress, setSpvAddress] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [newTokenAmount, setNewTokenAmount] = useState({});

  // useEffect(() => {
  //   const fetchSellers = async () => {
  //     try {
  //       const response = await axios.get("/api/token/get", {
  //         params: { contractId: id },
  //       });
  //       setSellers(response.data.sellers);
  //     } catch (error) {
  //       console.error("Error fetching seller data:", error);
  //     }
  //   };

    const setupContract = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setUserAddress(signer.address);

        const tokenContract = new ethers.Contract(id, RealEstateTokenAbi, signer);
        setContract(tokenContract);

        // try {
        //   const price = await tokenContract.tokenPrice();
        //   setTokenPrice(ethers.utils.formatEther(price));

        //   const spv = await tokenContract.spv();
        //   setSpvAddress(spv);
        // } catch (error) {
        //   console.error("Error fetching contract details:", error);
        // }
      }
    };

  //   if (id) {
      // fetchSellers();
      setupContract();
  //   }
  // }, [id]);

  const handleBuy = async (seller) => {
    if (!contract) return alert("Contract not initialized!");

    const amount = buyAmount[seller.seller] || 0;
    if (amount <= 0 || amount > seller.tokensForSale) {
      return alert("Invalid amount!");
    }

    try {
      const tx = await contract.buyTokens(seller.seller, amount, {
        value: ethers.utils.parseEther((amount * tokenPrice).toString()),
      });

      await tx.wait();
      alert("Purchase successful!");

      setSellers((prevSellers) =>
        prevSellers.map((s) =>
          s.seller === seller.seller
            ? { ...s, tokensForSale: s.tokensForSale - amount }
            : s
        )
      );
    } catch (error) {
      console.error("Purchase failed:", error);
    }
  };

  const handleUpdateListing = async (seller) => {
    if (!contract) return alert("Contract not initialized!");

    const updatedAmount = newTokenAmount[seller.seller] || seller.tokensForSale;
    if (updatedAmount < 0) return alert("Invalid token amount!");

    try {
      const tx = await contract.updateListing(seller.seller, updatedAmount);
      await tx.wait();
      alert("Listing updated!");

      setSellers((prevSellers) =>
        prevSellers.map((s) =>
          s.seller === seller.seller
            ? { ...s, tokensForSale: updatedAmount }
            : s
        )
      );
    } catch (error) {
      console.error("Failed to update listing:", error);
    }
  };

  return (
    <div className="pt-20 pb-12 min-h-screen bg-gray-900 text-white">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div className="bg-slate-800 p-6 rounded-lg shadow-lg text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <h1 className="text-2xl font-bold">Sellers for Token</h1>
            <p className="text-gray-400 break-all">Contract: {id}</p>
            {tokenPrice && <p className="mt-2 text-lg font-semibold text-blue-400">Price per Token: ${tokenPrice}</p>}
          </motion.div>

          <motion.div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <h2 className="text-xl font-semibold mb-4">Available Sellers</h2>
            {sellers.length > 0 ? (
              <motion.div className="grid gap-4">
                {sellers.map((seller, index) => (
                  <motion.div key={index} className="p-4 bg-gray-700 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400">Seller</p>
                      <p className="font-semibold break-all">{seller.seller}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Tokens for Sale</p>
                      {userAddress === seller.seller || userAddress === spvAddress ? (
                        <input
                          type="number"
                          min="1"
                          className="bg-gray-800 text-white border border-gray-600 p-1 w-20"
                          value={newTokenAmount[seller.seller] || seller.tokensForSale}
                          onChange={(e) =>
                            setNewTokenAmount({ ...newTokenAmount, [seller.seller]: e.target.value })
                          }
                        />
                      ) : (
                        <p className="text-lg font-bold text-green-400">{seller.tokensForSale}</p>
                      )}
                    </div>

                    {userAddress === seller.seller || userAddress === spvAddress ? (
                      <motion.button
                        onClick={() => handleUpdateListing(seller)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg"
                      >
                        Save
                      </motion.button>
                    ) : (
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          min="1"
                          max={seller.tokensForSale}
                          className="bg-gray-800 text-white border border-gray-600 p-1 w-20"
                          value={buyAmount[seller.seller] || ""}
                          onChange={(e) =>
                            setBuyAmount({ ...buyAmount, [seller.seller]: e.target.value })
                          }
                        />
                        <motion.button
                          onClick={() => handleBuy(seller)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                          Buy
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-gray-400 text-center">No sellers found for this token.</p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SellerListings;
