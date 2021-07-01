const admin = require("firebase-admin");
const express = require("express")
const serviceAccount = require("./serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express()
app.use(express.json())

app.get('/api/notification', (req, res) => {
    const registrationToken = "fwWmRGlv_0depw9Q7teLeo:APA91bFe_iWyVQyAdBjB2jOElZAAB5Ujt7ebhaGM2ClsveZZumudAGW4q_a1OsbkvW6QsdluNd1QaINVxq0hPpTxyQurgYNinuYWLSQceYXqSNjRW0VeJPYPsQsE5Zoc-R1_EeQSMUuu";
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };
    const topic = "test";

    const payload = {
        notification: {
          title: "test",
          body: "This is a test notification from server"
        }
    };
    
    admin.messaging().sendToDevice(registrationToken, payload, options)
  .then(response => {
      console.log("Successfully sent message:", response);
      res.send(response)
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });

    // send to a topic  without token
    // admin.messaging().sendToTopic(topic, payload)
    //     .then(function (response) {
    //         console.log("Successfully sent message:", response);
    //     })
    //     .catch( error => {
    //         console.log("Error sending message:", error);
    //     });

})


app.listen(5000, () => console.log('server is running '))