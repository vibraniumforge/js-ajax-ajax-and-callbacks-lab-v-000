$(document).ready(function(){
});

function displayError() {
    $("#errors").text("I'm sorry, there's been an error. Please try again.");
}

function searchRepositories() {
  const username = $("#searchTerms").val();
  $.get(`https://api.github.com/search/repositories?q=${username}/`, response => {
    $("#results").html(renderRepositories(response))
  }).fail(function(error) {
    displayError(error);
  });
}
// (/https:\/\/api.github.com\/search\/repositories\?q=tetris/)

function renderRepositories(data) {
  return data.items.map(result=> renderSearchResult(result))
}

function renderSearchResult(result) {
  return `
    <div>
      <h3><a href="${result.html_url}">${result.name}</a></h3>
      <p> <a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      <p>${result.description ?result.description : "No description" }</p>
    </div>
    <hr>
    `
}

function showCommits(el) {
  const repository = el.dataset.repository;
  const owner = el.dataset.owner;
  $.get(`https://api.github.com/repos/${owner}/${repository}/commits`, data => {
    $("#details").html(renderCommits(data));
  }).fail(function(error) {
    displayError(error);
  });
}

function renderCommits(data) {
  let result = data.map(commit => renderCommit(commit)).join("")
  return `<ul>${result}</ul>`
}

function renderCommit(commit) {
  return  `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

function displayCommits(results) {
  let template = Handlebars.compile($("#commits-template").html());
  let result = template(results);
  document.getElementById('details').innerHTML = result;
}
