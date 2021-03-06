let keyLogin = () => {
  if (event.keyCode == 13) {
    //enter的鍵值為13
    document.getElementById("btn").click();
  }
};

let lock_all_btn = () => {
  let account = document.getElementById("account");
  let password = document.getElementById("pwd");
  let btn = document.getElementById("btn");
  account.disabled = true;
  password.disabled = true;
  btn.disabled = true;
};

let unlock_all_btn = () => {
  let account = document.getElementById("account");
  let password = document.getElementById("pwd");
  let btn = document.getElementById("btn");
  account.disabled = false;
  password.disabled = false;
  btn.disabled = false;
};

let login = async () => {
  let account = document.getElementById("account");
  let password = document.getElementById("pwd");

  // 之後增加 kafka frontend 需要的
  if (account.value == "") {
    window.alert("Account 不可為空");
    return;
  } else if (password.value == "") {
    window.alert("Password 不可為空");
    return;
  }
  lock_all_btn();

  // 之後換成 kafka frontend api 的格式
  payload = {
    username: account.value,
    password: password.value,
  };

  let Status = 0;
  let Message = "";
  // 之後換成 kafka frontend 的 api
  let res = await fetch("http://localhost:3000/users/login", {
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
      Message = "Something Wrong";
      unlock_all_btn();
    });

  // console.log(res);
  if (Status === 200 || Status === 201) {
    // console.log(result);
    window.localStorage.setItem("UID", res.username);
    window.localStorage.setItem("name", res.name);
    window.location.href = "mainPage.html";
  } else {
    window.alert(res.message);
  }
  unlock_all_btn();

  // fetch('http://localhost:3000/login', {
  //     method: "POST",
  //     headers: {
  //         "Content-type": "application/json"
  //     },
  //     body: JSON.stringify(payload)
  // })
  // .then(res => {
  //     window.alert(res.status);
  //     return res.json();
  // }).then(jsonData => {
  //     console.log(jsonData.uid);
  //     window.localStorage.setItem("UID", jsonData.uid)
  //     window.location.href = "mainPage.html";
  // }).catch(error => {
  //     window.alert(error);
  //     account.disabled = false;
  //     password.disabled = false;
  //     btn.disabled = false;
  // });
};
