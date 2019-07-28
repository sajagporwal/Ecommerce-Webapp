import React, { Component } from 'react'
import img1 from '../images/pink.jpg'
import img2 from '../images/flag.jpg'
import '../hoc/font.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import UserProductBlock from './userprodblock'

export default class User extends Component {
    
    state={
        data:{
        visible:false,    
        isAdmin: false,
        isAuth: true,
        email:'',
        firstname:'',
        lastname:'',
        cart: [],
        history:[]
        }
}
    handleButtonClick=()=>{
        axios.get('/api/users/logout').then(response=>{
          
            this.setState({    
            //   isAdmin:respons,
            //   isAuth:response.isAuth,
            //   email:response.email,
            //   firstname:response.firstname,
            //   lastname:response.lastname,
            //   cart:response.cart,
            //   history:response.history
            data:{
                visible:false,    
                isAdmin: false,
                isAuth: true,
                email:'',
                firstname:'',
                lastname:'',
                cart: [],
                history:[] 
            }
          })
          
        }
        )
    }


    componentWillMount(){
        axios.get('/api/users/auth').then(response=>{
          
            this.setState({    
            data:response.data
          })
        }
        )
    }
    
    render() {   
        return (
            <div style={{
                height:`${window.innerHeight-44}px`,
                backgroundImage:`url(${img1})`,
                backgroundSize: 'cover'
            }}>   
            <div style={{
                top:'150px',
                left:'100px',
                width:'400px',
                height:'300px'
            }} className="card bg-secondary text-white">              
    <div className="card-body">User Information =></div>
    <div className="card-body" >First Name: {this.state.data.firstname}</div>
    <div className="card-body" >Last Name: {this.state.data.lastname}</div>
    <div className="card-body" >E-mail: {this.state.data.email}</div>
    {this.state.data.visible? <Button onClick={this.handleButtonClick} color="secondary" variant="contained" className="button" style={{
            marginBottom:'100px',
            left:'150px',
            width:'80px'
        }}>Logout</Button>:null }
  </div>            
        </div>    
        )
    }

}

// class Box extends Component{
//     render(){
//         return <Button color="secondary" variant="contained" className="button" style={{
//             marginBottom:'100px',
//             left:'150px',
//             width:'80px'
//         }}>Logout</Button>
//     }
// }