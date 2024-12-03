import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import ConnectionUserCard from "./ConnectionUserCard";


const Connections = () => {
    const connections = useSelector((store) => store.connection);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {
            const response = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnection(response.data.data));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchConnections();
    }, []);
    if(!connections) return;
    if(connections.length === 0) return <h1 className="text-bold text-2xl">No Connection found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl">Connections</h1>
      {connections.map((connection) => (
        <div className=" flex justify-center"><ConnectionUserCard user={connection} /></div>
        ))}
    </div>
  );
}
export default Connections;