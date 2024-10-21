export const DotButton = ({ selected, onClick }) => (
    <button
      className={`embla__dot ${selected ? "embla__dot--selected" : ""}`}
      type="button"
      onClick={onClick}
    />
  );
  