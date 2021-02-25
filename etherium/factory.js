import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const contract = new web3.eth.Contract(JSON.parse(CampaignFactory.interface) , '0xC2f267c72f5d6Fc27c128619BcDEDBF3D41213A3');

export default contract