const memory = {
    firstValue: 0,
    secondValue: 0,
    operation: null,
    isListening: true,
}

const screen = document.querySelector(".screen-input")

const numberButtons = document.querySelectorAll(".number-button")
numberButtons.forEach(button => {
    button.addEventListener("click", e => {
        if (screen.value[0] === "0" && screen.value[1] !== ".") {
            screen.value = screen.value.substring(1)
        }
        if (memory.isListening) {
            screen.value += e.target.value
        }
        else {
            screen.value = ""
            memory.isListening = true
            screen.value += e.target.value
        }
        memory.secondValue = screen.value
    })
})

const mathButtons = document.querySelectorAll(".math-button")
mathButtons.forEach(button => {
    button.addEventListener("click", e => {
        memory.operation = e.target.attributes["data-operator"].value
        memory.firstValue = screen.value
        memory.isListening = false
    })
})

const clearButton = document.querySelector(".clear-button")
clearButton.addEventListener("click", () => {
    memory.firstValue = 0
    memory.secondValue = 0
    memory.operation = null
    screen.value = ""
})

const resultButton = document.querySelector(".result-button")
resultButton.addEventListener("click", () => {
    memory.isListening = false
    operate()
})


function operate() {
    const firstValue = parseFloat(memory.firstValue)
    const secondValue = parseFloat(memory.secondValue)
    switch (memory.operation) {
        case "add":
            memory.firstValue = firstValue + secondValue
            break
        case "substract":
            memory.firstValue = firstValue - secondValue
            break
        case "multiply":
            memory.firstValue = firstValue * secondValue
            break
        case "divide":
            if (secondValue !== 0) {
                memory.firstValue = firstValue / secondValue
            } else {
                memory.firstValue = "71830"
            }
            break
        default:
            console.log("no operation declared")
            break
    }
    screen.value = memory.firstValue
}