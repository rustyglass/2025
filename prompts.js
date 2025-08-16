const allPrompts = [
  {
    number: 1,
    title: "All for One & One for All!",
    description: "Everyone reads the same book for this prompt, or no one completes it!",
    creator: "Noah",
  },
  {
    number: 2,
    title: "Written from Two or More Perspectives",
    description: "",
    creator: "Cindy",
  },
  {
    number: 3,
    title: "Main Character's First Name Ends in 'Y'",
    description: "",
    creator: "Zoey",
  },
  {
    number: 4,
    title: "Has a Design on the Spine",
    description: "",
    creator: "Winny",
  },
  {
    number: 5,
    title: "Takes Place on a Beach",
    description: "",
    creator: "Rusty",
  },
  {
    number: 6,
    title: "Currently on NYT Bestseller's List",
    description: "",
    creator: "Cassy",
  },
  {
    number: 7,
    title: "Don't I Get a Say in This?",
    description: "Readers will select which books other readers must read to complete this prompt.",
    creator: "Noah",
  },
  {
    number: 8,
    title: "Has Item of Clothing or Accessory on the Cover",
    description: "",
    creator: "Cindy",
  },
  {
    number: 9,
    title: "Title is also Title of a Song",
    description: "",
    creator: "Zoey",
  },
  {
    number: 10,
    title: "Author's First and Last Name Start with the Same Letter",
    description: "",
    creator: "Winny",
  },
  {
    number: 11,
    title: "At Least 500 Pages",
    description: "",
    creator: "Rusty",
  },
  {
    number: 12,
    title: "Has 'Glass' in the Title",
    description: "",
    creator: "Cassy",
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
