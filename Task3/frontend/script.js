async function loadProjects() {
  const res = await fetch('http://localhost:5000/projects');
  const projects = await res.json();
  const container = document.getElementById('project-list');
  container.innerHTML = '';
  projects.forEach(p => {
    const div = document.createElement('div');
    div.className = 'project';
    div.innerHTML = `<strong>${p.name}</strong><div class='task'>${p.tasks.map(t => `<p>${t.assignee}: ${t.description}</p>`).join('')}</div>
      <form onsubmit="addTask(event, '${p._id}')">
        <input type="text" placeholder="Assignee" required>
        <input type="text" placeholder="Task description" required>
        <button>Add Task</button>
      </form>`;
    container.appendChild(div);
  });
}

document.getElementById('project-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('project-name').value;
  await fetch('http://localhost:5000/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  document.getElementById('project-name').value = '';
  loadProjects();
});

async function addTask(e, projectId) {
  e.preventDefault();
  const inputs = e.target.querySelectorAll('input');
  const assignee = inputs[0].value;
  const description = inputs[1].value;

  await fetch(`http://localhost:5000/projects/${projectId}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ assignee, description })
  });

  loadProjects();
}

loadProjects();
