import React, { Component } from 'react'
import {img1} from '../../images/image_not_available.png'
import MyButton from '../shop/button';
import { relative } from 'path';
import axios from 'axios';

export default class Card extends Component {

    renderCardImage(images){
        if(images.length!==0){
            return images[0]
        }
        else{
        return '../../images/image_not_available.png';
        }
    }

    runAction=()=>{
        axios.post(`/api/users/addtocart?productId=${this.props._id}`).then((response)=>{
            if(response.data.length>0)
            {
                
            }
            else
            this.props.history.push("/");
        })
    }

    render() {
        return (
            <div className={`card_item_wrapper ${this.props.grid}`}>
                <div
                    className="image"
                    style={{
                        background:`url(${this.renderCardImage(this.props.images)})`
                    }}
                >
                </div>    
                    <div className="action_container">
                        <div className="tags">
                            <div className="brand">
                                {this.props.brand.name}
                            </div>
                            <div className="name">
                                {this.props.name}
                            </div>
                            <div className="price">
                                ${this.props.price}
                            </div>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="button_wrapp">
                            <MyButton
                            type="default"
                            // altClass="card_link"
                            title="View Product"
                            linkTo={`product_detail/${this.props._id}`}
                            addStyles={{margin:'10px 0 0 0'}}
                            />
                        </div>
                        <div className="button_wrapp" style={{
                            top:'10px',
                            position:'relative'
                        }}>
                            <MyButton
                            type="bag_link"
                            runAction={()=>this.runAction()}
                            />
                        </div>
                    </div>    
                    <br />
                    <br />
            </div>
        )
    }
}
