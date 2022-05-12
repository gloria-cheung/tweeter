$(document).ready(() => {
  $("textarea").on("input", function() {
    // selecting the counter and updating it's value
    let counter = $(this).next().children()[1];
    let count = 140 - $(this).val().length;
    $(counter).val(count); 
    // class containing style to change font to red
    if ($(counter).val() < 0) {
      $(counter).addClass("exceed-count");
    } else {
      $(counter).removeClass("exceed-count");
    }
  })
})

