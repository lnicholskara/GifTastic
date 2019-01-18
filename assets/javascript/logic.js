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
    
            newDiv.addClass("card comedyGif col-sm-3");
            image.addClass("card-img-top");
            cardText.addClass("card-text");

            var rating = gifsArray[i].rating;
            var imageLink = gifsArray[i].images.downsized_large.url;

            cardText.text("Rating: " + rating);
            image.attr("src", imageLink)

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

    var newComedy = $("comedy-input").val().trim();

    comedies.push(newComedy);

    renderButtons();

});

renderButtons();
