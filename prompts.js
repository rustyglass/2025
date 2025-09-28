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
  {
    number: 31,
    title: "Aren't You Supposed to Write the Book before the Movie?",
    description: "Novelization of a Movie",
    creator: "Noah",
  },  
  {
    number: 32,
    title: "Has Chapter Titles",
    description: "",
    creator: "Cindy",
  },  
  {
    number: 33,
    title: "Set in a State West of the Mississippi River",
    description: "",
    creator: "Zoey",
  },  
  {
    number: 34,
    title: "Main Character is at Least 14 Years Old",
    description: "",
    creator: "Winny",
  },
  {
    number: 35,
    title: "Fantasy",
    description: "",
    creator: "Rusty",
  },
  {
    number: 36,
    title: "Pink Cover",
    description: "",
    creator: "Cassy",
  },
  {
  number: 37,
  title: "Why does this Prompt have a Pre-Req?",
  description: "A sequel to a book you've read",
  creator: "Noah",
},
{
  number: 38,
  title: "Has a Character in the Medical Profession",
  creator: "Cindy",
},
{
  number: 39,
  title: "About Survival",
  creator: "Zoey",
},
{
  number: 40,
  title: "Blue Cover",
  creator: "Winny",
},
{
  number: 41,
  title: "About World War II",
  creator: "Rusty",
},
{
  number: 42,
  title: "Has a Character With the Same Name as Someone in the Challenge",
  creator: "Cassy",
},
{
  number: 43,
  title: "But That’s Older than Grandma!",
  description: "Written Before 1960",
  creator: "Noah",
},
{
  number: 44,
  title: "Has a Cover You Don’t Like",
  creator: "Cindy",
},
{
  number: 45,
  title: "Cover Has Someone Wearing Glasses on It",
  creator: "Zoey",
},
{
  number: 46,
  title: "Main Character is a Boy",
  creator: "Winny",
},
{
  number: 47,
  title: "Part of a Series",
  creator: "Rusty",
},
{
  number: 48,
  title: "About Baseball",
  creator: "Cassy",
},
{
  number: 49,
  title: "Deja Vu",
  description: "A Book You Want to Re-read",
  creator: "Noah",
},
{
  number: 50,
  title: "Set in a Small Town",
  creator: "Cindy",
},
{
  number: 51,
  title: "Main Character has a Pet",
  creator: "Zoey",
},
{
  number: 52,
  title: "Mystery Book",
  creator: "Winny",
},
{
  number: 53,
  title: "About 9/11",
  creator: "Rusty",
},
{
  number: 54,
  title: "About a Saint",
  creator: "Cassy",
},
{
  number: 55,
  title: "Is That Allowed?",
  description: "Title Has Something Doing Something it Can’t Do",
  creator: "Noah",
},
{
  number: 56,
  title: "A Book You See Someone Else Reading",
  creator: "Cindy",
},
{
  number: 57,
  title: "Has a King, Queen, Prince, or Princess as a Character",
  creator: "Zoey",
},
{
  number: 58,
  title: "Fiction",
  creator: "Winny",
},
{
  number: 59,
  title: "Has a Map",
  creator: "Rusty",
},
{
  number: 60,
  title: "About Pirates",
  creator: "Cassy",
},
{
  number: 61,
  title: "A Book that You or Someone Else Read in the Same Month the Year Before",
  creator: "Spencer",
},
{
  number: 62,
  title: "Has a Car, Truck, or Motorcycle on the Cover",
  creator: "Tom",
},
{
  number: 63,
  title: "Has a Known Historical Figure as a Character Living a Fictional Life",
  creator: "Cody",
},
{
  number: 64,
  title: "Title Has a Word that Starts with ‘Z’",
  creator: "RJ",
},
{
  number: 65,
  title: "About Halloween",
  creator: "Milly",
},
{
  number: 66,
  title: "Also a TV Show or Movie",
  creator: "Ricky",
},
{
  number: 67,
  title: "Set in the Distant Future",
  description: "Must be more than 100 Years in the Future",
  creator: "Spencer",
},
{
  number: 68,
  title: "Yellow or Green Cover",
  creator: "Tom",
},
{
  number: 69,
  title: "Is a Retelling of a Classic Myth, Legend, or Fairytale in a Modern or Unique Way",
  creator: "Cody",
},
{
  number: 70,
  title: "About the Amish or has Amish Characters",
  creator: "RJ",
},
{
  number: 71,
  title: "Has a Dog on the Cover",
  creator: "Milly",
},
{
  number: 72,
  title: "Has a Tree on the Cover",
  creator: "Ricky",
},
{
  number: 73,
  title: "Outer-Most Layer is a Solid Color and Text Only",
  creator: "Spencer",
},
{
  number: 74,
  title: "Has a Farm in It",
  creator: "Tom",
},
{
  number: 75,
  title: "Features a Journey with a Twist, through Time, Dimensions, or a Magical Realm",
  creator: "Cody",
},
{
  number: 76,
  title: "About/On a Cruise Ship",
  creator: "RJ",
},
{
  number: 77,
  title: "Has Flowers on the Cover",
  creator: "Milly",
},
{
  number: 78,
  title: "Has a Sun or Moon on the Cover",
  creator: "Ricky",
},
{
  number: 79,
  title: "About a Weather Event",
  creator: "Group",
},
{
  number: 80,
  title: "Written by a Celebrity",
  creator: "Group",
},
{
  number: 81,
  title: "Published in 2025",
  creator: "Group",
},
{
  number: 82,
  title: "Has ‘Town’ in the Title",
  creator: "Group",
},
{
  number: 83,
  title: "Over the Threshold",
  description: "About a Wedding",
  creator: "Group",
},
{
  number: 84,
  title: "It’s Not Greek to Me",
  description: "Translated into English",
  creator: "Group",
},
{
  number: 85,
  title: "I Don’t Think I’m Hearing this Right",
  description: "Listen to an Audiobook",
  creator: "Group",
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
