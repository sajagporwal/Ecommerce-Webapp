import React, { Component } from 'react'
import axios from 'axios';
import '../hoc/font.css';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import { ProductCard } from 'react-ui-cards';
import img2 from '../images/gif_best.gif';
import img1 from '../images/Loadingscreen.jpg'
// import Shop from './shop/index';

export default class Part1 extends Component {
    state={
        data:[],
        loaded:false
    }
    
    componentWillMount()
    {
      axios.get('/api/product/get_products_order?sortBy=createdAt&order=desc&limit=3').then(response=>{   
      this.setState({
          data:response.data,
          loaded:true
      })
      })
    }

    render() {       
                
        if (this.state.loaded) {
            return( 
                // this.state.data.map((item)=>{
                //  return(
                    <div style={{
                        // height:'1500px',
                        // backgroundSize:'cover'
                    }}>
<img src={img2} alt="not found"  style={{
    left:'240px',
    position:'relative'
}} />                        

<div style={{
    left:'150px',
    top:'70px',
    position:'relative'
}}>              
 {/* <ProductCard
        
          photos={item.images}
          price={item.price}
          productName={item.name}
          description={item.description}
          buttonText='Add to cart'
          rating={3}
          url=''
/> */}
<ProductCard
        photos={this.state.data[0].images}
        price={`$${this.state.data[0].price}`}
        productName={this.state.data[0].name}
        description={this.state.data[0].description}
        buttonText='Go To Shop'
        rating={3}
        url='/shop'
/>
{/* </div> */}
              </div>
              <div style={{
    left:'550px',
    // top:'150px',
    bottom:'393px',
    position:'relative'
}}>              
<ProductCard
        photos={this.state.data[1].images}
        price={`$${this.state.data[1].price}`}
        productName={this.state.data[1].name}
        description={this.state.data[1].description}
        buttonText='Go To Shop'
        rating={3}
        url='/shop'
/>
              </div>
              <div style={{
    left:'950px',
    bottom:'856px',
    position:'relative'
}}>              
<ProductCard
        photos={this.state.data[2].images}
        price={`$${this.state.data[2].price}`}
        productName={this.state.data[2].name}
        description={this.state.data[2].description}
        buttonText='Go To Shop'
        rating={3}
        url='/shop'
/>
</div>
              </div>
                //  )
                // })   
          )
          }

            return(  
                <div style={{
                    height:`${window.innerHeight-44}px`,
                    backgroundImage:`url(${img1})`,
                backgroundSize: 'cover'
                }}>
                   
                </div> 
            )
    }
}
