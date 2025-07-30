export default function Modal() {
  return (
    <div id="statModal" className="modal hidden">
      <div className="modal-content">
        <span className="close-button">&times;</span>
        <h2 id="modalTitle">Título</h2>
        <p id="modalContent">Conteúdo detalhado será exibido aqui.</p>
      </div>
    </div>
  );
}