const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const posts = [
  {
    title: "Foo",
    date: "2025-11-13",
    summary: "Foo",
    url: "posts/foo.html",
    category: "category_1",
  },
  {
    title: "Bar",
    date: "2025-11-10",
    summary: "Bar",
    url: "posts/bar.html",
    category: "category_2",
  },
  {
    title: "Aardvark",
    date: "2025-11-05",
    summary: "Aardvark",
    url: "posts/aardvark.html",
    category: "misc",
  },
];

const DEFAULT_CATEGORY = "category_1";

const postListEl = document.getElementById("post-list");
const tabsEl = document.getElementById("post-tabs");

function renderPosts(activeCategory) {
  if (!postListEl) return;

  postListEl.innerHTML = "";

  const filtered = posts.filter((p) => p.category === activeCategory);

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "post-empty";
    empty.textContent = "No posts in this category yet.";
    postListEl.appendChild(empty);
    return;
  }

  filtered.forEach((post) => {
    const card = document.createElement("article");
    card.className = "post-card";

    card.innerHTML = `
        <div class="post-header-line">
            <h3 class="post-title">
            <a href="${post.url}">${post.title}</a>
            </h3>
            <span class="post-date">${post.date}</span>
        </div>
        <p class="post-summary">${post.summary}</p>
        `;


    postListEl.appendChild(card);
  });
}

function setupTabs() {
  if (!tabsEl) {
    renderPosts(DEFAULT_CATEGORY);
    return;
  }

  let activeCategory = DEFAULT_CATEGORY;
  renderPosts(activeCategory);

  tabsEl.addEventListener("click", (event) => {
    const target = event.target;
    if (!target.classList.contains("tab")) return;

    const category = target.dataset.category;
    if (!category || category === activeCategory) return;

    activeCategory = category;

    tabsEl.querySelectorAll(".tab").forEach((tab) => {
      tab.classList.toggle("tab--active", tab === target);
    });

    renderPosts(activeCategory);
  });
}

setupTabs();
