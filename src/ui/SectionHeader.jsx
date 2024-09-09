import Button from "./Button";

function SectionHeader({ title, children }) {
  return (
    <div className="flex items-center justify-between px-14 py-4">
      <span className="text-4xl font-medium">{title}</span>
      {children}
    </div>
  );
}

export default SectionHeader;
