import React from 'react'
import { Card , Button } from 'semantic-ui-react';
import Layout from '../../components/Layout'
import loadCampaign from '../../etherium/campaign'
import ContributeForm from '../../components/ContributeForm'
import { Grid } from 'semantic-ui-react'
import web3 from '../../etherium/web3'
import { Link } from '../../routes'

class CampaignShow extends React.Component {

    static async getInitialProps(props) {
        const campaign = loadCampaign(props.query.address);

        const summery = await campaign.methods.getSummery().call();

        return { 
            address: props.query.address,
            minimumContribution: summery[0],
            balance: summery[1],
            requestsCount: summery[2],
            approversCount: summery[3],
            manager: summery[4],
        };
    }

    renderCards = () => {

        const { minimumContribution , balance ,  requestsCount , approversCount , manager } = this.props;

        const items = [
            {
                header: manager, 
                meta: 'Address of manager',
                description: 'The manager created this campaign and have right to do requests.',
                style: { overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution, 
                meta: 'Minimum contribution (wei)',
                description: 'you must contribute atleast this amount to contribute.',
            },
            {
                header: requestsCount, 
                meta: 'Number of requests',
                description: 'Number of request to pull money from contract and it must be approved by approvers.',
            },
            {
                header: approversCount, 
                meta: 'Number of approvers',
                description: 'Number of people who have contributed in this pool.',
            },
            {
                header: web3.utils.fromWei(balance, 'ether'), 
                meta: 'Campaign balance (ether)',
                description: 'The balance is how much money have left in this campaign to spend.',
            }
        ]

        return <Card.Group items={items} />
    }

    render() {

        const { address } = this.props


        return (
            <Layout>
                <h3> Campaign show </h3>
                
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}> 
                            {this.renderCards()}
                        </Grid.Column>

                        <Grid.Column width={6}>
                            <ContributeForm address={address}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${address}/requests`}>
                                <a>
                                    <Button primary>View requests!</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow