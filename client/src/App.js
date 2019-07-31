import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter, Switch, Route, Link, NavLink} from 'react-router-dom';
import Home from './components/Home';
import Header from './hoc/Header';
import Footer from './hoc/Footer';
import RegisterLogin from './components/register_login/index'
import Register from './components/register_login/register'
import User from './components/user_dash'
import AddProduct from './components/add_product'
import Shop from './components/shop/index'
import ProductDetail from './components/Product';
import MyCart from './components/mycart';

export default class App extends Component {
  componentDidMount(){
    // axios.get('/api/product/get_brands').then(response=>{
    //   console.log(response);
    // }
    // )
  }
  render() {
    return (
        <BrowserRouter>
        <div>
          <Header />
          <div style={{height:`${window.innerHeight-44}px`}}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/product_detail/:id" component={ProductDetail} />
            <Route path="/addproduct" component={AddProduct} />
            <Route path="/shop" component={Shop} />
            <Route path="/myaccount" component={User} />
            <Route path="/login_register" component={RegisterLogin} />
            <Route path="/mycart" component={MyCart} />
            <Route path="/register" component={Register} />
          </Switch>
          </div>
          <Footer />
          </div>  
        </BrowserRouter>
    )
  }
}
