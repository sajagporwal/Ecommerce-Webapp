import React from 'react';
import Card from './card';

const CardBlock=(props)=>{

    const renderCards=()=>(
        props.products.map(card=>(
            <Card
            key={card._id}
            {...card}
            grid={props.grid}
            />
        ))
    )

    return(
        <div className="card_block_shop">
            <div>
                {props.products?
                  props.products.length===0?
                  <div className="no_result">
                      Sorry, No results!
                  </div> 
                  :null     
                :null
            }
            {renderCards(props.products)}
            </div>
        </div>
    )
}

export default CardBlock;