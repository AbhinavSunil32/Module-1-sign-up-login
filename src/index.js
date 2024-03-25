const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const collection=require("./mongodb")
app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.use(express.static('public'))
app.set("view engine","hbs")

app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})
app.get("/seller",(req,res)=>{
    res.render("seller")
})
app.get("/buyer",(req,res)=>{
    res.render("buyer")
})
app.get("/addproducts",(req,res)=>{
    res.render("addproducts")
})
app.post("/signup",async (req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password
      
    }

    await collection.insertMany([data])
   
    res.render("login")
})

app.post("/login",async (req,res)=>{
    try{
    const check=await collection.findOne({name:req.body.name})

    if(check.password==req.body.password){
        res.render("sellorbuy")
    }
    else
    {
        res.send("wrong password")
    }
    }
    catch{
        res.send("wrong credentials")
    }
   
    res.render("sellorbuy")
})


app.listen(3000,()=>{
    console.log("port connected")
})