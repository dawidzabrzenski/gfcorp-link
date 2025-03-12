import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePermissions } from "../../features/permissions/usePermissions";
import { useAddGroup } from "../../features/permissions/useAddGroup";

import Button from "../Button";
import FormField from "../Forms/FormField";
import TextInput from "../Forms/TextInput";
import Skeleton from "react-loading-skeleton";

function AddGroupForm({ onCloseModal }) {
  const { permissions, pendingPermissions } = usePermissions();
  const [selectAll, setSelectAll] = useState(false);
  const { addGroup, error, pendingAddGroup, isSuccess } = useAddGroup();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      visibleName: "",
      permissions: [],
    },
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      onCloseModal();
    }
  }, [isSuccess, reset, onCloseModal]);

  const groupedPermissions = (permissions ?? []).reduce((acc, permission) => {
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
    const { name, visibleName, permissions } = data;
    addGroup({ name, visibleName, permissions });
  };

  return (
    <div className="flex max-h-[80vh] w-[65vw] flex-col gap-4 overflow-y-auto">
      <h2 className="text-2xl font-bold">Dodaj nową grupę uprawnień</h2>
      {error && (
        <div className="inline-block w-fit whitespace-nowrap rounded-lg border border-red-500 bg-red-300 px-6 py-2 text-sm text-red-600">
          {error.response?.data?.message ||
            "Wystąpił błąd podczas dodawania grupy"}
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 rounded-lg bg-dark-lighterbg px-4 py-6"
      >
        <div className="flex w-full gap-12">
          <div className="w-1/2">
            <FormField label="Nazwa ID *" id="name" error={errors.name}>
              <TextInput
                type="text"
                name="name"
                autoComplete="new-name"
                placeholder="Nazwa ID grupy"
                register={register}
                validation={{ required: "To pole jest wymagane" }}
              />
            </FormField>
          </div>
          <div className="w-1/2">
            <FormField
              label="Nazwa wyświetlana *"
              id="visibleName"
              error={errors.visibleName}
            >
              <TextInput
                type="text"
                name="visibleName"
                autoComplete="new-visiblename"
                placeholder="Nazwa wyświetlana grupy"
                className="input-form"
                register={register}
                validation={{ required: "To pole jest wymagane" }}
              />
            </FormField>
          </div>
        </div>

        <FormField
          label="Uprawnienia *"
          id="permissions"
          error={errors.permissions}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
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
                              {...register("permissions", {
                                required:
                                  "Wybierz przynajmniej jedno uprawnienie",
                              })}
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
          <Button
            type="submit"
            buttonStyle="border-light"
            disabled={pendingAddGroup}
          >
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
