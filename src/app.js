const express = require('express')
const path = require('path')
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')




const app = express();
const port = process.env.PORT || 3000


//define paths for express configuration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set up handlebars and view loaction
app.set('view engine','hbs')
app.set('views',viewPath) 
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath));




app.get('',(req,res)=>{

    res.render('index',{
        title:'Weathe app',
        name:'Satyendra'
    })

})





app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Satyendra',
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide an address',
        })
    }

geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
        return res.send({error})
    }
    
    forecast(latitude,longitude, (error,forecastData)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:forecastData,
            location,
            address:req.query.address,
        })
    })


})


    // res.send({
    //     forecast:'Snowing',
    //     location:'Varanasi',
    //     address:req.query.address,
    // })
})






app.get('/products',(req,res)=>{
     
    if(!req.query.search){
       return res.send({
            send:'Provide a search term!',
        })
    }


    console.log(req.query.search)
    res.send({
        products:[],
    })
})




app.get('/help',(req,res)=>{

    res.render('help',{
          helpText:'This is some help from weather app',
          title:'Help',
          name:'Satyendra'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Satyendra',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    
       res.render('404',{
           title:'404',
           name:'Satyendra',
           errorMessage:'Page not found'
       })

})





app.listen(port,()=>{
    console.log('listing to port '+ port)
    
})








//app.com
//app.com/help
//app.com/about