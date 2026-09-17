const repositoryList = document.querySelector('#repository-list');
const repositoryCount = document.querySelector('#repository-count');
const status = document.querySelector('#status');

function formatStars(stars) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(stars);
}

function renderRepositories(repositories) {
  repositoryCount.textContent = `${repositories.length} repositories`;
  status.hidden = true;

  repositories.forEach((repository) => {
    const item = document.createElement('li');
    item.className = 'repository';
    item.innerHTML = `
      <h3>
        <a href="https://github.com/${repository.owner}/${repository.name}" target="_blank" rel="noreferrer">
          ${repository.owner}/${repository.name}
        </a>
      </h3>
      <p>${repository.description}</p>
      <div class="repository-meta">
        <span>${repository.language}</span>
        <span>${formatStars(repository.stars)} stars</span>
      </div>
    `;
    repositoryList.appendChild(item);
  });
}

async function loadRepositories() {
  try {
    const response = await fetch('events.json');

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    status.textContent = 'Unable to load repositories right now.';
    status.classList.add('error');
    console.error(error);
  }
}

loadRepositories();