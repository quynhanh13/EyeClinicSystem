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
import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { pagination as pag } from "src/configs/Pagination";
import { getListSchedulesOfUser } from "src/services/schedule";

const ListScheduleOfUser = ({ t }) => {
  const [pagination, setPagination] = useState(pag);
  const [data, setData] = useState();
  const storedUser = localStorage.getItem('eyesclinicsystem_user');
  const user = JSON.parse(storedUser);
  const userId = user._id;
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
    }

  ];

  const handleTableChange = (pagination, filters, sorter) => {
    let key = pagination.pageSize * (pagination.current - 1) + 1;
    getListSchedulesOfUser(userId, pagination, {}, {}, (res) => {
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
    getListSchedulesOfUser(userId, pagination, {}, {}, (res) => {
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

export default withNamespaces()(ListScheduleOfUser);
