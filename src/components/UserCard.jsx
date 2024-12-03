const UserCard = ({user}) =>{
    const {firstName, lastName, skills, photoUrl, age, gender,about} = user;
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src={user.photoUrl}
      alt="image" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    <p>{about}</p>
    <p>{age+ " , "+ gender}</p>
    <p>{skills}</p>
    <div className="card-actions justify-center">
    <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondry">Interested</button>
    </div>
  </div>
</div>
    )
}
export default UserCard;