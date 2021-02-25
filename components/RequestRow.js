import React from 'react'
import { Button , Table } from 'semantic-ui-react'
import web3 from '../etherium/web3'
import loadCampaign from '../etherium/campaign'
import Router from '../routes'

class RequestRow extends React.Component {

    approveRequest = async () => {
        const campaign = loadCampaign(this.props.address);

        const accounts = await ethereum.request({ method: 'eth_accounts' })

        await campaign.methods.approveRequest(this.props.id).send({from: accounts[0]})

        Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    }

    finalizeRequest = async () => {
        const campaign = loadCampaign(this.props.address);

        const accounts = await ethereum.request({ method: 'eth_accounts' })

        await campaign.methods.finalizeRequest(this.props.id).send({from: accounts[0]})

        Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    }

    render() {

        const { request , address , id , approversCount } = this.props
        const { Row , Cell } = Table;
        const readyToFinalize = request.approvalCount > approversCount / 2

        return (
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value , 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                <Cell>
                    {
                        request.complete 
                            ? null
                            : (<Button color='green' basic onClick={this.approveRequest} >Approve</Button>)
                    }
                </Cell>
                <Cell>
                    {
                        request.complete 
                            ? null
                            : (<Button color='red' disabled={!readyToFinalize} basic onClick={this.finalizeRequest} >Finalize</Button>)
                    }
                </Cell>
            </Row>
        )
    }
}

export default RequestRow