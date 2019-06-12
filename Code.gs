function spotifyLookup(artist, song, token) {
  var url = "https://api.spotify.com/v1/search?q=" + artist + ", " + song + "&type=track&market=US&limit=1&offset=1";
  try {
    var formData = {
      "text": artist + ", " + song
    }

    var params = {
      'method' : "get",
      'contentType': 'application/json',
      'headers': {
        "Authorization": "Bearer " + token
      }
    };

    var response = JSON.parse(UrlFetchApp.fetch(url, params).getContentText());
    var spotifyLink = response.tracks.items[0].external_urls.spotify;
    return spotifyLink;
  } catch (f) {
    Logger.log(f.toString());
    return false;
  }
}


function getAccessToken(username, password) {
  var url = "https://accounts.spotify.com/api/token";
  
  try {
    var formData = {
      "grant_type": "client_credentials"      
    }
    
    var headers = {
      "Authorization" : "Basic " + Utilities.base64Encode(username + ':' + password)
    };

    var params = {
      'method' : "post",
      'headers': headers,
      'payload': formData
    };

    var response = JSON.parse(UrlFetchApp.fetch(url, params).getContentText());
    return response.access_token;
  } catch (f) {
    Logger.log(f.toString());
    return false;
  }
}