import { Helmet } from "react-helmet-async";

const Profile = () => {
  return (
    <>
      <Helmet>
        <title>Crazy Machines | Profile</title>
        <meta
          name="description"
          content="User's Profile"
        />
      </Helmet>
      <div>Profile</div>
    </>
  );
};

export default Profile;
