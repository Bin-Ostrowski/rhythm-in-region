// load page

// create form el
  // drop down menu with genre - first letter has to be cappitalized 
  // search by city name or zipcode
  // create search btn

//global variables
  // const for genreInput
  // const for cityInput

//create event listener for search btn to search api

//search by city API
let getEventByCity = () => {
  let APIKey = "apikey=MYfmJhBCLx9HATehV1SabFFOewAaaLjb"
  let APIUrl = "https://app.ticketmaster.com/discovery/v2/events.json?city=portland&" + APIKey
  
  // grab events info for portland - pass in genera paramater (find by data.classifications.genre.name) 
  fetch(APIUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data._embedded.events)

        // display event for specific genre
        for (i = 0; i < data._embedded.events.length; i++) {
          if (data._embedded.events[i].classifications[0].genre.name === "Rock") { //replace "Rock" with picked genre
             console.log(data._embedded.events[i])

             //grab events info: band name, 
             //venue, 
             //date, 
             //time, 
             //ticket url
          }
        }
    })
  })
};
  
getEventByCity();

//display data in new container 
//create container parent
//create div for search title 
  //display title: generaInput + "concerts in" + cityInput
  //append to parent 
  
  //create child container for search results
   // display searched info
    // title: will include the following data
      //band name 
      //at venue 
      //date
      //time

    //create child container for play buttons and purchase ticket btn
    //call shazam api for band name
    //for loop to get first three songs listed 
    //display three songs as btns
    //create a button with textContent "play {songName}"
    //add event listener to btn and link URL to play that song - do for all three songs
    //
    
    // get ticket URL from Ticketmaster search
    //create button with text content "Purchase Tickets"
    // add event listener to btn to link ticket URL to ticketmaster

    //append everything to parent or sibling



