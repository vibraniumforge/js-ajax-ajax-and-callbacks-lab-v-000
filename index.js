$(document).ready(function(){
  handlebarsFunction();
});

function handlebarsFunction() {
  Handlebars.registerPartial('userDetails', $('#user-details-partial').html()
);
}

function displayError() {
  $("#errors").text("I'm sorry, there's been an error. Please try again.");
}

function searchRepositories() {
  const username = $("#searchTerms").value;
  $.getJSON(`https://api.github.com/users/${username}/repos`, function(response) {
    results=response.items;
    console.log("results=", results);
    showRepositories(results);
  }).fail(function(error) {
    displayError(error);
  });
}

function showRepositories(results) {
  let template = Handlebars.compile($("#result-template").html());
  let result = template(results);
  $("#results").html=result;
}

function showCommits(el) {
  const repositories = el.dataset.repository;
  const owner = el.dataset.owner;
  const commits_url = `https://api.github.com/repos/${owner}/repo/commits`;
  $.getJSON(commits_url, function(response) {
    results = response.items;
    console.log("results=", results);
    showCommits(results);
  }).fail(function(error) {
    displayError(error);
  });
}

function displayCommits(results) {
  let template = Handlebars.compile($("#commits-template").html());
  let result = template(results);
  $("#details").html=result;
}
