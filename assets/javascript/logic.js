var comedies = ["Brooklyn 99", "Parks and Recreation", "The Simpsons", "30 Rock", "The Office", "New Girl", "The Big Bang Theory"]

function displayComedyGifs (){
    $(".comedyGif").empty();

    var comedyName = $(this).attr("data-name");
    var comedy = comedyName.trim().split(" ").join("+")
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + comedy + "&api_key=Hn36qDAbkGH4Lcui5Bgln8LZXZDgEtAu&limit=10&rating=g"

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        var gifsArray = response.data;
        console.log(gifsArray);

        for (var i = 0; i < gifsArray.length; i++) {

            var newDiv = $("<div>");
            var image = $("<img>");
            var cardText = $("<p>");
    
            newDiv.addClass("comedyGif col-sm-3");

            var rating = gifsArray[i].rating;
            var imageLinkStill = gifsArray[i].images.fixed_width_still.url;
            var imageLinkAnimate = gifsArray[i].images.fixed_width.url;

            cardText.text("Rating: " + rating);
            cardText.addClass("rating-label")
            image.attr("src", imageLinkStill);
            image.attr("data-still", imageLinkStill);
            image.attr("data-animate", imageLinkAnimate);
            image.attr("data-state", "still");
            image.addClass("giffy");

            newDiv.append(image);
            newDiv.append(cardText);
    
            $(".gifs").append(newDiv);

        }

    });

};

function renderButtons (){
    $("#add-buttons").empty();

    for (var i = 0; i < comedies.length; i++) {

        var a = $("<button>");
        a.addClass("btn btn-secondary m-1 comedy");
        a.attr("data-name", comedies[i]);
        a.text(comedies[i]);
        $("#add-buttons").append(a);
    };

}; 

$(document).on("click", ".comedy", displayComedyGifs);

$("#add-comedy").on("click", function(event) {
    event.preventDefault();

    var newComedy = $("#comedy-input").val();

    comedies.push(newComedy);

    console.log(comedies)

    renderButtons();

});

$(document).on("click", ".giffy", function (event){
    event.preventDefault();

    var state = $(this).attr("data-state");

    if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate")
    }

    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});

renderButtons();