import React, { useEffect, useState } from "react";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  notification,
  Upload,
  Avatar,
  InputNumber,
  Radio,
  Divider,
  DatePicker
} from "antd";
import { createSchedule } from "src/services/schedule";
import {
  ExclamationCircleOutlined,
  UploadOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { withNamespaces } from "react-i18next";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const AddSchedule = ({ t }) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [schedule, setData] = useState(0);
  // const {timeTypeId, date} = useSelector(
  //   (state) => state
  // );


  const onFinish = (values) => {
    const storedUser = localStorage.getItem('eyesclinicsystem_user');
    const user = JSON.parse(storedUser);
    const user_id = user._id;
    values.userId = user_id;
    Modal.confirm({
      title: t(`Create Schedule`),
      icon: <ExclamationCircleOutlined />,
      content: t(
        `You are going to create this Schedule? Are you sure you want to do this? You can't reverse this`
      ),
      onOk() {
        const data = {
          curentNumber: 0,
          maxNumber: 15,
          timeTypeId: values.timeTypeId,
          userId: values.userId,
          date: values.date,
        }
        createSchedule(data, (res) => {
          if (res.status === 1) {
            notification.success({
              message: t(`Notification`),
              description: `Create schedule successful.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
            // setIsFinalUpdate(true)
            history.push("/schedules");
          } else {
            notification.error({
              message: t(`Notification`),
              description: t(`${res.message}`),
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop create schedule`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  };

  return (
    <CRow>
      <CCol xs="12" md="9" className="mb-4">
        <CCard>
          <CCardHeader
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            {t("Add Schedule")}
          </CCardHeader>
          <CCardBody>
            <Form
              form={form}
              initialValues={{
                curentNumber: 0,
                maxNumber: 15,
                // doctorId: 
              }}
              {...formItemLayout}
              onFinish={onFinish}>
              {/* <Form.Item
                label={t("Current Number")}
                labelAlign="left"
                name="curentNumber"
              > */}
              {/* </Form.Item> */}
              <Form.Item
                label={t("Time")}
                labelAlign="left"
                initialValue="1"
                name="timeTypeId"
              >
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select time"
                  optionFilterProp="time"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Select.Option value="658850906bd27e3631c85e23">{t("Ca 1")}</Select.Option>
                  <Select.Option value="658851016bd27e3631c85e24">{t("Ca 2")}</Select.Option>
                  <Select.Option value="658851136bd27e3631c85e25">{t("Ca 3")}</Select.Option>
                  <Select.Option value="658851306bd27e3631c85e26">{t("Ca 4")}</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={t("Date ")}
                labelAlign="left"
                name="date"
              >
                <DatePicker style={{ width: "100%" }} placeholder="Select date" />
              </Form.Item>
              <Button type="primary" block htmlType="submit">
                {t("Create")}
              </Button>
            </Form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default withNamespaces()(AddSchedule);
