let signUp = () => {
    let account = document.getElementById("account").value;
    let password = document.getElementById("pwd").value;
    let rpassword = document.getElementById("rpwd").value;
    let name = document.getElementById("name").value;

    // 之後增加 kafka frontend 需要的
    if(password != rpassword) {
        window.alert("Password 和 Repeat Password 不同");
        return;
    }
    else if(account == "") {
        window.alert("Account 不可為空");
        return;
    }
    else if(password == "") {
        window.alert("Password 不可為空");
        return;
    }
    else if(name == "") {
        window.alert("Name 不可為空");
        return;
    }

    // 之後換成 kafka frontend 註冊 api 的格式
    payload = {
        account: account,
        password: password
    };

    console.log(JSON.stringify(payload));

    // 之後換成 kafka frontend 的 api
    fetch('http://localhost:3000/users/add', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => {
       return res.json();
    }).then(jsonData => {
        console.log(jsonData.uid);
        window.localStorage.setItem("UID", jsonData.uid)
        window.location.href = "mainPage.html";
    }).catch(error => {
        window.alert(error);
    });

}