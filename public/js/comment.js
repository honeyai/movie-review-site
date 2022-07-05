const newCommentHandler = async (event) => {
  event.preventDefault();
  const comment_text = document.querySelector('#comment-text').value.trim();
  // const post_id = window.location.toString().split('/')[
  //   window.location.toString().split('/').length - 1
  // ];

  // test to see of comment goes to post_id = 2
  const post_id = 2;

  console.log("Window.location", window.location);
  console.log("Window.location array", window.location.toString().split('/'));

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
