const checkBoxList = document.querySelectorAll(`.customCheckBox`)
const inputFields = document.querySelectorAll(`.goalInput`)
const errorLabel = document.querySelector(`.errorLabel`)
const progressBar = document.querySelector(`.progressBar`);
const progressValue = document.querySelector(`.progressValue`)
const progressLabel = document.querySelector(`.progressLabel`)

const allQuotes = [
    "Raise the bar by completing your goals",
    "Well begun is half done",
    "Just a step away, Keep going",
    "whoa! You just completed all the goals, time for chill :D"
]

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
    first: {
        name: "",
        completed: false
    },
    second: {
        name: "",
        completed: false
    },
    third: {
        name: "",
        completed: false
    }
}
let completedGoalsCount = Object.values(allGoals).filter(goals => goals.completed).length;
progressValue.style.width = `${completedGoalsCount / 3 * 100}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount} / 3 Completed`
progressLabel.innerText = allQuotes[completedGoalsCount]


checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
        const allGoalsAdded = [...inputFields].every((input) => {
            return input.value;
        })
        // console.log(allGoalsAdded);
        if (allGoalsAdded) {
            checkbox.parentElement.classList.toggle("completed")
            const inputId = checkbox.nextElementSibling.id;
            allGoals[inputId].completed = !allGoals[inputId].completed;
            completedGoalsCount = Object.values(allGoals).filter(goals => goals.completed).length;
            progressValue.style.width = `${completedGoalsCount / 3 * 100}%`
            progressValue.firstElementChild.innerText = `${completedGoalsCount} / 3 Completed`
            progressLabel.innerText = allQuotes[completedGoalsCount];
            localStorage.setItem("allGoals", JSON.stringify(allGoals));

        } else {
            progressBar.classList.add("showError");
        }
    })
})
inputFields.forEach((input) => {
    input.value = allGoals[input.id].name;
    if (allGoals[input.id].completed) {
        input.parentElement.classList.add("completed");
    }
    input.addEventListener("focus", () => {
        progressBar.classList.remove("showError");
    })

    input.addEventListener("input", (e) => {
        if (allGoals[input.id].completed) {
            input.value = allGoals[input.id].name
            return
        }
        allGoals[input.id].name = input.value
        localStorage.setItem("allGoals", JSON.stringify(allGoals));
        console.log(allGoals);
    })

})