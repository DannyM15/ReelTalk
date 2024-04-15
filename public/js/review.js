const newReviewHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#movie-title').value.trim();
    const review = document.querySelector('#post-review').value.trim();
    const rating = parseFloat(document.querySelector('#movie-rating').value.trim());
  
    if (title && review && rating && rating >= 0 && rating <= 5) {
      const response = await fetch(`/api/review`, {
        method: 'POST',
        body: JSON.stringify({ title, review, rating }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/review');
      } else {
        alert('Failed to add review');
      }
    } else {
      alert('Please provide a valid title, review, and rating between 0 and 5.');
    }
  };
  
  const deleteReviewHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/reviews');
      } else {
        alert('Failed to delete review');
      }
    }
  };
  
  document
    .querySelector('.new-review-form')
    .addEventListener('submit', newReviewHandler);
  
  document
    .querySelector('.review-list')
    .addEventListener('click', deleteReviewHandler);