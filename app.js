const memory = {
    firstValue: 0,
    secondValue: 0,
    operation: null,
    isTyping: true,
    userInput: false,
    storage: 0,
}

const screen = document.querySelector(".screen-input")
const alertContainer = document.querySelector(".alert-container")
const keypad = document.querySelector(".keypad")

const numberButtons = document.querySelectorAll(".number-button")
numberButtons.forEach(button => {
    button.addEventListener("click", e => {
        if (screen.value.length < 10) {
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
        }
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

const backspaceButton = document.querySelector(".backspace-button")
backspaceButton.addEventListener("click", () => {
    if (memory.isTyping) {
        screen.value = screen.value.slice(0, -1)
    }
})

const clearButton = document.querySelector(".clear-button")
clearButton.addEventListener("click", reset)

function reset() {
    memory.firstValue = 0
    memory.secondValue = 0
    memory.operation = null
    screen.value = ""
    memory.isTyping = true
    memory.userInput = false
}

const resultButton = document.querySelector(".result-button")
resultButton.addEventListener("click", () => {
    operate()
    memory.isTyping = false
    memory.userInput = false
})

function showResult(element) {
    element = +element.toPrecision(10)
    if (element > 1000000000) {
        element = parseFloat(element).toPrecision(1)
    } else {
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
                showResult(memory.firstValue)
            } else {
                reset()
                keypad.onmousedown = () => {
                    alertContainer.innerText = ""
                    keypad.onmousedown = ""
                }
                alertContainer.innerText = "You fool, that's an error!"
            }
            break
        default:
            showResult(memory.secondValue)
            break
    }
}

const memoryIcon = document.querySelector(".memory-container")

const memoryButtons = document.querySelectorAll(".memory-button")
memoryButtons.forEach(button => {
    button.addEventListener("click", e => {
        switch (e.target.attributes["data-memory"].value) {
            case "clear":
                memoryIcon.classList.remove("opacity-1")
                memory.storage = 0
                break
            case "add":
                if (screen.value) {
                    memoryIcon.classList.add("opacity-1")
                    memory.storage += parseFloat(screen.value)
                }
                break
            case "substract":
                if (screen.value) {
                    memoryIcon.classList.add("opacity-1")
                    memory.storage -= parseFloat(screen.value)
                }
                break
            case "recall":
                memory.secondValue = memory.storage
                showResult(memory.secondValue)
                break
        }
    })
})

window.onkeydown = e => {
    e.key === "Enter" && document.querySelector(".result-button").click()
    const allButtons = document.querySelectorAll("[data-key]")
    allButtons.forEach(button => {
        if(e.key == button.attributes["data-key"].value) {
            console.log(button)
            button.click()
        }
    })
}