const newCommentHandler = async (event) => {
  event.preventDefault();
  for (let i = 0; i < document.querySelectorAll('#comment-text').length; i++) {
    const comment_text = document.querySelectorAll('#comment-text')[i].value.trim();
    // test to see of comment goes to post_id = 2
    const post_id = 2;
    if (comment_text) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        // might need post_id in here too?
        body: JSON.stringify({ post_id, comment_text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/posts');
      } else {
        alert('Failed to create comment');
      };
    };
  };
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
  // .querySelector('.new-comment-form')
  // .addEventListener('submit', newCommentHandler);

  .querySelectorAll('.new-comment-form').forEach(item => {
    item.addEventListener('submit', newCommentHandler)
  })

//   document
//     .querySelector('.comment-list')
//     .addEventListener('click', delButtonHandler);
