import NProgress from "nprogress";
import { useEffect } from "react";

const LoadingScreen = () => {
  NProgress.configure({ showSpinner: true });

  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return <></>;
};

export default LoadingScreen;
