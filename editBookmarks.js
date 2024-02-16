document.addEventListener('DOMContentLoaded', function () {
    // Parse the URL to extract the 'id' query parameter
    let urlParams = new URLSearchParams(window.location.search);
    let editBookmarkId = urlParams.get('id');

    // Fetch the bookmarks data from local storage
    let bookmarksData = JSON.parse(localStorage.getItem('bookmarks'));

    // Find the bookmark with the matching ID
    let bookmarkToEdit = bookmarksData.find(function (bookmark) {
        return bookmark.id === parseInt(editBookmarkId);
    });

    // Pre-fill the form fields with the bookmark data
    document.getElementById('editSiteName').value = bookmarkToEdit.name;
    document.getElementById('editSiteUrl').value = bookmarkToEdit.url;

    // Add event listener to handle form submission
    document.getElementById('editBookmarkForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Update the bookmark data with the form values
        bookmarkToEdit.name = document.getElementById('editSiteName').value;
        bookmarkToEdit.url = document.getElementById('editSiteUrl').value;

        // Update the bookmarks array in local storage
        let updatedBookmarksData = bookmarksData.map(function (bookmark) {
            if (bookmark.id === parseInt(editBookmarkId)) {
                return bookmarkToEdit;
            }

            return bookmark;
        });

        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarksData));

        // Redirect back to the bookmark list page
          window.location.href = 'bookmarks.html';
    });
});
