document.getElementById("submit").addEventListener("submit", function(e) {
    e.preventDefault();
    search();
});

function search() {

    var searchOption = $('#dropdown').val();
    var searchWord = $('#input').val();

    if (searchWord === '') return;
    if (searchOption === "city") {

        document.location.replace('trail/city/' + searchWord);

    }
    else if(searchOption === "name") {
        document.location.replace('trail/name/' + searchWord);
    }
    else {
        document.location.replace('trail/zip/' + searchWord);
    }
    console.log(searchOption + " " + searchWord);
};