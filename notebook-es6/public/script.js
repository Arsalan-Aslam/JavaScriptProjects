// Get DOM Elements
const list = document.getElementById('list');
const form = document.getElementById('add-form');
const noteTitle = document.getElementById('note-title');
const noteDescr = document.getElementById('note-descr');
const delAll = document.getElementById('del-all');
const notesHeader = document.getElementById('notes-header');

const Notes = [];
// get storedData from localStorage
const storedData = JSON.parse(localStorage.getItem('data'));

let notes;

// Get notes data from storage
if (storedData !== null) {
    notes = storedData;
} else {
    notes = Notes;
}

// Function to display notes in DOM - Notes section
const displayNote = (note) => {
    // Create a div for the note
    const noteDiv = document.createElement('div');
    // Add note class to the div
    noteDiv.classList.add('note');
    // Assign the innerHTML for the note div
    noteDiv.innerHTML = `
        <h4>${note.title}</h4>
        <p>${note.description}</p>
        <button class="edit-btn" onclick="editNote(${note.id})">Edit</button>
        <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
    `;
    // Add the li in the DOM under the ransaction history list
    list.appendChild(noteDiv);
    // // show Notes Heading and Delete all link if there any notes
    showHeader();
    // if (notes.length > 0) {
    //     notesHeader.classList.remove("hide");
    // }
};

// function to show or hide "Notes" Heading and "Delete all" link if there any notes
const showHeader = () => {
    if (notes.length > 0) {
        notesHeader.classList.remove("hide");
    } else {notesHeader.classList.add("hide");}
};

// Function to create a random ID
const createID = () => {
    return Math.floor(Math.random() * 100000000000);
};

// Function to add a note from the form
const addNote = (e) => {
    // stop the page reload
    e.preventDefault();
    // Check id form has valid data
    if ( noteTitle.value.trim() === '' || noteDescr.value.trim() === '') {
        // Display error message if form is not complete
        alert('Please provide a title and description for the note');
    } else {
        // Create an object for the note containing id, text for the title, and description
        const note = {
            id: createID(),
            title: noteTitle.value,
            description: noteDescr.value
        };

        // Push the new note into the notes array
        notes.push(note);

        // // Saving data to local storage
        saveData();
        
        // Display the new note in the DOM
        displayNote(note);
    
        // Clear form fields
        noteTitle.value = '';
        noteDescr.value = '';
    }
};

// function to save data to local storage
const saveData = () => localStorage.setItem('data',JSON.stringify(notes));

// Function to delete note from the notes
const deleteNote = (id) => {
    
    // Filter out the note with the provided id
    // notes = notes.filter( note => note.id !== id);

    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === id) {
            notes.splice(i,1);
        }
    }
    showHeader();
    saveData();
    // initialize the app again to update the DOM
    init();
}

// Function to edit a note in the notes
const editNote = (id) => {

    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === id) {
            notes[i].title = prompt("Please update the title.", notes[i].title);
            notes[i].description = prompt("Please update the description.", notes[i].description);
        }
    }
    // initialize the app again to update the DOM
    saveData();
    init();
}

// Function to Initialize the Application
const init = () => {
    // Clear all notes
    list.innerHTML = '';
    // Display all notes in db in the DOM
    // notes.forEach(displayNote);
    for (let i = 0; i < notes.length; i++) {
        // console.log(notes[i]);
        displayNote(notes[i]);
    }
};

const deleteAll = () => {
    notes = [];
    saveData();
    init();
    // console.log(notes);
}

delAll.onclick = deleteAll;

// Event Listener
// 1. Listen for form submit to add a note
form.addEventListener('submit', addNote);

// Initialize the Application
init();