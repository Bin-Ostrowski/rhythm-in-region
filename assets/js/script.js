// global variables
let searchContainer = document.querySelector("#search-container"); //switch to parent div when id is present.)
let genreInput = document.querySelector(".searchGenre");
let cityInput = document.querySelector(".searchCity");


let songSamplesContainer = document.querySelector(".sample-songs")
let searchForm = document.querySelector(".userSearch");

let sampleResultEl = document.createElement('div');
let resultEl = document.createElement('div');

// take in the value of genre and city as parameters for getEventByCityAndGenre
let buttonHandler = (e) => {
  // clear concert and song display containers 
  resultEl.innerHTML = "";
  sampleResultEl.innerHTML = "";


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
      location.reload();
    })
  } else {
    getEventByCityAndGenre(city, genre)
  };
};

//search by cityAPI
let getEventByCityAndGenre = (city, genre) => {

  let APIKey = "&apikey=MYfmJhBCLx9HATehV1SabFFOewAaaLjb"
  let APIUrl = "https://app.ticketmaster.com/discovery/v2/events.json?sort=date,asc&classificationName=" + genre + "&size=10&city=" + city + APIKey

  // grab events info for portland - pass in genera paramater (find by data.classifications.genre.name) 
  fetch(APIUrl).then(function (response) {
    if (response.ok) {

      response.json().then(function (data) {

        displayResults(data._embedded.events);
        console.log(data._embedded.events)

      }).catch((error) => {
        // modal code 
        var elems = document.querySelector('#modal3');
        const instance = M.Modal.init(elems);

        // open the modal
        instance.open();

        // event listener button to close instance
        let closeHandler = document.querySelector(".modal-close");
        closeHandler.addEventListener("click", function () {
          instance.close();
        })
        searchForm.reset();
      })

    } else {
      throw Error(response.statusText)
      //
    }

  })
};

// create event listener for submit button
let submitBtn = document.querySelector("#searchBtn")
submitBtn.addEventListener("click", buttonHandler,)

// SHAZAAM API, fetch by artist name, list top 3 songs
// for artists with more than one word in name, delete spaces (join characters)
function getTop3Songs(artist, sampleBandDisplayContainer) {
  let apiKey = '&rapidapi-key=11c30692e1msh57611709d774df9p195ee6jsnc4f9f74a0aea'
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
      anchor.setAttribute('target', '_blank')

      let sampleBtn1 = document.createElement('button');
      sampleBtn1.setAttribute('class', 'b1 btn songBtn playsongbtn1 col pink-text text-lighten-5 flex');
      sampleBtn1.textContent = trackTitle;

      anchor.append(sampleBtn1)

      // sample song container
      let songContainer = document.createElement('li');
      songContainer.append(anchor);

      sampleBandDisplayContainer.append(songContainer)


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

  resultEl.id = "concert-display";
  resultEl.setAttribute('class', 'col s12 m12 l7');
  let resultTitle = document.createElement("h3");
  resultTitle.id = "ticket-title";
  resultTitle.setAttribute('class', 'center')
  resultTitle.textContent = genre + " Concerts in " + city;
  resultEl.appendChild(resultTitle);

  // create band/song display container
  sampleResultEl.setAttribute('class', 'col s12 m12 l5');
  sampleResultEl.id = "song-display";
  songDisplay.append(sampleResultEl);

  // song sample title
  let sampleResultTitle = document.createElement('h3');
  sampleResultTitle.textContent = "Available Songs by Artists";
  sampleResultTitle.setAttribute('class', 'center songSampleTitle');
  sampleResultEl.append(sampleResultTitle);

  //clear searched city and genera
  searchForm.reset();

  getArtistInfo(10, data, sampleResultEl, resultEl, songDisplay);

};

function getArtistInfo(numArtists, data, sampleResultEl, resultEl, songDisplay) {
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

    // time format 00:00 AM/PM
    time = time.split(":");

    let timeOfDay = "";
    if (time[0] <= 11) {
      timeOfDay = "AM"
    } else {
      timeOfDay = "PM"
    }

    time = time[0] % 12 + ":" + time[1] + timeOfDay;

    // container for band name and info 
    let eventEl = document.createElement('div');
    eventEl.id = "tour-ticket-info";
    let eventTitleEl = document.createElement('div');
    eventTitleEl.id = "tour-info";
    eventTitleEl.setAttribute('class', 'tourInfo');

    //search result title
    let eventTitle = document.createElement('h4');
    eventTitle.id = "bandName"
    eventTitle.setAttribute('class', 'title center-align amber-text text-darken-1')
    eventTitle.textContent = bandName + " at " + venue + " " + date + " " + time;

    // parent container for each band 
    let sampleBandDisplayContainer = document.createElement('div');
    sampleBandDisplayContainer.setAttribute('id', 'sample-display');
    sampleBandDisplayContainer.setAttribute('class', 'tourInfo col s12');


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
    anchor.setAttribute('target', '_blank')
    anchor.setAttribute('class', '')

    let ticketBtnEl = document.createElement("div");
    //ticketBtnEl.type = "submit";
    ticketBtnEl.id = "ticketbtn";
    ticketBtnEl.setAttribute('class', 'center ticket-btn2 white-text text-lighten-5 ticketBTN');
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