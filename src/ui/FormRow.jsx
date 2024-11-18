function FormRow({ children, error }) {
  return (
    <div className="flex-col items-center justify-between gap-4">
      {error && (
        <div className="inline-block -translate-y-2 whitespace-nowrap rounded-lg border border-red-500 bg-red-300 px-6 py-2 text-sm text-red-500">
          {error}
        </div>
      )}
      <div className="relative flex items-center justify-between gap-4">
        {children}
      </div>
    </div>
  );
}

export default FormRow;
