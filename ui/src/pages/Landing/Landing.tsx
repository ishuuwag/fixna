import Banner from "../../components/Banner/Banner";
import HomeFooter from "../../components/Footer/HomeFooter";
import { useAuthContext } from "@asgardeo/auth-react";

const Landing = () => {
  return (
    <>
      <div className="home-wrapper">
        <Banner />
      </div>
      <HomeFooter />
    </>
  );
};

export default Landing;
