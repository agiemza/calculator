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

const dotButton = document.querySelector(".dot-button")
dotButton.addEventListener("click", e => {
    if (!/\./.test(screen.value)) {
        screen.value += "."
    }
})

const mathButtons = document.querySelectorAll(".math-button")
mathButtons.forEach(button => {
    button.addEventListener("click", e => {
        const previousOperation = memory.operation
        const newOperation = e.target.attributes["data-operator"].value
        if (newOperation === "percent") {
            if (!memory.firstValue) {
                memory.firstValue = 1
            }
            memory.secondValue = memory.firstValue * (memory.secondValue / 100)
            showResult(memory.secondValue)
        } else {
            if (previousOperation === null) {
                memory.firstValue = memory.secondValue
            } else if (memory.userInput) {
                operate()
            }
            memory.operation = newOperation
            memory.isTyping = false
            memory.userInput = false
        }
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

function showResult(element) {
    element = +element.toPrecision(9)
    if (element > 10000000) {
        element = parseFloat(element).toPrecision(1)
    }
    else {
        if (element % 1 != 0) {
            element = element.toFixed(5)
            while (element.toString().slice(-1) === "0") {
                element = +element.slice(0, -1)
            }
        } else {
            element = element.toFixed()
        }
    }
    screen.value = element
}

function operate() {
    const firstValue = parseFloat(memory.firstValue)
    const secondValue = parseFloat(memory.secondValue)
    switch (memory.operation) {
        case "add":
            memory.firstValue = firstValue + secondValue
            showResult(memory.firstValue)
            break
        case "substract":
            memory.firstValue = firstValue - secondValue
            showResult(memory.firstValue)
            break
        case "multiply":
            memory.firstValue = firstValue * secondValue
            showResult(memory.firstValue)
            break
        case "divide":
            if (secondValue !== 0) {
                memory.firstValue = firstValue / secondValue
            } else {
                memory.firstValue = 71830
            }
            showResult(memory.firstValue)
            break
        default:
            showResult(memory.secondValue)
            break
    }
}