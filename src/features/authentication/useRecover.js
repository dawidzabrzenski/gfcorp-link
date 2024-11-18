import { useMutation } from "@tanstack/react-query";
import { recover } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useRecover() {
  const { mutate: recoverPass, isPending } = useMutation({
    mutationFn: recover,
    onSuccess: () =>
      toast.success(
        "Password recovery request successful! Please check your email for further instructions.",
      ),
    onError: (err) => toast.error(err),
  });

  return { recoverPass, isPending };
}
