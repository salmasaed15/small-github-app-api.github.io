////Setup All Constanses//////////

const userFormEl = document.getElementById("user-form");
const userInputEl = document.getElementById("username");
const languageEl = document.querySelector(".language");
const searchTermEl = document.getElementById("search-term");
const reposEl = document.getElementById("repos");

////All Events//////
userFormEl.addEventListener("submit", formSubmitHanhler);
languageEl.addEventListener("click", handleClick);


//form validate///
function formSubmitHanhler (e){
    e.preventDefault();

    let user = userInputEl.value.trim();
    if(user){
        reposEl.innerHTML = "";
        getUserRepos(user);
    }else{
        alert("please Enter username")
    }
}
///fetch api/////
function getUserRepos(user){
    let apiUrl = "https://api.github.com/users/"+ user +"/repos";
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => displayRepos(data, user))
    .catch(err => alert("something wrong!!"))
};
//drow api in ui/////
function displayRepos(repos, searchTerm) {
    if(repos.length == 0){
        reposEl.innerHTML = "No Repos Found...!!";
        return;
    }
    searchTermEl.innerHTML = searchTerm;
    repos.forEach((repo) => {
        let name = repo.owner.login + '/' + repo.name;
        reposEl.innerHTML += `
        <a href='./repo.html?repo=${name}' class="repo-item">
            <span>${repo.owner.login}/${repo.name}</span>
            <span>${repo.open_issues_count > 0 ? "Yes Issues" : "No Issues"}</span>
        </a>
        `
    })
}
/////btn have name => data-lng (php) click to get ===> repos(php)
function handleClick (e) {
    let lng = e.target.getAttribute("data-lng");
    // console.log(lng);
    if(lng){
        reposEl.innerHTML = "";
        getLngRepos(lng);
    }
}
////////drow ui that have same name(php) like btn data-lng(php)
function getLngRepos (lng) {
        let apiUrl = "https://api.github.com/search/repositories?q="+ lng ;
        fetch(apiUrl)
        .then(res => res.json())
        .then(data => displayRepos(data.items, lng))
        .catch(err => alert("something wrong!!"))

}












