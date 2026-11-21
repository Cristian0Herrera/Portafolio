const menu = document.querySelector("#menu"),
  links = document.querySelector("#links");
function closeMenu() {
  links.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
}
menu.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});
links
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
const filters = document.querySelectorAll("[data-filter]");
filters.forEach((button) =>
  button.addEventListener("click", () => {
    filters.forEach((b) =>
      b.setAttribute("aria-pressed", String(b === button)),
    );
    document.querySelectorAll(".project").forEach((card) => {
      card.hidden =
        button.dataset.filter !== "all" &&
        !card.dataset.category.split(" ").includes(button.dataset.filter);
    });
  }),
);

const projectsData = {
  'RutiCard': {
    images: ['RutiCard.png'],
    description: 'Sistema de control de marcación de conductores de buses. Facilita el registro de asistencia, horarios y rutas, y el seguimiento de la puntualidad para optimizar el control operativo del transporte colectivo.',
    tech: ['HTML', 'JavaScript', 'CSS'],
    repo: 'https://github.com/Cristian0Herrera/ruticard'
},
  RefugioSOS: {
    images: ["RefugioSOS1.png", "RefugioSOS2.png", "RefugioSOS3.png"],
    description:
      "Aplicación web diseñada para brindar apoyo a personas refugiadas, facilitando su acceso a albergues, recursos y servicios esenciales.",
    tech: ["Laravel", "PHP", "JavaScript", "HTML", "CSS", "MySQL"],
    repo: "https://github.com/Cristian0Herrera/refugiosos.github.io",
  },
  "Hotel Buena Vista": {
    images: ["Hotel Buena Vista.png"],
    description:
      "Sitio web informativo que presenta los servicios, instalaciones y promociones del hotel, permitiendo a los usuarios conocer sus ofertas y realizar reservaciones.",
    tech: ["Python", "JavaScript", "HTML", "CSS", "MySQL"],
    repo: "https://github.com/Cristian0Herrera/Hotel-Buena-Vista",
  },
  "Lectores sin Rumbo": {
    images: ["Lectores sin Rumbo1.png", "Lectores sin Rumbo2.png"],
    description:
      "Sistema de gestión bibliográfica que permite registrar, organizar y controlar préstamos de libros, optimizando la administración de bibliotecas.",
    tech: ["C#", "MySQL"],
    repo: "https://github.com/monicacampos1/Lectores-sin-rumbo",
  },
};
const dialog = document.querySelector("#project-dialog"),
  slide = document.querySelector("#slide-image"),
  prev = document.querySelector(".slide-prev"),
  next = document.querySelector(".slide-next"),
  count = document.querySelector("#slide-count");
let currentProject = null,
  currentName = "",
  slideIndex = 0,
  trigger = null;
function showSlide(index) {
  const total = currentProject.images.length;
  slideIndex = (index + total) % total;
  slide.src = currentProject.images[slideIndex];
  slide.alt = `${currentName} — captura ${slideIndex + 1} de ${total}`;
  count.textContent = `${slideIndex + 1} / ${total}`;
  prev.hidden = next.hidden = count.hidden = total === 1;
}
document.querySelectorAll(".project-open").forEach((button) =>
  button.addEventListener("click", () => {
    trigger = button;
    currentName = button.dataset.project;
    currentProject = projectsData[currentName];
    document.querySelector("#project-title").textContent = currentName;
    document.querySelector("#project-description").textContent =
      currentProject.description;
    const tags = document.querySelector("#project-tech");
    tags.replaceChildren(
      ...currentProject.tech.map((tech) => {
        const el = document.createElement("span");
        el.textContent = tech;
        return el;
      }),
    );
    tags.hidden = !currentProject.tech.length;
    const repo = document.querySelector("#project-repo");
    repo.hidden = !currentProject.repo;
    if (currentProject.repo) repo.href = currentProject.repo;
    else repo.removeAttribute("href");
    showSlide(0);
    dialog.showModal();
  }),
);
prev.addEventListener("click", () => showSlide(slideIndex - 1));
next.addEventListener("click", () => showSlide(slideIndex + 1));
dialog
  .querySelector(".modal-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => trigger?.focus());
dialog.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    e.preventDefault();
    showSlide(slideIndex + (e.key === "ArrowRight" ? 1 : -1));
  }
});
let touchX = null;
slide.addEventListener(
  "touchstart",
  (e) => {
    touchX = e.changedTouches[0].clientX;
  },
  { passive: true },
);
slide.addEventListener(
  "touchend",
  (e) => {
    if (touchX === null) return;
    const delta = e.changedTouches[0].clientX - touchX;
    if (Math.abs(delta) > 45) showSlide(slideIndex + (delta < 0 ? 1 : -1));
    touchX = null;
  },
  { passive: true },
);
