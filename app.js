const memory = {
    firstValue: 0,
    secondValue: 0,
    operation: null,
    isTyping: true,
    userInput: false,
}

const screen = document.querySelector(".screen-input")

const numberButtons = document.querySelectorAll(".number-button")
numberButtons.forEach(button => {
    button.addEventListener("click", e => {
        if (screen.value[0] === "0" && screen.value[1] !== "." && screen.value.length > 0) {
            screen.value = screen.value.substring(1)
        }
        if (memory.isTyping) {
            screen.value += e.target.value
        }
        else {
            screen.value = ""
            memory.isTyping = true
            screen.value += e.target.value
        }
        memory.userInput = true
        memory.secondValue = screen.value
    })
})

const mathButtons = document.querySelectorAll(".math-button")
mathButtons.forEach(button => {
    button.addEventListener("click", e => {
        const previousOperation = memory.operation
        const newOperation = e.target.attributes["data-operator"].value
        if (previousOperation === null) {
            memory.firstValue = memory.secondValue
        } else if (memory.userInput) {
            operate()
        }
        memory.operation = newOperation
        memory.isTyping = false
        memory.userInput = false
    })
})

const clearButton = document.querySelector(".clear-button")
clearButton.addEventListener("click", () => {
    memory.firstValue = 0
    memory.secondValue = 0
    memory.operation = null
    screen.value = ""
    memory.isTyping = true
    memory.userInput = false
})

const resultButton = document.querySelector(".result-button")
resultButton.addEventListener("click", () => {
    operate()
    memory.isTyping = false
    memory.userInput = false
})


function operate() {
    const firstValue = parseFloat(memory.firstValue)
    const secondValue = parseFloat(memory.secondValue)
    switch (memory.operation) {
        case "add":
            memory.firstValue = firstValue + secondValue
            screen.value = memory.firstValue
            break
        case "substract":
            memory.firstValue = firstValue - secondValue
            screen.value = memory.firstValue
            break
        case "multiply":
            memory.firstValue = firstValue * secondValue
            screen.value = memory.firstValue
            break
        case "divide":
            if (secondValue !== 0) {
                memory.firstValue = firstValue / secondValue
            } else {
                memory.firstValue = "71830"
            }
            screen.value = memory.firstValue
            break
        default:
            screen.value = memory.secondValue
            break
    }
}