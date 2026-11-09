import { ArrowUpRight, Bomb, BookOpen, Flag, Gift, HelpCircle, Shield, Sparkles } from "lucide-react";
import { getBoardCoordinates, getCellMeta } from "../data/board.js";

const ICONS = {
  ladder: <span className="tile-emoji">🪜</span>,
  snake: <span className="tile-emoji">🐍</span>,
  bomb: <Bomb size={18} />,
  booster: <Gift size={18} />,
  question: <BookOpen size={17} />,
  start: <Flag size={17} />,
  finish: <Sparkles size={17} />,
  normal: null,
};

export default function Board({ players, currentTurn }) {
  return (
    <div className="board-shell">
      <div className="board-grid">
        {Array.from({ length: 30 }, (_, index) => index + 1).map((number) => {
          const meta = getCellMeta(number);
          const coordinates = getBoardCoordinates(number);
          const occupants = players.filter((player) => player.position === number);
          return (
            <div
              key={number}
              className={`board-cell cell-${meta.type} ${number % 2 === 0 ? "cell-even" : "cell-odd"}`}
              style={{ gridRow: coordinates.row, gridColumn: coordinates.column }}
              title={`Kotak ${number}${meta.label ? ` — ${meta.label}` : ""}`}
            >
              <span className="cell-number">{number}</span>
              <div className="cell-symbol">{ICONS[meta.type]}</div>
              {meta.type === "ladder" && <span className="cell-hint">↑ {meta.to}</span>}
              {meta.type === "snake" && <span className="cell-hint">↓ {meta.to}</span>}
              {meta.type === "bomb" && <span className="cell-hint">-3</span>}
              {meta.type === "booster" && <span className="cell-hint">+10</span>}
              {meta.type === "question" && <span className="cell-hint">SOAL</span>}
              {meta.type === "start" && <span className="cell-hint">MULAI</span>}
              {meta.type === "finish" && <span className="cell-hint">FINISH</span>}
              {occupants.length > 0 && (
                <div className="cell-players">
                  {occupants.map((player) => (
                    <span
                      key={player.id}
                      className={`mini-token ${players[currentTurn]?.id === player.id ? "token-active" : ""}`}
                      style={{ backgroundColor: player.color }}
                      title={player.name}
                    >
                      {player.avatar}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="board-footer">
        <span><span className="legend-dot legend-question" /> Kartu soal</span>
        <span><span className="legend-dot legend-ladder" /> Tangga</span>
        <span><span className="legend-dot legend-snake" /> Ular</span>
        <span><span className="legend-dot legend-bomb" /> Bom</span>
        <span><span className="legend-dot legend-booster" /> Booster</span>
      </div>
    </div>
  );
}
