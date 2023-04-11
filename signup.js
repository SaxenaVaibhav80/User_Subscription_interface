const express= require("express");
const app=express();
const bodyParser=require('body-parser');
const https=require("https")

app.listen(3000);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res)
{
    res.sendFile(__dirname+'/signup.html');
})
app.post('/', function(req,res)
{
    const Firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.mail;
    
    const data = {
        members:[{
        email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME : Firstname,
            LNAME : lastname  }
          }]
        };
    const json_file=JSON.stringify(data)  
    // The JSON.stringify() static method converts a JavaScript value to a JSON string, optionally

    // https.get:- use to get the data from the api of different web app
    // https.request :- use to post the data to the external or api of diffrent server 

    const option={

        method:'POST',
        auth:"vaibhva:318af4b6c28c224190ac41ada6b9cfe0-us21"
    }

    const url='https://us21.api.mailchimp.com/3.0/lists/3e660e5a76';
    const request=https.request(url,option,function(response)
    {
      if(response.statusCode===200)
        {
          res.sendFile(__dirname+"/success.html");
        }
        else{
          res.sendFile(__dirname+"/fail.html");
        }
       response.on("data", function(data)
       {
        console.log(JSON.parse(data));
       })

    })

    request.write(json_file);
    request.end();
})

// 3e660e5a76.   id 
