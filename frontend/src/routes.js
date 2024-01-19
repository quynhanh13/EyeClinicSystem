import React from "react";
import { Roles } from "./configs";

const ListSchedule = React.lazy(() => import("./views/schedule/ListSchedule"));
const ListScheduleOfUser = React.lazy(()=> import("./views/user/ListScheduleOfUser"));
const ListDoctorSchedule = React.lazy(() => import("./views/schedule/ListDoctorSchedule"));
const AddSchedule = React.lazy(() => import("./views/schedule/AddSchedule"));
const ScheduleDetail = React.lazy(() => import("./views/schedule/ScheduleDetail"));
const ScheduleOfPatient = React.lazy(() => import("./views/schedule/ScheduleOfPatient"))
const ScheduleOfDoctor = React.lazy(() => import("./views/schedule/ScheduleOfDoctor"));
const ListDoctors = React.lazy(() => import("./views/doctor/ListDoctors"));
const DoctorDetail = React.lazy(() => import("./views/doctor/DoctorDetail"));
const HistoryCreate = React.lazy(() => import("./views/history/HistoryCreate"));
const HistoryUpdate = React.lazy(() => import("./views/history/HistoryUpdate"));
const HistoryDetail = React.lazy(() => import("./views/history/HistoryDetail"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Homepage = React.lazy(() => import("./views/HomePage/HomePage"));
const Profile = React.lazy(() => import("./views/user/Profile"));
const ListSale = React.lazy(() => import("./views/sale/ListSale"));
const SaleDetail = React.lazy(() => import("./views/sale/SaleDetail"));
const AddSale = React.lazy(() => import("./views/sale/AddSale"));
const AddNotification = React.lazy(() => import("./views/notification/AddNotification"));

const routes = [
  { path: "/", exact: true, component: Homepage, name: "Home" },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    // permission: [Roles.ADMIN, Roles.SALES, Roles.OPERATOR, Roles.ANALYST,  Roles.MARKETER],
  },
  // User's route
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    permission: [Roles.DOCTOR, Roles.ADMIN, Roles.PATIENT, Roles.NURSE],
    exact: true,
  },
  // ADMIN's Route
  {
    path: "/users",
    name: "List Users",
    component: ListSale,
    // permission: [Roles.ADMIN],
    exact: true,
  },
  {
    path: "/users/create",
    name: "Add User",
    component: AddSale,
    // permission: [Roles.ADMIN],
    exact: true,
  },
  {
    path: "/users/:id",
    name: "User Detail",
    component: SaleDetail,
    // permission: [Roles.ADMIN],
    exact: true,
  },
  // Doctor
  {
    path: "/doctors",
    name: "List Doctors",
    component: ListDoctors,
    // permission: [Roles.ADMIN, Roles.PATIENT, Roles.NURSE, Roles.DOCTOR],
    exact: true,
  },
  {
    path: "/doctors/:id",
    name: "Doctor Detail",
    component: DoctorDetail,
    // permission: [Roles.ADMIN,  Roles.PATIENT,  Roles.PATIENT],
    exact: true,
  },
  // Schedule
  {
    path: "/schedules",
    name: "List Schedules",
    component: ListSchedule,
    permission: [Roles.ADMIN, Roles.PATIENT, Roles.NURSE, Roles.DOCTOR],
    exact: true,
  },

  //thêm lịch làm việc của bác sĩ
  {
    path: "/schedules/create",
    name: "Add Schedule",
    component: AddSchedule,
    permission: [Roles.ADMIN, Roles.DOCTOR],
    exact: true,
  },

  //danh sách bệnh nhân của lịch
  {
    path: "/schedules/:id",
    name: "List Patient of Schedule",
    component: ScheduleDetail,
    permission: [Roles.ADMIN, Roles.DOCTOR, Roles.NURSE],
    exact: true,
  },

  //danh sách lịch làm việc của 1 bác sĩ
  {
    path: "/schedules/doctor/:id",
    name: "List Schedule of Doctor",
    component: ScheduleOfDoctor,
    permission: [Roles.ADMIN, Roles.DOCTOR, Roles.PATIENT, Roles.NURSE],
    exact: true,
  },
  
  {
    path: "/schedule/user",
    name: "Lịch làm việc",
    component: ListScheduleOfUser,
    permission: [Roles.DOCTOR],
    exact: true,
  },

  //danh sach doctorschedule của 1 bệnh nhân
  {
    path: "/schedules/patient",
    name: "List Schedule of Patient",
    component: ScheduleOfPatient,
    permission: [Roles.PATIENT],
    exact: true,
  },

  //Doctor Schedule: danh sách tất cả các bệnh nhân đã đăng ký lịch khám
  {
    path: "/doctor_schedules",
    name: "List Doctor Schedules",
    component: ListDoctorSchedule,
    permission: [Roles.ADMIN, Roles.DOCTOR],
    exact: true,
  },
  {
    path: "/doctor_schedules/create",
    name: "Add Patient to Doctor Schedule",
    component: AddSchedule,
    permission: [Roles.ADMIN, Roles.DOCTOR],
    exact: true,
  },
  //Lịch sử khám

  {
    path: "/history/:schdeuleId",
    name: "History Examination",
    component: HistoryDetail,
    permission: [Roles.ADMIN, Roles.DOCTOR, Roles.NURSE, Roles.PATIENT],
    exact: true,
  },
  {
    path: "/history/update/:schdeuleId",
    name: "Khám mắt ",
    component: HistoryUpdate,
    permission: [Roles.DOCTOR],
    exact: true,
  },
  {
    path: "/history/create/:schdeuleId",
    name: "Đo mắt ",
    component: HistoryCreate,
    permission: [Roles.NURSE],
    exact: true,
  },
  {
    path: "/notification",
    name: "Add notification",
    component: AddNotification,
    permission: [Roles.ADMIN],
    exact: true,
  },
];

export default routes;
