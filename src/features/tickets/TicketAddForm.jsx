import { useForm } from "react-hook-form";
import { HiArrowLongLeft } from "react-icons/hi2";

import SectionHeader from "../../ui/SectionHeader";
import { useNavigate } from "react-router-dom";
import FormLabel from "../../ui/FormLabel";
import FormRow from "../../ui/FormRow";
import FormInput from "../../ui/FormInput";

function TicketAddForm() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <div className="flex flex-col gap-6 px-6">
      <div>
        <SectionHeader className="relative" title="Create new ticket">
          <HiArrowLongLeft
            size={40}
            className="hover:animate-backSectionHeaderButton absolute -translate-x-14 rounded-lg bg-slate-100 transition-all hover:cursor-pointer hover:text-maincolor"
            onClick={() => navigate("/tickets")}
          />
        </SectionHeader>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-4 rounded-md bg-slate-50 px-12 py-4"
      >
        <FormRow className="flex items-center gap-12">
          <FormLabel title="Subject" />
          <FormInput
            type="text"
            id="subject"
            {...register("title", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <button>Test</button>
      </form>
    </div>
  );
}

export default TicketAddForm;
