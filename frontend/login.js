let login = () => {
    let username = document.getElementById("user").value;
    let password = document.getElementById("pwd").value;

    // 之後換成 kafka frontend api 的格式
    payload = {
        account: username,
        password: password
    };
    console.log(username);
    console.log(password);
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