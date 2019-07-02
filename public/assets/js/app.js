$(document).on("click", ".saveBtn", function () {
  var id = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + id,
    data: {
      saved: true
    }
  }).then(
    function (data) {
      console.log(data);

    })
  $(this).attr("data-saved", "true");
});

$(document).on("click", ".saveNoteBtn", function () {
  var id = $(".saveNoteBtn").data("id");
  console.log(id);
  console.log($("#titleInput").val());
  console.log($("#bodyInput").val())


  $.ajax({
    method: "POST",
    url: "/savedArticles/" + id,
    data: {
      title: $("#titleInput").val(),
      body: $("#bodyInput").val()
    }
  }).then(
    function (data) {
      console.log(data);
      $.ajax({
        method: "GET",
        url: "/savedArticles"
      }).then(function () {
        location.reload();
      })
    })
  // location.reload();
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

$(".addNote").on("click", function () {

  let divId = $(this).attr("data-id");
  console.log(divId);
  
  $(".saveNoteBtn").attr("data-id", divId);
  
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