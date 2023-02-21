const reposEl = document.getElementById("repos");
function getRepoName () {
    let qurStr = document.location.search;
    let repoName = qurStr.split('=')[1];

    if(repoName){
        getIssues(repoName)
    }
}

function getIssues (repoName) {
    let apiUrl = "https://api.github.com/repos/"+ repoName +"/issues";
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => displayIssues(data))
    .catch(err => alert("something wrong!!"))
}

function displayIssues(issues) {
    if(issues.length == 0){
        reposEl.innerHTML = "No issues Found...!!";
        return;
    }
    issues.forEach((issue) => {
        reposEl.innerHTML += `
        <a href='' class="repo-item">
            <span>${issue.title}</span>
        </a>
        `
    })
}
getRepoName();
