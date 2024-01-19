import React from "react";
import CIcon from "@coreui/icons-react";
import { Roles } from "src/configs";
const storedUser = localStorage.getItem('eyesclinicsystem_user');
const user = JSON.parse(storedUser);
const userId = user._id;
const userRole = user.role;
const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  // Admin Services
  {
    _tag: "CSidebarNavDropdown",
    name: "Users",
    icon: "cil-cash",
    permission: [Roles.ADMIN],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "List Users",
        to: "/users",
        permission: [Roles.ADMIN],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add User",
        to: "/users/create",
        permission: [Roles.ADMIN],
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Bác sĩ",
    icon: "cil-cash",
    permission: [Roles.ADMIN, Roles.PATIENT, Roles.NURSE, Roles.DOCTOR],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Danh sách bác sĩ",
        to: "/doctors",
        permission: [Roles.ADMIN, Roles.PATIENT, Roles.NURSE, Roles.DOCTOR],
      }
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Lịch khám",
    icon: "cil-cash",
    permission: [Roles.ADMIN, Roles.PATIENT, Roles.NURSE, Roles.DOCTOR],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Danh sách lịch làm việc",
        to: "/schedules",
        permission: [Roles.ADMIN, Roles.PATIENT, Roles.NURSE, Roles.DOCTOR],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Lịch làm việc",
        to: `/schedule/user`,
        permission: [Roles.DOCTOR],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Đăng ký lịch làm việc",
        to: "/schedules/create",
        permission: [Roles.DOCTOR],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Lịch khám đã đăng ký",
        to: "/schedules/patient/",
        permission: [Roles.PATIENT],
      },
      //tất cả các lịch đã đăng ký
      {
        _tag: "CSidebarNavItem",
        name: "Lịch khám đã đăng ký",
        to: "/doctor_schedules",
        permission: [ Roles.ADMIN],
      },
      

    ],
  },
  // Operator section
  // Analyst section
  {
    _tag: "CSidebarNavDropdown",
    name: "Khám bệnh",
    icon: "cil-cash",
    permission: [Roles.NURSE, Roles.DOCTOR],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Đo mắt",
        to: "/history/create/:schdeuleId",
        permission: [Roles.NURSE, Roles.DOCTOR],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Khám mắt",
        to: "/history/update/:schdeuleId",
        permission: [Roles.NURSE, Roles.DOCTOR],
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Notification",
    icon: "cil-cash",
    permission: [Roles.ADMIN],
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "List notification",
        to: "/notification",
        permission: [Roles.ADMIN],
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add notification",
        to: "/notification",
        permission: [Roles.ADMIN],
      },
    ],
  },
];

export default _nav;
