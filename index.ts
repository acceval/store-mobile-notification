
const express = require('express');
const app = express();
const port = 3000

app.use(express.json());



var admin = require("firebase-admin");

var serviceAccount = require("/Users/jameelshamar/AndroidStudioProjects/NodeJS Server/smart-tradzt-mobile-firebase-adminsdk-4yv1z-607007f3e5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smart-tradzt-mobile.firebaseio.com"
});

const fcm = admin.messaging();

 app.post('/sendToDevice',(req, res) => {

    var token = req.body.token;
    var title = req.body.title;
    var body = req.body.body;
    var message = req.body.message;

    console.log(`user with token sent ::: ${token}`)

    const payload = {
      notification: { title: title, body: body, icon: 'your-icon-url',sound : "default", vibrate : "true"},
        data: { click_action: 'FLUTTER_NOTIFICATION_CLICK', message: message}
      
    };


    fcm.sendToDevice([token], payload);


    res.send(token)
  });

  app.post('/sendToTopic',(req, res) => {

    var title = req.body.title;
    var body = req.body.body;
    var message = req.body.message;
    var topic = req.body.topic;

    console.log(`Sent To user of ${topic}`)

    const payload = {
      notification: { title: title, body: body, icon: 'your-icon-url',sound : "default", vibrate : "true"},
        data: { click_action: 'FLUTTER_NOTIFICATION_CLICK', message: message}
      
    };


    fcm.sendToTopic(topic, payload)

    res.send(topic)
  });


  app.listen(port, () => {
    console.log(`Notification server listening at http://localhost:${port}`)
  })



  