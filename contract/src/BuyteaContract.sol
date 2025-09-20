// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';

contract BuyteaContract is Ownable { 

   mapping(address => uint256) unclaimedBalances;

   uint256 public feePercent = 50;

   uint256 totalBalance;
   uint256 charges = 0;

   constructor() Ownable(msg.sender) {

   }

   function balanceOf(address _address) public view returns (uint256) {
      return unclaimedBalances[_address];
   }

   function totalTeaValue() public view returns (uint256) {
      return totalBalance;
   }

   function viewCharge() public onlyOwner() view returns (uint256) {
      return charges;
   }

   function addTeaReward(address _address) public payable {
      require(msg.value > 0);
      unclaimedBalances[_address] += msg.value;
      totalBalance += msg.value;
   }

   
   function claimTeaReward(uint256 _amount) public {
      require(unclaimedBalances[msg.sender] >= _amount, "Not enough balance");

      uint256 fee = (_amount * feePercent) / 10000;
      uint256 payout = _amount - fee;

      unclaimedBalances[msg.sender] -= _amount;
      totalBalance -= _amount;
      charges += fee;

      payable(msg.sender).transfer(payout);

   }

   function claimCharge() public onlyOwner() {
      require(charges > 0, "No charges to withdraw");

      payable(msg.sender).transfer(charges);

      charges = 0;
   }
}
