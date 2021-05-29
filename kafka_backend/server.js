let connection = new require("./Connection");

let producer = connection.getProducer();

let loginConsumer = connection.getConsumerObj("login_topic");

let login = require("./services/login");

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
        // console.log(data);
        console.log(payloads);
      });
      //return;
    });
  }
});
