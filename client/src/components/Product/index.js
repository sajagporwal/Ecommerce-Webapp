import React, { Component } from 'react'
import axios from 'axios';
import ProdInfo from './prodinfo';
import ProdImg from './prodimg';

export default class index extends Component {
    state={
        product:{},
        loading:false
    }
    componentWillMount(){
        const id=this.props.match.params.id;
        axios.get(`/api/product/get_products_id?id=${id}&type=single`)
        .then(response=>{
           if(response.data.length==0)
           {
               this.props.history.push('/')  
               console.log("error")
           }    
               this.setState({
               product:response.data,
               loading:true
           })
        })
    }

    render() {
        if(this.state.loading)
        {
        return (
            <div style={{
                top:'80px',
                position:'relative'
            }}>
                <div className="container">
                    <div className="product_detail_wrapper">
                        <div className="left">
                            <div style={{width:'500px'}}>
                                <ProdImg
                                product={this.state.product}
                                />
                            </div>
                        </div>    
                        <div className="right">
                            <ProdInfo 
                            addToCart={(id)=>this.addToCartHandler(id)}
                            product={this.state.product}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
        }
        return(
            <div style={{
                top:'80px',
                position:'relative'
            }}>
                <div className="container">
                    <div className="product_detail_wrapper">
                        LOADING
                    </div>
                </div>    
            </div>
        )
    }
}
