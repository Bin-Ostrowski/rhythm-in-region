// global variables
let searchContainer = document.querySelector("#search-container"); //switch to parent div when id is present.)
let genreInput = document.querySelector(".searchGenre");
let cityInput = document.querySelector(".searchCity");

let songSamplesContainer = document.querySelector(".sample-songs")
let searchForm = document.querySelector(".userSearch")




// take in the value of genre and city as parameters for getEventByCityAndGenre
let buttonHandler = (e) => {
  e.preventDefault();

  // songSamplesContainer.innerHTML = "";
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
submitBtn.addEventListener("click", buttonHandler,)



// SHAZAAM API, fetch by artist name, list top 3 songs
// for artists with more than one word in name, delete spaces (join characters)
function getTop3Songs(artist) {
  let apiKey = '&rapidapi-key=0829184905msh59b7240ee544d5cp124e7djsne5a0e34755a2'
  let apiUrl = 'https://shazam.p.rapidapi.com/search?term=' + artist + '&locale=en-US&offset=0&limit=5' + apiKey;



  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      if (response.ok) {
        // go through each artist and get 3 songs
        for (i = 0; i < 3; i++) {

          console.log(data.tracks)
          console.log(data.tracks.hits[i].track.title + " " + data.tracks.hits[i].track.url)

          // select all play song buttons
          let sampleSongBtn = document.querySelectorAll(".songBtn");
          let trackTitle = data.tracks.hits[i].track.title;
          let trackURL = data.tracks.hits[i].track.url

          // go through each playsong button
          for (i=0; i<15; i++) {
            sampleSongBtn[i].textContent = trackTitle;
            sampleSongBtn[i].innerHTML = '<a href=' + trackURL + '>' + trackTitle + '</a>'
          };
          
        };
      } else {
        throw Error(response.statusText)
      };


    }).catch((error) => {
      console.log("no songs available")
      // do something with the songs
    })

  });
};

//display data in new container 
let displayResults = function (data) { //function name is differnt
  console.log(data)

  //grab city and genre from data
  let genre = genreInput.value;
  let city = cityInput.value;
  let songDisplay = document.querySelector("#result-section");



  //create event info parent container
  let resultEl = document.createElement('div');
  resultEl.id = "concert-display";
  resultEl.setAttribute('class', 'col s7')
  let resultTitle = document.createElement("h3");
  resultTitle.id = "ticket-title"
  resultTitle.setAttribute('class', 'center')
  resultTitle.textContent = genre + " Concerts in " + city;
  resultEl.appendChild(resultTitle);



  // create song sample parent container
  let sampleResultEl = document.createElement('div');
  sampleResultEl.setAttribute('class', 'col s5');
  sampleResultEl.id = "song-display"
  songDisplay.append(sampleResultEl);

  // song sample title
  let sampleResultTitle = document.createElement('h3');
  sampleResultTitle.textContent = "Preview song by artist";
  sampleResultTitle.setAttribute('class', 'center');
  sampleResultEl.append(sampleResultTitle);


  searchForm.reset();

  function getArtistInfo(numArtists) {
    let i = 0;

    const maximum = setInterval(() => {
      //band name
      let bandName = data[i].name;
      console.log(bandName)
      // venue
      let venue = data[i]._embedded.venues[0].name;
      // date 
      let date = data[i].dates.start.localDate;
      // time 
      let time = data[i].dates.start.localTime;

      // container for band name and info 
      let eventEl = document.createElement('div');
      eventEl.id = "tour-ticket-info";
      let eventTitleEl = document.createElement('div');
      eventTitleEl.id = "tour-info";
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

      // song buttons
      let sampleBtn1 = document.createElement('button');
      sampleBtn1.setAttribute('class', 'b1 songBtn btn playsongbtn1 col pink-text text-lighten-5');

      let sampleBtn2 = document.createElement('button');
      sampleBtn2.setAttribute('class', 'b2 songBtn btn playsongbtn2 col pink-text text-lighten-5');

      let sampleBtn3 = document.createElement('button');
      sampleBtn3.setAttribute('class', 'b3  songBtn btn playsongbtn3 col pink-text text-lighten-5');


      // append band container to parent container 
      sampleResultEl.append(sampleBandDisplayContainer);

      // append band name to parent container
      sampleBandDisplayContainer.append(sampleBandName);

      // append button to parent container
      sampleBandDisplayContainer.append(sampleBtn1);
      sampleBandDisplayContainer.append(sampleBtn2);
      sampleBandDisplayContainer.append(sampleBtn3);


      //ticket url
      let ticketBtnEl = document.createElement("button");
      ticketBtnEl.type = "submit";
      ticketBtnEl.id = "ticketbtn";
      ticketBtnEl.setAttribute('class', 'btn ticket-btn2 blue-text text-lighten-5');
      ticketBtnEl.textContent = "Purchase Tickets";
      ticketBtnEl.innerHTML = ('<a href=' + data[i].url + '>Purchase Tickets</a>');

      //call 3 play btns
      getTop3Songs(bandName);


      //append elements
      eventTitleEl.append(eventTitle);
      eventEl.append(eventTitleEl);
      eventEl.append(ticketBtnEl);
      resultEl.append(eventEl);
      songDisplay.append(resultEl);

      i++;

      if (i === numArtists) clearInterval(maximum);
    }, 1500)
  }

  getArtistInfo(3);

};

//add event listener to btn and link URL to play that song - do for all three songs
// add event listener to btn to link ticket URL to ticketmaster

