function StatusButton({ status }) {
  if (status === "pending")
    return (
      <span className="flex items-center justify-center rounded-xl bg-yellow-400 px-2 py-1 text-xs font-medium uppercase text-stone-50">
        {status}
      </span>
    );

  if (status === "complete")
    return (
      <span className="flex items-center justify-center rounded-xl bg-green-400 px-2 py-1 text-xs font-medium uppercase text-stone-50">
        {status}
      </span>
    );

  if (status === "not-assigned")
    return (
      <span className="flex items-center justify-center rounded-xl bg-red-400 px-2 py-1 text-xs font-medium uppercase text-stone-50">
        {status}
      </span>
    );
}

export default StatusButton;
