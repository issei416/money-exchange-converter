
let myHeaders = new Headers();
myHeaders.append("apikey", "DTu7I8ygdE6WzKgAy86ETD46BghoSTYw");

let getrequestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

let to = document.getElementById("to");
let from = document.getElementById("from");
let amount = document.getElementById("amount");


let fromamount = document.getElementById("cfrom");
let camount = document.getElementById("camount");

let symbolurl = "https://api.apilayer.com/exchangerates_data/symbols";

async function getsymbols(url, requestoptions) {
    try {
        let response = await fetch(url, requestoptions);
        let data = await response.json();
        return data;
    }
    catch (error) {
        window.alert("Oops something went wrong: " + error.message);
    }
}
getsymbols(symbolurl,getrequestOptions).then(data => {
    let symbols = data.symbols;
    for(key in symbols){
        let fromoption = document.createElement("option");
        let tooption = document.createElement("option");
        fromoption.value = key;
        fromoption.innerText = key;
        tooption.value = key;
        tooption.innerText = key;
        from.appendChild(fromoption);
        to.appendChild(tooption)
    }
})

let btn = document.getElementById("btn");
btn.addEventListener('click', () => {
    let convertto = to.value;
    console.log(convertto);
    let convertfrom = from.value;
    console.log(convertfrom);
    let convertamount = amount.value;
    console.log(convertamount);
    let url = `https://api.apilayer.com/exchangerates_data/convert?to=${convertto}&from=${convertfrom}&amount=${convertamount}`
    async function convert(url, requestoptions) {
        try {
            let response = await fetch(url, requestoptions);
            let data = await response.json();
            return data;
        }
        catch (error) {
            window.alert("Oops something went wrong: " + error.message);
        }
    }
    convert(url,getrequestOptions).then(data => {
        fromamount.innerText = convertamount
        camount.innerText = Number(data.result).toFixed(2);
    })
})


