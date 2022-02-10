import {getWeekNumber, niceDate, req} from './base.js';

function getTD(text, width) {
    const td = document.createElement('td');
    td.className = "row"
    td.width = width

    let clazz = "containerMark";
    if (width === "150") {
        clazz = "containerSubj"
    } else {
        if (width === "250") {
            clazz = "containerDesc"
        }
    }

    const div = document.createElement('div');
    div.className = clazz
    div.innerHTML = '&nbsp;' + text

    td.append(div)
    return td
}

function getSubject(array, mark, id) {
    const tr = document.createElement('tr');

    tr.append(getTD(array[0], "150"))
    tr.append(getTD(array[1], "250"))
    tr.append(getTD(mark, "30"))
    tr.id = id
    let task = "";
    if (array[1]) {
        task = '<b>Задание: </b> ' + array[1]
    }
    let markT = "";
    if (mark) {
        markT = '<br> <b>Оценка: </b> ' + mark + "</br>"
    }

    tr.onclick = function () {
        Swal.mixin({
            customClass: {
                cancelButton: 'button'
            },
            buttonsStyling: false
        }).fire({
            title: array[0],
            html: task + markT,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: '<i>Закрыть</i>',
            icon: 'info',
            timer: 3500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Swal.stopTimer()
    };
    return tr
}

function createSchedule(text) {
    let schedule;
    if (text) {
        schedule = JSON.parse(text).schedule
    }

    for (let i = 0; i <= 5; i++) {
        for (let j = 0; j <= 7; j++) {
            const old = document.getElementById(i + "" + j)
            if (old) {
                old.remove()
            }

            let line = ["", "", ""];
            if (text) {
                line = schedule[i][j]
            }
            document.getElementById(i + "").append(getSubject(line, "", i + "" + j))
        }
    }
}

function getSchedule(date) {
    req.open("GET", "get_schedule/" + school + "/" + clazz + "/" + date, true);
    req.onload = function (e) {
        if (req.status === 200) {
            createSchedule(req.responseText)
        } else {
            createSchedule(null)
        }
    };
    req.send(null);
}

const weekNumber = document.querySelector('input[type="week"]');
weekNumber.value = niceDate(new Date())

const cookie = JSON.parse('"' + JSON.parse(document.cookie.match(/Student=(.+?)(;|$)/)[1]) + '"').split(" ")
const clazz = cookie[cookie.length - 1];
const school = cookie.slice(1, cookie.length - 1).join(" ")

getSchedule(getWeekNumber(new Date()))

document.addEventListener("DOMContentLoaded", function () {
    weekNumber.addEventListener("input", function () {
        getSchedule(parseInt(weekNumber.value.slice(6, weekNumber.value.length)))
    })
})
