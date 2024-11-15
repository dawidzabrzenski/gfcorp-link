import { useForm } from "react-hook-form";
import { HiArrowLongLeft } from "react-icons/hi2";
import SectionHeader from "../../ui/SectionHeader";
import { useNavigate } from "react-router-dom";
import FormLabel from "../../ui/FormLabel";
import FormRow from "../../ui/FormRow";
import { useCreateTicket } from "./useCreateTicket";

function TicketAddForm() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { createTicket, error, isCreating } = useCreateTicket();

  const onSubmit = (data) => {
    createTicket({
      ...data,
      status: "not-assigned",
    });
    reset();
    navigate("/tickets");
  };

  const categories = ["MES", "MS365", "React", "Software"];

  return (
    <div className="flex flex-col gap-6 px-6">
      <div>
        <SectionHeader className="relative" title="Create new ticket">
          <HiArrowLongLeft
            size={40}
            className="absolute -translate-x-14 rounded-lg bg-slate-100 transition-all hover:animate-backSectionHeaderButton hover:cursor-pointer hover:text-maincolor"
            onClick={() => navigate("/tickets")}
          />
        </SectionHeader>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 rounded-md bg-slate-50 px-12 py-4"
      >
        <FormRow>
          <label htmlFor="summary">Subject</label>
          <input
            type="text"
            id="summary"
            required
            disabled={isCreating}
            className="w-3/4 rounded-md border px-2 py-3"
            {...register("summary", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow>
          <label htmlFor="type">Type</label>
          <select
            id="type"
            required
            disabled={isCreating}
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
          <label htmlFor="type" className="font-medium">
            Description
          </label>
          <textarea
            className="h-[15rem] w-3/4 rounded-md border px-2 py-3"
            id="description"
            required
            disabled={isCreating}
            {...register("description", { required: "This field is required" })}
          />
        </FormRow>

        <div className="flex justify-end">
          <button
            disabled={isCreating}
            className="rounded-md bg-maincolor px-6 py-2 text-stone-50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default TicketAddForm;
