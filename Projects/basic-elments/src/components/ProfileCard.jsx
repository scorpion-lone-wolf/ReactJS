import "./profilecard.css";
const ProfileCard = () => {
  return (
    <div className="profile-card">
      <div className="upper">
        <div className="avatar-container">
          <div className="avatar">
            <img src="../../public/my_profile_pic.jpeg" alt="profile-pic" />
          </div>
        </div>
      </div>
      <div className="middle">
        <div className="description">
          <span style={{ marginRight: "5px" }} className="text-bold">
            Rahul Singh
          </span>
          <span>27</span>
          <p style={{ textAlign: "center" }}>Kolkata</p>
        </div>
      </div>
      <div className="lower">
        <div className="followers">
          <span className="text-bold">80K</span>
          <span>Followers</span>
        </div>
        <div className="likes">
          <span className="text-bold">803K</span>
          <span>Likes</span>
        </div>
        <div className="photos">
          <span className="text-bold">1.4K</span>
          <span>Photos</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
