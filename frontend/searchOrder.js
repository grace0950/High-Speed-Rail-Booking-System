window.onload = () => {
  // 之後 name 換成 api
  // 沒登入會跳掉
  if (window.localStorage.getItem("UID") === null) {
    window.localStorage.clear();
    window.location.href = "logIn.html";
    return;
  }
  Filter();
  // Filter();
};

let back = () => {
  window.location.href = "mainPage.html";
};

let Filter = async () => {
  const name = window.localStorage.getItem("UID");
  payload = {
    username: name,
  };
  let res = await fetch("http://localhost:3000/search_order/searchOrder", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      Status = res.status;
      console.log(Status);
      return res.json();
    })
    .catch((error) => {
      window.alert(error);
    });
  // console.log(Status);
  // console.log(res);

  if (Status === 200 || Status === 201) {
    show_ticket(res);
  } else if (Status === 400) window.alert(res.message);
  else window.alert("Filter Failed");
};

function show_ticket(info) {
  let i = 0;
  for (i = 0; i < info.year.length; i++) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    //set the content
    const h1 = document.createElement("h1");
    //h1.textContent = info.original_title
    h1.textContent = info.year[i] + "/" + info.month[i] + "/" + info.day[i];
    const h2 = document.createElement("h2");
    //h2.textContent = info.running_time
    h2.textContent = info.start[i] + "->" + info.destination[i];
    const h3 = document.createElement("h3");
    h3.textContent = info.train_no[i] + " " + info.price[i];
    const p = document.createElement("p");
    //p.textContent = info.description
    p.textContent =
      info.start_hour[i] +
      ":" +
      info.start_minute[i] +
      "->" +
      info.end_hour[i] +
      ":" +
      info.end_minute[i];

    card.appendChild(h1);
    card.appendChild(h2);
    card.appendChild(h3);
    card.appendChild(p);
    container.appendChild(card);
    console.log(card);

    card.onclick = function () {
      window.sessionStorage.setItem("ordering_num", h3.textContent);
      window.alert("訂單無法刪除");
    };
  }
}

const app = document.getElementById("root");
const container = document.createElement("div");

container.setAttribute("class", "container");

app.appendChild(container);
