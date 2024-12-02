import { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName); 
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl,setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender,setGender] = useState(user.gender);
    const [about,setAbout] = useState(user.about);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);
    const saveProfile = async () => {
        //clear error
        setError("");
        try{
            const  res = await axios.patch(BASE_URL + "/profile/edit", {firstName, lastName, gender, age, about, photoUrl}, {withCredentials: true});
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(()=>{
                setShowToast(false);
            }, 3000);
        }catch(error){
            setError(error.response.data);
        }
    }

    return (
    <>
    <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
           <div className="card bg-base-100 image-full w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center">Edit Profile</h2>
    <div>
    <label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">FirstName</span>
  </div>
  <input type="text" 
  value={firstName}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setFirstName(e.target.value)}
    />
</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">LastName</span>
  </div>
  <input type="text" 
  value={lastName}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setLastName(e.target.value)}
    />
</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Age</span>
  </div>
  <input type="text" 
  value={age}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setAge(e.target.value)}
    />
</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Gender</span>
  </div>
  <input type="text" 
  value={gender}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setGender(e.target.value)}
    />
</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">About</span>
  </div>
  <input type="text" 
  value={about}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setAbout(e.target.value)}
    />
</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Update Photo</span>
  </div>
  <input type="text" 
  value={photoUrl}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => setPhotoUrl(e.target.value)}
    />
</label>


    </div>
    <p className="text-red-500">{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={saveProfile} >Save Profile</button>
    </div>
  </div>
</div>
</div>
<UserCard user={{firstName, lastName, gender, age, about, photoUrl}}/>
   </div>
   
   {showToast && (<div className="toast toast-center toast-middle">
  <div className="alert alert-success">
    <span>Profile updated successfully.</span>
  </div>
</div>)}
</> );
    }
 export default EditProfile;