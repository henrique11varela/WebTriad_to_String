const inputAreaEl = document.querySelector("#inputArea");
const outputAreaEl = document.querySelector("#outputArea");
const pasteBtnEl = document.querySelector("#paste");
const stringifyBtnEl = document.querySelector("#stringify");
const copyBtnEl = document.querySelector("#copy");

function transform() {
    const inValue = inputAreaEl.value;
    const inValueArr = inValue.split("");
    const inValueArrFiltered = inValueArr.filter(c => c !== "\n");
    for (let i = 1; i < inValueArrFiltered.length; i++) {
        if (inValueArrFiltered[i] == "\"") {
            inValueArrFiltered.splice(i, 0, "\\");
            i++;
        }
        else if (inValueArrFiltered[i - 1] == " " && inValueArrFiltered[i] == " ") {
            inValueArrFiltered.splice(i, 1);
            i--;
        }
    }
    const outValue = inValueArrFiltered.join("");
    outputAreaEl.value = outValue;
}

stringifyBtnEl.onclick = transform;

copyBtnEl.onclick = function () {
    navigator.clipboard
        .writeText(outputAreaEl.value);
}

pasteBtnEl.onclick = function () {
    navigator.clipboard.readText()
        .then(cliptext => (inputAreaEl.value = cliptext), err => console.log(err))
        .then(function () {
            transform();
        });
}
