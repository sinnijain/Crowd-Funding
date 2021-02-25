pragma solidity ^0.4.17;


contract CampaignFactory {
    
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign( minimum , msg.sender );
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
    
}

contract Campaign {
    
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    
    address public manager;
    
    uint public minContribution;
    
    Request[] public requests;
    
    mapping(address => bool) public approvers; 
    uint public approversCount;
    
    
    modifier restrictedToManager {
        msg.sender == manager;
        _;
    }
    
    
    constructor(uint minimum, address creator) {
        manager = creator;
        minContribution = minimum;
    }
    
    function contribute() public payable {
        require( msg.value >= minContribution );
        
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest( string description , uint value , address recipient ) public restrictedToManager {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);  // the user is among approvers
        
        require(!request.approvals[msg.sender]); // the given request have not been already approved by him
        request.approvalCount++;
        request.approvals[msg.sender] = true;
        
    }
    
    function finalizeRequest(uint index) public restrictedToManager{
        Request storage request = requests[index];
        
        require(!request.complete);
        
        require( request.approvalCount > ( approversCount / 2) );      
        
        require(request.value < this.balance);
        request.recipient.transfer(request.value);
        
        request.complete = true;
    }

    function getSummery() public view returns ( uint, uint , uint , uint , address) {
        return (
            minContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    } 

    function getRequestCount() public view returns (uint) {
        return requests.length;
    }
    
}