import { Button, Col, Row } from "antd";

const HomeFooter = () => {
  return (
    <footer id="footer" className="dark">
      <div className="footer-wrap">
        <Row>
          <Col lg={6} sm={24} xs={24}></Col>
          <Col lg={6} sm={24} xs={24}></Col>
          <Col lg={6} sm={24} xs={24}></Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Follow us</h2>
              <div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://ant.design/"
                >
                  Facebook
                </a>
                <span> - </span>
                <span>FixNamibia</span>
              </div>
              <div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://antv.alipay.com/"
                >
                  Instagram
                </a>
                <span> - </span>
                <span>FixNambia</span>
              </div>
              <div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://eggjs.org/"
                >
                  X
                </a>
                <span> - </span>
                <span>FixNamibia</span>
              </div>
              
            </div>
          </Col>
          
        </Row>
      </div>
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

export default HomeFooter;
