let keyLogin = () => {
    if (event.keyCode==13){ //enter的鍵值為13
        document.getElementById("btn").click();
    }
}

let login = () => {
    let account = document.getElementById("account");
    let password = document.getElementById("pwd");
    let btn = document.getElementById("btn");

    // 之後增加 kafka frontend 需要的
    if(account.value == "") {
        window.alert("Account 不可為空");
        return;
    }
    else if(password.value == "") {
        window.alert("Password 不可為空");
        return;
    }

    account.disabled = true;
    password.disabled = true;
    btn.disabled = true;

    // 之後換成 kafka frontend api 的格式
    payload = {
        account: account.value,
        password: password.value
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
        account.disabled = false;
        password.disabled = false;
        btn.disabled = false;
    });

}