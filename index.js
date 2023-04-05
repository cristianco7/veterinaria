const express=require("express");
const mongoose= require("mongoose");
require('dotenv').config();

const bodyParser=require('body-parser');  

const usuario=process.env.USUARIO 
const password=process.env.PASSWORD; 
const dbname=process.env.DBNAME;  
 
const uri =`mongodb+srv://${usuario}:${password}@cluster0.amnvaku.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true}) 
.then(()=>console.log('conectado a mongo'))
.catch(e=>console.log('error de conexion',e));

const app=express(); 
const PORT =process.env.PORT||3000;

app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+"/node_modules/materialize-css/dist"));

app.set("view engine","ejs");
app.set("views",__dirname+"/views");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.get("/",(req,res)=>{ 
    res.render("index",{titulo:"inicio ejs"});
});

app.use('/mascotas',require('./router/Mascotas'));

app.use('/servicios',require('./router/Servicios'));

app.use((req,res,next)=>{
    res.status(404).sendFile(__dirname+"/public/404.html"); 
});

app.listen(PORT,()=>{

    console.log(`escuchando en el puerto ${PORT}`);
});