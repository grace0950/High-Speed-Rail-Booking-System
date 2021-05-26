window.onload = () => {
    // 之後 name 換成 api
    // 看還有沒有要加的
    const name = window.localStorage.getItem("UID");
    document.getElementById("name").innerHTML = "姓名: "+name;
}

let back = () => {
    window.location.href = "mainPage.html";
}