import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import HomeFooter from "../../components/Footer/HomeFooter";
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect } from "react";
import * as n from "../../routes/navigation";

const Landing = () => {
  const { state } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate(n.DASHBOARD);
    }
  });

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
