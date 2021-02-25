import React from 'react'
import { Router } from '../routes'
import { Button } from 'semantic-ui-react'
import { Form , Input , Message } from 'semantic-ui-react'
import loadCampaign from '../etherium/campaign'
import web3 from'../etherium/web3'

class ContributeForm extends React.Component {

    state = {
        value: '',
        errMsg: '',
        loading: false,
    }

    onSubmit = async () => {

        this.setState({ loading: true, errMsg: ''})

        try {

            const accounts = await ethereum.request({ method: 'eth_accounts' })
            
            const campaign = loadCampaign(this.props.address)

            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            })

            Router.replaceRoute(`/campaigns/${this.props.address}`)

        } catch(err) {
            this.setState({errMsg: err.message})
        }

        this.setState({ loading: false, value: ''})

    }

    render() {
        const { value , errMsg , loading } = this.state

        return (
            <Form onSubmit={this.onSubmit} error={!!errMsg}>
                <Form.Field>
                    <label>Amount to contribute</label>
                    <Input
                        label='ether'
                        labelPosition='right' 
                        value={value}
                        onChange={(e) => this.setState({value: e.target.value})}
                    />
                </Form.Field>

                <Message error header={'Something went wrong!'} content={errMsg}/>

                <Button loading={loading} disabled={loading} primary>Contribute</Button>
            </Form>
        )
    }
}

export default ContributeForm