import { useQuery } from "@tanstack/react-query";
import { getUserDetail } from "../../services/apiAuth";

export function useUserDetail() {
  const {
    isPending,
    data: userDetail,
    error,
  } = useQuery({
    queryKey: ["userDetail"],
    queryFn: getUserDetail,
  });

  return { isPending, userDetail };
}
