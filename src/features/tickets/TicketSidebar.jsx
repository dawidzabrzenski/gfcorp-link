import { useForm } from "react-hook-form";
import FormLabel from "../../ui/FormLabel";
import FormRow from "../../ui/FormRow";

function TicketSidebar({ ticketData }) {
  const { register } = useForm();

  const categories = ["MES", "MS365", "React", "Software"];

  return (
    <div className="w-[25%] rounded-lg bg-gray-50 p-4">
      <form className="flex h-full flex-col gap-4">
        <FormRow>
          <FormLabel htmlFor="summary">Subject</FormLabel>
          <select
            id="type"
            className="w-3/4 rounded-md border px-2 py-3"
            {...register("type", {
              required: "This field is required",
            })}
          >
            {categories.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormRow>

        <FormRow>
          <FormLabel htmlFor="summary">Asignee</FormLabel>
          <select
            id="type"
            className="w-3/4 rounded-md border px-2 py-3"
            {...register("type", {
              required: "This field is required",
            })}
          >
            {categories.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormRow>
        <div>
          <button className="w-full rounded-lg bg-maincolor px-12 py-4 text-neutral-50">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default TicketSidebar;
