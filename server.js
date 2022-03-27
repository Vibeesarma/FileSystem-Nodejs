const express = require("express")
const fs = require("fs")


const app = express();

app.get("/",(req,res)=>{
    
    let fileData = "No data";
    
    let date = new Date();
    let hour = (date.getTime()/1000/60/60%24)>10?Math.floor(date.getTime()/1000/60/60%24):`0${Math.floor(date.getTime()/1000/60/60%24)}`
    let min = (date.getTime()/1000/60%60)>10?Math.floor(date.getTime()/1000/60%60):`0${Math.floor(date.getTime()/1000/60%60)}`
    let sec = (date.getTime()/1000%60)>10?Math.floor(date.getTime()/1000%60):`0${Math.floor(date.getTime()/1000%60)}`

    

    try{
        fs.appendFile(`./store/${date.getDate()}_${date.getMonth()}_${date.getFullYear()}.txt`,`${hour}:${min}:${sec}\n`,(err)=>{
            if(err){
                console.log(err);
                return  
            }
            console.log("File Updated");                  
        })

        res.send(`File updated and add time - ${hour}:${min}:${sec}`) 
       res.end();

    }catch(e){

        fs.writeFile(`./store/${date.getDate()}_${date.getMonth()}_${date.getFullYear()}.txt`,`${hour}:${min}:${sec}\n`,(err)=>{
            if(err){
                console.log(err);
                return 
            }           
            console.log("file Created");           
        })

        res.send(`File created and add time - ${hour}:${min}:${sec}`)   
        res.end();
    }
  
})



app.listen(4000,()=>{
    console.log("Server up and Running");
})