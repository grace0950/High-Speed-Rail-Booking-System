window.onload = () => {
    // 之後 name 換成 api
    // 看還有沒有要加的
    if(window.localStorage.getItem("UID") === null) {
        window.localStorage.clear();
        window.location.href = "logIn.html";
    }
    const username = window.localStorage.getItem("UID");
    document.getElementById("username").innerHTML = "帳號: " + username;
    document.getElementById("name").innerHTML = "姓名: " + "Name";
}

let back = () => {
    window.location.href = "mainPage.html";
}