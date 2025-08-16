const allPrompts = [
  {
    number: 1,
    title: "But that’s Way Older than Grandma!",
    description: "About someone born before 1600.",
    creator: "Noah",
  },
];
window.prompts = allPrompts; // ✅ Fixes the error globally

function renderPrompts(prompts) {
  const container = document.getElementById('promptGrid');
  container.innerHTML = '';

  prompts.forEach(prompt => {
    const card = document.createElement('div');
    card.className = 'prompt-card';
    card.onclick = () => { location.href = `/prompt.html?number=${p.number}`; };

    card.innerHTML = `
      <h2>Prompt #${prompt.number}</h2>
      <h3>${prompt.title}</h3>
      ${prompt.description ? `<p>${prompt.description}</p>` : ''}
      <p>By ${prompt.creator}</p>
    `;

    container.appendChild(card);
  });
}

// Initial render using the fixed variable
renderPrompts(window.prompts);

// Search filtering
document.getElementById('searchInput').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const filtered = window.prompts.filter(p =>
    p.title.toLowerCase().includes(query) ||
    (p.description && p.description.toLowerCase().includes(query)) ||
    p.creator.toLowerCase().includes(query)
  );
  renderPrompts(filtered);
});
