let keySignup = () => {
    if (event.keyCode==13){ //enter的鍵值為13
        document.getElementById("btn").click();
    }
}

let lock_all_btn = () => {
    let btn = document.getElementById("btn");
    let account = document.getElementById("account");
    let password = document.getElementById("pwd");
    let rpassword = document.getElementById("rpwd");
    let name = document.getElementById("name");
    btn.disabled = true;
    account.disabled = true;
    password.disabled = true;
    rpassword.disabled = true;
    name.disabled = true;
}

let unlock_all_btn = () => {
    let btn = document.getElementById("btn");
    let account = document.getElementById("account");
    let password = document.getElementById("pwd");
    let rpassword = document.getElementById("rpwd");
    let name = document.getElementById("name");
    btn.disabled = false;
    account.disabled = false;
    password.disabled = false;
    rpassword.disabled = false;
    name.disabled = false;
}

let signup = async() => {
    let account = document.getElementById("account");
    let password = document.getElementById("pwd");
    let rpassword = document.getElementById("rpwd");
    let name = document.getElementById("name");

    // 之後增加 kafka frontend 需要的
    if(password.value != rpassword.value) {
        window.alert("Password 和 Repeat Password 不同");
        return;
    }
    else if(account.value == "") {
        window.alert("Account 不可為空");
        return;
    }
    else if(password.value == "") {
        window.alert("Password 不可為空");
        return;
    }
    else if(name.value == "") {
        window.alert("Name 不可為空");
        return;
    }
    lock_all_btn();

    // 之後換成 kafka frontend 註冊 api 的格式
    payload = {
        username: account.value,
        password: password.value,
        Name: name.value
    };

    let Status = 0;
    let Message = '';
    // 之後換成 kafka frontend 的 api
    await fetch('http://localhost:3000/users/signup', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => {
        Status = res.status;
        return res.json();
    }).then(jsonData => {
        Message = jsonData.message;
    }).catch(error => {
        Message = "Something Wrong";
        unlock_all_btn();
    });

    if(Status === 200 || Status === 201) {
        window.localStorage.setItem("UID", Message);
        window.location.href = "mainPage.html";
    }
    else {
        window.alert(Message);
    }
    unlock_all_btn();

    // fetch('http://localhost:3000/users/add', {
    //     method: "POST",
    //     headers: {
    //         "Content-type": "application/json"
    //     },
    //     body: JSON.stringify(payload)
    // }).then(res => {
    //    return res.json();
    // }).then(jsonData => {
    //     console.log(jsonData.uid);
    //     window.localStorage.setItem("UID", jsonData.uid)
    //     window.location.href = "mainPage.html";
    // }).catch(error => {
    //     window.alert(error);
    //     btn.disabled = false;
    //     account.disabled = false;
    //     password.disabled = false;
    //     rpassword.disabled = false;
    //     name.disabled = false;
    // });

}