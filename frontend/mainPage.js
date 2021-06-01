window.onload = () => {
    // 之後 name 換成 api
    // 沒登入會跳掉
    if(window.localStorage.getItem("UID") === null) {
        window.localStorage.clear();
        window.location.href = "logIn.html";
    }
    const name = window.localStorage.getItem("UID");
    document.getElementById("header").innerHTML = "歡迎"+name
}

let toUserData = () => {
    window.location.href = "userData.html";
}

let logOut = async() => {
    let btn = document.getElementById("btn");
    btn.disabled = true;

    // payload = {
    //     username: account.value,
    //     password: password.value
    // };

    // // 之後換成 kafka frontend 的 api
    // await fetch('http://localhost:3000/logout', {
    //     method: "POST",
    //     headers: {
    //         "Content-type": "application/json"
    //     },
    //     body: JSON.stringify(payload)
    // }).then(res => {
    //     Status = res.status;
    //     return res.json();
    // }).then(jsonData => {
    //     Message = jsonData.message;
    // }).catch(error => {
    //     Message = "Something Wrong";
    //     unlock_all_btn();
    // });

    window.localStorage.clear();
    window.location.href = "logIn.html";
}