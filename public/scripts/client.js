/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  // Fake data taken from initial-tweets.json
  const data = [
      {
        "user": {
          "name": "Newton",
          "avatars": "https://i.imgur.com/73hZDYK.png"
          ,
          "handle": "@SirIsaac"
        },
        "content": {
          "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
      },
      {
        "user": {
          "name": "Descartes",
          "avatars": "https://i.imgur.com/nlhLi3I.png",
          "handle": "@rd" },
        "content": {
          "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
      }
    ]

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
          <span>${tweetData.created_at}</span>
          <span class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </span>
        </footer>
      </article>`
    )
    return $tweet;
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
  };

  renderTweets(data);

  $("form").on("submit", function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    console.log(data);
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: data
    })
  })

})
