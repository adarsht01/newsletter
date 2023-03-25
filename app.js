//jshint esversion:6
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const request=require("request");
app.use(express.static("public"));
const https=require("https");


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    const firstName=req.body.firstname;
    const lastName=req.body.lastname;
    const emailid=req.body.emailid;
    
    const data={
        members:[
            {
                email_address:emailid,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const url="https://us10.api.mailchimp.com/3.0/lists/ed061e1f6c";
    const options={
        method:"POST",
        auth:"adarsh:5fccea2147e0b4220e572f443c0e41a1-us10"
    }

    const request=https.request(url,options,function(response){

        if(response.statusCode==200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function(data){
          console.log(JSON.parse(data));  
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});




app.listen(process.env.PORT||3000,function(){
    console.log("server is running on port 3000");
});



//5fccea2147e0b4220e572f443c0e41a1-us10
//ed061e1f6c