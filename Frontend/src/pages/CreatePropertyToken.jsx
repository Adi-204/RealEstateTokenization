import { useEffect, useState } from "react";
import { ethers } from "ethers";
import RealEstateTokenFactoryAbi from "../abi/RealEstateTokenFactory";
const FACTORY_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with deployed address


const CreatePropertyToken = () => {
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");


    // async function getTotalContracts() {
    //     try {
    //         if (!window.ethereum) throw new Error("MetaMask not detected");

    //         const provider = new ethers.BrowserProvider(window.ethereum);
    //         const signer = await provider.getSigner();
    //         const contract = new ethers.Contract(FACTORY_CONTRACT_ADDRESS, RealEstateTokenFactoryAbi, signer);

    //         const total = await contract.getTokenCount();
    //         console.log("Total Contracts:", total.toString());
    //         return total.toString();
    //     } catch (error) {
    //         console.error("Error fetching total contracts:", error);
    //     }
    // }
    // getTotalContracts();
    const createRealEstateToken = async () => {
        if (!window.ethereum) return alert("MetaMask is not installed!");

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner(); // User's wallet as signer

            const factoryContract = new ethers.Contract(
                FACTORY_CONTRACT_ADDRESS,
                RealEstateTokenFactoryAbi,
                signer
            );

            const spv = await signer.getAddress(); // Property creator's address
            const tx = await factoryContract.createRealEstateToken(spv, name, symbol);
            await tx.wait();

            alert(`Real estate token "${name}" created successfully!`);
            setName("");
            setSymbol("");
        } catch (error) {
            console.error("Error creating token:", error);
            alert("Transaction failed!");
        }
    }

    return (
        <div className="pt-20 pb-12">
            <h2>Create Real Estate Token</h2>
            <input
                type="text"
                placeholder="Property Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ color: 'black', backgroundColor: 'white' }}
            />


            <input
                type="text"
                placeholder="Symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                style={{ color: 'black', backgroundColor: 'white' }}
            />
            <button onClick={createRealEstateToken}>Create Token</button>
        </div>
    );
}

export default CreatePropertyToken;
