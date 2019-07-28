import React, { Component } from 'react';
import '../../css_resource/styles.css'; 
import CollapseCheckbox from './collapse_checkbox';
import axios from 'axios';
import img1 from '../../images/Loadingscreen.jpg';
import CollapseRadio from './collapse_radio';
import {price} from './fixed_category';
import LoadMoreCards from './loadmorecards';

export default class Shop extends Component {

    state={
        brands_data:[],
        genres_data:[],
        loading_brands:false,
        loading_genres:false,
        loading_articles:false,
        grid:'',
        limit:6,
        skip:0,
        filters:{
            brand:[],
            genre:[],
            price:[]
        },
        size:0,
        articles:[],
        prevStateArticles:[]
        // loaded:false
    }

    componentWillMount()
    {
      axios.get('/api/product/get_brands').then(response=>{   
      this.setState({
          brands_data:response.data,
          loading_brands:true
      })
      })
      axios.get('/api/product/get_genres').then(response=>{   
        this.setState({
            genres_data:response.data,
            loading_genres:true
        })
        })
      const data={
         limit: this.state.limit,
          skip: this.state.skip,
          filters: this.state.filters
      }

      axios.post('/api/product/shop',data).
      then(response=>{
          this.setState({
            size: response.data.size,
          articles: response.data.articles,
          loading_articles:true
          })
      })



    }

    handlePrice =(value)=>{
        const data=price;
        let array=[];

        for( let key in data)
        {
            if(data[key]._id===parseInt(value,10))
                array=data[key].array
        }
        return array;
    }

    handleFilters=(filters,category)=>{
        const newFilters=this.state.filters;
        newFilters[category] = filters;

        if(category==="price")
        {
            let priceValues=this.handlePrice(filters);
            newFilters[category]=priceValues;
        }
        this.showFilteredContent(newFilters)
        
        this.setState({
            filters:newFilters
        })

    }

    loadMore=()=>{
        let skip = this.state.skip+this.state.limit;
        this.state.prevState=this.state;
        
        const data={
            limit: this.state.limit,
             skip: skip,
             filters: this.state.filters
         }
   
         axios.post('/api/product/shop',data).
         then(response=>{
            let data1=this.state.articles 
            this.setState({
                 prevStateArticles:data1
             })
            //  console.log(this.state.prevStateArticles)
             let pp=[...this.state.prevStateArticles,...response.data.articles];
             this.setState({
               size: response.data.size,
             articles: pp,
             skip:skip
             })
             
         })

    }

    showFilteredContent=()=>{
        const data={
            limit: this.state.limit,
             skip: 0,
             filters: this.state.filters
         }
   
         axios.post('/api/product/shop',data).
         then(response=>{
             this.setState({
               size: response.data.size,
             articles: response.data.articles
             })            
         })
    }

    render() {
        if(this.state.loading_brands && this.state.loading_genres && this.state.loading_articles)
        {
        return (
            <div style={{
                top:'80px',
                position:'relative'
            }}>
                <div >
                    <div className="container">
                        <div className="shop_wrapper"> 
                            <div className="left">
                                <CollapseCheckbox 
                                initState={true}
                                title="Brands"
                                products={this.state.brands_data}
                                handleFilters={(filters)=>this.handleFilters(filters,'brand')} 
                                />
                                <CollapseCheckbox 
                                initState={false}
                                title="Genres"
                                products={this.state.genres_data}
                                handleFilters={(filters)=>this.handleFilters(filters,'genre')} 
                                />
                                <CollapseRadio 
                                initState={true}
                                title="Price"
                                products={price}
                                handleFilters={(filters)=>this.handleFilters(filters,'price')} 
                                />
                                <br />
                                <br />
                            </div>
                            <div className="right">
                                {/* <div className="shop_options">
                                    <div className="shop_grids clear">
                                        grid
                                    </div>
                                </div> */}
                                <div>
                                    <LoadMoreCards
                                        grid={this.state.grid}
                                        limit={this.state.limit}
                                        size={this.state.size}
                                        products={this.state.articles}
                                        loadMore={()=>this.loadMore}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
            }
    return(
        <div style={{
            height:`${window.innerHeight-44}px`,
            backgroundImage:`url(${img1})`,
        backgroundSize: 'cover'
        }}>
           
        </div>
    )        
    }
}
