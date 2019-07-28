import React from 'react';
import CardBlock from './cardBlock';

const LoadMoreCards=(props)=>{
    return(
        <div>
            <div>
                <CardBlock
                    grid={props.grid}
                    products={props.products}
                />
            </div>    
            {
               props.size>0 && props.size>=props.limit?
               <div className="load_more_container">
                <span onClick={props.loadMore()} >
                    Load More
                </span>
            </div>
               :
               <div>
                   <br />
                   <br />
                   <br />
               </div>    
            }
            {/* <div className="load_more_container">
                <span onClick={props.loadMore()} >
                    Load More
                </span>
            </div> */}
        </div>
    )
}

export default LoadMoreCards;