import React, { Component } from 'react'

export default class Cart extends Component {

    state={
        loading:false,
        total:0,
        showTotal:false,
        showSuccess:false
    }

    render() {
        return (
            <div style={{
                top:'80px',
                position:'relative'
            }}>
                cart
            </div>
        )
    }
}
