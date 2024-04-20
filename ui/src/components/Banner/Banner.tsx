import { Button } from "antd";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import BannerSVG from "./BannerSVGAnim";

export const Banner = () => {
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
          <a
            href="https://accounts.asgardeo.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button type="primary">Login</Button>
          </a>
          <a
            href="https://asgardeo.io/signup"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button style={{ margin: "0 16px" }} type="primary" ghost>
              Register
            </Button>
          </a>
          {/* <GitHubButton
            key="github-button"
            type="stargazers"
            namespace="ant-design"
            repo="ant-design-pro"
          /> */}
        </div>
      </QueueAnim>
      <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
        <BannerSVG />
      </TweenOne>
    </div>
  );
};

export default Banner;
