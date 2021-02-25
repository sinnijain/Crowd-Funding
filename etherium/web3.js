import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
{
    // we are in the browser and metamask is running
    console.log(window)

    web3 = new Web3(window.ethereum)

    window.ethereum.enable();

} else {
    // we are on the server "OR" the user is not running metamask
    const provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/29e6e58500b3459790e84d8107ab63ee");

    web3 = new Web3(provider)
}



export default web3;