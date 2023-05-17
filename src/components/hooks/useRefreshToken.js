import axios from "axios";
import useAuth from "./useAuth";
import jwt_decode from "jwt-decode";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", { withCredentials: true });
    console.log(response.data);
    const decoded = jwt_decode(response.data.accessToken);
    setAuth({
      user: decoded.info.userName,
      accessToken: response.data.accessToken,
      id: decoded.info.id,
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
