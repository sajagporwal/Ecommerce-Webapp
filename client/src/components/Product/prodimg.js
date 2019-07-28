import React, { Component } from 'react'
// import ImageLightBox from './lightbox'

export default class ProdImg extends Component {
    
    state={
        imgPos:0
    }

    renderCardImage=(pos)=>{
        return this.props.product[0].images[pos]
    }

    showThumbs=()=>(
        this.props.product[0].images.map((item,i)=>(
                <div
                key={i}
                onClick={()=>this.setState({
                    imgPos:i
                })}
                className="thumb"
                style={{background:`url(${item}) no-repeat`}}
                >

                </div>
        ))
    )

    render() {
        return (
            <div>
                <div className="product_image_container">
                    <div className="main_pic">
                        <div style={{background:`url(${this.renderCardImage(this.state.imgPos)}) no-repeat`}}
                        >
                        
                        </div>
                    </div>   
                    <div className="main_thumbs">
                        {this.showThumbs()}
                    </div> 
                    {/* {this.state.lightbox?
                        <ImageLightBox
                        images={this.state.lightboxImages}
                        open={this.state.open}
                        pos={this.state.imagePos}
                        onClose={()=>this.handleLightBoxClose()}
                        />
                     :  
                        null   
                } */}
                </div>
            </div>
        )
    }
}

// export default class ProdImg extends Component {

//     state={
//         lightbox:false,
//         imagePos:0,
//         lightboxImages:[]
//     }

//     componentDidMount(){
        
//         if(this.props.product[0].images.length>0)
//         {
//             let lightboxImages=[]
//             this.props.product[0].images.forEach(element => {
//                 lightboxImages.push(element)
//             });
            
//             this.setState({
//                 lightboxImages:lightboxImages
//             })
//             console.log(lightboxImages)
//         }
//     }

//     renderCardImages=(product)=>{
//         if(product[0].images.length>0)
//         {
//            return product[0].images[0];
//         }
//     }

//     handleLightBox=(pos)=>{
//         if(this.state.lightboxImages.length>0)
//         {
//             this.setState({
//                 lightbox:true,
//                 imagePos:pos
//             })
//         }
//     }

//     handleLightBoxClose=()=>{
//         this.setState({
//             lightbox:false
//         })
//     }

//     showThumbs=()=>(
//         this.state.lightboxImages.map((item,i)=>(
//             i>0?
//                 <div
//                 key={i}
//                 onClick={this.handleLightBox(i)}
//                 className="thumb"
//                 style={{background:`url(${item}) no-repeat`}}
//                 >

//                 </div>
//             :
//                 null
//         ))
//     )

//     render() {
//         return (
//             <div>
//                 <div className="product_image_container">
//                     <div className="main_pic">
//                         <div style={{background:`url(${this.renderCardImages(this.props.product)}) no-repeat`}}
//                          onClick={()=>this.handleLightBox(0)}
//                         >
                        
//                         </div>
//                     </div>   
//                     <div className="main_thumbs">
//                         {this.showThumbs()}
//                     </div> 
//                     {this.state.lightbox?
//                         <ImageLightBox
//                         images={this.state.lightboxImages}
//                         open={this.state.open}
//                         pos={this.state.imagePos}
//                         onClose={()=>this.handleLightBoxClose()}
//                         />
//                      :  
//                         null   
//                 }
//                 </div>
//             </div>
//         )
//     }
// }
