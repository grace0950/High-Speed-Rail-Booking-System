var username = window.localStorage.getItem('UID')
if(username == null){
    username = '0000'
}
document.getElementById("username").innerHTML = username;

var date = '0000'

if((window.sessionStorage.getItem('year')!=null)&&(window.sessionStorage.getItem('month')!=null)&&(window.sessionStorage.getItem('day')!=null)){
    date = window.sessionStorage.getItem('year') + " / "+window.sessionStorage.getItem('month') +" / "+window.sessionStorage.getItem('day')
}

document.getElementById("date").innerHTML = date;

var position = '0000'

if((window.sessionStorage.getItem('start')!=null)&&(window.sessionStorage.getItem('destination')!=null)){
    position = window.sessionStorage.getItem('start') + " -> "+window.sessionStorage.getItem('destination')
}

document.getElementById("position").innerHTML = position;

var train_no = '0000'

if((window.sessionStorage.getItem('train_no')!=null)){
    position = window.sessionStorage.getItem('train_no')
}

document.getElementById("train_no").innerHTML = train_no;

var price = '0000'

if((window.sessionStorage.getItem('price')!=null)){
    position = window.sessionStorage.getItem('price')
}

document.getElementById("price").innerHTML = price;

var time = '0000'

if((window.sessionStorage.getItem('start_hour')!=null)&&(window.sessionStorage.getItem('start_minute')!=null)){
    if((window.sessionStorage.getItem('end_hour')!=null)&&(window.sessionStorage.getItem('end_minute')!=null)){
        time = window.sessionStorage.getItem('start_hour')+" : "+window.sessionStorage.getItem('start_minute')+" -> "+window.sessionStorage.getItem('end_hour')+" : "+window.sessionStorage.getItem('end_minute')
    }
}

document.getElementById("time").innerHTML = time;

let order = async() => {

    let year = window.sessionStorage.getItem('year');
    let month = window.sessionStorage.getItem('month');
    let day = window.sessionStorage.getItem('day');
    let start = window.sessionStorage.getItem('start');
    let destination = window.sessionStorage.getItem('destination');
    let train_no = window.sessionStorage.getItem('train_no');
    let price = window.sessionStorage.getItem('price');
    let start_hour = window.sessionStorage.getItem('start_hour');
    let start_minute = window.sessionStorage.getItem('start_minute');
    let end_hour = window.sessionStorage.getItem('end_hour');
    let end_minute = window.sessionStorage.getItem('end_minute');
    let username = window.localStorage.getItem('UID');

    payload = {
        year : year.value,
        month : month.value,
        day: day.value,
        start: start.value,
        destination: destination.value,
        train_no : train_no.value,
        price : price.value,
        start_hour : start_hour.value,
        start_minute : start_minute.value,
        end_hour : end_hour.value,
        end_minute : end_minute.value,
        username : username.value
    };
    let res = await fetch('http://localhost:3000/users/order', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).catch(error => {
        window.alert(error);
    });

    if(res.status === 200 || res.status === 201) {
        window.alert("success!");
        window.location.href = "mainPage.html";
    }
    else if(res.status === 400) window.alert(res.json().message);
    else window.alert("order Failed");
}