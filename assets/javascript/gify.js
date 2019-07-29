// Navigation

function openNav() {
    document.getElementById("gifnav").style.width = "250px";
}

function closeNav() {
    document.getElementById("gifnav").style.width = "0";
}


//Gifs
var garry = ["San Francisco", "Apple", "Google", "Facebook"];

//Displaying movie data
function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < garry.length; i++) {
        createbtn(garry[i]);
    }
}

function createbtn(mName) {
    var b = $("<button>");
    b.attr("class", "bsearch");
    b.text(mName);
    $("#buttons-view").append(b);
}

$(document).on("click", ".bsearch", function () {
    $(gifs).empty();
    var gname = $(this).text();

    // Loading img
    $("#loading").css("display","block");
    setTimeout(() => {
        $("#loading").css("display","none");
    }, 800);
   

    var gifapi =
        "https://api.giphy.com/v1/gifs/search?q=" +
        gname +
        "&api_key=wzyt31vpNEDRJvaCFgiyX1EhWGHvzqI6";

    $.ajax({
        url: gifapi,
        method: "GET"
    }).then(function (gif) {
      
      setTimeout(() => {
        var results = gif.data;

        for (var i = 0; i < gif.data.length; i++) {
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var image = $("<img>");

            image.attr("src", results[i].images.fixed_height_still.url);
            image.attr("data-still", results[i].images.fixed_height_still.url);
            image.attr("data-animate", results[i].images.fixed_height.url);
            image.attr("data-state", "still");
            image.addClass("image");

            $("#gifs").append(p);
            $("#gifs").append(image);
        }
      }, 900);
       
    });
});
 
$("#add-Search").on("click", function () {

    var sn = $("#Search-input").val();

    garry.push(sn);
    createbtn(sn);

    event.preventDefault();
    $("#Search-input").val("");
});

renderButtons();
