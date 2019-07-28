import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import img1 from '../../images/lastofus.jpg';
// import img1 from '../../images/uncharted.jpg';
import '../../hoc/font.css'
import axios from 'axios';

export default class RegisterLogin extends Component {
    state={
        name:'',
         key:'',
         firstname:'',
         lastname:''
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
           "password":this.state.key,
           "firstname":this.state.firstname,
           "lastname":this.state.lastname
       };

    //    dataToSubmit=this.state;
       // for(let k in this.state)
       //   dataToSubmit[k]=this.state.k.value;
    axios.post('/api/users/register',dataToSubmit).then(response=>{
        this.props.history.push("/");
    }).catch(error=>{
        console.log("why are you not letting me register?")
    }); 

    //    firebaseDB.ref().push(dataToSubmit);  
     }
    render() {
        return (
            <div style={{
                height:`${window.innerHeight-44}px`,
                backgroundImage:`url(${img1})`,
                backgroundSize: 'cover'
            }}> 
             <div>      
             <div className="card card-body w-25 text-center" style={{
               top:'150px',
               left:'525px',
               height:'370px'
             }}>
             <span className="games_style" style={{
                 color:'#000000',
                 fontSize:'25px',
                 position: 'relative',
                 marginBottom:'10px'
             }}>Register Yourself, Warrior</span>       
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
                <input name="key" type="password" className="form-control" placeholder="Password" value={this.state.key} onChange={e=>this.handleChange(e)}/>
                </div>
                <div className="input-group" style={{
                  position:'relative',
                  top:'40px'
                }}>
                <div className="input-group-prepend">  
                <div className="input-group-text bg-primary text-white">
                <i className="fas fa-user" />
                </div>
                </div>
                <input name="firstname" type="text" className="form-control" placeholder="First Name" value={this.state.firstname} onChange={e=>this.handleChange(e)}/>
                </div>
                <div className="input-group" style={{
                  position:'relative',
                  top:'60px'
                }}>
                <div className="input-group-prepend">  
                <div className="input-group-text bg-primary text-white">
                <i className="fas fa-user" />
                </div>
                </div>
                <input name="lastname" type="text" className="form-control" placeholder="Last Name" value={this.state.lastname} onChange={e=>this.handleChange(e)}/>
                </div>
                <button onClick={this.onSubmit} type="submit" className="btn btn-block btn-primary mt-3 text-white bg-success" style={{
                  position:'relative',
                  top:'80px'
                }} > Submit</button>
            </form>
          </div>
    </div>
    </div>

    
        )
    }
}

