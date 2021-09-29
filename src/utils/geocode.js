const request = require('postman-request');


const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2F0eWVuZHJhZG9uOTEwIiwiYSI6ImNrdHFqeGdqbzBmcjMyd3FvYjYybXJ6ODkifQ.p2cIHhhMWDX7PCmK7Dyomw&limit=1'
    request({url,json:true},(error,response)=>{
       if(error){
          callback('Unable to connect to geocode service',undefined);
       }else if(response.body.features.length ===0){
          callback("Unable to connect to service. Try another search!",undefined)
       }else{
          callback(undefined,{
             latitude:response.body.features[0].center[1],
             longitude:response.body.features[0].center[0], 
             location:response.body.features[0].place_name,
          }); 
       }
    })
 
 }


module.exports= geocode;