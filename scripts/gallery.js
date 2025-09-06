function setGridRowHeight() {
  const container = document.querySelector('.container');
  const columnWidth = container.offsetWidth / 12; // 12 columns
  container.style.gridAutoRows = `${columnWidth}px`;
}

window.addEventListener('resize', setGridRowHeight);
window.addEventListener('load', setGridRowHeight);
