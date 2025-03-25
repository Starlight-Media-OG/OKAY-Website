<script setup>
import { ref, computed } from 'vue';
import VRuntimeTemplate from 'vue3-runtime-template-next';
import { useRuntimeConfig, useRouter } from '#app';

const months = [
    "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"
];
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const tb = ref("");
const events = ref([]);

const router = useRouter();
const config = useRuntimeConfig();

const { data: fetchedEvents } = await useFetch(`${useRuntimeConfig().public.baseURL}/events`);
events.value = fetchedEvents.value;
// test data for testing without api access
// events.value = [
//     {
//         oaId: 1,
//         start_datum: "2025-03-15",
//         end_datum: "2025-04-15",
//         titel: 'test 1',
//     },        {
//         oaId: 2,
//         start_datum: "2025-02-15",
//         end_datum: "2025-04-15",
//         titel: 'test 2',
//     }
// ]

const updateCalendar = (month, year) => {
    tb.value = "<tbody ref='calendarBody' class='body'>";
    const tmp = new Date(year, month).getDay();
    let firstDay = tmp == 0 ? 6 : tmp - 1;

    let date = 0;
    let exit = false;
    for (let i = 0; i < 6; i++) {
        let row = "<tr>";

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cellText = daysInMonth(month - 1, year) - firstDay + j + 1;
                let cell = `<td class='prev-month month-day'><p class='date'>${cellText}</p></td>`;
                row += cell;
            } else if (date >= daysInMonth(month, year) && j === 6) {
                date++;
                let cellText = date % daysInMonth(month, year);
                let cell = `<td class='prev-month month-day'><p class='date'>${cellText}</p></td>`;
                row += cell;
                exit = true;
                break;
            } else if (date >= daysInMonth(month, year) && j < 7) {
                date++;
                let cellText = date % daysInMonth(month, year);
                let cell = `<td class='prev-month month-day'><p class='date'>${cellText}</p></td>`;
                row += cell;
            } else {
                date++;
                let cellText = checkEventOnDate(date, month, year);
                let cell = `<td class='month-day'>${cellText}</td>`;

                if (date === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
                    cell = `<td class='month-day current-day'>${cellText}</td>`;
                }
                row += cell;
            }
        }
        row += "</tr>";
        tb.value += row;

        if (exit) {
            break;
        }
    }
    tb.value += "</tbody>";
};

const daysInMonth = (month, year) => {
    return 32 - new Date(year, month, 32).getDate();
};

const checkEventOnDate = (date, month, year) => {
    let tableString = `<p class='date'>${date}</p>`;
    let badgeNumber = 0;
    const eventIndizes = [];
    // get 2 timestamps of current day to prevent weird issues with calender
    const startOfCurrentDayTime = new Date(year, month, date).getTime()
    const endOfCurrentDayTime = new Date(year, month, date, 23 , 59).getTime();

    for(const index in events.value) {
        const event = events.value[index];
        const startTime = new Date(event.start_datum).getTime();
        const endTime = new Date(event.end_datum).getTime();

        // Comapre timestamps to determine if the event is on the specific date
        if(startTime <= endOfCurrentDayTime && startOfCurrentDayTime <= endTime) {
            badgeNumber++;
            eventIndizes.push(index);

            // Add the name of the event in the day entry - only add the first event as text
            if(!tableString.includes("eventCal")) {
                tableString += `<div class='eventCal oneDay' @click='reroute(${event.oaId})'><p class='eventTitle'>${event.titel}</p></div>`;
            }
        }
    }

    if (badgeNumber > 0) {
        tableString += `<div class='badgeNumber' @click='() => toggle(${date})'><p>${badgeNumber}</p></div>`;
        tableString += createPopUp(eventIndizes, date, month, year);
    }

    return tableString;
};

const reroute = (id) => {
    router.push(`/events/${id}`);
};

const createPopUp = (array, date, month, year) => {
    let modal = `<div class='modal flex flex-center' id='calPopUp${date}' style='display: none;'>`;
    let content = `<div class='content flex flex-center'>`;

    let close = `<div class='close row' id='close${date}' @click='() => toggle(${date})'> x </div>`;
    let header = `<div class='header row'>${date}.${month + 1}.${year}</div>`;

    content += close;
    content += header;

    let body = `<div class='form row'>`;

    for (let id of array) {
        let row = `<div class='row calRow' @click='reroute(${events.value[id].oaId})'><p>${events.value[id].titel}</p></div>`;
        body += row;
    }

    body += `</div>`;
    content += body + `</div>`;

    modal += content + `</div>`;

    return modal;
};

const toggle = (date) => {
    let el = document.getElementById(`calPopUp${date}`);

    if (el.style.display == "none") {
        el.style.display = "block";
    } else {
        el.style.display = "none";
    }
};

const prev = () => {
    if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value--;
    } else {
        currentMonth.value--;
    }
    updateCalendar(currentMonth.value, currentYear.value);
};

const next = () => {
    if (currentMonth.value === 11) {
        currentMonth.value = 0;
        currentYear.value++;
    } else {
        currentMonth.value++;
    }
    updateCalendar(currentMonth.value, currentYear.value);
};

updateCalendar(currentMonth.value, currentYear.value);

const templateProps = {
    events,
    months,
    currentMonth,
    currentYear,
    toggle,
}
</script>

<template>
    <div class="calender">
        <div class="month">
            <div class="flex flex-center month-banner">
                <div class="arrow arrow-Left" @click="prev">
                    <SvgArrow direction="left" />
                </div>
                <div class="arrow arrow-Right" @click="next">
                    <SvgArrow direction="right" />
                </div>
                <div class="monthDesc">
                    <p>{{ months[currentMonth] }} {{ currentYear }}</p>
                </div>
            </div>
        </div>
        <table id="calendar" class="table table-responsive table-non-bordered">
            <thead>
            <tr>
                <th class="day">Mo</th>
                <th class="day">Di</th>
                <th class="day">Mi</th>
                <th class="day">Do</th>
                <th class="day">Fr</th>
                <th class="day">Sa</th>
                <th class="day">So</th>
            </tr>
            </thead>
            <VRuntimeTemplate :template="tb"  :template-props="templateProps"/>
        </table>
    </div>
</template>

<style lang="scss">
@import "calender.scss";
@import "../NewsletterPopup/NewsletterPopUp";

.show {
    display: block;
}

.hide {
    display: none;
}
</style>
