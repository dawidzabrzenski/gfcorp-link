import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser as addUserAPI } from "../../services/apiUser";

export function useAddUser() {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const {
    mutate: addUser,
    data,
    error: errorAddingUser,
    isPending: pendingAddUser,
    isSuccess: isSuccessAddingUser,
  } = useMutation({
    mutationFn: (userData) => addUserAPI({ ...userData, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usersData"] });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });

  return {
    addUser,
    data,
    errorAddingUser,
    pendingAddUser,
    isSuccessAddingUser,
  };
}
