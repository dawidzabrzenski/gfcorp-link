import { useGroups } from "../../features/permissions/useGroups";
import Skeleton from "react-loading-skeleton";
import { useForm } from "react-hook-form";
import FormField from "../Forms/FormField";
import TextInput from "../Forms/TextInput";
import SelectInput from "../Forms/SelectInput";
import Button from "../Button";

function AddUserForm({ onCloseModal }) {
  const { groups, pendingGroups } = useGroups();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <div className="flex w-[65vw] flex-col gap-4">
      <h2 className="text-2xl font-bold">Dodaj nowego użytkownika</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 rounded-lg bg-dark-lighterbg px-4 py-6"
      >
        <div className="flex w-full gap-12">
          <div className="w-1/2">
            <FormField label="Email" id="email" error={errors.email}>
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
            <FormField label="Hasło" id="password" error={errors.password}>
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
            <FormField label="Imię" id="name" error={errors.name}>
              <TextInput
                type="text"
                name="name"
                autoComplete="new-name"
                placeholder="Imię użytkownika"
                register={register}
                validation={{ required: "Imię jest wymagane" }}
              />
            </FormField>
          </div>
          <div className="w-1/2">
            <FormField label="Nazwisko" id="surname" error={errors.surname}>
              <TextInput
                type="text"
                name="surname"
                autoComplete="new-surname"
                placeholder="Nazwisko użytkownika"
                register={register}
                validation={{ required: "Nazwisko jest wymagane" }}
              />
            </FormField>
          </div>
        </div>
        <div className="flex w-1/3 flex-col">
          <FormField label="Rola" id="role" error={errors.role}>
            {pendingGroups ? (
              <Skeleton count={1} width="17.5%" height={35} />
            ) : (
              <SelectInput
                name="role"
                register={register}
                validation={{ required: "Rola jest wymagana" }}
                options={[
                  { value: "", label: "Wybierz rolę" },
                  ...groups.map((group) => ({
                    value: group.name,
                    label: group.visibleName,
                  })),
                ]}
              />
            )}
          </FormField>
        </div>

        <div className="flex w-fit gap-3">
          <Button type="submit" buttonStyle="border-light">
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
