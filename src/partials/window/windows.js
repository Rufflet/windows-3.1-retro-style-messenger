const minimize = (btn) => {
  const win = btn.closest(".window");
  if (win.classList.contains("maximized")) win.classList.remove("maximized");
  win.classList.toggle("minimized");
};

const maximize = (btn) => {
  const win = btn.closest(".window");
  if (win.classList.contains("minimized")) win.classList.remove("minimized");
  win.classList.toggle("maximized");
};
