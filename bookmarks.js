// Initial bookmarks data
let bookmarksData = [];

// Load bookmarks from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('bookmarks')) {
    bookmarksData = JSON.parse(localStorage.getItem('bookmarks'));
    displayBookmarks();
  }
});

// JavaScript for handling form submission
document.getElementById('bookmarkForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get form values
  let siteName = document.getElementById('siteName').value;
  let siteUrl = document.getElementById('siteUrl').value;

  // Create bookmark object
  let bookmark = {
    id: Date.now(), 
    name: siteName,
    url: siteUrl
  };

  // Add bookmark to bookmarks array
  addBookmark(bookmark);

  // Clear form
  document.getElementById('bookmarkForm').reset();
});

// Function to add a bookmark
function addBookmark(bookmark) {
  bookmarksData.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarksData));
  displayBookmarks();
}

// Function to display bookmarks
function displayBookmarks() {
  let bookmarksList = document.querySelector('.bookmarks');
  bookmarksList.innerHTML = '';

  bookmarksData.map(function (bookmark) {
    let bookmarkElement = document.createElement('li');
    bookmarkElement.classList.add('bookmark');
    bookmarkElement.innerHTML = `
            <h3>${bookmark.name}</h3>
            <p><a href="${bookmark.url}" target="_blank">${bookmark.url}</a></p>
            <button onclick="deleteBookmark(${bookmark.id})">Delete</button>
            <button onclick="navigateToEdit(${bookmark.id})">Edit</button>
        `;
    bookmarksList.appendChild(bookmarkElement);
  });
}

// Function to delete a bookmark
function deleteBookmark(id) {
  bookmarksData = bookmarksData.filter(function (bookmark) {
    return bookmark.id !== id;
  });
  localStorage.setItem('bookmarks', JSON.stringify(bookmarksData));
  displayBookmarks();
}

// Function to navigate to the edit page
function navigateToEdit(id) {
  window.location.href = 'editBookmark.html?id=' + id;
}


