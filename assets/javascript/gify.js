// Navigation
function openNav() {
  document.getElementById("gifnav").style.width = "250px";
}

function closeNav() {
  document.getElementById("gifnav").style.width = "0";
}

//Onload page first buttons
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

$(document).on("click", ".bsearch", function() {
  $(gifs).empty();
  var gname = $(this).text();

  // Loading img
  $("#loading").css("display", "block");
  setTimeout(() => {
    $("#loading").css("display", "none");
  }, 900);

  // Api link
  var gifapi =
    "https://api.giphy.com/v1/gifs/search?q=" +
    gname +
    "&api_key=wzyt31vpNEDRJvaCFgiyX1EhWGHvzqI6";

  $.ajax({
    url: gifapi,
    method: "GET"
  }).then(function(gif) {
    setTimeout(() => {
      var results = gif.data;

      for (var i = 0; i < gif.data.length; i++) {
        var rating = results[i].rating;
        var rating2 = results[i].import_datetime;
        // Creating 2 information
        var p = $("<p>").text("Rating: " + rating);
        var p2 = $("<p>").text("Import Date: " + rating2);
        // Creating Images
        var image = $("<img>");

        image.attr("src", results[i].images.fixed_height_still.url);
        image.attr("data-still", results[i].images.fixed_height_still.url);
        image.attr("data-animate", results[i].images.fixed_height.url);
        image.attr("data-state", "still");
        image.addClass("image");

        $("#gifs").append(p, p2);
        $("#gifs").append(image);
      }
    }, 900);
  });
});

$("#add-Search").on("click", function() {
  var sn = $("#Search-input").val();
  if (sn == "") {
    alert("Please fill out search text.");
  } else {
    garry.push(sn);
    createbtn(sn);

    event.preventDefault();
    $("#Search-input").val("");
  }
});

// Images animation start click
$(document).on("click", ".image", function() {
  var ds = $(this).attr("data-state");

  if (ds == "still") {
    $(this).attr("src", $(this).data("animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
  }
});

//Displaying movie data
renderButtons();
