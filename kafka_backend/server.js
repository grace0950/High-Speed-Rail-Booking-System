let connection = new require("./Connection");

let producer = connection.getProducer();

let loginConsumer = connection.getConsumerObj("login_topic");
let signupConsumer = connection.getConsumerObj("signup_topic");
let searchConsumer = connection.getConsumerObj("search_topic");
let orderConsumer = connection.getConsumerObj("order_topic");
let searchOrderConsumer = connection.getConsumerObj("searchOrder_topic");

let login = require("./services/login");
let signup = require("./services/signup");
let search = require("./services/search");
let order = require("./services/order");
let searchOrder = require("./services/searchOrder");

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

//search
searchConsumer.on("message", function (message) {
  console.log("message received");
  console.log(message);
  console.log(message.value);
  console.log(JSON.stringify(message.value));
  let data = JSON.parse(message.value);

  console.log(data.replyTo);

  search.handle_request(data.data, function (err, res) {
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

// order
orderConsumer.on("message", function (message) {
  console.log("message received");
  console.log(message);
  console.log(message.value);
  console.log(JSON.stringify(message.value));
  let data = JSON.parse(message.value);

  console.log(data.replyTo);

  order.handle_request(data.data, function (err, res) {
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

// searchOrder
searchOrderConsumer.on("message", function (message) {
  console.log("message received");
  console.log(message);
  console.log(message.value);
  console.log(JSON.stringify(message.value));
  let data = JSON.parse(message.value);

  console.log(data.replyTo);

  searchOrder.handle_request(data.data, function (err, res) {
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
