import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import './font.css';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import purple from '@material-ui/core/colors/purple';
import SideDrawer from './sideDrawer'
import { FaAlignJustify } from "react-icons/fa";

export default class Header extends Component {
    state={
        openDrawer:false
    }

    toggleState=(value)=>
    {
      this.setState({
          openDrawer : value
      })
    }

    render() {
        return (
            <div>
               <AppBar position="fixed" style={{
                   boxShadow:'none',
                   backgroundColor:'#000000',
                   height: '80px'
               }}> 
                    <div className="games_style"
                    style={{
                       fontSize: 60,
                       marginLeft:'20px',
                       bottom:'30px'
                    }}>GAMES</div>
                    <Toolbar>
                    {/* <Link to="/register_login"><Button color="secondary" variant="contained" style={{
                        bottom:'100px',
                        left:'1100px',
                        position:'relative'
                    }}>Login/Register</Button></Link>
                    <Link to="/myaccount"><Button color="secondary" variant="contained" style={{
                        bottom:'0px',
                        left:'800px',
                        position:'relative'
                    }}>My Account</Button></Link> */}
                    {/* <button type="button" class="btn btn-default" style={{
                        bottom:'60px',
                        left:'1000px',
                        position:'relative'
                    }}>Default</button> */}
                    {/* <button type="button" class="btn btn-info" style={{
                        marginTop:'40px',
                        left:'950px',
                    }} onclick="window.location.href = 'https://www.w3docs.com';">Login/Register</button>
                    {/* <a href="http://google.com" class="btn btn-default">Go to Google</a> */}
                    {/* <button type="button" class="btn btn-info" style={{
                        marginTop:'40px',
                        left:'1000px',
                    }}>My Account</button>  */}
                    <IconButton  color="inherit" aria-label="Menu" style={{
                        marginLeft:"auto",
                        top:'-10px',
                        right:'10px',
                        marginBottom:'125px'

                    }}
                    onClick={()=>this.toggleState(true)}
                    >
                        <FaAlignJustify size={35}  />         
                    </IconButton> 
                    <SideDrawer 
                    open={this.state.openDrawer}
                    onClose={(value)=>this.toggleState(value)} />
                    <SideDrawer 
                    open={this.state.openDrawer}
                    onClose={(value)=>this.toggleState(value)} />
                    </Toolbar>
                    
               </AppBar>
            </div>
        )
    }
}
