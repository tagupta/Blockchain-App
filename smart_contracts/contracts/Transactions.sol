//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Transactions {
    event Transfer(
        address from,
        address to,
        uint256 amount,
        uint256 timestamp,
        string message,
        string keyword
    );

    struct TransferStruct {
        address from;
        address to;
        uint256 amount;
        uint256 timestamp;
        string message;
        string keyword;
    }
    TransferStruct[] transactions;

    error InsufficientBalance(
        address sender,
        uint256 accBalance,
        uint256 amtToTransfer
    );
    error TransferFailed();

    function addToBlockchain(
        address _to,
        string memory _message,
        string memory _keyword
    ) public payable {
        if (msg.sender.balance < msg.value)
            revert InsufficientBalance(
                msg.sender,
                msg.sender.balance,
                msg.value
            );

        (bool result, ) = payable(_to).call{value: msg.value}("");
        if (!result) revert TransferFailed();

        transactions.push(
            TransferStruct(
                msg.sender,
                _to,
                msg.value,
                block.timestamp,
                _message,
                _keyword
            )
        );
        emit Transfer(
            msg.sender,
            _to,
            msg.value,
            block.timestamp,
            _message,
            _keyword
        );
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactions.length;
    }
}
