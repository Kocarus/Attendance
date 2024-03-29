var fs = require('fs');
var nodemailer = require('nodemailer');
module.exports = {
    db: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'qldd'
    },
    db_postgres: {
         host: 'ec2-54-83-59-144.compute-1.amazonaws.com',
         user: 'hpctbrawtwlstg',
         password: 'ac3e8ab5d27df221977bcbc82a6e926e5d2fb9390c6b8950e8e164fe8c4aa436',
         port:'5432',
         database: 'ddql7vvcdm33ju'
     },
    //db_postgres: {
    //    host: 'localhost',
    //    user: 'postgres',
    //    password: 'a',
    //    port:'5432',
    //    database: 'qldd'
    //},
    host: 'hcmus-attendance.herokuapp.com',
    email_setting: {
        host: 'smtp.office365.com', // Office 365 server
        port: 587, // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
            user: '1353019@student.hcmus.edu.vn',
            pass: 'Nghia1507'
        },
        tls: {
            ciphers: 'SSLv3'
        }
    },
    notification_type:{
        send_feedback:0,
        reply_feedback:1,
        send_absence_request:2,
        accept_absence_request:3,
        reject_absence_request:4,
        open_attendance:5,
        request_to_be_check_attendance:6,
    },
    attendance_type:{
        permited_absent: -1,
        absent: 0,
        checklist: 1,
        qr: 2,
        quiz: 3,
        face: 4,
    },
    quiz_type:{
        academic: 0,
        miscellaneous: 1,
    },
    attendance_status:{
        normal: 0,
        exemption: 1,
    },
    feedback_status:{
        pending: 0,
        replied: 1,
    },
    feedback_categories:{
        all: 0,
        academic: 1,
        facility: 2,
    },
    role: {
        admin: 4,
        student: 1,
        teacher: 2,
        staff: 3,
    },
    absence_request_status: {
        new: 0,
        accepted: 1,
        rejected: 2
    },
    student_interaction_type:{
        answer_question: 0,
        discuss: 1,
        present: 2
    },
    jwt_secret_key: '13530191353049',
    jwt_expire_time: '1d',
    jwt_reset_password_expire_time: 30 * 60,
    jwt_register_expire_time: '7d',
    default_page: 1,
    default_limit: 10,

    lecturer_role: 0,
    ta_role: 1,

    api_ver: 1,

    sendError: function(res, detail = null, message = "Server error") {
        res.send({ result: 'failure', detail: detail, message: message });
    },

    sendMail: function(from, to, subject, text) {
        fs.readFile('./api/data/settings.json', 'utf8', function (error, data) {
            if (error){
                if (error.code === 'ENOENT') {
                    return console.log('Setting file not found');
                } else {
                    return console.log(error);
                }
            }
            var settings = JSON.parse(data);
            for(var i = 0 ; i < settings.emails.length; i++){
                if(settings.selected_host == settings.emails[i].host_name){
                    let transporter = nodemailer.createTransport(settings.emails[i].config);
                    let mailOptions = {
                        from: from + ' <' + settings.emails[i].config.auth.user + '>',
                        to: to,
                        //to: '1353019@student.hcmus.edu.vn',
                        subject: subject,
                        text: text,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    });
                }
            }
        });
    },

    filterListByPage: function(page, limit, list) {
        var result = [];
        var length = list.length;
        if (length < limit) {
            return list;
        } else {
            if (page * limit > length) {
                for (var i = (page - 1) * limit; i < length; i++) {
                    result.push(list[i]);
                }
            } else {
                for (var i = (page - 1) * limit; i < page * limit; i++) {
                    result.push(list[i]);
                }
            }
            return result;
        }
    },

    sortListByKey: function(order, list, key) {
        for (var i = 0; i < list.length; i++) {
            for (var j = 0; j < list.length; j++) {
                var value1 = list[i][key].toString().toLowerCase();
                var value2 = list[j][key].toString().toLowerCase();
                if (order == 'dsc' && value1 > value2 || order == 'asc' && value1 < value2) {
                    var temp = list[i];
                    list[i] = list[j];
                    list[j] = temp;
                }
            }
        }
    },

    getFirstName: function(name) {
        var i = name.lastIndexOf(' ');
        var first_name = name.substr(0, i);
        return first_name;
    },

    getLastName: function(name) {
        var i = name.lastIndexOf(' ');
        var last_name = name.substr(i + 1, name.length - 1);
        return last_name;
    },

    getProgramCodeFromClassName: function(class_name) {
        var program_code = '';
        for (var i = 0; i < class_name.length; i++) {
            if (isNaN(class_name[i])) {
                program_code += class_name[i];
            }
        }
        return program_code;
    },
    
    removeExtraFromTeacherName: function(teacher_name) {
        var name = teacher_name;
        //cắt học vị
        var i = name.indexOf('. ');
        if (i != -1) {
            name = name.substr(i + 1, name.length - 1);
        }
        //cắt (+TA)
        i = name.lastIndexOf('(+TA)');
        if (i != -1) {
            name = name.splice(i, 5);
        }
        return name;
    },
    removeEmailTeacherName: function(teacher_name) {
        var name = teacher_name;
        //cắt học vị
        var i = name.indexOf(' (');
        if (i != -1) {
            name = name.substr(i + 1, name.length - 1);
        }
        i = name.indexOf('(');
        if (i != -1) {
            name = name.substr(i + 1, name.length - 1);
        }
        return name;
    },

    getEmailFromTeacherName: function(teacher_name) {
        var email = '';
        var i1 = teacher_name.lastIndexOf('(');
        var i2 = teacher_name.lastIndexOf(')');
        if (i1 != -1) {
            email = teacher_name.substr(i1+1, i2);
        }
        return email;
    }
};
