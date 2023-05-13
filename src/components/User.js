import { useState, useEffect } from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getUser();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <div>
      <h2>{users?.length ? users.userName : "Not logged in"}</h2>
      <button onClick={() => refresh()}></button>
    </div>
  );
};
