import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useState } from "react";

const useUserInfo = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
   const [loading, setLoading] = useState(true);

  const {
    data: userInfo = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      setLoading(false)
      return res.data;
    },
  });

  return { userInfo, isLoading, loading, refetch };
};

export default useUserInfo;
