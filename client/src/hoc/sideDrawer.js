import React from 'react';
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import InboxIcon from '@material-ui/icons/Inbox';
import ListItemText from '@material-ui/core/ListItemText';
// import {Link} from 'react-router-dom';

const SideDrawer = (props) => {
    return (
        <div>
           <Drawer anchor="right" open={props.open} onClose={()=>props.onClose(false)}>
           <List component="nav">
           <ListItem button component="a" href="http://localhost:3000/myaccount">
          
          <ListItemText primary="My Account" />
        </ListItem>
        </List>
        <List component="nav">
           <ListItem button component="a" href="http://localhost:3000/login_register">
          
          <ListItemText primary="Login/Register" />
        </ListItem>
        </List>
        <List component="nav">
           <ListItem button component="a" href="http://localhost:3000/shop">
          
          <ListItemText primary="Shop" />
        </ListItem>
        </List>
        <List component="nav">
           <ListItem button component="a" href="http://localhost:3000/mycart">
          
          <ListItemText primary="My Cart" />
        </ListItem>
        </List>
        <List component="nav">
           <ListItem button component="a" href="http://localhost:3000/addproduct">
          
          <ListItemText primary="Add Product (Admin)" />
        </ListItem>
        </List>
           </Drawer> 
        </div> 
        );
}

export default SideDrawer;