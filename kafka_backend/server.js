let connection = new require("./Connection");

let producer = connection.getProducer();

let loginConsumer = connection.getConsumerObj("login_topic");
let signupConsumer = connection.getConsumerObj("signup_topic");

let login = require("./services/login");
let signup = require("./services/signup");

//login
loginConsumer.on("message", function (message) {
  if (message.value == "") {
  } else {
    console.log("message received");
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);
    console.log(data.replyTo);

    login.handle_request(data.data, function (err, res) {
      console.log("after handle");
      let payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log(payloads);
      });
    });
  }
});

//signup
signupConsumer.on("message", function (message) {
  console.log("message received");
  console.log(message);
  console.log(message.value);
  console.log(JSON.stringify(message.value));
  let data = JSON.parse(message.value);

  console.log(data.replyTo);

  signup.handle_request(data.data, function (err, res) {
    console.log("after handle" + res);
    let payloads = [
      {
        topic: data.replyTo,
        messages: JSON.stringify({
          correlationId: data.correlationId,
          data: res,
        }),
        partition: 0,
      },
    ];
    producer.send(payloads, function (err, data) {
      console.log(payloads);
    });
  });
});
