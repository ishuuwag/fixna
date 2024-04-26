import { Button } from "antd";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import BannerSVG from "./BannerSVGAnim";
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as n from "../../routes/navigation";

export const Banner = () => {
  const { state, signIn } = useAuthContext();
  const [isLoading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate(n.DASHBOARD);
    }
  });

  const handleSignIn = () => {
    setLoading(true);
    signIn();
  };

  return (
    <div className="banner-wrapper">
      <QueueAnim className="banner-title-wrapper" type={"right"}>
        <div key="line" className="title-line-wrapper">
          <div
            className="title-line"
            style={{ transform: "translateX(-64px)" }}
          />
        </div>
        <h1 key="h1">Fix Namibia</h1>
        <p key="content">Report incidents and defects in your town</p>
        <div key="button" className="button-wrapper">
          <Button
            type="primary"
            loading={isLoading}
            disabled={isLoading}
            onClick={() => handleSignIn()}
          >
            Login
          </Button>
          <a
            href={process.env.REACT_APP_REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button style={{ margin: "0 16px" }} type="primary" ghost>
              Register
            </Button>
          </a>
        </div>
      </QueueAnim>
      <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
        <BannerSVG />
      </TweenOne>
    </div>
  );
};

export default Banner;
