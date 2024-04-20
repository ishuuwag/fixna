import { Result } from "antd";
import { Link } from "react-router-dom";
import { HOME } from "../../routes/navigation";

const ErrorPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link to={HOME} />}
    />
  );
};

export default ErrorPage;
