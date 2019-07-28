import React, { Component } from 'react'
import UserProductBlock from './userprodblock'
import axios from 'axios';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';
import Paypal from './paypal';
// AZJ5FxajnJwFTNQGa8MTA_-OrpriWTsJ-jbcthymjZ26rqhnyRt-GMeIpc_APEzRgKv3N0xi7aGDBDH5

export default class MyCart extends Component {

    state={
        showTotal:false,
        total:0,
        showSuccess:false,
        user:[],
        loading:false    
    }

    removeItem=(id)=>{
        axios.get(`/api/users/removeFromCart?_id=${id}`).then(response=>{

            if(response.data.cartDetail.length<=0)
            {
              this.setState({
                  showTotal:false,
                  user:[]
              })
            }
            else{

            response.data.cart.forEach(item=>{
                response.data.cartDetail.forEach((k,i)=>{
                    if(item.id===k._id)
                    {
                        response.data.cartDetail[i].quantity=item.quantity
                    }
                })
            })
            this.setState({
                user:response.data.cartDetail
            })
            this.handleCalculation(response.data.cartDetail)
        }
        }).
        catch()
        {
            console.log("oopa")
        }
    }

    showNoItemMessage=()=>(
        <div className="cart_no_items">
            <FontAwesomeIcon
            icon={faFrown}
            />
            <div>
                You have no items
            </div>
        </div>
    )

    handleCalculation=(cartData)=>{
        let tot=0;

        cartData.forEach(item=>{
            tot+=item.price*item.quantity
        })
        this.setState({
            total:tot,
            showTotal:true
        })
    }

    getCartItems=(cartItem,user)=>{
        axios.get(`/api/product/get_products_id?id=${cartItem}&type=array`)
        .then(response=>{
            user.forEach(item=>{
                response.data.forEach((k,i)=>{
                    if(item.id===k._id){
                        response.data[i].quantity = item.quantity;
                    }
                })
            })
           if(response.data.length>0)
           this.handleCalculation(response.data) 
           this.setState({
               user:response.data,
               loading:true
           }) 
    })
}

transactionError=()=>{

}

transactionCancel=()=>{
    
}

transactionSuccess=()=>{
    this.setState({
        showTotal:false,
        showSuccess:true
    })
}

    componentWillMount(){
        let cartItem=[];
        let user=[];
        axios.get('/api/users/auth').then(response=>{  
            user=response.data.cart
            if(user.length>0)
            {
                user.forEach(item=>{
                    cartItem.push(item.id)
                });
                this.getCartItems(cartItem,user)
            }
        }
        )
    }

    render() {
        if(this.state.loading)
        {
        return (
            <div style={{
                top:'80px',
                position:'relative'
            }}>
                <h1> My Cart</h1>
                <div className="user_cart">
                    <UserProductBlock
                      products={this.state.user}
                      removeItem={(id)=>this.removeItem(id)}
                    />
                    { this.state.showTotal?
                        <div>
                            <div className="user_cart_sum">
                                <div>
                                    Total amount: $ {this.state.total}
                                </div>    
                            </div>    
                        </div>    
                      :
                      this.state.showSuccess?
                      <div className="cart_success">
                      <FontAwesomeIcon
                      icon={faSmile}
                      />
                      <div>
                          Thankyou for the purchase
                      </div>
                      <div>
                          Your order is now complete
                      </div>    
                  </div>    
                    :
                     null
                    }
                </div>
                {
                    this.state.showTotal?
                     <div className="paypal_button_container">
                         <Paypal
                          toPay={this.state.total}
                          transactionError={(data)=>()=>this.transactionError(data)}
                          transactionCancel={(data)=>()=>this.transactionCancel(data)}
                          transactionSuccess={(data)=>()=>this.transactionSuccess(data)}
                         />
                     </div>    
                    :
                     this.showNoItemMessage()
                }
            </div>
        )
        }
        return(
            <div style={{
                top:'80px',
                position:'relative'
            }}>
                Loading...
            </div>
        )   
    }
}
