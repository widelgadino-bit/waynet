const chat = document.getElementById("chat");

// cargar historial
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("chat")) || [];
  saved.forEach(addMessage);
};

function addMessage(msg) {
  const div = document.createElement("div");
  div.className = `message ${msg.role}`;
  div.innerText = msg.text;
  chat.appendChild(div);
}

// guardar
function save(role, text) {
  const data = JSON.parse(localStorage.getItem("chat")) || [];
  data.push({ role, text });
  localStorage.setItem("chat", JSON.stringify(data));
}
async function enviar() {
  const input = document.getElementById("mensaje");
  const texto = input.value;
  if (!texto) return;

  addMessage({ role: "user", text: texto });
  save("user", texto);

  input.value = "";

  const loading = document.createElement("div");
  loading.className = "message bot";
  loading.innerText = "Escribiendo...";
  chat.appendChild(loading);

  // 👉 CONTEXTO DE TU EMPRESA
  const contextoEmpresa = `
Eres el asistente virtual de WAyNET.

WAyNET es una empresa de automatización y seguridad que ofrece:

- Monitoreo y seguridad en tiempo real para hogares y negocios.
- Automatización de portones con control remoto y app móvil.
- Sistemas de timbre automático para instituciones educativas.

Filosofía:
- Soluciones tecnológicas accesibles
- Enfoque en seguridad y eficiencia
- Instalación profesional y soporte técnico continuo

Siempre respondés como asistente de WAyNET, de forma clara y profesional.
`;

  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mensaje: texto,
      contexto: contextoEmpresa
    })
  });

  const data = await res.json();

  loading.remove();

  addMessage({ role: "bot", text: data.respuesta });
  save("assistant", data.respuesta);
}
window.addEventListener("DOMContentLoaded", () => {

  const chat = document.getElementById("chat");
  const toggle = document.getElementById("chatToggle");
  const inputBox = document.querySelector(".inputBox");

  let open = false;

  toggle.addEventListener("click", () => {
    open = !open;

    if (open) {
      chat.classList.add("open");
      inputBox.classList.add("open");
    } else {
      chat.classList.remove("open");
      inputBox.classList.remove("open");
    }
  });

});