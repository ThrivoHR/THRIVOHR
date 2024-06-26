import React from "react";
import { Button, Col, Collapse, Form, Input, Row } from "antd";

export default function Filter() {
  const { Panel } = Collapse;
  return (
    <div>
      <Collapse
        defaultActiveKey={["1"]}
        size="small"
        style={{ width: "100%", marginBottom: "10px" }}
      >
        <Panel header="Search Information" key="1">
          <div style={{ padding: "10px 0" }}>
            <Form layout="vertical">
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Form.Item name="">
                    <Input/>
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item name="">
                    <Input/>
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item name="">
                    <Input/>
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item>
                    <Input/>
                  </Form.Item>
                </Col>

                <Col span={24} style={{ textAlign: "left" }}>
                  <Button style={{ marginRight: "10px" }}>Clean Filter</Button>
                  <Button type="primary" htmlType="submit">
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
