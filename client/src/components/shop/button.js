import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';

const MyButton=(props)=>{

    const buttons=()=>{

        switch(props.type){
            case "default":
                return <Link
                    className="link_default"  
                    to={props.linkTo}
                    {...props.addStyles}
                >
                    {props.title}
                </Link>
            break;
            case "bag_link":
                return (
                    <div className="bag_link"
                        onClick={()=>{
                            props.runAction();
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faShoppingBag}
                        />
                    </div>
                )
            break;
            case "add_to_cart_link":
                return(  
                    <div className="add_to_cart_link"
                        onClick={()=>{
                            props.runAction();
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faShoppingBag}
                        />
                        Add to cart
                    </div>
                )
            break;
            default:
                return null;
        }
    }

    return(
        <div className="my_link">
            {buttons()}  
        </div>
    )
}

export default MyButton;