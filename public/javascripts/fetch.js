var searchButton = document.getElementById("submit");
searchButton.addEventListener("click", fetchApi);

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

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    return fetch(fetchUrl, requestOptions)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
        var test = data[0].name;
        console.log("fetching trails");
        console.log(test)
    });

};
