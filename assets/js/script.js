// global variables
let searchContainer = document.querySelector("#search-container"); //switch to parent div when id is present.)
let genreInput = document.querySelector(".searchGenre");
let cityInput = document.querySelector(".searchCity");


let songSamplesContainer = document.querySelector(".sample-songs")
let searchForm = document.querySelector(".userSearch");

// take in the value of genre and city as parameters for getEventByCityAndGenre
let buttonHandler = (e) => {
  e.preventDefault();

  let city = cityInput.value;
  let genre = genreInput.value;

  //error handling
  if (!city || !genre) {

    // modal code 
    var elems = document.querySelector('.modal');
    const instance = M.Modal.init(elems);

    // open the modal
    instance.open();

    // event listener button to close instance
    let closeHandler = document.querySelector(".modal-close");
    closeHandler.addEventListener("click", function () {
      instance.close();
    })
  } else {
    getEventByCityAndGenre(city, genre)
  };
};

//search by city API
let getEventByCityAndGenre = (city, genre) => {

  let APIKey = "&apikey=MYfmJhBCLx9HATehV1SabFFOewAaaLjb"
  let APIUrl = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&classificationName=" + genre + "&size=10&city=" + city + APIKey

  // grab events info for portland - pass in genera paramater (find by data.classifications.genre.name) 
  fetch(APIUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayResults(data._embedded.events);
      })
    } else {
      throw Error(response.statusText)
    };

  }).catch((error) => {
    alert("Type in a valid city and genre")
    // do something with the songs
  })
};

// create event listener for submit button
let submitBtn = document.querySelector("#searchBtn")
submitBtn.addEventListener("click", buttonHandler, )

// SHAZAAM API, fetch by artist name, list top 3 songs
// for artists with more than one word in name, delete spaces (join characters)
function getTop3Songs(artist, sampleBandDisplayContainer) {
  let apiKey = '&rapidapi-key=f5fcac1500msh494a872b0042079p1521c0jsnf20b1ef46b33'
  let apiUrl = 'https://shazam.p.rapidapi.com/search?term=' + artist + '&locale=en-US&offset=0&limit=5' + apiKey;

  fetch(apiUrl).then(function (response) {
    return response.json()
  }).then(function (data) {

    // go through each playsong button
    for (var j = 0; j < 3; j++) {
      // let sampleSongBtn = document.querySelectorAll(".songBtn");
      let trackTitle = data.tracks.hits[j].track.title;
      let trackURL = data.tracks.hits[j].track.url
      // song buttons
      let anchor = document.createElement('a')
      anchor.setAttribute('href', trackURL)

      let sampleBtn1 = document.createElement('button');
      sampleBtn1.setAttribute('class', 'b1 songBtn btn playsongbtn1 col pink-text text-lighten-5');
      sampleBtn1.textContent = trackTitle;

      anchor.append(sampleBtn1)

      sampleBandDisplayContainer.append(anchor);
     

      console.log(data.tracks.hits[j])

    };


  }).catch((error) => {
    console.log(error + "no songs avaiable for this artist");
  });
};




//display data in new container 
let displayResults = function (data) { //function name is differnt
  // console.log(data)

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


  //grab city and genre from data
  let genre = capitalizeFirstLetter(genreInput.value);
  let city = capitalizeFirstLetter(cityInput.value);
  let songDisplay = document.querySelector("#result-section");
  
  
  //create event info parent container
  let resultEl = document.createElement('div');
  resultEl.id = "concert-display";
  resultEl.setAttribute('class', 'col s7');
  let resultTitle = document.createElement("h3");
  resultTitle.id = "ticket-title";
  resultTitle.setAttribute('class', 'center')
  resultTitle.textContent = genre + " Concerts in " + city;
  resultEl.appendChild(resultTitle);

  // create song sample parent container
  let sampleResultEl = document.createElement('div');
  sampleResultEl.setAttribute('class', 'col s5');
  sampleResultEl.id = "song-display";
  songDisplay.append(sampleResultEl);

  // song sample title
  let sampleResultTitle = document.createElement('h3');
  sampleResultTitle.textContent = "Available Songs by Artists";
  sampleResultTitle.setAttribute('class', 'center');
  sampleResultEl.append(sampleResultTitle);

  //clear searched city and genera
  searchForm.reset();
  
  getArtistInfo(3, data, sampleResultEl, resultEl, songDisplay);
  
};

function getArtistInfo(numArtists, data, sampleResultEl,resultEl, songDisplay) {
  let i = 0;

  //delay fetch by 1 1/2 seconds
  const maximum = setInterval(() => {
    //band name
    let bandName = data[i].name;
    // venue
    let venue = data[i]._embedded.venues[0].name;
    // date 
    let date = data[i].dates.start.localDate;
    // time 
    let time = data[i].dates.start.localTime;

    // date format DD-MM-YYYY
    date = date.split("-");
    date = date[1] + "/" + date[2] + "/" + date[0]
 
    

    // container for band name and info 
    let eventEl = document.createElement('div');
    eventEl.id = "tour-ticket-info";
    let eventTitleEl = document.createElement('div');
    eventTitleEl.id = "tour-info";

    //search result title
    let eventTitle = document.createElement('h4');
    eventTitle.id = "bandName"
    eventTitle.setAttribute('class', 'center-align amber-text text-darken-1')
    eventTitle.textContent = bandName + " at " + venue + " " + date + " " + time;

    // parent container for each band 
    let sampleBandDisplayContainer = document.createElement('div');
    sampleBandDisplayContainer.setAttribute('id', 'sample-display');

    // song samples for band
    let sampleBandName = document.createElement('h4');
    sampleBandName.setAttribute('class', 'center-align amber-text text-darken-1')
    sampleBandName.setAttribute('id', 'bandName')
    sampleBandName.textContent = bandName;

    // append band container to parent container 
    sampleResultEl.append(sampleBandDisplayContainer);

    // append band name to parent container
    sampleBandDisplayContainer.append(sampleBandName);

    //ticket url
    let anchor = document.createElement('a');
    anchor.setAttribute('href', data[i].url);
    
    let ticketBtnEl = document.createElement("button");
    ticketBtnEl.type = "submit";
    ticketBtnEl.id = "ticketbtn";
    ticketBtnEl.setAttribute('class', 'btn center ticket-btn2 white-text text-lighten-5');
    ticketBtnEl.textContent = "Purchase Tickets";
    anchor.append(ticketBtnEl);
    


    //call 3 play btns
    getTop3Songs(bandName, sampleBandDisplayContainer);


    //append elements
    eventTitleEl.append(eventTitle);
    eventEl.append(eventTitleEl);
    eventEl.append(anchor);
    resultEl.append(eventEl);
    songDisplay.append(resultEl);

    i++;

    if (i === numArtists) clearInterval(maximum);
  }, 1500)
}
//add event listener to btn and link URL to play that song - do for all three songs
// add event listener to btn to link ticket URL to ticketmaster