const dragList = document.getElementById("drag-list");
const check = document.getElementById("check");

const persons = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

// Store list items
const listItems = [];

let dragStartIndex;

createList();

// Create list items in the DOM and scrumbling them in random order
function createList() {
    [...persons]
    .map(a => ({ value: a, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
        const listItem = document.createElement("li");

        listItem.setAttribute("data-index", index);

        listItem.innerHTML = `
        <span class="number">${index + 1} </span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
        </div>`;

        listItems.push(listItem);

        dragList.appendChild(listItem);
    });

    addEventListeners();
}

function dragStart() {
    dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
    this.classList.add("over");
}

function dragOver(e) {
    e.preventDefault();
}

function dragLeave() {
    this.classList.remove("over");
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute("data-index");
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove("over");
}

// Swapping items
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector(".draggable");
    const itemTwo = listItems[toIndex].querySelector(".draggable");

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector(".draggable")
        .innerText.trim();

        if(personName !== persons[index]) {
            listItem.classList.add("wrong");
        } else {
            listItem.classList.remove("wrong");
            listItem.classList.add("right");
        }
    });
}

function addEventListeners() {
    const draggables = document.querySelectorAll(".draggable");
    const dragListItems = document.querySelectorAll(".drag-list li");

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener("dragover", dragOver);
        item.addEventListener("drop", dragDrop);
        item.addEventListener("dragenter", dragEnter);
        item.addEventListener("dragleave", dragLeave);
    });
}

// Check button
check.addEventListener("click", checkOrder);

