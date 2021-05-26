window.onload = () => {
    // 之後 name 換成 api
    const name = window.localStorage.getItem("UID");
    document.getElementById("header").innerHTML = "歡迎"+name
}

let toUserData = () => {
    window.location.href = "userData.html";
}

let logOut = () => {
    let btn = document.getElementById("btn");
    btn.disabled = true;

    // 之後換成 kafka frontend 的 api
    fetch('http://localhost:3000/users/add', {
        method: "GET",
    }).then(res => {
        return res.json();
    }).then(jsonData => {
        console.log(jsonData.uid);
        window.localStorage.setItem("UID", jsonData.uid)
        window.location.href = "logIn.html";
    }).catch(error => {
        window.alert("無法登出");
        btn.disabled = false;
    });

}