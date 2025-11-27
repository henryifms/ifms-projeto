const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    
    navLinks.forEach(l => l.classList.remove('active'));
    
    this.classList.add('active');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const slideContainer = document.querySelector('.carousel-slide');
  const slides = document.querySelectorAll('.slide');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  let counter = 0;
  const size = slides[0].clientWidth;

  nextBtn.addEventListener('click', () => {
      if (counter >= slides.length - 1) return;
      counter++;
      moveSlide();
  });

  // Listener para o botão esquerdo (anterior)
  prevBtn.addEventListener('click', () => {
      if (counter <= 0) return;
      counter--;
      moveSlide();
  });

  function moveSlide() {
      slideContainer.style.transform = 'translateX(' + (-size * counter) + 'px)';
  }
});

// const btn = document.getElementById("btn");
// btn.addEventListener("click", enviarItem);

// function enviarItem() {
//   const itemValue = document.getElementById("item").value;

//   fetch("http://localhost:3000/customer", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ info: itemValue }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Item criado:", data);
//       carregarItems();
//     })
//     .catch((error) => console.error("Erro ao enviar item:", error));
// }

// function carregarItems() {
//   fetch("http://localhost:3000/customer")
//     .then((response) => response.json())
//     .then((items) => {
//       const res = document.getElementById("res");
//       res.innerHTML = "";
//       items.forEach((item) => {
//         const div = document.createElement("div");
//         div.className = "item";
//         div.id = `item-${item.id}`;
//         div.innerHTML = `
//       <h2>item-${item.id}</h2>
//       <p>${item.info}</p>
//       `;
//         res.appendChild(div);
//       });
//     })
//     .catch((error) => console.error("Erro ao carregar itens:", error));
// }

// window.onload = carregarItems;
