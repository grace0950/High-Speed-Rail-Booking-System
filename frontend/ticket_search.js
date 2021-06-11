function Return(){
  window.location.href = "mainPage.html"
}
let Filter = async () => {
  let year = document.getElementById("year");
  let month = document.getElementById("month");
  let day = document.getElementById("day");
  let start = document.getElementById("start_station");
  let destination = document.getElementById("destination_station");

  if (year == "") {
    year.value = 2021;
  } else if (month == "") {
    month.value = 6;
  } else if (day == "") {
    day.value = 21;
  }
  if (year.value != 2021) {
    window.alert("error");
  } else if (month.value != 6) {
    window.alert("error");
  } else if (day.value > 27 || day.value < 21) {
    window.alert("error");
  }

  payload = {
    year: year.value,
    month: month.value,
    day: day.value,
    start: start.value,
    destination: destination.value,
  };
  let res = await fetch("http://localhost:3000/search_order/search", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      Status = res.status;
      return res.json();
    })
    .catch((error) => {
      window.alert(error);
    });
  // console.log(Status);
  // console.log(res);
  if (Status === 200 || Status === 201) {
    show_ticket(res, start.value, destination.value);
  } else if (Status === 400) window.alert(res.message);
  else window.alert("Filter Failed");
};
function show_ticket(info, start, destination) {
  let i = 0;
  for (i = 0; i < info.year.length; i++) {
    let year =  info.year[i];
    let month = info.month[i];
    let day = info.day[i];
    let start = info.start[i];
    let destination = info.destination[i];
    let train_no = info.train_no[i];
    let price = info.price[i];
    let start_hour = info.start_hour[i];
    let start_minute = info.start_minute[i]
    let end_hour = info.end_hour[i];
    let end_minute = info.end_minute[i];

    const card = document.createElement("div");

    card.setAttribute("class", "card");

    //set the content
    const h1 = document.createElement("p");
    //h1.textContent = info.original_title
    h1.textContent = info.year[i] + "/" + info.month[i] + "/" + info.day[i];
    const h2 = document.createElement("h1");
    //h2.textContent = info.running_time
    h2.textContent = start + "->" + destination;
    const p = document.createElement("h2");
    p.textContent =
      info.start_hour[i] +
      ":" +
      info.start_minute[i] +
      "->" +
      info.end_hour[i] +
      ":" +
      info.end_minute[i];
    const h3 = document.createElement("h3");
    h3.textContent = "車次： "+info.train_no[i] + " 價錢： " + info.price[i];

    card.appendChild(h1);
    card.appendChild(h2);
    card.appendChild(h3);
    card.appendChild(p);
    container.appendChild(card);

    card.onclick = function () {
      window.localStorage.setItem("year", year);
      window.localStorage.setItem("month", month);
      window.localStorage.setItem("day", day);
      window.localStorage.setItem("start", start);
      window.localStorage.setItem("destination", destination);
      window.localStorage.setItem("train_no", train_no);
      window.localStorage.setItem("price", price);
      window.localStorage.setItem("start_hour", start_hour);
      window.localStorage.setItem("start_minute", start_minute);
      window.localStorage.setItem("end_hour", end_hour);
      window.localStorage.setItem("end_minute", end_minute);
      window.location.href = "ordering.html";
      window.alert("Yeah");
      console.log("success");
    };
  }
}
const app = document.getElementById("root");
const container = document.createElement("div");

container.setAttribute("class", "container");

app.appendChild(container);

// var request = new XMLHttpRequest()

// //kafka api???
// var url = "https://ghibliapi.herokuapp.com/films"

// request.open('GET',url)

//     request.onload = function(){//當request成功，就執行
//         show_ticket(this.response)
//     }
// request.send()
