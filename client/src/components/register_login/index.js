import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import img1 from '../../images/infamous.jpg';
import img2 from '../../images/infamous2.jpg';
import '../../hoc/font.css'
import axios from 'axios';
import {Link} from 'react-router-dom'



export default class RegisterLogin extends Component {
    state={
        name:'',
        key:'',
     }
 
     handleChange=(e)=>{
       this.setState({
         [e.target.name]:e.target.value
       })
     }
 
     onSubmit=(event)=>
     {
       event.preventDefault();
       let dataToSubmit={
           "email":this.state.name,
           "password":this.state.key
       };

    //    dataToSubmit=this.state;
       // for(let k in this.state)
       //   dataToSubmit[k]=this.state.k.value;
    axios.post('/api/users/login',dataToSubmit).then(response=>{
        console.log(response);
        this.props.history.push("/");
    }).catch(error=>{
        console.log(error)
    }); 
    
    //    firebaseDB.ref().push(dataToSubmit);  
     }
    render() {
        return (
            <div style={{
                height:`${window.innerHeight+120}px`,
                backgroundImage:`url(${img1})`,
                backgroundSize: 'cover'
            }}> 
             <div>      
             <div className="card card-body w-25 text-center" style={{
               top:'250px',
               left:'175px',
               height:'240px'
             }}>
             <span className="account_font" style={{
                 color:'#000000',
                 fontSize:'20px',
                 position: 'relative',
                 marginBottom:'10px'
             }}>Already have an account?</span>       
            <form>
                <div className="input-group">
                <div className="input-group-prepend">  
                <div className="input-group-text bg-primary text-white">
                <i className="fas fa-id-card" />
                </div>
                </div>
                <input name="name" type="text" className="form-control" placeholder="Username" value={this.state.name} onChange={e=>this.handleChange(e)} />
                </div>
                <div className="input-group" style={{
                  position:'relative',
                  top:'20px'
                }}>
                <div className="input-group-prepend">  
                <div className="input-group-text bg-primary text-white">
                <i className="fas fa-key" />
                </div>
                </div>
                <input name="key" type="text" className="form-control" placeholder="Password" value={this.state.key} onChange={e=>this.handleChange(e)}/>
                </div>
                <button onClick={this.onSubmit} type="submit" className="btn btn-block btn-primary mt-3 text-white bg-success" style={{
                  position:'relative',
                  top:'30px'
                }} > Submit</button>
            </form>
          </div>
    </div>
    <div className="card card-body w-25 text-center" style={{
              //  top:'40px',
              //  left:'875px',
              //  height:'180px',
              //  bottom:'50px',
              //  position:'relative'
              marginBottom:'0px',
              left:'800px',
              bottom:'110px'
             }}>
             <div className="games_style" style={{
                 fontSize:'30px'
             }}>
               New User?<br />
               Begin Your Gaming Journey     
             </div>    
             <Link to="/register">
             <button className="btn btn-block btn-warning mt-3 text-white bg-warning" style={{
                  position:'relative',
                  top:'0px',
                  left:'2px'
                }} > Register Yourself</button>
             </Link>
             </div>
    </div>

    
        )
    }
}

