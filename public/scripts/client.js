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
        <p>${escape(tweetData.content.text)}</p>
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

  // helper function to prevent XSS with escaping
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // looping over tweets array to single out each object and create a new tweet
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };

  // using AJAX to do a POST req to /tweets and sending the form data
  $("form").on("submit", function(e) {
    e.preventDefault();
    $(".error-long").hide();
    $(".error-short").hide();
    const data = $(this).serialize();
    if (data === "text=") {
      $(".error-short").slideDown("slow");
    } else if (data.slice(5).length > 140) {
      $(".error-long").slideDown("slow");
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: data
      })
        .then(function() {
          // to reset the form and then load the new tweet to top of container
          $("form").trigger("reset");
          loadTweets();
        });
    }
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

  // form appears to create new tweet when click "write a new tweet"
  $(".toggleForm").click(function() {
    $(".new-tweet").toggle("slow");
    $("textarea").focus();
  });
  $(".toggleForm").hover(function() {
    $(".arrow").toggleClass("translate");
    $(this).toggleClass("hover");
  });

  // button appears upon scrolling to bring user back to top and can create new tweet
  $(document).scroll(function() {
    $(".outer-scroll").show();
  })
  $(".outer-scroll").click(function() {
    $(document).scrollTop(0, 0);
    $(this).hide();
    $(".new-tweet").show();
    $("textarea").focus();
  })
});
