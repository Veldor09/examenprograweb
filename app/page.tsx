"use client";

import { FormEvent, useMemo, useState } from "react";

type Seat = {
  id: string;
  row: string;
  number: number;
  occupied?: boolean;
};

const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];

const seats: Seat[] = rows.flatMap((row) =>
  Array.from({ length: 10 }, (_, index) => ({
    id: `${row}${index + 1}`,
    row,
    number: index + 1,
    occupied:
      ["A3", "A7", "B4", "C1", "D6", "E8", "F2", "G9", "H5"].includes(
        `${row}${index + 1}`
      ),
  }))
);

export default function Home() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seatCount, setSeatCount] = useState<number>(2);
  const [message, setMessage] = useState<string>(
    "Seleccione sus asientos para la función principal."
  );

  const availableSeats = useMemo(
    () => seats.filter((seat) => !seat.occupied).map((seat) => seat.id),
    []
  );

  const toggleSeat = (seat: Seat) => {
    if (seat.occupied) {
      return;
    }

    setSelectedSeats((prev) => {
      if (prev.includes(seat.id)) {
        return prev.filter((id) => id !== seat.id);
      }

      if (prev.length >= seatCount) {
        setMessage(
          `Solo puede seleccionar ${seatCount} asiento${seatCount > 1 ? "s" : ""}.`
        );
        return prev;
      }

      return [...prev, seat.id];
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedSeats.length !== seatCount) {
      setMessage(
        `Debe seleccionar exactamente ${seatCount} asiento${seatCount > 1 ? "s" : ""} para confirmar.`
      );
      return;
    }

    setMessage(
      `Reserva confirmada para: ${selectedSeats.join(", ")} · ¡Le esperamos en TEATRO-UNA!`
    );
  };

  return (
    <div className="container-fluid theatre-page py-5">
      <main className="container theatre-card p-4 p-lg-5 shadow-lg rounded-4 animate__animated animate__fadeIn">
        <header className="text-center mb-4">
          <p className="text-uppercase text-gold fw-semibold mb-2">Sala principal</p>
          <h1 className="display-6 text-gold fw-bold mb-2">TEATRO-UNA · Reserva de Asientos</h1>
          <p className="text-light-emphasis mb-0">
            Viva una noche inolvidable seleccionando los mejores lugares.
          </p>
        </header>

        <section className="stage-wrapper mb-4">
          <div className="stage text-center py-3 rounded-4">ESCENARIO</div>
        </section>

        <section className="legend d-flex flex-wrap justify-content-center gap-3 mb-4">
          <span className="badge text-bg-secondary px-3 py-2">Disponible</span>
          <span className="badge occupied-badge px-3 py-2">Ocupado</span>
          <span className="badge selected-badge px-3 py-2">Seleccionado</span>
        </section>

        <section className="seat-grid-wrapper mb-5">
          {rows.map((row) => (
            <div key={row} className="d-flex align-items-center justify-content-center gap-2 mb-2">
              <span className="row-label fw-bold">{row}</span>
              <div className="d-flex gap-2 flex-wrap justify-content-center" role="list">
                {seats
                  .filter((seat) => seat.row === row)
                  .map((seat) => {
                    const isSelected = selectedSeats.includes(seat.id);

                    return (
                      <button
                        key={seat.id}
                        type="button"
                        className={`seat btn btn-sm ${
                          seat.occupied
                            ? "seat-occupied"
                            : isSelected
                              ? "seat-selected"
                              : "seat-available"
                        }`}
                        onClick={() => toggleSeat(seat)}
                        disabled={seat.occupied}
                        aria-label={`Asiento ${seat.id} ${seat.occupied ? "ocupado" : "disponible"}`}
                      >
                        {seat.number}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </section>

        <section className="reservation-panel rounded-4 p-4">
          <form className="row g-3 align-items-end" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label htmlFor="seatCount" className="form-label fw-semibold">
                Cantidad de asientos a reservar
              </label>
              <select
                id="seatCount"
                className="form-select"
                value={seatCount}
                onChange={(event) => {
                  const requested = Number(event.target.value);
                  setSeatCount(requested);
                  setSelectedSeats((prev) => prev.slice(0, requested));
                  setMessage(
                    `Puede seleccionar hasta ${requested} asiento${requested > 1 ? "s" : ""}.`
                  );
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((option) => (
                  <option key={option} value={option}>
                    {option} asiento{option > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 d-grid">
              <button type="submit" className="btn btn-gold btn-lg">
                Confirmar reserva
              </button>
            </div>
          </form>

          <div className="mt-3 small text-light-emphasis">
            <strong>Asientos seleccionados:</strong>{" "}
            {selectedSeats.length ? selectedSeats.join(", ") : "Ninguno"}
          </div>
          <div className="small mt-1 text-info-emphasis">{message}</div>
          <div className="small mt-2 text-light-emphasis">
            Asientos disponibles actualmente: {availableSeats.length}
          </div>
        </section>
      </main>

      <footer className="container mt-4 mb-2 text-center footer-card rounded-4 p-4">
        <h2 className="h5 mb-2">TEATRO-UNA</h2>
        <p className="mb-1">Dirección: Avenida de las Artes 124, Ciudad Universitaria</p>
        <p className="mb-1">Teléfono: +506 2401-7788</p>
        <p className="mb-0">Correo: reservas@teatro-una.cr</p>
      </footer>
    </div>
  );
}
