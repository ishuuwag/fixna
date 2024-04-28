import { Col, Row } from "antd";

const ContentFooter = () => {
  return (
    <footer id="footer" className="dark">
      <Row className="bottom-bar">
        <Col lg={6} sm={24}></Col>
        <Col lg={18} sm={24}>
          <span style={{ marginRight: 12 }}>Copyright © Fix Namibia</span>
          <span style={{ marginRight: 12 }}>| {new Date().getFullYear()} </span>
        </Col>
      </Row>
    </footer>
  );
};

export default ContentFooter;
