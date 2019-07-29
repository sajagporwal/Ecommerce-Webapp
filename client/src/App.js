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
import USER_SERVER from './components/misc';

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
            <Route path={`${USER_SERVER}`} exact component={Home} />
            <Route path={`${USER_SERVER}/product_detail/:id`} component={ProductDetail} />
            <Route path={`${USER_SERVER}/add_product`} component={AddProduct} />
            <Route path={`${USER_SERVER}shop`} component={Shop} />
            <Route path={`${USER_SERVER}/myaccount`} component={User} />
            <Route path={`${USER_SERVER}/login_register`} component={RegisterLogin} />
            <Route path={`${USER_SERVER}/mycart`} component={MyCart} />
            <Route path={`${USER_SERVER}/register`} component={Register} />
          </Switch>
          </div>
          <Footer />
          </div>  
        </BrowserRouter>
    )
  }
}
