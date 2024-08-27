import { getUser } from "./services/user.js";
import { getRepositories } from "./services/repositories.js";
import { getEvents } from "./services/events.js";
import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";
document.getElementById("btn-search").addEventListener("click", () => {
  const inputValue = document.getElementById("input-search").value;
  if (validateEmptyValue(inputValue)) return;
  getUserData(inputValue);
});
document.getElementById("input-search").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const inputValue = document.getElementById("input-search").value;
    if (validateEmptyValue(inputValue)) return;
    getUserData(inputValue);
  }
});
function validateEmptyValue(inputValue) {
  if (inputValue === "") {
    alert("Digite o nome de usuário");
    return true;
  }
}
async function getUserData(userName) {
  const userResponse = await getUser(userName);
  if (userResponse.message === "Not Found") {
    screen.renderNotFound();
    return;
  }
  const repositoriesResponse = await getRepositories(userName);
  const eventResponse = await getEvents(userName);
  user.setInfo(userResponse);
  user.setRepositories(repositoriesResponse);
  user.setEvents(eventResponse);
  screen.renderUser(user); 
}
