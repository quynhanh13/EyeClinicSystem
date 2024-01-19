const Schedule = require('../model/schedule');
const TimeType = require('../model/timeType');
const Doctor = require('../model/doctor');
const User = require('../model/user');
const DoctorSchedule = require('../model/doctorSchedule');
const ScheduleService = require('../service/schedule');
const security = require('../utils/security');
const CONFIG_STATUS = require('../config/status.json');
const { REGEX } = require('../config/regex');
const { schedule } = require('node-cron');

const getAllDoctorSchedule = async () => {
    var schedule_list = [];
    var schedules = [];
    var total = Number;
    schedules = await DoctorSchedule.find(
        null,
        'scheduleId patientId number status created_at updated_at'
    )


    for (let i = 0; i < schedules.length; i++) {
        let schedule_detail = {
            _id: String,
            timeType_name: String,
            doctor_name: String,
            date: Date,
            patient_name: String,
            number: Number,
            status: Number,
            created_at: Date,
            updated_at: Date,
        };
        const schedule = await Schedule.findOne({ _id: schedules[i].scheduleId });
        const timeType = await TimeType.findOne({ _id: schedule.timeTypeId });
        const doctor = await Doctor.findOne({ _id: schedule.doctorId });
        const userDoctor = await User.findOne({ _id: doctor.userId });
        const userPatient = await User.findOne({ _id: schedules[i].patientId });

        schedule_detail._id = schedules[i]._id;
        schedule_detail.timeType_name = timeType.name;
        schedule_detail.doctor_name = userDoctor.name;
        schedule_detail.date = schedule.date;
        schedule_detail.patient_name = userPatient?.name? userPatient.name : null;
        schedule_detail.number = schedules[i].number;
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

const createDoctorSchedule = async ({
    scheduleId,
    patientId,
}) => {
    const schedule = await Schedule.findOne({ _id: scheduleId });
    if (!schedule) {
        return {
            status: CONFIG_STATUS.FAIL,
            message:
                'Create schedule failed, the schedule ID is not exist. Please try again',
        };
    }
    const existingPatient = await User.findOne({ _id: patientId });
    if (!existingPatient) {
        return {
            status: CONFIG_STATUS.FAIL,
            message:
                'Create schedule failed, the patient ID is not exist. Please try again',
        };
    }
    console.log(patientId, 'qa', scheduleId)
    const alreadyPatient = await DoctorSchedule.findOne({ patientId: patientId, status: 0});
    console.log('qa', alreadyPatient);
    if (alreadyPatient ) {
        return {
            status: CONFIG_STATUS.FAIL,
            message:
                'Create schedule failed, the patient already registerd. Please try again',
        };
    }
    let number = schedule.curentNumber + 1;
    console.log(number)
    if (number > schedule.maxNumber) {
        return {
            status: CONFIG_STATUS.FAIL,
            message:
                'Create schedule failed, the doctor already full patient. Please try again',
        };
    }

    const newDoctorSchedule = await DoctorSchedule.create({
        scheduleId,
        patientId,
        number
    });
    await ScheduleService.increaseCurrentNumber(scheduleId);

    return {
        status: CONFIG_STATUS.SUCCESS,
        result: {
            doctor: newDoctorSchedule,
        },
        message: 'Schedule created successfully',
    };
}

const getAllDoctorScheduleByScheduleId = async (scheduleId) => {
    var schedule_list = [];
    var schedules = [];
    var total = Number;
    schedules = await DoctorSchedule.find(
        { scheduleId: scheduleId },
        'scheduleId patientId number status created_at updated_at'
    )


    for (let i = 0; i < schedules.length; i++) {
        let schedule_detail = {
            _id: String,
            timeType_name: String,
            doctor_name: String,
            date: Date,
            patient_name: String,
            number: Number,
            status: Number,
            created_at: Date,
            updated_at: Date,
        };
        const schedule = await Schedule.findOne({ _id: schedules[i].scheduleId });
        const timeType = await TimeType.findOne({ _id: schedule.timeTypeId });
        const doctor = await Doctor.findOne({ _id: schedule.doctorId });
        const userDoctor = await User.findOne({ _id: doctor.userId });
        const userPatient = await User.findOne({ _id: schedules[i].patientId });

        schedule_detail._id = schedules[i]._id;
        schedule_detail.timeType_name = timeType.name;
        schedule_detail.doctor_name = userDoctor.name;
        schedule_detail.date = schedule.date;
        schedule_detail.patient_name = userPatient.name;
        schedule_detail.number = schedules[i].number;
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

const getDoctorDetailByPatientId = async (patientId) => {
    var schedule_list = [];
    var schedules = [];
    var total = Number;
    schedules = await DoctorSchedule.find(
        { patientId: patientId },
        'scheduleId patientId number status created_at updated_at'
    )


    for (let i = 0; i < schedules.length; i++) {
        let schedule_detail = {
            _id: String,
            timeType_name: String,
            doctor_name: String,
            date: Date,
            patient_name: String,
            number: Number,
            status: Number,
            created_at: Date,
            updated_at: Date,
        };
        const schedule = await Schedule.findOne({ _id: schedules[i].scheduleId });
        const timeType = await TimeType.findOne({ _id: schedule.timeTypeId });
        const doctor = await Doctor.findOne({ _id: schedule.doctorId });
        const userDoctor = await User.findOne({ _id: doctor.userId });
        const userPatient = await User.findOne({ _id: schedules[i].patientId });

        schedule_detail._id = schedules[i]._id;
        schedule_detail.timeType_name = timeType.name;
        schedule_detail.doctor_name = userDoctor.name;
        schedule_detail.date = schedule.date;
        schedule_detail.patient_name = userPatient.name;
        schedule_detail.number = schedules[i].number;
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

const deleteDoctorSchedule = async (id) => {
    const doctorSchedule = await DoctorSchedule.findById(id)
    await DoctorSchedule.findByIdAndDelete(id);

    await ScheduleService.decreaseCurrentNumber(doctorSchedule.scheduleId);
}

const checkExist = async (id) => {
    let isExist = Boolean;
    console.log('hello', id)
    if (!REGEX.OBJECT_ID_REGEX.test(id)) {
        isExist = false;
        console.log('qa')
    } else {
        isExist = await DoctorSchedule.exists({ _id: id });
        console.log('qa123')
    }
    console.log(isExist)
    return {
        isExist,

    };
};

const updateStatus1 = async (id) => {
    const doctor_schedule = await DoctorSchedule.findById(id);
    if (!doctor_schedule) {
        return {
            status: CONFIG_STATUS.FAIL,
            message:
                'Data is not found',
        };
    }
    await DoctorSchedule.updateOne({ _id: id }, { status: 1 });

    return {
        status: CONFIG_STATUS.SUCCESS,
        message: 'Status updated successfully',
    };
}

const updateStatus2 = async (id) => {
    const doctor_schedule = await DoctorSchedule.findById(id);
    if (!doctor_schedule) {
        return {
            status: CONFIG_STATUS.FAIL,
            message:
                'Data is not found',
        };
    }
    await DoctorSchedule.updateOne({ _id: id }, { status: 2 });

    return {
        status: CONFIG_STATUS.SUCCESS,
        message: 'Status updated successfully',
    };
}

module.exports = {
    getAllDoctorSchedule,
    createDoctorSchedule,
    deleteDoctorSchedule,
    getDoctorDetailByPatientId,
    getAllDoctorScheduleByScheduleId,
    checkExist,
    updateStatus1,
    updateStatus2
}
