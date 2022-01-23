const express = require('express');
const app = express();
const path = require('path');
const list = require('./list');
const months = ['Jan','Feb','March','Apr','May','June','July','August','sept','oct','Nov','Dec'];
const monthDay = {
    1:31,
    2:28,
    3:31,
    4:30,
    5:31,
    6:30,
    7:31,
    8:31,
    9:30,
    10:31,
    11:30,
    12:31
}


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    const events = list.loadFile();
    const monthlyEvent = [];
    for(let event of events){
        const {username,eventname,eventtime} = event;
        let eventMonth = eventtime.split('/')[1];
       
        if(parseInt(eventMonth) === 1){
            
            monthlyEvent.push({
                username:username,
                eventname:eventname,
                eventtime:eventtime
            })
               
        }
    }
    res.render("home",{days:31,month:1,year:2022,months:months,monthlyEvent:monthlyEvent});
})
app.get('/:date/:month/:year/:eventSize',(req,res)=>{
   const {date,month,year,eventSize} = req.params;
   if(eventSize==0){
       return res.redirect('/');
   }
   let evtDate = date+'/'+month+'/'+year;
   const value = list.loadFile();
   const eventNamer = value.filter((result)=> (result.eventtime==evtDate));
   res.send(eventNamer);

})

app.get('/select',(req,res)=>{

    const {month, year} = req.query;
    
    const events = list.loadFile();
    const monthlyEvent = [];
    for(let event of events){
        const {username,eventname,eventtime} = event;
        let eventMonth = eventtime.split('/')[1];
       
        if(parseInt(eventMonth) === parseInt(month)){
            
            monthlyEvent.push({
                username:username,
                eventname:eventname,
                eventtime:eventtime
            })
        }
    }
    res.render("home",{days:monthDay[month],month:month,year:year,months:months,monthlyEvent:monthlyEvent});
})

app.listen(3000);