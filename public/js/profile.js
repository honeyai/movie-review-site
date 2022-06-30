const newFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#project-name').value.trim();
  // const needed_funding = document.querySelector('#project-funding').value.trim();
  const review = document.querySelector('#project-desc').value.trim();

  if (username && review) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ username, review }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
