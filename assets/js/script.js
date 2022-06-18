// global variables
let searchContainer = document.querySelector("#search-container"); //switch to parent div when id is present.)
let genre= "metal";
let city = "portland";

// create form el - in HTML
  // drop down menu with genre - first letter has to be cappitalized 
  // search by city name or zipcode
  // create search btn
  //create event listener for search btn to search api

//search by city API
let generateEvent = (city, genre) => {
  let APIKey = "&apikey=MYfmJhBCLx9HATehV1SabFFOewAaaLjb"
  let APIUrl = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&classificationName=" + genre + "&size=10&city=" + city  + APIKey
  
  // grab events info for portland - pass in genera paramater (find by data.classifications.genre.name) 
  fetch(APIUrl).then(function (response) {
    response.json().then(function (data) {

      console.log(data._embedded.events)
      displayResults(data._embedded.events);
            
    // event info for each event
      for (i=0; i < 10; i++) { 
        
        // container for bane name and info 
        // picture of band? 
        // band name
        let bandName = data._embedded.events[i].name;
        // for band name, call getTop3Songs function
        // venue
        let venue = data._embedded.events[i]._embedded.venues[0].name;
        // date 
        let date = data._embedded.events[i].dates.start.localDate
        // time 
        let time = data._embedded.events[i].dates.start.dateTime
        //ticket url
        let ticketSite = data._embedded.events[i].url;
      };
    })
  })
};

// SHAZAAM API, fetch by artist name, list top 3 songs
// for artists with more than one word in name, delete spaces (join characters)
function getTop3Songs (artist) {
  let apiKey = '&rapidapi-key=fc4954542fmshb1113f85fac508bp104f1bjsn81ed981864f0'
  let apiUrl = 'https://shazam.p.rapidapi.com/search?term=' + artist + '&locale=en-US&offset=0&limit=5' + apiKey;
  fetch(apiUrl).then(function (response) {
      response.json().then(function(data) {
        if(response.ok){
          console.log(data)
  
          //for loop to get first three songs listed 
          for (i=0; i < 3; i++) {
            //displays track name and url
            console.log(data.tracks.hits[i].track.title + " " +  data.tracks.hits[i].track.url)
          
             //display three songs as btns
            let playbtnEl = document.createElement('button');
            playbtnEl.textContent = "Play " + data.tracks.hits[i].track.title;
    
            let btnContainer = document.querySelector('#btn-container');
            btnContainer.append(playbtnEl);
          };
        } else { 
          console.log(error + "error");
        };
      })  
    // let playbtnEl = document.createElement('div');
    // playbtnEl.textContent = "no songs found";
    // let btnContainer = document.querySelector('#btn-container');
    // btnContainer.append(playBtnEl);
    });
};

//display data in new container 
let displayResults = function (data) {
  console.log(data);
  //create container parent
  let resultEl = document.createElement('div');
  resultEl.id = "resultEl";
  let resultTitle = document.createElement("h2"); //will this actually be a span element?
  resultTitle.textContent = genre + " Concerts in " + city;
  resultEl.appendChild(resultTitle);

  function getArtistSongs (numArtists) {
    let i = 0;

    const maximum = setInterval(() => {
      //band name
      let bandName = data[i].name;
  
      // venue
      let venue = data[i]._embedded.venues[0].name;
      // date 
      let date = data[i].dates.start.localDate;
      // time 
      let time = data[i].dates.start.localTime;
    
    // add list to container
    // band name list
    // event info list items
    
    // container for bane name and info 
    let eventEl = document.createElement('div');
    eventEl.id = "eventEl";
    let eventTitleEl = document.createElement('div');
    eventTitleEl.id = "event-title-el";
    let eventTitle = document.createElement('h3');
    eventTitle.textContent = bandName + " at " + venue + " " + date + " " + time;
    
    //container for buttons
    let btnContainer = document.createElement('div');  //or should this be a list?
    btnContainer.id = "btn-container";
    
    //call 3 play btns
    getTop3Songs(data[i].name);
        //append elements
        eventTitleEl.append(eventTitle);
        eventEl.append(eventTitleEl);
        eventEl.append(btnContainer);
        resultEl.append(eventEl);
    
    i++;

    if(i === numArtists) clearInterval(maximum);
    }, 1500)
  }

  getArtistSongs(10);

    //display 10 results
    // for (i=0; i < 10; i++) { 
    //   // picture of band? 
    //   // band name
    //   let bandName = data[i].name;
    //   // for band name, call getTop3Songs function
      
    //   // venue
    //   let venue = data[i]._embedded.venues[0].name;
    //   // date 
    //   let date = data[i].dates.start.localDate
    //   // time 
    //   let time = data[i].dates.start.dateTime
    
    // // add list to container
    // // band name list
    // // event info list items
    
    // // container for bane name and info 
    // let eventEl = document.createElement('div');
    // eventEl.id = "eventEl";
    // let eventTitleEl = document.createElement('div');
    // eventTitleEl.id = "event-title-el";
    // let eventTitle = document.createElement('h3');
    // eventTitle.textContent = bandName + " at " + venue + " " + date + " " + time;
    
    // //container for buttons
    // let btnContainer = document.createElement('div');  //or should this be a list?
    // btnContainer.id = "btn-container";
    
    // //call 3 play btns
    // getTop3Songs(data[i].name);
    
    // //ticket url
    // // let ticketBtnEl = document.createElement("button");
    // // ticketBtnEl.textContent =  data[i].url;
    // // btnContainer.append(ticketBtnEl);

    
    // //create button to buy tickets
    

    // //append elements
    // eventTitleEl.append(eventTitle);
    // eventEl.append(eventTitleEl);
    // eventEl.append(btnContainer);
    // resultEl.append(eventEl);

//  };
  searchContainer.append(resultEl);

};
   
    //add event listener to btn and link URL to play that song - do for all three songs
  
    // add event listener to btn to link ticket URL to ticketmaster
 
generateEvent(city, genre);