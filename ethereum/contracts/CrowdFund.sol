pragma solidity ^0.4.17;

contract CrowdFundFactory {
    address[] public deployedCrowdFunds;
    
    function createCrowdFund(uint minimum) public {
        address newCrowdFund = new CrowdFund(minimum, msg.sender);
        
        deployedCrowdFunds.push(newCrowdFund);
    }
    
    function getDeployedCrowdFunds() public view returns (address[]) {
        return deployedCrowdFunds;
    }
}

contract CrowdFund {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor (uint minimum, address originalSender) public {
        manager = originalSender;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        
        approvers[msg.sender] = true;
        
        approversCount++;
    }
    
    function createRequest(string description, uint value, address recipient) 
        public restricted {
            
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
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        
        require(request.approvalCount > (approversCount/ 2));
        require(!request.complete);
        
        request.recipient.transfer(request.value);
        
        request.complete = true;
    }
}