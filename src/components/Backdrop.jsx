export default function Backdrop({ show = false, onClick, zIndex = 50 }) {
  return (
    show && (
      <div
        onClick={onClick}
        className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
        style={{ zIndex: zIndex }}
      ></div>
    )
  );
}
