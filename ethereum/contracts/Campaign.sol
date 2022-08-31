pragma solidity ^0.8.9;

contract CampaignFactory{
   address payable[] public deployedCampaigns;
   
   function createCampaign(uint minimum,string memory title,string memory descript) public {
      address newCampaign=address(new Campaign(minimum,title,descript,msg.sender));
      deployedCampaigns.push(payable(newCampaign));
   }

   function getDeployedCampaigns() public view returns(address payable[] memory){
        return deployedCampaigns;
   }
}


contract Campaign{

      struct Request{
      string description;
      uint value;
      address recipient;
      bool complete;
      mapping(address=>bool) approvals;
      uint approvalCount;
        }


   string public campTitle;
   string public campDescription;
   address public manager;
   uint public minimumContribution;
   Request[] public requests;
   mapping(address=>bool) public approvers;
   uint public approversCount;

   modifier restricted() {
          require(msg.sender==manager);
          _;
   }

   constructor (uint minimum,string memory title,string memory descript,address creator) {
     manager=creator;
     minimumContribution=minimum;
     campTitle=title;
     campDescription=descript;
   }

   function Contribute() public payable{
      require(msg.value > minimumContribution);
      
      approvers[msg.sender]=true;
      approversCount++;
   }
  
   function createRequest(string memory description,uint value,address recipient) public restricted {
          Request storage newRequest=requests.push();
            newRequest.description=description;
            newRequest.value=value;
            newRequest.recipient=recipient;
            newRequest.complete=false;
            newRequest.approvalCount=0;
         
   }

   function approveRequest(uint index) public {
    Request storage request=requests[index];

    require(approvers[msg.sender]);
    require(!request.approvals[msg.sender]);

    request.approvals[msg.sender]=true;
    request.approvalCount++;
   }

   function finalizeRequest(uint index) public restricted {
          
      require(!requests[index].complete);
      require(requests[index].approvalCount >= (approversCount/2));
      
     requests[index].complete=true;
     payable(requests[index].recipient).transfer(requests[index].value);    
         
   }

   function getrequestCounts() public view returns(uint) {
      return requests.length;
   }

   function getSummary() public view returns(uint,uint,uint,uint,address){
     return (
      minimumContribution,
      address(this).balance,
      requests.length,
      approversCount,
      manager
     );


   }
   
}