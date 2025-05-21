(function () {
  const scriptTag = document.currentScript;
  const username = scriptTag.getAttribute("data-username");
  const containerId = scriptTag.getAttribute("data-container") || "github-repos";

  const container = document.getElementById(containerId);
  if (!container || !username) return;

  fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(repos => {
      repos.forEach(repo => {
        fetch(`https://api.github.com/repos/${username}/${repo.name}`)
          .then(res => res.json())
          .then(details => {
            const box = document.createElement("div");
            box.className = "repo-box";
            box.innerHTML = `
              <a class="redirect" href="${repo.html_url}" target="_blank">
                <i class="fas fa-external-link-alt"></i>
              </a>
              <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${details.open_graph_image_url}" alt="preview" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                <a href="${repo.html_url}" target="_blank">${username} / ${repo.name}</a>
              </div>
              <p class="repo-desc">${repo.description || "No description"}</p>
            `;
            container.appendChild(box);
          });
      });
    });
})();
