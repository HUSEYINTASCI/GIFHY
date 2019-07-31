// Navigation
function openNav() {
  document.getElementById("gifnav").style.width = "250px";
}

function closeNav() {
  document.getElementById("gifnav").style.width = "0";
}

// Scroll up image  ---------------------------------------------------------------
$(window).scroll(function() {
  var topPos = $(this).scrollTop();
  if (topPos > 10) {
    $("#upbtn").css("opacity", "1");
  } else {
    $("#upbtn").css("opacity", "0");
  }
});
// Click up
$("#upbtn").on("click", function() {
  $(document).scrollTop(0);
});
//-----------------------------------------------------------------------------------

//Onload page first buttons
var garry = ["San Francisco", "Apple", "Google", "Facebook"];

//Displaying movie data
function renderButtons() {
  $("#buttons-view").empty();

  for (var i = 0; i < garry.length; i++) {
    createbtn(garry[i]);
  }
}
// Cread button
function createbtn(mName) {
  var b = $("<button>");
  b.attr("class", "bsearch");
  b.text(mName);
  $("#buttons-view").append(b);
}
var limit = 10;
var gname;

// Add more button
$(document).on("click", "#limit", function() {
  limit = limit + 10;
  $(gifs).empty();
  gname = $("h1").text();
  show();
});

// Show function created gifs
function show() {
  // Loading img
  $("#loading").css("display", "block");
  setTimeout(() => {
    $("#loading").css("display", "none");
  }, 900);

  // Api link
  var gifapi =
    "https://api.giphy.com/v1/gifs/search?q=" +
    gname +
    "&api_key=wzyt31vpNEDRJvaCFgiyX1EhWGHvzqI6&limit=" +
    limit;

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
        //Total Results
        $("#total").text("Total Results= " + gif.pagination.count);
        // Creating Images
        var image = $("<img>");

        image.attr("src", results[i].images.fixed_height_still.url);
        image.attr("data-still", results[i].images.fixed_height_still.url);
        image.attr("data-animate", results[i].images.fixed_height.url);
        image.attr("data-state", "still");
        image.addClass("image");

        $("#gifs").append(p, p2);
        $("#gifs").append(image);
        $("#btnname").text(gname);
        $("#limit").css("opacity", "1");
        closeNav();
      }
    }, 900);
  });
}

//  After created button search
$(document).on("click", ".bsearch", function() {
  var btnname = $(this).text();
  $("h1").text(btnname);
  $(gifs).empty();
  gname = btnname;
  show();
});

// Creating new button
$("#add-Search").on("click", function() {
  // refresh var limit
  limit = 10;
  var sn = $("#Search-input").val();
  if (sn == "") {
    alert("Please fill out search text.");
    e.event.preventDefault();
  } else {
    if ($.inArray(sn, garry) !== -1) {
      alert("You Already have it");
      $("#Search-input").val("");
    } else {
      garry.push(sn);
      createbtn(sn);
      $("#Search-input").val("");
    }
  }
});

//Search if press enter
$("#Search-input").on("keydown", function(e) {
  var key = e.which;
  switch (key) {
    case 13:
      $("#add-Search").click();
      break;
    default:
      break;
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
