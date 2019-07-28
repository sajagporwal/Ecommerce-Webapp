import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import '../hoc/font.css';
import axios from 'axios';
// import Dropzone from 'react-dropzone';
import FileUploader from 'react-firebase-file-uploader';
// import firebase from 'firebase';
// import config from '../firebase_config';
import {storage} from '../firebase_config';
import firebase from 'firebase/app';


export default class AddProduct extends Component {

    state={
        name:"",
        description:"",
        price:0,
        brand:"",
        shipping:true,
        available:true,
        genre:"",
        publish:true,
        images:[],
        isAdmin:false
     }

     handleUploadSuccess= (filename)=>{
      storage.ref('Uploaded_Images').child(filename).getDownloadURL().
      then(url=>{
        console.log(url);
        let newArr=this.state.images;
        newArr.push(url);
        console.log(newArr);
        this.setState({
          images:newArr
        })
        console.log(this.state.images);
        // console.log(this.state.images);
      // }
      // ) 
     })
    }
     handleChange=(e)=>{
        this.setState({
          [e.target.name]:e.target.value
        })
      }

      onSubmit=(event)=>
     {
       event.preventDefault();
       let dataToSubmit={
           "name":this.state.name,
           "description":this.state.description,
           "price":this.state.price,
           "brand":this.state.brand,
           "shipping":this.state.shipping,
           "available":this.state.available,
           "genre":this.state.genre,
           "publish":this.state.publish,
           "images":this.state.images
       };

    axios.post('/api/product/article',dataToSubmit).then(response=>{
        console.log(response);
        this.props.history.push("/");
    }).catch(error=>{
        console.log(error)
    }); 
     }

     componentWillMount(){
      axios.get('/api/users/auth').then(response=>{
      this.setState({
           isAdmin:response.data.isAdmin
      })
      })
     }


    render() {
      if(this.state.isAdmin)
      {
        return (
            <div >
                <form class="md-form">
  <div class="file-field">
    <div class="z-depth-1-half mb-4" style={{
        position:'relative',
        width:'300px',
        marginTop:'100px',
        marginLeft:'20px'
    }}>
      <img src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg" class="img-fluid"
        alt="example placeholder"  />
    </div>
    <div class="d-flex justify-content-center">
      <div class="btn btn-mdb-color btn-rounded float-left" style={{
          marginRight:'940px'
      }}>
        <span>Choose file</span>
        {/* <input type="file" onChange={e=>this.handleImage(e)} /> */}
        <FileUploader
        accept="image/*"
        name='image'
        storageRef={firebase.storage().ref('Uploaded_Images')}
        // onUploadStart={this.handleUploadStart}
        onUploadSuccess={this.handleUploadSuccess}
        />
      </div>
    </div>
  </div>
  <div style={{
      position:'relative',
      bottom:'260px',
      width:'500px',
      marginLeft:'500px'
  }}>
  <div class="input-group mb-3" style={{
      width:'500px'
  }}>
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon3">Add The latest Product</span>
  </div>

</div>
<div class="input-group mb-3" style={{
      width:'500px'
  }}>
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon3">Name: </span>
  </div>
  <input name="name" type="text" class="form-control"  aria-describedby="basic-addon3" value={this.state.name} onChange={e=>this.handleChange(e)} />
</div>
<div class="input-group mb-3" style={{
      width:'500px'
  }}>
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon3">Description: </span>
  </div>
  <input name="description" type="text" class="form-control"  aria-describedby="basic-addon3" value={this.state.description} onChange={e=>this.handleChange(e)} />
</div>
<div class="input-group mb-3" style={{
      width:'500px'
  }}>
   <div class="input-group-prepend">
    <span class="input-group-text">$</span>
  </div>
  <input name="price" type="text" class="form-control" aria-label="Amount (to the nearest dollar)" value={this.state.price} onChange={e=>this.handleChange(e)} />
  <div class="input-group-append">
    <span class="input-group-text">.00</span>
  </div>
  </div>
<div class="input-group mb-3" style={{
      width:'500px'
  }}>
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon3">Brand: </span>
  </div>
  <input name="brand" type="text" class="form-control" aria-describedby="basic-addon3" value={this.state.brand} onChange={e=>this.handleChange(e)} />
</div>
<div class="input-group mb-3" style={{
      width:'500px'
  }}>
<div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon3">Genre: </span>
  </div>
  <input name="genre" type="text" class="form-control" aria-describedby="basic-addon3" value={this.state.genre} onChange={e=>this.handleChange(e)} />
</div>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <div class="input-group-text">
      <input name="available" type="checkbox" aria-label="Checkbox for following text input" value={this.state.available} onChange={e=>this.handleChange(e)} />
    </div>
  </div>
  &nbsp; Is The Item Available?
</div>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <div class="input-group-text">
      <input name="shipping" type="checkbox" aria-label="Checkbox for following text input" value={this.state.shipping} onChange={e=>this.handleChange(e)} />
    </div>
  </div>
  &nbsp; Is Shipping Available?
</div>
<br />
<Button onClick={this.onSubmit} type="submit" variant="contained" color="default" >
        Add
      </Button>
  </div>
</form>
            </div>
        )
}
else{
  return(
  <div style={{
    top:'80px',
    position:'relative'
  }}>
       Please login as admin to add product
  </div>
  )
}
    }
  }

