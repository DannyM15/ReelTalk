const { default: StarRating } = require("star-rating.js");

const newReviewHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#movie-title').value.trim();
    const review = document.querySelector('#post-review').value.trim();
    // const rating = document.querySelector('#movie-rating').value.trim();
  
    if (title && review ) {
      const response = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({ title, post: review, StarRating }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
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
  
  // document
  //   .querySelector('.review-list')
  //   .addEventListener('click', deleteReviewHandler);