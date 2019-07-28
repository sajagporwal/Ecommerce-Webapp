import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import faAngleDown from '@fortawesome/fontawesome-free-solid';
// import faAngleUp from '@fortawesome/fontawesome-free-solid';
import '../../css_resource/styles.css'; 
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { IconButton } from '@material-ui/core';

export default class CollapseCheckbox extends Component {
    state={
        open:false,
        checked:[]
    }

    componentDidMount()
    {
        if(this.props.initState)
        {
            this.setState({
                open:this.props.initState
            })
        }
    }

    handleClick = ()=>{
        this.setState({
            open:!this.state.open
        })
    }

    handleAngle=()=>(
        this.state.open?
        // <FontAwesomeIcon
        // icon={faAngleUp}
        // className="icon" />
        <IconButton color="inherit"  
        style={{
            // top:'-10px',
            // marginLeft: '1400px',
            // right:'30px',
        //     position:'relative',
        //     bottom:'45px',
        //     left:'730px'
        }} >
            <FaAngleUp size={25}/>        
</IconButton>
        :
        // <FontAwesomeIcon
        // icon={faAngleDown}
        // className="icon" />
        <IconButton color="inherit" 
        style={{
            // top:'-10px',
            // marginLeft: '1400px',
            // right:'30px',
        //     position:'relative',
        //     bottom:'45px',
        //     left:'730px'
        }} >
            <FaAngleDown size={25}/>        
</IconButton>
    )

    handleToggle=value=>()=>{
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if(currentIndex===-1)
            newChecked.push(value);
        else
            newChecked.splice(currentIndex,1);
            
        this.setState({
            checked:newChecked
        },
        ()=>{
            this.props.handleFilters(newChecked)
        }
        )    
    }

    renderList=()=>(
        this.props.products.map((value)=>(
            <div>
                <ListItem key={value._id} style={{padding:'10px 0'}}>
                    <ListItemText primary={value.name} />
                    <ListItemSecondaryAction>
                        <Checkbox 
                        color="primary"
                        onChange={this.handleToggle(value._id)}
                        checked={this.state.checked.indexOf(value._id)!==-1}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            </div>
        ))
    )

    

    render() {
        return (
            <div className="collapse_items_wrapper">
                <List style={{ borderBottom: '1px solid #dbdbdb'}}>
                    <ListItem onClick={this.handleClick} style={{padding:'10px 23px 10px 0px'}}>
                        <ListItemText primary={this.props.title}
                        className="collapse_title"
                        />
                        {this.handleAngle()}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.renderList()}
                        </List>
                    </Collapse>
                </List>
            </div>
        )
    }
}
