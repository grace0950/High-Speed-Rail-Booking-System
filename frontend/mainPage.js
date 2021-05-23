window.onload = () => {
    // 之後 name 換成 api
    const name = window.localStorage.getItem("UID");
    document.getElementById("header").innerHTML = "歡迎"+name
}