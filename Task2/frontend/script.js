document.getElementById('post-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const content = document.getElementById('content').value;

  await fetch('http://localhost:5000/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, content })
  });

  document.getElementById('content').value = '';
  loadPosts();
});

async function loadPosts() {
  const res = await fetch('http://localhost:5000/posts');
  const posts = await res.json();
  const container = document.getElementById('posts');
  container.innerHTML = '';
  posts.reverse().forEach(p => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${p.username}</strong><p>${p.content}</p><small>${new Date(p.createdAt).toLocaleString()}</small>`;
    container.appendChild(div);
  });
}

loadPosts();
