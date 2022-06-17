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
let generateEvent = (city, genre) => {
  let APIKey = "&apikey=MYfmJhBCLx9HATehV1SabFFOewAaaLjb"
  let APIUrl = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&classificationName=" + genre + "&size=10&city=" + city  + APIKey
  
  // grab events info for portland - pass in genera paramater (find by data.classifications.genre.name) 
  fetch(APIUrl).then(function (response) {
    response.json().then(function (data) {

      console.log(data._embedded.events)   
      //     //grab events info: band name, 
      //     //venue, 
      //     //date, 
      //     //time, 
      //     //ticket url
        })
    })
  }



// display event for specific genre



// SHAZAAM API, fetch by artist name, list top 5 songs
// for artists with more than one word in name, delete spaces (join characters)
// let artist = "amonamarth"
// let apiKey = '&rapidapi-key=fc4954542fmshb1113f85fac508bp104f1bjsn81ed981864f0'
// let shazaamApiUrl = 'https://shazam.p.rapidapi.com/search?term=' + artist + '&locale=en-US&offset=0&limit=5&rapidapi-key=fc4954542fmshb1113f85fac508bp104f1bjsn81ed981864f0' + apiKey;
// fetch(apiUrl)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));



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
