let unitData = [
    {
        unit1: "meters",
        unit2: "feet",
        koeff: 3.281,
    },
    {
        unit1: "liters",
        unit2: "gallons",
        koeff: 0.264,
    },
    {
        unit1: "kilos",
        unit2: "pounds",
        koeff: 2.204,
    },
];

const valueInput = document.getElementById("value-input");
const convertBtn = document.getElementById("convert-btn");
const lengthTxt = document.getElementById("length-txt");
const volumeTxt = document.getElementById("volume-txt");
const massTxt = document.getElementById("mass-txt");

function createUnitString(value, unitData) {
    return `${value} ${unitData.unit1} = ${(value * unitData.koeff).toFixed(
        3
    )} ${unitData.unit2} | 
            ${value} ${unitData.unit2} = ${(value / unitData.koeff).toFixed(
        3
    )} ${unitData.unit1}`;
}

convertBtn.addEventListener("click", function () {
    let value = parseInt(valueInput.value);
    lengthTxt.textContent = createUnitString(value, unitData[0]);
    volumeTxt.textContent = createUnitString(value, unitData[1]);
    massTxt.textContent = createUnitString(value, unitData[2]);
});
