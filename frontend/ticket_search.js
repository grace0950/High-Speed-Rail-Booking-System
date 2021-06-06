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

  let res = await fetch("http://localhost:3000/users/search", {
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
  console.log(res);
  if (Status === 200 || Status === 201) {
    show_ticket(res);
  } else if (Status === 400) window.alert(res.json().message);
  else window.alert("Filter Failed");
};
function show_ticket(response) {
  var data = JSON.parse(response);

  data.forEach((info) => {
    console.log(info.original_title);

    const card = document.createElement("div");

    card.setAttribute("class", "card");

    //set the content
    const h1 = document.createElement("h1");
    //h1.textContent = info.original_title
    h1.textContent = info.year + "/" + info.month + "/" + info.day;
    const h2 = document.createElement("h2");
    //h2.textContent = info.running_time
    h2.textContent = info.start + "->" + info.destination;
    const h3 = document.createElement("h3");
    h3.textContent = info.train_no + " " + info.price;
    const p = document.createElement("p");
    //p.textContent = info.description
    p.textContent =
      info.start_hour +
      ":" +
      info.start_minute +
      "->" +
      info.end_hour +
      ":" +
      info.end_minute;

    card.appendChild(h1);
    card.appendChild(h2);
    card.appendChild(h3);
    card.appendChild(p);
    container.appendChild(card);

    card.onclick = function () {
      window.sessionStorage.setItem("ordering_num", h2.textContent);
      window.location.href = "ordering.html";
      window.alert("Yeah");
      console.log("success");
    };
  });
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
