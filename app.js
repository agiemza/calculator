const values = {
    screen: 0,
}

const screen = document.querySelector(".screen-input")

const numberButtons = document.querySelectorAll(".number-button")
numberButtons.forEach(button => {
    button.addEventListener("click", e => {
        values.screen = +e.target.value
        screen.value = values.screen
    })
})

const mathButtons = document.querySelectorAll(".math-button")
mathButtons.forEach(button => {
    button.addEventListener("click", e => {
        console.log(e.target.attributes["data-operator"].value)
    })
}
)