// Get DOM Elements
const list = document.getElementById('list');
const form = document.getElementById('add-form');
const noteTitle = document.getElementById('note-title');
const noteDescr = document.getElementById('note-descr');
const delAll = document.getElementById('del-all');


// Temporary array of notes - to be replaced with local storage
const Notes = [
    // { id: 1, title: 'Assignment #1', description: 'Please complete Assignment #1' },
    // { id: 2, title: 'Assignment #2', description: 'Please complete Assignment #2' },
    // { id: 3, title: 'Assignment #3', description: 'Please complete Assignment #3' },
    // { id: 4, title: 'Assignment #4', description: 'Please complete Assignment #4' },
];


// Get notes data from storage
let notes = Notes;


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
        // localStorage.setItem('data',JSON.stringify(notes));
        
        // const result = JSON.parse(localStorage.getItem('data'));
        // typeof result;
        // console.log(result);
        
        // Display the new note in the DOM
        displayNote(note);
    
        // Clear form fields
        noteTitle.value = '';
        noteDescr.value = '';
    }
};



// Function to delete note from the notes
const deleteNote = (id) => {
    
    // Filter out the note with the provided id
    // notes = notes.filter( note => note.id !== id);

    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === id) {
            notes.splice(i,1);
        }
    }
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
    init();
    // console.log(notes);
}

delAll.onclick = deleteAll;

// Event Listener
// 1. Listen for form submit to add a note
form.addEventListener('submit', addNote);

// Initialize the Application
init();