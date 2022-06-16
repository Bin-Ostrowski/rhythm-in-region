
// search by city API
let getEventByCity = () => {
  let APIKey = "apikey=MYfmJhBCLx9HATehV1SabFFOewAaaLjb"
  let APIUrl = "https://app.ticketmaster.com/discovery/v2/events.json?city=portland&" + APIKey
  
  // grab events info for portland
  fetch(APIUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data._embedded.events)
    })
  })
};

