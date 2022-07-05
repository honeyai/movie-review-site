const newCommentHandler = async (event) => {
  // event.preventDefault();
  const indexArr = [];
  for (let i = 0; i < document.querySelectorAll('#comment-text').length; i++) {
    const comment_text_arr = document.querySelectorAll('#comment-text')[i].value.trim();
    indexArr.push(comment_text_arr)
  }
  console.log(indexArr)
  const result = indexArr.filter(n => n);
  const comment_text = result.join()
  console.log(comment_text);

  if (comment_text) {
    const post_id = (indexArr.indexOf(result.join()))+1
    console.log(post_id)
    const response = await fetch(`/api/comments`, {
      method: 'POST',
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
