import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress, ContractAbi } from "../utils/constants";

export const TransactionContext = React.createContext("");

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner()

    const transactionContract = new ethers.Contract(contractAddress, ContractAbi, signer);

    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [currentAccount, setCurrentAccount] = useState();
    const [formData, setFormData] = useState({
        addressTo: '',
        amount: '',
        keyword: '',
        message: ''
    })

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                //getAllTransactions()
            }
            else {
                console.log("No account found");
            }
        } catch (error) {
            console.error(error);
            throw new Error("No Ethereum Object");
        }

    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log('accounts: ', accounts);
            console.log('accounts[0]: ', accounts[0]);
            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.error(error);
            throw new Error("No Ethereum Object");
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            //get the data from the form...
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            // await ethereum.request({
            //     method: 'eth_sendTransaction',
            //     params: [{
            //         from: currentAccount,
            //         to: addressTo,
            //         gas: '0x5208', //21000 GWEI
            //         value: parsedAmount._hex, //0.0001
            //     }]
            // });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, message, keyword, { value: parsedAmount._hex })

            setIsLoading(true);
            console.log(`Loading...${transactionHash.hash}`);
            await transactionHash.wait();

            setIsLoading(false);
            console.log(`Success...${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            localStorage.setItem('transactionCount', transactionCount);
            setTransactionCount(transactionCount.toNumber());
        } catch (error) {
            console.error(error);
            throw new Error("No Ethereum Object");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{
            connectWallet,
            currentAccount,
            formData,
            setFormData,
            handleChange,
            sendTransaction
        }}>
            {children}
        </TransactionContext.Provider>
    );
}