let colorInput = document.getElementById("color-input");
let modeSelect = document.getElementById("mode-select");
let colorMarkers = [
    document.getElementById("color-marker-1"),
    document.getElementById("color-marker-2"),
    document.getElementById("color-marker-3"),
    document.getElementById("color-marker-4"),
    document.getElementById("color-marker-5"),
];
let colorLabels = [
    document.getElementById("color-label-1"),
    document.getElementById("color-label-2"),
    document.getElementById("color-label-3"),
    document.getElementById("color-label-4"),
    document.getElementById("color-label-5"),
];
let submitSchemeBtn = document.getElementById("sumbit-scheme-btn");

submitSchemeBtn.addEventListener("click", (el, event) => {
    el.preventDefault();
    updateScheme();
});

updateScheme();

function updateScheme() {
    let color = colorInput.value.slice(1);
    let mode = modeSelect.value;
    fetch(
        `https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${mode}&count=6`
    )
        .then((responce) => responce.json())
        .then((data) => {
            for (let i = 0; i < colorMarkers.length; i++)
                colorMarkers[i].style.backgroundColor =
                    data.colors[i].hex.value;
            for (let i = 0; i < colorLabels.length; i++)
                colorLabels[i].textContent = data.colors[i].hex.value;
        });
}
