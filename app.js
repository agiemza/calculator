const values = {
    screen: "",
}

const screen = document.querySelector(".screen-input")

const numberButtons = document.querySelectorAll(".number-button")
numberButtons.forEach(button => {
    button.addEventListener("click", e => {
        values.screen += e.target.value
        updateScreen(values.screen)
    })
})

const mathButtons = document.querySelectorAll(".math-button")
mathButtons.forEach(button => {
    button.addEventListener("click", e => {
        console.log(e.target.attributes["data-operator"].value)
    })
})

const clearButton = document.querySelector(".clear-button")
clearButton.addEventListener("click", () => {
    values.screen = ""
    updateScreen(values.screen)
})

function updateScreen(value) {
    screen.value = value
}