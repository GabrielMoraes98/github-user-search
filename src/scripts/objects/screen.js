const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info">
                        <img src="${user.avatarUrl}" alt="foto do Usuário">
                        <div class="data">
                            <h1>${
                              user.name ?? "não possui nome cadastrado"
                            }</h1>
                            <p>${user.bio ?? "não possui bio cadastrada"}</p>
                            <p>Seguidores: ${user.followers}</p>
                            <p>Seguindo: ${user.following}</p>
                        </div>
                    </div>`;

                    let repositoriesItens = "";
                    user.repositories
                      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
                      .forEach((repo) => {
                        repositoriesItens += `<li>
                                                <a href="${repo.html_url}" target="_blank">${repo.name}
                                                <div class="details">
                                                  <span>🍴${repo.forks ?? "0"}</span>
                                                  <span>⭐${repo.stargazers ?? "0"}</span>
                                                  <span>👀${repo.watchers ?? "0"}</span>
                                                  <span>👨‍💻${repo.language ?? "0"}</span>
                                                </div>
                                                </a>
                                              </li>`;
                                          });
          
    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += ` <div class="repositories">
                                            <h2>Repositórios</h2>
                                            <ul>
                                                ${repositoriesItens}
                                            </ul>
                                        </div>`;
    }

    let eventsItens = "";
    user.events.forEach((event) => {
      if (event.type === "CreateEvent") {
        return;
      }
      eventsItens += `<p>${event.repo.name} - <span>${event.payload.commits[0].message}</span></p>`;
    });
    if (user.events.length != 0) {
      this.userProfile.innerHTML += `<div class="eventos">
                              <h2>Eventos</h2>
                              ${eventsItens}                   
                          </div>`;
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML = `<h3>Usuário não existe</h3>`;
  },
};
export { screen };