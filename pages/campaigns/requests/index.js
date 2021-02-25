import React from 'react'
import { Button , Table } from 'semantic-ui-react'
import { Link } from '../../../routes'
import Layout from '../../../components/Layout'
import loadCampaign from '../../../etherium/campaign'
import RequestRow from '../../../components/RequestRow'

class RequestIndex extends React.Component {

    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = await loadCampaign(address);
        const requestCount = await campaign.methods.getRequestCount().call()
        const approversCount = await campaign.methods.approversCount().call()

        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill()
                .map( (element , index) => {
                    return campaign.methods.requests(index).call()
                })
        )

        return { address , requests , requestCount , approversCount }
    }

    renderRows() {
        return this.props.requests.map((request,index) => {
            return <RequestRow 
                key={index}
                request={request}
                address={this.props.address}
                id={index}
                approversCount={this.props.approversCount}
            />
        })
    }

    render() {

        const { address , requestCount , request } = this.props;
        const { Header , Row , HeaderCell , Body } = Table;

        return (
            <Layout>
                <h3>Requests</h3>

                <Link route={`/campaigns/${address}/requests/new`}>
                    <a>
                        <Button primary floated={'right'} style={{marginBottom: '15px'}}>
                            Add Requests
                        </Button>
                    </a>
                </Link>

                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>
                                Id
                            </HeaderCell>
                            <HeaderCell>
                                Description
                            </HeaderCell>
                            <HeaderCell>
                                Amount (ether)
                            </HeaderCell>
                            <HeaderCell>
                                Recipient
                            </HeaderCell>
                            <HeaderCell>
                                Approval
                            </HeaderCell>
                            <HeaderCell>
                                Approve
                            </HeaderCell>
                            <HeaderCell>
                                Finalize
                            </HeaderCell>
                        </Row>
                    </Header>

                    <Body>
                        {this.renderRows()}
                    </Body>          
                </Table>
            </Layout>
        )
    }
}

export default RequestIndex