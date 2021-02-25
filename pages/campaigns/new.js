import React from 'react';
import Layout from '../../components/Layout'
import { Form } from 'semantic-ui-react'
import { Button, Input, Message } from 'semantic-ui-react';
import campaignFactory from '../../etherium/factory'
import { Router } from '../../routes'

class CampaignNew extends React.Component {

    state = {
        minContribution: '',
        errMsg: '',
        loading: false,
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({loading: true, errMsg: ''});

        let accounts;

        try {
            const accounts = await ethereum.request({ method: 'eth_accounts' })

            await campaignFactory.methods.createCampaign(this.state.minContribution)
            .send({
                from: accounts[0]
            })

            Router.pushRoute('/');
        } catch(err) {
            this.setState({errMsg: err.message})
        }

        this.setState({loading: false});
        
    }

    render() {

        const { minContribution } = this.state

        return (
            <Layout>
                <h2>Create a Campaign</h2>
                <Form onSubmit={this.onSubmit} error={!!this.state.errMsg}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            label='wei' 
                            labelPosition='right' 
                            value={minContribution} 
                            onChange={(e) => this.setState({ minContribution: e.target.value})}
                        />
                    </Form.Field>

                    <Message error header="Something went wrong" content={this.state.errMsg} />

                    <Button primary loading={this.state.loading} disabled={this.state.loading}> Create </Button>
                </Form>
            </Layout>
        )
    }
}

export default CampaignNew