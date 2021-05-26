// var searchButton = document.querySelector("#submit");
// searchButton.addEventListener("click", function (event) {
//     event.preventDefault();
//     console.log("button clicked!");
//     fetchApi();
// });

document.getElementById("submit").addEventListener("submit", function(e) {
    e.preventDefault();
    fetchApi();
});

function fetchApi() {

    var fetchOption = $('#dropdown').val();
    var searchWord = $('#input').val();
    var fetchUrl;

    if (fetchOption === "city") {
        fetchUrl = "https://prescriptiontrails.org/api/filter/?by=city&city=" + searchWord + "&offset=0&count=50";

    }
    else if(fetchOption === "zip" && fetchOption.length == 5) {
        fetchUrl = "https://prescriptiontrails.org/api/filter/?zip=" + searchWord + "&by=zip&offset=0&count=50";

    }
    else if(fetchOption === "name") {
        fetchUrl = "https://prescriptiontrails.org/api/filter/?name=" + searchWord + "&by=name&offset=0&count=50";


    }

    console.log(fetchOption + " " + searchWord);
    console.log(fetchUrl);

    // fetch(fetchUrl).then(function(response) {
    //     console.log("fetch!!!");
    //     // request was successful
    //     if (response.ok) {
    //       response.json().then(function(data) {
    //         console.log(data);
    //       });
    //     }
    //     else {
    //       alert("There was a problem with your request!");
    //     }
    // });

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    //   redirect: 'follow',
      mode: 'no-cors'
    };
    
    fetch(fetchUrl, requestOptions)
    .then(function(response) {
        // console.log(response.json);
        return response.json()
    })
    .then(function(data) {
        console.log(data);
        console.log("fetching trails");
    });

};
