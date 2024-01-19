import React, { useEffect, useState } from "react";
import moment from "moment";
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import {
  Table,
  Tag,
  Space,
  notification,
  Avatar,
  Button,
  Modal
} from "antd";
import {
  ExclamationCircleOutlined,
  UploadOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";
import { Notification, Roles, Status, Type } from "src/configs";
import { Link } from "react-router-dom";
// import moment from 'moment';
// import { useSelector } from 'react-redux';
import { numberWithCommas } from "src/services/money";
import { withNamespaces } from "react-i18next";
import { pagination as pag } from "src/configs/Pagination";
import { getAllDoctorSchedule, removeDoctorSchedule } from "src/services/schedule";

const ListDoctorSchedule = ({ match, t }) => {
  const [pagination, setPagination] = useState(pag);
  const [data, setData] = useState();
  const history = useHistory();
  const columns = [
    {
      title: t("ID"),
      dataIndex: "key",
    },
    {
      title: t("Patient"),
      dataIndex: "patient_name",
    },
    {
      title: t("Doctor"),
      dataIndex: "doctor_name",
    },
    {
      title: t("Time"),
      dataIndex: "timeType_name",
      filters: [
        {
          text: 'ca 1',
          value: 'ca 1',
        },
        {
          text: 'ca 2',
          value: 'ca 2',
        },
        {
          text: 'ca 3',
          value: 'ca 3',
        },
        {
          text: 'ca 4',
          value: 'ca 4',
        },
      ],
      onFilter: (value, record) => record.timeType_name.indexOf(value) === 0,
    },
    {
      title: t("Date"),
      dataIndex: "date",
      defaultSortOrder: 'descend',
      sorter: (a, b) => moment(a.date) - moment(b.date),
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: t("Number"),
      dataIndex: "number",
    },
    {
        title: t("Status"),
        dataIndex: "status",
        render: (status) => {
          let color, name;
          switch (status) {
            case 0:
              color = "gold";
              name = "Chưa kiểm tra";
              break;
            case 1:
              color = "blue";
              name = "Đã đo";
              break;
            case 2:
              color = "green";
              name = "Đã khám";
              break;
            default:
              color = "default-color"; // Màu mặc định nếu không có trạng thái nào phù hợp
              name = "Unknown"; // Giá trị mặc định nếu không có trạng thái nào phù hợp
              break;
          }
      
          return (
            <>
              <Tag color={color} key={name}>
                {name.toUpperCase()}
              </Tag>
            </>
          );
        },
      },
    {
      title: t("Action"),
      dataIndex: "_id",
      render: (_id) => {
        return (
          <>
            <Space size="middle">
              <Link to={`/history/${_id}`}>{t("Xem lịch sử")}</Link>
            </Space>
            
          </>
        );
      },
    },

    {
      title: t(""),
      dataIndex: "_id",
      render: (_id) => {
        return (
          <>
            <Space size="middle">
              {/* <Link to={`/schedules/${_id}`}>{t("Register")}</Link> */}
              <Button onClick={() => handleDeleteClick(_id)}>{t("Delete")}</Button>
            </Space>
          </>
        );
      },
    },
    
  ];
  const handleDeleteClick = (id) => {
    Modal.confirm({
      title: t(`Xóa lịch khám`),
      icon: <ExclamationCircleOutlined />,
      content: t(
        `You are going to delete this schedule? Are you sure you want to do this? You can't reverse this`
      ),
      onOk() {
        removeDoctorSchedule(id, (res) => {
          if (res.status === 1) {
            notification.success({
              message: t(`Notification`),
              description: `delete schedule of patient successful.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
            // setIsFinalUpdate(true)
            // history.push(`/schedules/patient`);
            window.location.reload()
          } else {
            notification.error({
              message: t(`Notification`),
              description: `delete schedule of patient failed.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop delete schedule of patient`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  }
  const handleTableChange = (pagination, filters, sorter) => {
    let key = pagination.pageSize * (pagination.current - 1) + 1;
    const storedUser = localStorage.getItem('eyesclinicsystem_user');
    const user = JSON.parse(storedUser);
    const id = user._id;
    getAllDoctorSchedule(pagination, {}, {}, (res) => {
        console.log('nnqa')
      if (res.status === 1) {
        res.data.schedule_list.forEach((schedule) => {
          schedule.key = key++;
        });

        setData(res.data.schedule_list);
        console.log(data)
        setPagination({ ...pagination, total: res.data.meta_data.total })

      } else if (res.status === 403) {
        notification.error({
          message: t(`Notification`),
          description: `${res.message + " " + res.expiredAt}`,
          placement: `bottomRight`,
          duration: 10,
        });
      } else {
        notification.error({
          message: t(`Notification`),
          description: `${res.message}`,
          placement: `bottomRight`,
          duration: 1.5,
        });
      }
    }, []);
  };

  useEffect(() => {
    console.log(123)
    getAllDoctorSchedule(pagination, {}, {}, (res) => {
        console.log(123)
      if (res.status === 1) {
        let key = 1;
        res.data.schedule_list.forEach((schedule) => {
          schedule.key = key++;
        });
        setData(res.data.schedule_list);
        console.log(res)
        setPagination({ ...pagination, total: res.meta_data.total });
      } else if (res.status === 403) {
        notification.error({
          message: t(`Notification`),
          description: `${res.message + " " + res.expiredAt}`,
          placement: `bottomRight`,
          duration: 10,
        });
      } else {
        notification.error({
          message: t(`Notification`),
          description: `${res.message}`,
          placement: `bottomRight`,
          duration: 1.5,
        });
      }
    });
  }, []);
  return (
    <CRow className="position-relative">
      <CCol xs="12" md="12" className="mb-4 position-absolute">
        <CCard>
          <CCardHeader>{t("List Patient of Doctor's Schedules")}</CCardHeader>
          <CCardBody>
            <Table
              className="overflow-auto"
              columns={columns}
              dataSource={data}
              pagination={pagination}
              onChange={handleTableChange}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default withNamespaces()(ListDoctorSchedule);
