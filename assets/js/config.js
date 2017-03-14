$(document).ready(function () {

  // Submit event handler
  $('#search-form').submit( function(e) {
    e.preventDefault();
    getMostPopularViewed(results);
    getMostPopularShared(results);
    getMostPopularEmailed(results);
  })

  // Hide the top stories button when the page loads
  $('.viewed').hide();
  $('.shared').hide();
  $('.emailed').hide();

  // Get a list of the most emailed articles within the last 30 days from the New York Times Magazine section
  function getMostPopularViewed() {
    var url = 'https://api.nytimes.com/svc/mostpopular/v2/mostviewed/Magazine/7.json';
    let params = {
      q: 'query',
      'api-key': '85b2939e3df349dd8502775e8623d350'
    }
    url += '?' + $.param(params)
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(data) {
      console.log(data);

      // Define which results will be displayed and display them
      for (var i = 0; i < 5; i++) {
        var title = data.results[i].title;
        $('.viewed').show();
        var article_url = data.results[i].url;
        var abstract = data.results[i].abstract;

        // Use bracket notation for media-metadata
        var image = data.results[i].media[0]['media-metadata'][0].url;
        console.log(image);

        // Display results in HTML
        $('#results-viewed').append("<li><h3>" + title +
          "</h3>" + abstract + "<br><br>" + "<a target='blank' href='" + article_url + "'>" +
          "<img src='" + image + "'>" + "</a></li>");
        $('#summary-viewed').append("<a target='blank' href='" + article_url + "'>" +
          "<img src='" + image + "'>" + "</a>");
      }
    }).fail(function(err) {
      throw err;
    });
  }

  // Get a list of the most emailed articles within the last 30 days from the New York Times Magazine section
  function getMostPopularShared() {
    var url = 'https://api.nytimes.com/svc/mostpopular/v2/mostshared/Magazine/7.json';
    let params = {
      q: 'query',
      'api-key': '85b2939e3df349dd8502775e8623d350'
    }
    url += '?' + $.param(params)
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(data) {
      console.log(data);

      // Define which results will be displayed and display them
      for (var i = 0; i < 5; i++) {
        var title = data.results[i].title;
        $('.shared').show();
        var article_url = data.results[i].url;
        var abstract = data.results[i].abstract;

        // Use bracket notation for media-metadata
        var image = data.results[i].media[0]['media-metadata'][0].url;
        console.log(image);

        // Display results in HTML
        $('#results').append("<li><h3>" + title +
          "</h3>" + abstract + "<br><br>" + "<a target='blank' href='" + article_url + "'>" +
          "<img src='" + image + "'>" + "</a></li>");
        $('#summary-shared').append("<a target='blank' href='" + article_url + "'>" +
          "<img src='" + image + "'>" + "</a>");
      }
    }).fail(function(err) {
      throw err;
    });
  }

  // Get a list of the most emailed articles within the last 30 days from the New York Times Magazine section
  function getMostPopularEmailed() {
    var url = 'https://api.nytimes.com/svc/mostpopular/v2/mostemailed/Magazine/7.json';
    let params = {
      q: 'query',
      'api-key': '85b2939e3df349dd8502775e8623d350'
    }
    url += '?' + $.param(params)
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(data) {
      console.log(data);

      // Define which results will be displayed and display them
      for (var i = 0; i < 5; i++) {
        var title = data.results[i].title;
        $('.emailed').show();
        var article_url = data.results[i].url;
        var abstract = data.results[i].abstract;

        // Use bracket notation for media-metadata
        var image = data.results[i].media[0]['media-metadata'][0].url;
        console.log(image);

        // Display results in HTML
        $('.emailed').append("<li><h3>" + title +
          "</h3>" + abstract + "<br><br>" + "<a target='blank' href='" + article_url + "'>" +
          "<img src='" + image + "'>" + "</a></li>");
        $('#summary-emailed').append("<a target='blank' href='" + article_url + "'>" +
          "<img src='" + image + "'>" + "</a>");
      }
    }).fail(function(err) {
      throw err;
    });
  }

})