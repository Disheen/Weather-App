const request=require('request')
const getWeather=(woeid,callback)=>{
    const url_w=`https://www.metaweather.com/api/location/${woeid}/`;
    //console.log(lat,lon)
    
    request({url:url_w,json:true},(error,response)=>{
        let err
        if(error){
            console.log('Unable to  connect to waether service')
            err='Unable to  connect to waether service'
        }
        else if(!response.body.consolidated_weather){
            err='Unable to find location'
            callback(err,undefined);
        }
        else{
    
             const data=response.body.consolidated_weather[0];
             callback(undefined,data.the_temp);
        }
    })
}
module.exports=getWeather