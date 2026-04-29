import { $id } from './utils.js';

/**
 * Event handlers for specific user interactions like validation and file uploads.
 */

/**
 * Validate LinkedIn URL input
 */
export function validateLinkedIn() {
    const url = $id("liUrl").value.trim();
    if (!url) {
        alert("Please paste a LinkedIn URL");
        return;
    }
    // Simple alert for demo purposes
    alert("URL validated!");
}

/**
 * CSV File Handling
 */
export function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        displaySelectedFile(file.name);
    }
}

export function handleFileDrop(event) {
    event.preventDefault();
    $id("csvDrop").classList.remove("over");
    
    const file = event.dataTransfer.files[0];
    if (file) {
        displaySelectedFile(file.name);
    }
}

function displaySelectedFile(fileName) {
    const msgEl = $id("csvMsg");
    const nameEl = $id("csvFN");
    
    nameEl.textContent = `${fileName} selected`;
    msgEl.style.display = "flex";
}
