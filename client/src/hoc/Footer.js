import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton } from '@material-ui/core';
import { FaInstagram } from "react-icons/fa";
import { FaPlaystation } from "react-icons/fa";
import { FaXbox } from "react-icons/fa";
import '../hoc/font.css';
// import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import './font.css';
import img1 from '../images/sajag.png';
export default class Footer extends Component {

    // state={
    //     active:false
    // }

    // componentWillMount(){
    //     Modal.setAppElement('#myModal')
    // }

    render() {
        return (
            <div>
        <AppBar position='fixed'
        style={{
            backgroundColor:'black',
            top:'610px',
            height: '44px'
        }}
        >
        <div className="games_style" style={{
            fontSize:20,
            position:'relative',
            left:'520px',
            top:'4px'
        }}>
            <Button href="#centralModalWarning" data-toggle="modal" variant="contained" color="primary" onClick={this.toggleModal}>
        Meet the developer
      </Button>
 </div>
    <div class="modal fade" id="centralModalWarning" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div class="modal-dialog modal-notify modal-warning" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <p style={{ color:'black',
    fontSize:'30px'}} class="heading lead" className="games_style">Sajag Porwal</p>

        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" class="white-text">&times;</span>
        </button>
      </div>
      <img src={img1} width="150" height="150" style={{
          top:'40px',
          left:'170px',
          position:'relative'
      }} />
      <div class="modal-body">
        <div class="text-center">
          <i class="fas fa-check fa-4x mb-3 animated rotateIn"></i>
          <p style={{
              color: 'black'
          }}>Just a guy who is a hero for fun!!
          <br/>
          NorthEastern University, Boston</p>
        </div>
      </div>
      <div class="modal-footer justify-content-center">
        <a type="button" class="btn btn-warning">I like the work <i class="far fa-gem ml-1 text-white"></i></a>
        <a type="button" class="btn btn-danger waves-effect" data-dismiss="modal">No, thanks</a>
      </div>
    </div>
  </div>
</div>
        <Toolbar>  
        <IconButton  color="inherit" aria-label="Menu" style={{
                        // top:'-10px',
                        // marginLeft: '1400px',
                        // right:'30px',
                        position:'relative',
                        bottom:'45px',
                        left:'730px'
                    }}
                     href="https://www.instagram.com/sajagporwal/" >
                        <FaInstagram size={25}/>        
         </IconButton>  
         <IconButton  color="inherit" aria-label="Menu" style={{
                        // top:'-10px',
                        // marginLeft: '1400px',
                        // right:'30px',
                        position:'relative',
                        bottom:'45px',
                        left:'730px'
                    }}
                     href="https://www.playstation.com/en-in/" >
                   <FaPlaystation size={25}/>
         </IconButton> 
         <IconButton  color="inherit" aria-label="Menu" style={{
                        // top:'-10px',
                        // marginLeft: '1400px',
                        // right:'30px',
                        position:'relative',
                        bottom:'45px',
                        left:'730px'
                    }}
                     href="https://www.xbox.com/en-IN/" >
                   <FaXbox size={25}/>
         </IconButton>
        </Toolbar>
        </AppBar>
            </div>
        )
    }
}
