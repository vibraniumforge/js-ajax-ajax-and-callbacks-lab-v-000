$(document).ready(function(){
});

function displayError() {
    $("#errors").text("I'm sorry, there's been an error. Please try again.");
}

function searchRepositories() {
  const username = $("#searchTerms").val();
  $.getJSON(`https://api.github.com/users/${username}/repos`, data=> {
    $("#results").html(renderRepositories(data))
  }).fail(function(error) {
    displayError(error);
  });
}

function renderRepositories(data) {
  data.map(result=> renderSearchResult(result))
}

function renderSearchResult(result) {
  return `
    <div>
      <h3><a href="${result.html_url}">${result.name}</a></h3>
      <p> <a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      <p>${result.description}/p>
    </div>
    <hr>
    `
}

function showCommits(el) {
  const repository = el.dataset.repository;
  const owner = el.dataset.owner;
  $.getJSON(`https://api.github.com/repos/${owner}/${repository}/commits`, data => {
    $("#details").text(renderCommits(data));
  }).fail(function(error) {
    displayError(error);
  });
}

function renderCommits(data) {
  data.map(result => renderCommit(result).join(""))
  return `<ul>${result}</ul>`
}

function renderCommit(result) {
  return  `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

function displayCommits(results) {
  let template = Handlebars.compile($("#commits-template").html());
  let result = template(results);
  document.getElementById('details').innerHTML = result;
}
