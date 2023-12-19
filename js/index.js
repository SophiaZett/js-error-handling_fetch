console.clear();

const userElement = document.querySelector(".user");
const errorElement = document.querySelector(".error");

async function getUser(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const json = await response.json();
    errorElement.textContent = "";
    return json.data;
  } catch (error) {
    errorElement.textContent = "Can not find any data";
    return null;
  }
}

document.querySelectorAll("button[data-url]").forEach((button) =>
  button.addEventListener("click", async (event) => {
    userElement.innerHTML = "";
    errorElement.textContent = "";
    try {
      const user = await getUser(event.target.dataset.url);
      if (user) {
        userElement.innerHTML = `
    <h2>${user.first_name} ${user.last_name}</h2>
    <img alt="${user.first_name} ${user.last_name}" src="${user.avatar}"/>
    `;
      }
    } catch (error) {
      errorElement.textContent = "Can not find any data";
    }
  })
);
