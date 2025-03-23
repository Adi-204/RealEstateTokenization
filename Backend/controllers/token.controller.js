const express = require("express");
const Contract = require("../models/Contract.js");

const getTokens = async (req, res) => {
    try {
        const { contractId } = req.body;
        const contract = await Contract.findOne({ contractId });
        if (!contract) {
            throw new Error("Contract not found");
        }
        res.status(200).json(contract.contractDetails);
    } catch (error) {
        res.status(500).json({
            message:
                error.message ||
                "Something went wrong - please try again later!"
        });
    }
}

const addTokens = async (req, res) => {
    try {
        const { walletID, numTokens, contractId } = req.body;

        let contract = await Contract.findOne({ contractId });

        if (!contract) {
            contract = new Contract({
                contractId: contractId,
                contractDetails: []
            });
        }

        const contractDetails = contract.contractDetails;

        const existingIndex = contractDetails.findIndex(detail => detail.walletId === walletID);

        if (existingIndex !== -1) {
            contractDetails[existingIndex].numOfTokens = numTokens;
        } else {
            const newContract = { walletId: walletID, numOfTokens: numTokens };
            contractDetails.push(newContract);
        }

        await contract.save();

        res.status(200).json({ message: "Tokens updated successfully" });
    } catch (error) {
        res.status(500).json({
            message:
                error.message ||
                "Something went wrong - please try again later!"
        });
    }
};


const delTokens = async (req, res) => {
    try {
        const { walletID, numTokens, contractId } = req.body;

        const contract = await Contract.findOne({ contractId });

        if (!contract) {
            throw new Error("Contract not found");
        }

        const contractDetails = contract.contractDetails;

        const existingIndex = contractDetails.findIndex(detail => detail.walletId === walletID);

        if (existingIndex !== -1) {
            contractDetails[existingIndex].numOfTokens -= numTokens;
            if (contractDetails[existingIndex].numOfTokens <= 0) {
                contractDetails.splice(existingIndex, 1);
            }
        }

        await contract.save();

        res.status(200).json({ message: "Tokens updated successfully" });
    } catch (error) {
        res.status(500).json({
            message:
                error.message ||
                "Something went wrong - please try again later!"
        });
    }
}

module.exports = { getTokens, addTokens, delTokens };