const Schedule = require('../model/schedule');
const TimeType = require('../model/timeType');
const Doctor = require('../model/doctor');
const User = require('../model/user');
const security = require('../utils/security');
const CONFIG_STATUS = require('../config/status.json');
const { REGEX } = require('../config/regex');
const mongoose = require('mongoose');

const getAllSchedule = async () => {
    var schedule_list = [];
    var schedules = [];
    var total = Number;
    schedules = await Schedule.find(
        null,
        'curentNumber maxNumber timeTypeId doctorId date status created_at updated_at'
    )


    for (let i = 0; i < schedules.length; i++) {
        let schedule_detail = {
            _id: String,
            currentNumber: Number,
            maxNumber: Number,
            timeType_name: String,
            doctor_name: String,
            date: Date,
            status: Number,
            created_at: Date,
            updated_at: Date,
        };
        const timeType = await TimeType.findOne({ _id: schedules[i].timeTypeId });
        const doctor = await Doctor.findOne({ _id: schedules[i].doctorId });
        const user = await User.findOne({ _id: doctor.userId });
        schedule_detail._id = schedules[i]._id;
        schedule_detail.currentNumber = schedules[i].curentNumber;
        schedule_detail.maxNumber = schedules[i].maxNumber;
        schedule_detail.timeType_name = timeType.name;
        schedule_detail.doctor_name = user.name;
        schedule_detail.date = schedules[i].date;
        schedule_detail.status = schedules[i].status;
        schedule_detail.created_at = schedules[i].created_at;
        schedule_detail.updated_at = schedules[i].updated_at;

        schedule_list.push(schedule_detail);
    }

    return {
        schedule_list,
        meta_data: {
            length: schedule_list.length,
            total,
        },
    };
};

const getScheduleByDoctorId = async({doctor_id}) => {
    var schedule_list = [];
    var schedules = [];
    var total = Number;
    schedules = await Schedule.find(
        {doctorId: doctor_id},
        'curentNumber maxNumber timeTypeId doctorId date status created_at updated_at'
    )


    for (let i = 0; i < schedules.length; i++) {
        let schedule_detail = {
            _id: String,
            currentNumber: Number,
            maxNumber: Number,
            timeType_name: String,
            doctor_name: String,
            date: Date,
            status: Number,
            created_at: Date,
            updated_at: Date,
        };
        const timeType = await TimeType.findOne({ _id: schedules[i].timeTypeId });
        const doctor = await Doctor.findOne({ _id: schedules[i].doctorId });
        const user = await User.findOne({ _id: doctor.userId });
        schedule_detail._id = schedules[i]._id;
        schedule_detail.currentNumber = schedules[i].curentNumber;
        schedule_detail.maxNumber = schedules[i].maxNumber;
        schedule_detail.timeType_name = timeType.name;
        schedule_detail.doctor_name = user.name;
        schedule_detail.date = schedules[i].date;
        schedule_detail.status = schedules[i].status;
        schedule_detail.created_at = schedules[i].created_at;
        schedule_detail.updated_at = schedules[i].updated_at;

        schedule_list.push(schedule_detail);
    }

    return {
        schedule_list,
        meta_data: {
            length: schedule_list.length,
            total,
        },
    };
}
const getScheduleByUserId = async(user_id) => {
    var schedule_list = [];
    var schedules = [];
    var total = Number;
    console.log('2', user_id)
    const userIdObject = mongoose.Types.ObjectId(user_id);
    console.log('3', userIdObject)
    const doctor = await Doctor.findOne({userId: userIdObject})
    console.log(doctor)
    schedules = await Schedule.find(
        {doctorId: doctor._id},
        'curentNumber maxNumber timeTypeId doctorId date status created_at updated_at'
    )


    for (let i = 0; i < schedules.length; i++) {
        let schedule_detail = {
            _id: String,
            currentNumber: Number,
            maxNumber: Number,
            timeType_name: String,
            doctor_name: String,
            date: Date,
            status: Number,
            created_at: Date,
            updated_at: Date,
        };
        const timeType = await TimeType.findOne({ _id: schedules[i].timeTypeId });
        const doctor = await Doctor.findOne({ _id: schedules[i].doctorId });
        const user = await User.findOne({ _id: doctor.userId });
        schedule_detail._id = schedules[i]._id;
        schedule_detail.currentNumber = schedules[i].curentNumber;
        schedule_detail.maxNumber = schedules[i].maxNumber;
        schedule_detail.timeType_name = timeType.name;
        schedule_detail.doctor_name = user.name;
        schedule_detail.date = schedules[i].date;
        schedule_detail.status = schedules[i].status;
        schedule_detail.created_at = schedules[i].created_at;
        schedule_detail.updated_at = schedules[i].updated_at;

        schedule_list.push(schedule_detail);
    }

    return {
        schedule_list,
        meta_data: {
            length: schedule_list.length,
            total,
        },
    };
}

// const createSchedule = async ({
//     curentNumber,
//     maxNumber,
//     timeTypeId,
//     doctorId,
//     date
// }) => {
//     await Schedule.create({
//         curentNumber,
//         maxNumber,
//         timeTypeId,
//         doctorId,
//         date
//     });
//     return {
//         status: CONFIG_STATUS.SUCCESS,
//         message: 'The schedule created successful.',
//     };
// }
const createSchedule = async ({
    curentNumber,
    maxNumber,
    timeTypeId,
    userId,
    date
}) => {
    console.log(userId)
    const doctor = await Doctor.findOne({userId: userId})
    console.log('1232')
    console.log(doctor)
    const doctorId = doctor._id;
    await Schedule.create({
        curentNumber,
        maxNumber,
        timeTypeId,
        doctorId,
        date
    });
    return {
        status: CONFIG_STATUS.SUCCESS,
        message: 'The schedule created successful.',
    };
}

const increaseCurrentNumber = async (scheduleId) => {
      const updatedSchedule = await Schedule.findOneAndUpdate(
        { _id: scheduleId },
        { $inc: { curentNumber: 1 } }, // Tăng currentNumber lên 1
      );
      console.log('tăng', updatedSchedule)
};
const decreaseCurrentNumber = async (scheduleId) => {
    const updatedSchedule = await Schedule.findOneAndUpdate(
        { _id: scheduleId },
        { $inc: { curentNumber: -1 } }, // Tăng currentNumber lên 1
      );
      console.log('giảm', updatedSchedule)
};
  
  

module.exports = {
    getAllSchedule,
    createSchedule,
    getScheduleByDoctorId,
    getScheduleByUserId,
    increaseCurrentNumber,
    decreaseCurrentNumber
}