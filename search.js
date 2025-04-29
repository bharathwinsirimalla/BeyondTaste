// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Get the search input
    const searchInput = document.getElementById('menuSearch');
    console.log('Search input found:', searchInput);
    
    // If we found the search input
    if (searchInput) {
        // Add event listener for input changes
        searchInput.addEventListener('input', function() {
            console.log('Search input changed:', this.value);
            searchMenu(this.value);
        });
    } else {
        console.error('Search input not found');
    }
});

// Function to search menu items
function searchMenu(searchTerm) {
    console.log('Searching for:', searchTerm);
    
    // Convert search term to lowercase
    searchTerm = searchTerm.toLowerCase();
    
    // Get all menu items
    const menuItems = document.querySelectorAll('.menu-item');
    console.log('Found menu items:', menuItems.length);
    
    // Flag to track if we found any matches
    let foundMatch = false;
    
    // Loop through each menu item
    menuItems.forEach(function(item) {
        // Get the item name and description
        const name = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        
        // Check if either name or description contains the search term
        if (name.includes(searchTerm) || description.includes(searchTerm)) {
            // Show the item
            item.style.display = 'block';
            foundMatch = true;
        } else {
            // Hide the item
            item.style.display = 'none';
        }
    });
    
    // Handle the "no results" message
    const noResultsMsg = document.querySelector('.no-results-message');
    
    if (!foundMatch) {
        // If no matches and no message exists, create one
        if (!noResultsMsg) {
            const message = document.createElement('div');
            message.className = 'no-results-message text-center py-8 text-gray-500 col-span-full';
            message.textContent = 'No items found matching your search.';
            document.querySelector('.menu-section').appendChild(message);
        }
    } else if (noResultsMsg) {
        // If we found matches and message exists, remove it
        noResultsMsg.remove();
    }
} 