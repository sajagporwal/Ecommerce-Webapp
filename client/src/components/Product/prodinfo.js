import React from 'react';
import MyButton from '../shop/button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import axios from 'axios'

const ProdInfo = (props)=>{
    const alias=props.product[0];
    
    const runAction=()=>{
        axios.post(`/api/users/addtocart?productId=${props.product[0]._id}`).then((response)=>{
            if(response.data.length>0)
            {
                console.log("added")
            }
            else
            this.props.history.push("/");
        })
    }

    const showProdActions=(alias)=>(
        <div className="product_actions">
            <div className="price">
                $ {alias.price}
            </div>
            <div className="cart">
                <MyButton
                type="add_to_cart_link"
                runAction={()=>runAction()}
                />
            </div>
        </div>
    )

    const showProdGenre=(alias)=>(
        <div className="product_specifications">
            <h2>Genre:</h2>
            <div className="item">
                <strong>{alias.genre.name}</strong>
            </div>
        </div>
    )

    const showProductTags=(alias)=>(
        <div className="product_tags">
            {
                alias.shipping?
                    <div className="tag">
                        <div><FontAwesomeIcon icon={faTruck} /></div>
                        <div className="tag_text">
                            <div> Free Shipping</div>
                            <div> And return</div>
                        </div>    
                    </div>    
                :null
            }
            {
                alias.available?
                    <div className="tag">
                        <div><FontAwesomeIcon icon={faCheck} /></div>
                        <div className="tag_text">
                            <div> Available</div>
                            <div> in store</div>
                        </div>    
                    </div>    
                :
                <div className="tag">
                        <div><FontAwesomeIcon icon={faTimes} /></div>
                        <div className="tag_text">
                            <div>Not Available</div>
                            <div> Preorder only</div>
                        </div>    
                    </div>
            }

        </div>
    )

    return(
        <div>
            <h1> {alias.brand.name} {alias.name}     </h1>
            <p>
                {alias.description}
            </p>
            {showProductTags(alias)}
            {showProdActions(alias)}
            {showProdGenre(alias)}
        </div>
    )
}

export default ProdInfo;