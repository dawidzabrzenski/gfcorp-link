import { useEffect } from "react";

import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";

import { useGroups } from "../../features/permissions/useGroups";
import { useAddUser } from "../../features/users/useAddUser";

import FormField from "../Forms/FormField";
import TextInput from "../Forms/TextInput";
import SelectInput from "../Forms/SelectInput";
import Button from "../Button";

function AddUserForm({ onCloseModal }) {
  const { groupsData, pendingGroups } = useGroups();
  const { addUser, errorAddingUser, isSuccessAddingUser, pendingAddUser } =
    useAddUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isSuccessAddingUser) {
      reset();
      onCloseModal();
    }
  }, [isSuccessAddingUser, reset, onCloseModal]);

  const onSubmit = (data) => {
    const { email, password, firstName, lastName, group } = data;
    addUser({ email, password, firstName, lastName, group });
  };

  return (
    <div className="flex w-[65vw] flex-col gap-4">
      <h2 className="text-2xl font-bold">Dodaj nowego użytkownika</h2>
      {errorAddingUser && (
        <div className="inline-block w-fit whitespace-nowrap rounded-lg border border-red-500 bg-red-300 px-6 py-2 text-sm text-red-600">
          {errorAddingUser.response?.data?.message ||
            "Wystąpił błąd podczas dodawania grupy"}
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 rounded-lg bg-dark-lighterbg px-4 py-6"
      >
        <div className="flex w-full gap-12">
          <div className="w-1/2">
            <FormField label="Email *" id="email" error={errors.email}>
              <TextInput
                type="email"
                name="email"
                autoComplete="new-email"
                placeholder="twójmail@gfcorp.pl"
                register={register}
                validation={{
                  required: "Email jest wymagany",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Wprowadź poprawny email",
                  },
                }}
              />
            </FormField>
          </div>
          <div className="w-1/2">
            <FormField label="Hasło *" id="password" error={errors.password}>
              <TextInput
                type="password"
                name="password"
                autoComplete="new-password"
                placeholder="••••••"
                register={register}
                validation={{
                  required: "Hasło jest wymagane",
                  minLength: {
                    value: 6,
                    message: "Hasło musi mieć co najmniej 6 znaków",
                  },
                }}
              />
            </FormField>
          </div>
        </div>
        <div className="flex w-full gap-12">
          <div className="w-1/2">
            <FormField label="Imię *" id="firstName" error={errors.firstName}>
              <TextInput
                type="text"
                name="firstName"
                autoComplete="new-firstName"
                placeholder="Imię użytkownika"
                register={register}
                validation={{ required: "Imię jest wymagane" }}
              />
            </FormField>
          </div>
          <div className="w-1/2">
            <FormField label="Nazwisko *" id="lastName" error={errors.lastName}>
              <TextInput
                type="text"
                name="lastName"
                autoComplete="new-lastname"
                placeholder="Nazwisko użytkownika"
                register={register}
                validation={{ required: "Nazwisko jest wymagane" }}
              />
            </FormField>
          </div>
        </div>
        <div className="flex w-1/3 flex-col">
          <FormField label="Rola *" id="group" error={errors.group}>
            {pendingGroups ? (
              <Skeleton count={1} width="17.5%" height={35} />
            ) : (
              <SelectInput
                name="group"
                register={register}
                validation={{ required: "Rola jest wymagana" }}
                options={[
                  { value: "", label: "Wybierz rolę" },
                  ...groupsData.map((group) => ({
                    value: group._id,
                    label: group.visibleName,
                  })),
                ]}
              />
            )}
          </FormField>
        </div>

        <div className="flex w-fit gap-3">
          <Button
            type="submit"
            buttonStyle="border-light"
            disabled={pendingAddUser}
          >
            Dodaj użytkownika
          </Button>
          <Button type="button" buttonStyle="warning" onClick={onCloseModal}>
            Zamknij
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddUserForm;
