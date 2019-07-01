
$(document).on("click", ".saveBtn", function () {
  var id = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + id,
    data: {
      saved: true
    },
  }).then(
    function (data) {
      console.log(data);

    })
  $(this).attr("data-saved", "true");
});

$(document).on("click", ".delArt", function () {
  var id = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/deleteArticles/" + id,
    data: id
  }).then(
    function (data) {
      console.log(data);
    })
    location.reload();
});

$("#saveModal").on("click", function () {
  location.reload();
});

document.getElementById("closeScrapeModal").onclick = function () {
  location.href = "/scrape";
};

$("#saveModal").on("click", function () {
  location.reload();
});