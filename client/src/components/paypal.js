import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default class PayPal extends Component {
    render() {

        const onSuccess=(payment)=>{
            // console.log(JSON.stringify(payment))
            this.props.transactionSuccess(payment)
        }

        const onCancel=(data)=>{
            // console.log(JSON.stringify(data))
            this.props.transactionCancel(data)
        }

        const onError=(err)=>{
            // console.log(JSON.stringify(err))
            this.props.transactionError(err)
        }

        let env='sandbox'
        let currency='INR'
        let total = this.props.toPay

        const client={
            sandbox:'AZJ5FxajnJwFTNQGa8MTA_-OrpriWTsJ-jbcthymjZ26rqhnyRt-GMeIpc_APEzRgKv3N0xi7aGDBDH5',
            production:''
        }

        return (
            <div>
                <PaypalExpressBtn
                 env={env}
                 currency={currency}
                 total={total}
                 client={client}
                 onError={onError}
                 onSuccess={onSuccess}
                 onCancel={onCancel}
                 style={{
                     size:'large'
                 }}
                />
            </div>
        )
    }
}
