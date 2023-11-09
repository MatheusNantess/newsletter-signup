const express = require('express')
const BodyParser = require('body-parser')
const request = require('request')
const bodyParser = require('body-parser')
const https = require('https')

const app = express()
app.use(express.static("./public"))
//allow us to use bodyparser
const apiKey = "c4a16979e818ef1e0c46fd85bb485870-us17"
const idPublic = "8d7722c869"
app.use(bodyParser.urlencoded({extended:true}))

app.listen(3000, function(){
    console.log("Server created on port 3000")
})
app.get("/" , function(req,res){
    res.sendFile(__dirname + "/signup.html")
})
app.post("/failure", function(req,res){
    res.redirect("/")
})

app.post("/", function(req,res){
    const firstName = req.body.firstname
    const lastName = req.body.lastname
    const email = req.body.email
    var data = {
        members: [
            {
                email_address:email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    var jsonData = JSON.stringify(data)
    const url = "https://us17.api.mailchimp.com/3.0/lists/8d7722c869"
    const options = {
        method: "POST",
        auth: "matheus1:c4a16979e818ef1e0c46fd85bb485870-us17"

    }


    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/sucess.html")
        } else{
            res.sendFile(__dirname + "/failure.html")
        }


        response.on("data", function(data){
            console.log(JSON.parse(data))

        })
    })
    request.write(jsonData)
    request.end()
})

