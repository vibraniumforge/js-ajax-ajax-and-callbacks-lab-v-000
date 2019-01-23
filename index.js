$(document).ready(function(){
  handlebarsFunction();
});

function displayError = () => {
    $("#errors").text("I'm sorry, there's been an error. Please try again.");
}

function handlebarsFunction() {
  Handlebars.registerPartial('userDetails', $('#user-details-partial').html()
);
}

function searchRepositories() {
  const username = $("#searchTerms")[0].value;
  $.get(`https://api.github.com/users/${username}/repos`, data=> {
    $("#results").html(showRepositories(data));
  }).fail(function(error) {
    displayError(error);
  });
}

function showRepositories(results) {
  var template = Handlebars.compile(document.getElementById("result-template").innerHTML);;
  let result = template(results);
  document.getElementById('results').innerHTML = result;
}

function showCommits(el) {
  const repository = el.dataset.repository;
  const owner = el.dataset.owner;
  $.getJSON(`https://api.github.com/repos/${owner}/${repository}/commits`, data => {
    $("#details").html(displayCommits(data));
  }).fail(function(error) {
    displayError(error);
  });
}

function displayCommits(results) {
  let template = Handlebars.compile($("#commits-template").html());
  let result = template(results);
  document.getElementById('details').innerHTML = result;
}
