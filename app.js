const values = {
    screen: 0,
}

const numberButtons = document.querySelectorAll(".number-button")
numberButtons.forEach(button => {
    button.addEventListener("click", e => {
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