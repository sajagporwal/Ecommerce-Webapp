const express=require('express');
const bodyParser =require('body-parser');
const cookieParser = require('cookie-parser');
const formidable = require('express-formidable');


const app=express();
const mongoose=require('mongoose');
require('dotenv').config();


mongoose.Promise=global.Promise;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('client/build'))

mongoose.connect(process.env.MONGODB_URI);

// Models
const { User } = require('./models/user')
const { Brand } = require('./models/brand')
const { Genre } = require('./models/genre')
const { Product } = require('./models/product')


// Middleware
const {auth} = require('./middleware/auth') 
const {admin} = require('./middleware/admin')

// *********************
//         PRODUCTS
// *********************

app.post('/api/product/shop',(req,res)=>{

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length>0)
        {
            if(key==='price')
            {
                findArgs[key]={
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }
            else{
                findArgs[key] = req.body.filters[key];
            }
        }
    }
    Product.
    find(findArgs).
    populate('brand').
    populate('genre').
    sort([[sortBy,order]]).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size:articles.length,
            articles:articles
        })
    })

})

app.post('/api/product/article',auth,admin,(req,res)=>{
    const product = new Product(req.body);

    product.save((err,doc)=>{
        if(err) return res.json({Success:false});
        res.status(200).json({
            success:true,
            genre: doc
        })
    })
})

app.get('/api/product/get_products_id',(req,res)=>{
    let type=req.query.type;
    let items=req.query.id;
    if(type === "array")
    {
        let ids = req.query.id.split(',');
        
        items=ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Product.
    find({'_id':{$in:items}}).
    populate('brand').
    populate('genre').
    exec((err,docs)=>{
        return res.status(200).send(docs)
    })
    })

app.get('/api/product/get_products_order',(req,res)=>{

    let order = req.query.order ? req.query.order:'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy:'_id';
    let limit = req.query.limit ? parseInt(req.query.limit):'100';

    Product.
    find().
    populate('brand').
    populate('genre').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
    })
})    


// *********************
//         GENRE
// *********************
app.post('/api/product/genre',auth,admin,(req,res)=>{
    const genre = new Genre(req.body);

    genre.save((err,doc)=>{
        if(err) return res.json({Success:false});
        res.status(200).json({
            success:true,
            genre: doc
        })
    })
})

app.get('/api/product/get_genres',(req,res)=>{
    Genre.find({},(err,genres)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(genres)
    })
})

// *********************
//         BRAND
// *********************
 
app.post('/api/product/brand',auth,admin,(req,res)=>{
    const brand = new Brand(req.body);

    brand.save((err,doc)=>{
        if(err) return res.json({Success:false});
        res.status(200).json({
            success:true,
            brand: doc
        })
    })
})

app.get('/api/product/get_brands',(req,res)=>{
    Brand.find({},(err,brands)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(brands)
    })
})

// *********************
//         USERS
// *********************

// app.post('/api/users/uploadimage',auth,admin,formidable(),(req,res)=>{
//     console.log(req);
//     cloudinary.uploader.upload(req,(result)=>{
//         res.status(200).send({
//             public_id:result.public_id,
//             url: result.url
//         })
//     },{
//         public_id:`${Date.now()}`,
//         resource_type:'auto'
//     })
// })

app.get('/api/users/removeFromCart',auth,(req,res)=>{
    User.findOneAndUpdate(
        {_id:req.user._id},
        {"$pull":
    {
        "cart": {"id":mongoose.Types.ObjectId(req.query._id)}
    }},
    {new:true},
    (err,doc)=>{
        let cart = doc.cart;
        let array = cart.map(item=>{
            return mongoose.Types.ObjectId(item.id)
        });

        Product.
        find({'_id':{ $in: array}}).
        populate('brand').
        populate('genre').
        exec((err,cartDetail)=>{
            return res.status(200).json({
            cartDetail,
            cart
            })
        })
    }
    )
})

app.post('/api/users/addtocart',auth,(req,res)=>{

    User.findOne({_id:req.user._id},(err,doc)=>{
        let duplicate=false
        
        doc.cart.forEach((item)=>{
            if(item.id==req.query.productId)
            {
                duplicate=true
            }    
        }
        )

        if(duplicate)
        {
            User.findOneAndUpdate(
                {_id:req.user._id,"cart.id":mongoose.Types.ObjectId(req.query.productId)},
                { $inc:{ "cart.$.quantity":1}},
                {new:true},
                ()=>{
                    if(err) res.status.json({success:false,err});
                    res.status(200).json(doc.cart)
                }
            )
        }
        else
        {
            User.findOneAndUpdate(
                {_id:req.user._id},
                { $push:{ cart:{
                    id: mongoose.Types.ObjectId(req.query.productId),
                    quantity:1,
                    date:Date.now()
                }
                }
                },
                {
                    new:true
                },
                (err,doc)=>{
                    if(err) res.status.json({success:false,err});
                    res.status(200).json(doc.cart)
                }
            )
        }

    }

    )

})

app.get('/api/users/auth',auth,(req,res)=>{
    res.status(200).json({
        visible:true,
        isAdmin: req.user.role === 0?false:true,
        isAuth: true,
        email:req.user.email,
        firstname:req.user.firstname,
        lastname:req.user.lastname,
        cart: req.user.cart,
        history: req.user.history 
    })
})

app.get('/api/users/logout',auth,(req,res)=>{

    User.findOneAndUpdate(
        {_id:req.user._id},
        { token: ''},
        (err,doc)=>{
            if(err) return res.json({success:false});
            return res.status(200).send({
                success:true
            })
        }
    )
})

// app.post('/api/users/getInfo',(req,res)=>{
//     User.findOne({'email':req.body.email},(err,user)=>{
//         if(!user) 
//         return res.json({loginSuccess:false,message:'Auth failed, email not found'});

        // user.comparePassword(req.body.password,(err,isMatch)=>{
        //     if(!isMatch) return res.json({loginSuccess:false,message:'entered passwordis incorrect'});

        //     user.generateToken((err,user)=>{
        //        if(err) return res.status(400).send(err);
        //        res.cookie('w_auth',user.token).status(200).json({
        //            loginSuccess: true
        //        }); 
        //     })
        // })
//         res.status(200).json({
//             email: user.email,
//             firstname: user.firstname,
//             lastname: user.lastname 
//         })
//     })
// })

app.post('/api/users/register',(req,res)=>{
        const user =  new User(req.body);

        user.save((err,doc)=>{
            if(err) return res.json({success:false,err});
            res.status(200).json({
                success: true
            })
        })
})

app.post('/api/users/login',(req,res)=>{

    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) 
        return res.json({loginSuccess:false,message:'Auth failed, email not found'});

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false,message:'entered passwordis incorrect'});

            user.generateToken((err,user)=>{
               if(err) return res.status(400).send(err);
               res.cookie('w_auth',user.token).status(200).json({
                   loginSuccess: true,
                   name: user.firstname
               }); 
            })
        })
    })
})

if(process.env.NODE_ENV === 'production')
{
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendFile(path,resolve(__dirname,'../client','build','index.html'));
    })
}

const port = process.env.PORT || 3002;
app.listen(port,()=>{
    console.log(`Server running at ${port}`)
})