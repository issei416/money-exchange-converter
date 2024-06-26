// defining headers for API request
let myHeaders = new Headers();
myHeaders.append("apikey", "OjAa6Lls8qA2pispxt5yvbLdgWrJjqmd");


// request options for API call
let getrequestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

// getting the input elements using DOM
let to = document.getElementById("to");
let from = document.getElementById("from");
let amount = document.getElementById("amount");
let fromamount = document.getElementById("cfrom");
let camount = document.getElementById("camount");

// url to get all available country codes and currency symbols
let symbolurl = "https://api.apilayer.com/exchangerates_data/symbols";

// async function to fetch symbols and codes
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

// appending the symbols as options for input elements after fetching
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

//selecting submit button
let btn = document.getElementById("btn");
btn.addEventListener('click', (e) => { // eventlistener for submit btn on click
    //selecting elements to display the conversion
    let convertto = to.value;
    console.log(convertto);
    let convertfrom = from.value;
    console.log(convertfrom);
    let convertamount = amount.value;
    console.log(convertamount);
    //url to get call conversion API call
    let url = `https://api.apilayer.com/exchangerates_data/convert?to=${convertto}&from=${convertfrom}&amount=${convertamount}`
    //async function to get conversion from the selected inputs
    async function convert(url, requestoptions) {
        try {
            if (convertto == convertfrom) {
                e.preventDefault();
                window.alert("Please select different currency");
                return
            } else {
                let response = await fetch(url, requestoptions);
                let data = await response.json();
                return data;
            }
        }
        catch (error) {
            window.alert("Oops something went wrong: " + error.message);
        }
    }
    //appending the conversion data to the display field
    convert(url,getrequestOptions).then(data => {
        fromamount.innerHTML = `${convertamount} <p class="small">${data.query.from}</p>`
        camount.innerHTML = `${Number(data.result).toFixed(2)} <p class="small">${data.query.to}</p>`;
    })
})


