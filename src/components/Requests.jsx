import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";
import RequestUserCard from "./RequestUserCard";

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    const fetchRequests = async () => {
        try {
            const response = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
            dispatch(addRequests(response.data.data));
            
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchRequests();
    }, []);
    if(!requests) return;
    if(requests.length === 0) return <h1 className="text-bold flex justify-center my-10 text-2xl">No Request found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl">Requests</h1>
      {requests.map((request) => (
        <div className=" flex justify-center"><RequestUserCard user={request} /></div>
        ))}
    </div>
  );
};
export default Requests;