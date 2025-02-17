import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { refetch } = useAuth();

  const {
    mutate: login,
    isPending,
    error: queryError,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      refetch();
      navigate("/dashboard", { replace: true });
    },
  });

  const error = queryError ? queryError.message : null;

  return { login, isPending, error };
}
