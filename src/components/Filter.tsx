import React from "react";
import { Button, Col, Collapse, Form, Input, Row } from "antd";
import { ExportOutlined, ImportOutlined } from '@ant-design/icons';

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
          <div style={{ padding: "6px 0" }}>
            <Form layout="vertical">
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item name="1">
                    <Input placeholder="Employee ID"/>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item name="2">
                    <Input placeholder="Department"/>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item name="3">
                    <Input placeholder="Position"/>
                  </Form.Item>
                </Col>
                <Col span={12} style={{ textAlign: "left" }}>
                  <Button style={{ marginRight: "10px" }}>Clean Filter</Button>
                  <Button type="primary" htmlType="submit">
                    Search
                  </Button>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <Button type="primary" icon={<ImportOutlined />} className="mr-3 bg-green-400 hover:!bg-green-300">Import</Button>
                  <Button icon={<ExportOutlined />} type="primary" htmlType="submit" className="bg-orange-400 hover:!bg-orange-300">
                    Export
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
