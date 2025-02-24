import { LockRounded } from "@mui/icons-material";

function NoAccess() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-2xl text-gray-300">
      <LockRounded style={{ fontSize: "12rem" }} />
      <p className="text- font-bold">
        Nie masz uprawnień, aby wyświetlić ten moduł.
      </p>
      <p className="text-xl">
        Skontaktuj się z administratorem, aby uzyskać dostęp.
      </p>
    </div>
  );
}

export default NoAccess;
