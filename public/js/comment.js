const newFormHandler = async (event) => {
    event.preventDefault();
  
    const commentText = document.querySelector('#comment-text').value.trim();
    // const needed_funding = document.querySelector('#project-funding').value.trim();
    // const review = document.querySelector('#project-desc').value.trim();
  
    if (commentText) {
      console.log("======", commentText)
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ commentText }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert('Failed to create post');
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
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.comment-list')
    .addEventListener('click', delButtonHandler);
  