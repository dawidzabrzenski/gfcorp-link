import Spinner from "../ui/Loaders/Spinner";
import { useGroups } from "../features/permissions/useGroups";
import GroupsComponent from "../ui/Groups/GroupsComponent";

function Permissions() {
  const { isPendingGroups } = useGroups();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Uprawnienia</h2>
      {isPendingGroups ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <GroupsComponent />
      )}
    </div>
  );
}

export default Permissions;
