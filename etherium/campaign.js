import web3 from './web3';
import Campaign from './build/Campaign.json';




const loadCampaign = (address) => {
    //load contract from network and making a local instance
    const contract = new web3.eth.Contract(JSON.parse(Campaign.interface) , address );

    return contract;
}

export default loadCampaign;