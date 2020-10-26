const request=require('request')


const geocode=(location,callback)=>{

    const url2=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiZGlzaGVlbiIsImEiOiJja2dkaGlxb2cwZXJrMnRzMTQ5NWdmbGdpIn0.DIi5grnuB3CbVFWLoOUJFg`
request({url:url2,json:true},(error,response)=>{
    let err=undefined
    if(error){
        console.log('Unable to  connect to weather service')
        err='Unable to  connect to weather service'
        callback(err,undefined)
    }
    else if(!response.body.features[0]){
            err='Unable to find this location'
           callback(err,undefined)
        
    }
    else{
    const data2=response;
    const data={
        latitude:response.body.features[0].center[1],
        longitude:response.body.features[0].center[0],
        loc:response.body.features[0].place_name,
            };
            //console.log(data.latitude)
    
    callback(undefined,data)
     }
     
})
}
  

module.exports=geocode;