window.onload = () => {
  // 之後 name 換成 api
  // 看還有沒有要加的
  if (window.localStorage.getItem("UID") === null) {
    window.localStorage.clear();
    window.location.href = "logIn.html";
  }
  const username = window.localStorage.getItem("UID");
  const name = window.localStorage.getItem("name");
  document.getElementById("username").innerHTML = username;
  document.getElementById("name").innerHTML = name;
};

let back = () => {
  window.location.href = "mainPage.html";
};
