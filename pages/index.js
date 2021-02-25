import React from 'react'
import factory from '../etherium/factory'
import { Card , Button } from 'semantic-ui-react'
import Layout from '../components/Layout'
import { Link } from '../routes'

class Show extends React.Component {

    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns }
    }

    renderCampaign() {
        const items = this.props.campaigns.map(
            (campaign) => {
                return {
                    header: campaign,
                    description: (
                        <Link route={`campaigns/${campaign}`}><a>view campaign</a></Link>
                    ),
                    fluid: true
                }
            }
        );  
        
        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open campaigns</h3>

                    <Link route='/campaigns/new'>
                        <a>
                            <Button 
                                floated='right'
                                content="Create Campaign"
                                icon='add circle'
                                primary 
                            />
                        </a>
                    </Link>

                    {this.renderCampaign()}
                    
                </div>
                
            </Layout>
        )
    }
}

export default Show