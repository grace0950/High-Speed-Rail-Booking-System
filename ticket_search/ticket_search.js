
function APItry(){
    const name = 'xxx';
    const  age = 18;

    const url = 'https://script.google.com/macros/s/AKfycbw5PnzwybI_VoZaHz65TpA5DYuLkxIF-HUGjJ6jRTOje0E6bVo/exec?name='+name+'&age='+age;

    //document.getElementById("try").innerHTML = "hi";
    fetch (url,{method : 'GET'}).then(res =>{
       // console.log(res.text());
        return res.text();
    }).then(result =>{
      //  console.log(result);
        document.getElementById("try").innerHTML = result;
    });
}
function open(){
    window.location.href='../ordering/ordering.html';
}
    const app = document.getElementById("root")
    const container = document.createElement('div')

    container.setAttribute('class','container')

    app.appendChild(container)

    var request = new XMLHttpRequest()
    var url = "https://ghibliapi.herokuapp.com/films"

    request.open('GET',url)

        request.onload = function(){
            var data = JSON.parse(this.response)

            data.forEach(movie => {
                console.log(movie.original_title)

                const card = document.createElement('div')
                card.setAttribute('class','card')

                const h1 = document.createElement('h1')
                h1.textContent = movie.original_title

                const p = document.createElement('p')
               // movie.description = movie.description.substring(0,300)
                p.textContent = movie.description

                container.appendChild(card)

                card.appendChild(h1)
                card.appendChild(p)

            })
        } 
    request.send()

