async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment = document.querySelector('textarea[name="comment-body"]').value.trim();
  
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (comment) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            post_id,
            comment
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
  }
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);const newFormHandler = async (event) => {
    const post_id = document.querySelector('#post-id').value;
    const title = document.querySelector('#comment-title').value.trim();
    const description = document.querySelector('#comment-desc').value.trim();
  
    if (title && description&& post_id) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ title, description, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace(`/post/${post_id}`);
      } else {
        alert('Failed to create comment');
      }
    }
  };
  
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', newFormHandler);
  
 