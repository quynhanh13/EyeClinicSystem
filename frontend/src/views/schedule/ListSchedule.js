import React, { useEffect, useState } from "react";
import moment from "moment";
import removeDiacritics from 'remove-diacritics';
import { CCol, CRow, CCard, CCardBody, CCardHeader } from "@coreui/react";
import {
  Table,
  Tag,
  Space,
  notification,
  Modal,
  Input,
  Select,
  
  // Avatar
  Button
} from "antd";
import {  } from '@ant-design/icons';
import {
  ExclamationCircleOutlined,
  FilterOutlined,
  UploadOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { Notification, Roles, Status, Type } from "src/configs";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { getListUsers } from "src/services/user";
import { numberWithCommas } from "src/services/money";
import { withNamespaces } from "react-i18next";
import { pagination as pag } from "src/configs/Pagination";
import { getListSchedules, createDoctorSchedule } from "src/services/schedule";

const ListSchedule = ({ t }) => {
  const [pagination, setPagination] = useState(pag);
  const [data, setData] = useState();
  const [searchText, setSearchText] = useState("");
  const [originalData, setOriginalData] = useState();
  const [filterTime, setFilterTime] = useState(null);
  const history = useHistory();
  const storedUser = localStorage.getItem('eyesclinicsystem_user');
  const user = JSON.parse(storedUser);
  const userId = user._id;
  const userRole = user.role;
  console.log('role', userRole)
  const columns = [
    {
      title: t("ID"),
      dataIndex: "key",
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
      title: t("Current Number"),
      dataIndex: "currentNumber",
    },
    (userRole === 'DOCTOR' || userRole === 'ADMIN' || userRole === 'NURSE') ?
      {
        title: t("Action"),
        dataIndex: "_id",
        render: (_id) => {
          return (
            <>
              <Space size="middle">
                <Link to={`/schedules/${_id}`}>{t("Detail")}</Link>
              </Space>
            </>
          );
        },
      } :
      {
        title: t(""),
        dataIndex: "_id",
        render: (_id) => {
          return (
            <>
              <Space size="middle">
                <Button onClick={() => handleRegisterClick(_id, userId)}>{t("Register")}</Button>
              </Space>
            </>
          );
        },
      },
  ];
  const handleSearch = (value) => {

    setSearchText(value);

    filterData(value);
  };

  const filterData = (value) => {
    const normalizedSearchText = removeDiacritics(value.toLowerCase());
    const filteredData = originalData.filter((item) => {
      const normalizedDoctorName = removeDiacritics(item.doctor_name.toLowerCase()); 
      return normalizedDoctorName.includes(normalizedSearchText);
    });

    setData(filteredData);
  };



  const handleRegisterClick = (schedule_id, patient_id) => {
    Modal.confirm({
      title: t(`Đăng ký lịch khám`),
      icon: <ExclamationCircleOutlined />,
      content: t(
        `You are going to register this schedule? Are you sure you want to do this? You can't reverse this`
      ),
      onOk() {
        const data = {
          "scheduleId": schedule_id,
          "patientId": patient_id,
        }
        createDoctorSchedule(data, (res) => {
          if (res.status === 1) {
            notification.success({
              message: t(`Notification`),
              description: `Create schedule of patient successful.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
            // setIsFinalUpdate(true)
            history.push(`/schedules/patient`);
          } else {
            notification.error({
              message: t(`Notification`),
              description: `Create schedule of patient failed.`,
              placement: `bottomRight`,
              duration: 1.5,
            });
          }
        });
      },
      onCancel() {
        notification.info({
          message: t(`Notification`),
          description: t(`Stop Create schedule of patient`),
          placement: `bottomRight`,
          duration: 1.5,
        });
      },
      centered: true,
    });
  }
  const handleTableChange = (pagination, filters, sorter) => {
    let key = pagination.pageSize * (pagination.current - 1) + 1;
    getListSchedules(pagination, {}, {}, (res) => {
      if (res.status === 1) {
        // let key = 1;
        res.data.schedule_list.forEach((schedule) => {
          schedule.key = key++;
        });

        setData(res.data.schedule_list);
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
    getListSchedules(pagination, {}, {}, (res) => {
      if (res.status === 1) {
        let key = 1;
        res.data.schedule_list.forEach((schedule) => {
          schedule.key = key++;
        });
        setData(res.data.schedule_list);
        setOriginalData(res.data.schedule_list);
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
        <Input.Search
          size="large"
          placeholder={t("Nhập tên bác sĩ")}
          enterButton
          onSearch={handleSearch}
        />
        <CCard>
          <CCardHeader>{t("List Schedules")}</CCardHeader>
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

export default withNamespaces()(ListSchedule);
