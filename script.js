document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.getElementById("todo-list");

    // Array of time slots
    const timeSlots = [
        "12 am to 1 am", "1 am to 2 am", "2 am to 3 am", "3 am to 4 am",
        "4 am to 5 am", "5 am to 6 am", "6 am to 7 am", "7 am to 8 am",
        "8 am to 9 am", "9 am to 10 am", "10 am to 11 am", "11 am to 12 pm",
        "12 pm to 1 pm", "1 pm to 2 pm", "2 pm to 3 pm", "3 pm to 4 pm",
        "4 pm to 5 pm", "5 pm to 6 pm", "6 pm to 7 pm", "7 pm to 8 pm",
        "8 pm to 9 pm", "9 pm to 10 pm", "10 pm to 11 pm", "11 pm to 12 am"
    ];

    // Load saved to-do items from local storage
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

    // Ensure 24 to-do boxes are created, even if some are not saved
    for (let i = 0; i < 24; i++) {
        const todo = savedTodos[i] || { text: "", status: "", note: "" };
        createTodoBox(todoList, i, timeSlots[i], todo.status, todo.note);
    }

    // Clear Memory button functionality
    const clearButton = document.getElementById("clear-memory");
    clearButton.addEventListener("click", () => {
        const confirmClear = confirm("Are you sure you want to clear all to-do items?");
        if (confirmClear) {
            localStorage.removeItem("todos");
            location.reload(); // Reload the page to clear the displayed items
        }
    });

    function createTodoBox(container, index, timeSlot, status = "", note = "") {
        const todoBox = document.createElement("div");
        todoBox.classList.add("todo-box");
        if (status === "green") todoBox.classList.add("green");
        else if (status === "yellow") todoBox.classList.add("yellow");
        else if (status === "red") todoBox.classList.add("red");

        const header = document.createElement("div");
        header.classList.add("todo-header");
        const title = document.createElement("h2");
        title.textContent = timeSlot;
        header.appendChild(title);

        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("buttons");

        const successBtn = document.createElement("button");
        successBtn.textContent = "Success";
        successBtn.classList.add("success");
        successBtn.addEventListener("click", () => {
            updateTodoStatus(todoBox, index, "green");
        });

        const pendingBtn = document.createElement("button");
        pendingBtn.textContent = "Pending";
        pendingBtn.classList.add("pending");
        pendingBtn.addEventListener("click", () => {
            updateTodoStatus(todoBox, index, "yellow");
        });

        const notDoneBtn = document.createElement("button");
        notDoneBtn.textContent = "Not Done";
        notDoneBtn.classList.add("not-done");
        notDoneBtn.addEventListener("click", () => {
            updateTodoStatus(todoBox, index, "red");
        });

        buttonsDiv.appendChild(successBtn);
        buttonsDiv.appendChild(pendingBtn);
        buttonsDiv.appendChild(notDoneBtn);
        header.appendChild(buttonsDiv);

        todoBox.appendChild(header);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
            todoBox.style.display = "none"; // Hide the todo box when clicked
        });
        todoBox.appendChild(deleteButton);

        const noteSection = document.createElement("div");
        noteSection.classList.add("note-section");

        const noteArea = document.createElement("textarea");
        noteArea.value = note;
        noteArea.placeholder = "Add your note here...";
        noteArea.addEventListener("input", () => {
            updateTodoNote(index, noteArea.value);
        });

        noteSection.appendChild(noteArea);
        todoBox.appendChild(noteSection);

        container.appendChild(todoBox);
    }

    function updateTodoStatus(todoBox, index, status) {
        todoBox.classList.remove("green", "yellow", "red");
        todoBox.classList.add(status);

        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos[index] = { ...todos[index], status };
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function updateTodoNote(index, note) {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos[index] = { ...todos[index], note };
        localStorage.setItem("todos", JSON.stringify(todos));
    }
});
