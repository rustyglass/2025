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
  {
    number: 13,
    title: "This Book has Spencer Written All Over It",
    description: "Read a book Spencer might like. Requires confirmation from Spencer.",
    creator: "Noah",
  },
  {
    number: 14,
    title: "Not in Chapter Form",
    description: "",
    creator: "Cindy",
  },
  {
    number: 15,
    title: "About Characters on Vacation",
    description: "",
    creator: "Zoey",
  },
  {
    number: 16,
    title: "Takes Place Outside the US",
    description: "",
    creator: "Winny",
  },
  {
    number: 17,
    title: "About an Animal",
    description: "",
    creator: "Rusty",
  },
  {
    number: 18,
    title: "Takes Place in Hawaii",
    description: "",
    creator: "Cassy",
  },
  {
    number: 19,
    title: "A Whole New World",
    description: "Doesn't take place on Earth",
    creator: "Noah",
  },
  {
    number: 20,
    title: "First Book you Touch on a Shelf with your Eyes Closed",
    description: "",
    creator: "Cindy",
  },
  {
    number: 21,
    title: "Set in Your Favorite Season",
    description: "",
    creator: "Zoey",
  },
  {
    number: 22,
    title: "Takes Place Outside",
    description: "",
    creator: "Winny",
  },
  {
    number: 23,
    title: "Set in Europe",
    description: "",
    creator: "Rusty",
  },
  {
    number: 24,
    title: "Published at Least 25 Years Ago",
    description: "",
    creator: "Cassy",
  },
  {
    number: 25,
    title: "Things Beyond Your Ken",
    description: "About a Topic You Know Little About",
    creator: "Noah",
  },
  {
    number: 26,
    title: "By An Author That Has Written Over 20 Books",
    description: "",
    creator: "Cindy",
  },
  {
    number: 27,
    title: "Set in a Time Period You Would Like to Have Lived During",
    description: "",
    creator: "Zoey",
  },
  {
    number: 28,
    title: "Holiday Book",
    description: "",
    creator: "Winny",
  },
  {
    number: 29,
    title: "Suggested by a Friend",
    description: "",
    creator: "Rusty",
  },
  {
    number: 30,
    title: "Has a Bird on the Cover",
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
