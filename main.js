document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('inventoryForm');
    const resourcesContainer = document.querySelector('.resources');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Get form values
        const bookName = document.getElementById('bookName').value;
        const bookPrice = parseFloat(document.getElementById('bookPrice').value);
        const inStock = parseInt(document.getElementById('inStock').value);

        // Validate form fields
        if (!bookName || isNaN(bookPrice) || isNaN(inStock)) {
            alert('Please fill out all fields with valid values.');
            return;
        }

        // Fetch book cover (replace this with actual cover URL or API call)
        const bookCover = "https://via.placeholder.com/100x150";

        // Create new resource element
        const newResource = document.createElement('div');
        newResource.classList.add('resource');
        newResource.innerHTML = `
            <img src="${bookCover}" alt="${bookName} Cover" class="book-cover">
            <h2>${bookName}</h2>
            <p>Name: ${bookName}</p>
            <p>Price: $${bookPrice.toFixed(2)}</p>
            <button onclick="startEditing(this)">In Stock: <span>${inStock}</span></button>
            <button onclick="removeResource(this.parentNode)">Remove</button>
        `;

        // Add the new resource to the beginning of the list
        resourcesContainer.prepend(newResource);

        // Clear the form
        form.reset();
    });
});

function removeResource(resourceNode) {
    // Remove the parent element of the clicked "Remove" button
    resourceNode.remove();
}

function startEditing(button) {
    const span = button.querySelector('span');
    const currentInStock = parseInt(span.textContent);
    
    // Create an input field for editing
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = currentInStock;
    inputField.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            finishEditing(button, inputField);
        } else if (event.key === 'Escape') {
            cancelEditing(button, inputField);
        }
    });

    // Replace the span with the input field
    button.replaceChild(inputField, span);

    // Focus the input field
    inputField.focus();
}

function finishEditing(button, inputField) {
    const newInStock = parseInt(inputField.value);

    if (!isNaN(newInStock)) {
        // Update the "In Stock" value in the button's span
        button.innerHTML = `In Stock: <span>${newInStock}</span>`;
    } else {
        alert('Invalid input. Please enter a valid number.');
    }
}

function cancelEditing(button, inputField) {
    // Replace the input field with the original span
    button.replaceChild(inputField.nextElementSibling, inputField);
}
