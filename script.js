// Memory array to store the submitted memories
let memories = [];
let editIndex = null;

// DOM elements
const mainContainer = document.getElementById("mainContainer");
const passwordContainer = document.getElementById("passwordContainer");
const writeButton = document.getElementById("writeButton");
const readButton = document.getElementById("readButton");
const memoryForm = document.getElementById("memoryForm");
const passwordForm = document.getElementById("passwordForm");
const nameInput = document.getElementById("name");
const dateInput = document.getElementById("date");
const memoryInput = document.getElementById("memory");
const memoryDisplay = document.getElementById("memoryDisplay");

// Function to handle password submission
function handlePasswordSubmit(event) {
  event.preventDefault();
  const password = document.getElementById("password").value;

  // Check if the entered password is correct
  if (password === "july3") {
    passwordContainer.style.display = "none";
    mainContainer.style.display = "block";
    setMode("read");
  } else {
    alert("Incorrect password. Please try again.");
  }
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value;
  const date = dateInput.value;
  const memory = memoryInput.value;

  // Create memory object
  const newMemory = {
    name: name,
    date: date,
    memory: memory
  };

  if (editIndex !== null) {
    // Edit existing memory
    memories[editIndex] = newMemory;
  } else {
    // Add new memory
    memories.push(newMemory);
  }

  // Clear the form
  nameInput.value = "";
  dateInput.value = "";
  memoryInput.value = "";

  // Display the updated memories
  updateMemoryDisplay();

  // Save memories to localStorage
  saveMemoriesToStorage();
}

// Function to delete a memory
function deleteMemory(index) {
  const confirmDelete = confirm("Are you sure you want to delete this memory?");
  if (confirmDelete) {
    memories.splice(index, 1);
    updateMemoryDisplay();
    saveMemoriesToStorage();
  }
}

// Function to edit a memory
function editMemory(index) {
  const memory = memories[index];
  nameInput.value = memory.name;
  dateInput.value = memory.date;
  memoryInput.value = memory.memory;
  editIndex = index;
  setMode("write");
}

// Function to update the memory display
function updateMemoryDisplay() {
  memoryDisplay.innerHTML = "";

  if (memories.length === 0) {
    memoryDisplay.innerHTML = "<p>No memories found.</p>";
    return;
  }

  for (let i = 0; i < memories.length; i++) {
    const memory = memories[i];

    const memoryElement = document.createElement("div");
    memoryElement.classList.add("memory");

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("onclick", `deleteMemory(${i})`);

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("edit-button");
    editButton.setAttribute("onclick", `editMemory(${i})`);

    const nameElement = document.createElement("h3");
    nameElement.innerText = memory.name;

    const dateElement = document.createElement("p");
    dateElement.innerText = memory.date;

    const memoryTextElement = document.createElement("p");
    memoryTextElement.innerText = memory.memory;

    memoryElement.appendChild(deleteButton);
    memoryElement.appendChild(editButton);
    memoryElement.appendChild(nameElement);
    memoryElement.appendChild(dateElement);
    memoryElement.appendChild(memoryTextElement);

    memoryDisplay.appendChild(memoryElement);
  }
}

// Function to set the mode (write/read)
function setMode(mode) {
  if (mode === "write") {
    writeButton.classList.add("active");
    readButton.classList.remove("active");
    memoryForm.style.display = "block";
    updateMemoryDisplay();
    editIndex = null;
  } else if (mode === "read") {
    readButton.classList.add("active");
    writeButton.classList.remove("active");
    memoryForm.style.display = "none";
    updateMemoryDisplay();
    editIndex = null;
  }
}

// Function to save memories to localStorage
function saveMemoriesToStorage() {
  localStorage.setItem("memories", JSON.stringify(memories));
}

// Function to load memories from localStorage
function loadMemoriesFromStorage() {
  const storedMemories = localStorage.getItem("memories");
  if (storedMemories) {
    memories = JSON.parse(storedMemories);
    updateMemoryDisplay();
  }
}

// Event listeners
passwordForm.addEventListener("submit", handlePasswordSubmit);
memoryForm.addEventListener("submit", handleFormSubmit);

// Load memories from localStorage on page load
loadMemoriesFromStorage();
