const express=require('express');
const app=express();
const path=require('path');
const hbs=require('hbs');
const request=require('request');
const geocode=require('./utils/geocode');
const getWeather=require('./utils/weather');
const port=process.env.PORT || 3000

const Dir=path.join(__dirname,'../public');

const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')


app.use(express.static(Dir))
app.set('views',viewPath)
hbs.registerPartials(partialPath)
app.set('view engine', 'hbs')

app.get('',(req,res)=>{
    res.render('Index',{
        title:"Index",
        name:"Disheen"
    })
})
app.get('/about',(req,res)=>{
    res.render('About',{
        title:"About",
        name:"Disheen"
    })

})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"Disheen"
    })

})

// app.get('/help',(req,res)=>{
//     res.send('Help Page');
// });
// app.get('/about',(req,res)=>{
//     res.send('<h1>About Page</h1>');
// });
app.get('/weather',(req,res)=>{
    if(!req.query.loc){
        return res.send({
            error:'Please provide the address '
        })
    }
    
    geocode(req.query.loc,((error,data)=>{
        if(error){
            res.send({
                error,
            })
        }
        else{
        //console.log(data.latitude);
        //console.log(data.longitude);
        getWeather('2487956',(error,data2)=>{
            if(error){
                res.send({
                    error
                })
            }
            else{
            res.send({
                location:data.loc,
                temperature:`The temperature is ${data2}`,
                address:req.query.loc
            })
            }
    
        })
    }
    }))
               
});
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404 ',
        message:'Help article not found',
        name:"Disheen"
    });
})    
app.get('/about*',(req,res)=>{
    res.render('error',{
        title:'404 ',
        message:'About article not found',
        name:"Disheen"
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404 ',
        message:'Page not found',
        name:"Disheen"
    })
})
app.listen(port,()=>{
    console.log('Connectig to server');
});

