function SectionHeader({ title, children, backIcon }) {
  return (
    <div className="bg-color- sticky top-0 flex items-center justify-between bg-white px-14 py-4">
      <span className="text-4xl font-medium">{title}</span>
      {children}
    </div>
  );
}

export default SectionHeader;
