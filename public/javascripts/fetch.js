var searchButton = document.querySelector("#submit");
searchButton.addEventListener("click", function () {
    console.log("button clicked!");
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

    fetch(fetchUrl).then(function(response) {
        console.log("fetch!!!");
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            console.log(data);
          });
        }
        else {
          alert("There was a problem with your request!");
        }
    });

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var requestOptions = {
    //   method: 'GET',
    //   headers: myHeaders,
    //   redirect: 'follow'
    // };
    
    // return fetch(fetchUrl, requestOptions)
    // .then(function(response) {
    //   return response.json();
    // })
    // .then(function(data) {
    //     var test = data[0].name;
    //     console.log(data);
    //     console.log("fetching trails");
    //     console.log(test)
    // });

};
