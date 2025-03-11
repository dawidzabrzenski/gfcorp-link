import { useState } from "react";
import { useForm } from "react-hook-form";
import { usePermissions } from "../../features/permissions/usePermissions";

import Button from "../Button";
import FormField from "../Forms/FormField";
import TextInput from "../Forms/TextInput";
import Skeleton from "react-loading-skeleton";

function AddGroupForm({ onCloseModal }) {
  const { permissions, pendingPermissions } = usePermissions();
  const [selectAll, setSelectAll] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      permissions: [],
    },
  });

  const groupedPermissions = permissions.reduce((acc, permission) => {
    const [mainPath, subPath] = permission.name.split("/");
    if (!acc[mainPath]) {
      acc[mainPath] = [];
    }
    if (subPath) {
      acc[mainPath].push(permission);
    } else {
      acc[mainPath].unshift(permission);
    }
    return acc;
  }, {});

  const handleSelectAll = () => {
    const allPermissions = permissions.map(
      (permission) => permission.id || permission.name,
    );
    if (selectAll) {
      setValue("permissions", []);
    } else {
      setValue("permissions", allPermissions);
    }
    setSelectAll(!selectAll);
  };

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <div className="flex w-[65vw] flex-col gap-4">
      <h2 className="text-2xl font-bold">Dodaj nową grupę uprawnień</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 rounded-lg bg-dark-lighterbg px-4 py-6"
      >
        <div className="flex w-full gap-12">
          <div className="w-1/2">
            <FormField label="Nazwa ID *" id="name" error={errors.email}>
              <TextInput
                type="text"
                name="name"
                autoComplete="new-name"
                placeholder="Nazwa ID grupy"
                register={register}
              />
            </FormField>
          </div>
          <div className="w-1/2">
            <FormField
              label="Nazwa wyświetlana *"
              id="visibleName"
              error={errors.password}
            >
              <TextInput
                type="text"
                name="visibleName"
                autoComplete="new-visiblename"
                placeholder="Nazwa wyświetlana grupy"
                register={register}
              />
            </FormField>
          </div>
        </div>

        <FormField label="Uprawnienia *" id="permissions" error={errors.email}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                buttonStyle="border-light"
                onClick={handleSelectAll}
                className="rounded-lg bg-dark-mainbg px-2 py-2 text-xs"
              >
                {selectAll ? "Odznacz wszystko" : "Zaznacz wszystko"}
              </button>
            </div>

            <div className="flex flex-col gap-4 overflow-auto rounded-lg bg-dark-mainbg px-6 py-4">
              {!pendingPermissions &&
                Object.entries(groupedPermissions)
                  .sort()
                  .map(([mainPath, perms]) => (
                    <div key={mainPath} className="flex flex-col gap-2">
                      <h3 className="text-xl font-semibold">{mainPath}</h3>
                      <div className="flex flex-col gap-2">
                        {perms.map((permission) => (
                          <label
                            key={permission.id || permission.name}
                            className="flex w-fit items-center gap-2 text-sm font-light italic"
                          >
                            <input
                              name="permissions"
                              type="checkbox"
                              value={permission.id || permission.name}
                              {...register("permissions")}
                            />
                            {permission.name}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </FormField>
        {pendingPermissions && <Skeleton count={4} width="100%" height={25} />}

        <div className="flex w-fit gap-3">
          <Button type="submit" buttonStyle="border-light">
            Utwórz grupę
          </Button>
          <Button type="button" buttonStyle="warning" onClick={onCloseModal}>
            Zamknij
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddGroupForm;
