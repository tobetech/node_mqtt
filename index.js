const express = require('express')
const app = express();
//const QRCode = require('qrcode')
//const generatePayload = require('promptpay-qr')
const bodyParser = require('body-parser')
const _ = require('lodash')
const cors = require('cors')
const mqtt = require("mqtt")
//npmconst nodemon = require('nodemon')
const options = {
    host: 'dd22c773c9024048a17a85821f6e23de.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'tobetech',
    password: 'Energy@2000'
}
const client = mqtt.connect(options)
client.on("connect", async ()=>{
    console.log("mqtt Connected");
    //client.subscribe(topic);
    
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const server = app.listen(3000,()=>{
    console.log('Server is running 3000')
})

app.post('/api',(req,res)=>{
    var Mac = _.get(req,["body","Mac"])
    var action = _.get(req,["body","action"])
    //var action = parseInt(_.get(req,["body","action"]))
    console.log(Mac)
    console.log(action)
    client.subscribe(Mac);
    client.publish(Mac, action);

    res.send('o.k.')
})

module.exports = app