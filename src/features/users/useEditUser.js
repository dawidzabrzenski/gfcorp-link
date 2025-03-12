import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser as editUserAPI } from "../../services/apiUser";

export function useEditUser() {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const {
    mutate: editUser,
    data,
    error: errorEditingUser,
    isPending: pendingEditUser,
    isSuccess: isSuccessEditingUser,
  } = useMutation({
    mutationFn: (userData) => editUserAPI({ ...userData, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usersData"] });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });

  return {
    editUser,
    data,
    errorEditingUser,
    pendingEditUser,
    isSuccessEditingUser,
  };
}
