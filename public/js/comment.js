const newCommentHandler = async (event) => {
  event.preventDefault();
  const comment_text = document.querySelector('#comment-text').value.trim();
  // const needed_funding = document.querySelector('#project-funding').value.trim();
  // const review = document.querySelector('#project-desc').value.trim();

  if (comment_text) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment_text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/post');
    } else {
      alert('Failed to create comment');
    }
  }
};

//   const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');

//       const response = await fetch(`/api/posts/${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         document.location.replace('/profile');
//       } else {
//         alert('Failed to delete post');
//       }
//     }
//   };

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);

//   document
//     .querySelector('.comment-list')
//     .addEventListener('click', delButtonHandler);
