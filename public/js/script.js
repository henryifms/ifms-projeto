const btn = document.getElementById("btn");
btn.addEventListener("click", enviarItem);

function enviarItem() {
  const itemValue = document.getElementById("item").value;

  fetch("http://localhost:3000/customer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ info: itemValue }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Item criado:", data);
      carregarItems();
    })
    .catch((error) => console.error("Erro ao enviar item:", error));
}

function carregarItems() {
  fetch("http://localhost:3000/customer")
    .then((response) => response.json())
    .then((items) => {
      const res = document.getElementById("res");
      res.innerHTML = "";
      items.forEach((item) => {
        const div = document.createElement("div");
        div.className = "item";
        div.id = `item-${item.id}`;
        div.innerHTML = `
      <h2>item-${item.id}</h2>
      <p>${item.info}</p>
      `;
        res.appendChild(div);
      });
    })
    .catch((error) => console.error("Erro ao carregar itens:", error));
}

window.onload = carregarItems;
