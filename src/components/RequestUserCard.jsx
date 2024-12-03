import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch ,useSelector} from 'react-redux';
import { removeRequest } from '../utils/requestSlice';

const RequestUserCard = ({user}) =>{
    //const user = userData.fromUserId;
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status, requestId) => {
        try {
            await axios.post(BASE_URL + "/request/review/"+status+"/"+requestId,  {}, { withCredentials: true });
            dispatch(removeRequest(user._id));
        } catch (error) {
            console.error(error);
        }
    }
    const {firstName, lastName, skills, photoUrl, age, gender,about} = user.fromUserId;
    return (
        <div className="card bg-base-100 w-96 shadow-xl rounded-full flex justify-center">
  <figure>
    <img
      src={user.fromUserId.photoUrl}
      alt="image" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    <p>{about}</p>
    <p>{age+ " , "+ gender}</p>
    <p>{skills}</p>
    <div className="card-actions justify-center">
    </div>
    <div className="card-actions justify-center">
    <button className="btn btn-primary" onClick={()=>reviewRequest("rejected",user._id)}>Reject</button>
      <button className="btn btn-secondry"  onClick={()=>reviewRequest("accepted",user._id)}>Accept</button>
    </div>
  </div>
</div>
    )
}
export default RequestUserCard;