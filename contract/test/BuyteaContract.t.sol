// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/BuyteaContract.sol";

contract TestContract is Test {
    BuyteaContract c;

    fallback() external payable {}

    function setUp() public {
        c = new BuyteaContract();
    }

    function testBalanceCheck() public {
        assertEq(c.balanceOf(address(this)), uint256(0), "ok");
        c.addTeaReward{ value: 1 ether }(address(this));
        assertEq(c.balanceOf(address(this)), uint256(1 ether), "ok");
        assertEq(c.totalTeaValue() , uint256(1 ether));
    }

    function testTea_Add_Claim() public {

        deal(address(this), 2 ether);
        assertEq(address(this).balance, 2 ether);

        c.addTeaReward{ value: 1 ether }(address(this));
        assertEq(address(this).balance, 1 ether);
        assertEq(c.balanceOf(address(this)), uint256(1 ether), "ok");

        c.claimTeaReward(1 ether);
        assertEq(c.balanceOf(address(this)), uint256(0));
        assertEq(c.viewCharge(), uint256(0.0050 ether));
        assertEq(address(this).balance, 1.995 ether);

        c.claimCharge();
        assertEq(c.viewCharge(), uint256(0 ether));
        assertEq(address(this).balance, 2 ether);
    }

    function test_Revert_Add_Claim() public {
        deal(address(0x1ccC0Ad7b5e8809dC7bea698A6619C3522cf0099), 2 ether);
        vm.startPrank(address(0x1ccC0Ad7b5e8809dC7bea698A6619C3522cf0099));
        assertEq(address(0x1ccC0Ad7b5e8809dC7bea698A6619C3522cf0099).balance, 2 ether);

        c.addTeaReward{ value: 1 ether }(address(0x1ccC0Ad7b5e8809dC7bea698A6619C3522cf0099));
        assertEq(address(0x1ccC0Ad7b5e8809dC7bea698A6619C3522cf0099).balance, 1 ether);
        assertEq(c.balanceOf(address(0x1ccC0Ad7b5e8809dC7bea698A6619C3522cf0099)), uint256(1 ether), "ok");
        
        vm.expectRevert();
        c.claimTeaReward(2 ether);

        c.claimTeaReward(1 ether);
        assertEq(c.balanceOf(address(0x1ccC0Ad7b5e8809dC7bea698A6619C3522cf0099)), uint256(0));
        
        vm.expectRevert();
        c.claimCharge();
    
    }
}
