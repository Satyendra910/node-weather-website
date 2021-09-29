const request = require('postman-request')

const forecast = (latitude,longitude,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=f77e37e490d64e7ebd847ebac72305b0&query='+ latitude +','+ longitude +'&units=f';
    
    request({url,json:true},(error,response)=>{
     
        if(error){
            callback('Unable to connect ot weather services!',undefined)
        }else if(response.body.error){
            callback('Unable to find the location',undefined)
        }else{
            callback(undefined,response.body.current.weather_descriptions[0]+". It is currently "+response.body.current.temperature+" degree out.It feels like "+response.body.current.feelslike +" degree out.")
        }

    })

}


module.exports = forecast;