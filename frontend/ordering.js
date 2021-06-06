var result = '0000'
if(window.sessionStorage.getItem('ordering_num')!=null){
    result = window.sessionStorage.getItem('ordering_num')
}

document.getElementById("ordering_num").innerHTML = result;

let order = async() => {
    let ordering_num = document.getElementById("ordering_num");
    let name = document.getElementById("name");
    let mail = document.getElementById("e-mail");
    let cellphone = document.getElementById("cellphone");
    let account = document.getElementById("account");

    payload = {
        ordering_num: ordering_num.value,
        name: name.value,
        mail: mail.value,
        cellphone: cellphone.value,
        account: account.value
    };
    let res = await fetch('http://localhost:3000/order', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).catch(error => {
        window.alert(error);
    });

    if(res.status === 200 || res.status === 201) {
       // window.location.href = "mainPage.html";
    }
    else if(res.status === 400) window.alert(res.json().message);
    else window.alert("order Failed");
}