$(document).ready(() => {
  //helper function to create new tweet html using tweet object
  const createTweetElement = function(tweetData) {
    const $tweet = $(`
      <article class = "tweet">
        <header>
          <span id= "avatar_name"> 
            <img src="${tweetData.user.avatars}" alt="avatar">
            ${tweetData.user.name}
          </span>
          <span class="username">${tweetData.user.handle}</span>
        </header>
        <p>${tweetData.content.text}</p>
        <footer>
          <span>${timeago.format(tweetData.created_at)}</span>
          <span class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </span>
        </footer>
      </article>`
    );
    return $tweet;
  };

  // looping over tweets array to single out each object and create a new tweet
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
  };

  // using AJAX to do a POST req to /tweets and sending the form data
  $("form").on("submit", function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    console.log(data);
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: data
    })
      .then(function() {
        $("form").trigger("reset");
        loadTweets();
      })
  });

  // using AJAX to do a GET req to retrieve json data from /tweets
  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets",
      dataType: "json"
    })
      .then(function(data) {
        renderTweets(data);
      });
  };
  loadTweets();
});
