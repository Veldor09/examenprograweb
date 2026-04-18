const rows = [
  { row: "A", selected: [4, 5], occupied: [1, 9] },
  { row: "B", selected: [5, 6], occupied: [2, 10] },
  { row: "C", selected: [4], occupied: [1, 7] },
  { row: "D", selected: [6], occupied: [3, 9] },
  { row: "E", selected: [5], occupied: [2, 8] },
  { row: "F", selected: [4], occupied: [1, 10] },
  { row: "G", selected: [5], occupied: [3, 7] },
  { row: "H", selected: [5], occupied: [2, 9] },
];

export default function Home() {
  return (
    <div className="container-fluid theatre-page py-4 py-lg-5">
      <main className="container theatre-shell px-3 px-lg-5 py-4 py-lg-5 rounded-4 shadow-lg">
        <header className="text-center mb-4">
          <p className="text-uppercase text-gold fw-semibold mb-2">Sala principal · Vista de butacas</p>
          <h1 className="display-6 fw-bold mb-2">TEATRO-UNA</h1>
          <p className="text-light-emphasis mb-0">
            Diseño referencial de ubicación de asientos (sin selección dinámica).
          </p>
        </header>

        <section className="auditorium mb-4">
          <div className="curtain curtain-left" aria-hidden="true" />
          <div className="curtain curtain-right" aria-hidden="true" />

          <div className="stage-zone mb-4">
            <div className="stage rounded-4 text-center py-3">ESCENARIO PRINCIPAL</div>
            <p className="text-center small text-light-emphasis mt-2 mb-0">
              Referencia visual de profundidad y orientación del teatro.
            </p>
          </div>

          <section className="legend d-flex flex-wrap justify-content-center gap-2 gap-md-3 mb-4">
            <span className="badge legend-available px-3 py-2">Disponible</span>
            <span className="badge legend-occupied px-3 py-2">Ocupado</span>
            <span className="badge legend-selected px-3 py-2">Seleccionado</span>
          </section>

          <div className="seating-area px-2 px-lg-4 py-3 rounded-4">
            {rows.map(({ row, selected, occupied }) => (
              <div key={row} className="seat-row d-flex align-items-center justify-content-center mb-2">
                <span className="row-label fw-bold">{row}</span>

                <div className="seat-block d-flex gap-2 justify-content-center" role="list" aria-label={`Fila ${row}`}>
                  {Array.from({ length: 5 }, (_, idx) => {
                    const number = idx + 1;
                    const state = occupied.includes(number)
                      ? "seat-occupied"
                      : selected.includes(number)
                        ? "seat-selected"
                        : "seat-available";

                    return (
                      <span key={`${row}-L-${number}`} className={`seat ${state}`} role="listitem">
                        {number}
                      </span>
                    );
                  })}
                </div>

                <div className="aisle" aria-hidden="true">
                  PASILLO
                </div>

                <div className="seat-block d-flex gap-2 justify-content-center" role="list" aria-label={`Fila ${row}`}>
                  {Array.from({ length: 5 }, (_, idx) => {
                    const number = idx + 6;
                    const state = occupied.includes(number)
                      ? "seat-occupied"
                      : selected.includes(number)
                        ? "seat-selected"
                        : "seat-available";

                    return (
                      <span key={`${row}-R-${number}`} className={`seat ${state}`} role="listitem">
                        {number}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="reservation-panel rounded-4 p-4 mb-4">
          <h2 className="h5 mb-3">Formulario de reserva</h2>
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="seatCount" className="form-label fw-semibold">
                Cantidad de asientos
              </label>
              <select id="seatCount" className="form-select" defaultValue="2">
                {[1, 2, 3, 4, 5, 6].map((option) => (
                  <option key={option} value={option}>
                    {option} asiento{option > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 d-grid align-items-end">
              <button type="button" className="btn btn-gold btn-lg mt-md-4">
                Confirmar reserva
              </button>
            </div>
          </form>
          <p className="small text-light-emphasis mt-3 mb-0">
            * Maquetación visual: los estados de los asientos son demostrativos.
          </p>
        </section>
      </main>

      <footer className="container footer-card rounded-4 px-4 py-4 text-center">
        <h2 className="h5 mb-2">TEATRO-UNA</h2>
        <p className="mb-1">Dirección: Avenida de las Artes 124, Ciudad Universitaria</p>
        <p className="mb-1">Teléfono: +506 2401-7788</p>
        <p className="mb-0">Correo: reservas@teatro-una.cr</p>
      </footer>
    </div>
  );
}
