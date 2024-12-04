import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, skills, photoUrl, age, gender, about } =
    user;

  const dispatch = useDispatch();
  const handleSendRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(requestId));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={user.photoUrl} alt="image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        <p>{age + " , " + gender}</p>
        <p>{skills}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignore", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondry"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
