import useAxiosPrivate from "./useAxiosPrivate";
import { useDispatch } from "react-redux";
import { setLogout } from "../slices/Auth";

const useLogout = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      const response = await axiosPrivate.delete("/api/auth/logout", {});
      dispatch(setLogout());
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
