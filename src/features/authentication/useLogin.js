import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending,
    error: queryError,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => {
      const errorMessage = err.message || "Wystąpił nieoczekiwany błąd";
    },
  });

  const error = queryError ? queryError.message : null;

  return { login, isPending, error };
}
