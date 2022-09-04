const PASSWORD_LENGTH = 15;
const numbers = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
const characters = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q",
    "R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h",
    "i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y",
    "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@",
    "#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",",
    "|",":",";","<",">",".","?","/"];

let generatePasswordsEl = document.getElementById("generate-passwords-el");
let useLettersEl = document.getElementById("use-symbols-el");
let password1El = document.getElementById("password1-el");
let password2El = document.getElementById("password2-el");

function generatePassword(passwordLength, useCharacters) {
    let password = '';
    let symbols = useCharacters ? characters : numbers;
    for(let i = 0; i < passwordLength; i++) {
        password += symbols[Math.floor(Math.random() * symbols.length)];
    }
    return password;
}

generatePasswordsEl.addEventListener('click', () => {
    let checked = useLettersEl.checked;
    let password1 = generatePassword(PASSWORD_LENGTH, checked);
    password1El.textContent = password1;
    let password2 = generatePassword(PASSWORD_LENGTH, checked);
    password2El.textContent = password2;
})
