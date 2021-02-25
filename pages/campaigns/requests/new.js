import React from 'react'
import Layout from '../../../components/Layout'
import { Form , Button , Message , Input } from 'semantic-ui-react'
import loadCampaign from '../../../etherium/campaign'
import web3 from '../../../etherium/web3'
import { Router } from '../../../routes'

class NewRequest extends React.Component {

    state = {
        description: '',
        value: '',
        recipient: '',
        loading: false,
        errMsg: '',
    }

    static async getInitialProps(props) {
        const { address } = props.query;
        return { address }
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const { description, value, recipient } = this.state

        this.setState({loading: true, errMsg: ''});

        let accounts;

        try {
            const accounts = await ethereum.request({ method: 'eth_accounts' })

            const campaign = await loadCampaign(this.props.address)

            await campaign.methods
                .createRequest(description , web3.utils.toWei(value, 'ether' ) , recipient)
                .send({
                    from: accounts[0]
                })

            Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
        } catch(err) {
            this.setState({errMsg: err.message})
        }

        this.setState({loading: false, value: ''});
    }

    render() {

        const { address } = this.props;
        const { value , description , recipient , loading , errMsg } = this.state

        return (
            <Layout>
                <Form onSubmit={this.onSubmit} error={!!errMsg}>
                    <h3>Create a request!</h3>
                    <Form.Field>
                        <label>Description</label>
                        <Input 
                            value={description}
                            onChange={(e) => this.setState({description: e.target.value})}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value in ether</label>
                        <Input 
                            value={value}
                            onChange={(e) => this.setState({value: e.target.value})}
                            label='ether'
                            labelPosition='right'
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input 
                            value={recipient}
                            onChange={(e) => this.setState({recipient: e.target.value})}
                        />
                    </Form.Field>

                    <Message error content={errMsg} header={'Something went wrong!'}/>

                    <Button primary loading={loading} disabled={loading}> Create! </Button>
                </Form>
            </Layout>
        )
    }
}

export default NewRequest