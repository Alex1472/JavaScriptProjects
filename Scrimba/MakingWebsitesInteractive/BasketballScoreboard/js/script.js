let homeScoreLabel = document.getElementById("home-score-label");
let guestScoreLabel = document.getElementById("guest-score-label");

let homeScore = 0;
let guestScore = 0;
homeScoreLabel.textContent = homeScore;
guestScoreLabel.textContent = guestScore;

function addOneHome() {
    homeScore += 1;
    homeScoreLabel.textContent = homeScore;
}
function addTwoHome() {
    homeScore += 2;
    homeScoreLabel.textContent = homeScore;
}
function addThreeHome() {
    homeScore += 3;
    homeScoreLabel.textContent = homeScore;
}
function addOneGuest() {
    guestScore += 1;
    guestScoreLabel.textContent = guestScore;
}
function addTwoGuest() {
    guestScore += 2;
    guestScoreLabel.textContent = guestScore;
}
function addThreeGuest() {
    guestScore += 3;
    guestScoreLabel.textContent = guestScore;
}
