<template>
    <div class="calender">
        <div class="month">
            <div class="flex flex-center month-banner">
                <div class="arrow arrow-Left" @click="prev()">
                    <arrow direction="left" />
                </div>
                <div class="arrow arrow-Right" @click="next()">
                    <arrow direction="right" />
                </div>
                <div class="monthDesc">
                    <p>{{this.months[this.currentMonth]}} {{this.currentYear}}</p>
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
            <VRuntimeTemplate :template="this.tb" />
        </table>
    </div>
</template>

<style lang="scss">
    @import 'calender.scss';
    @import '../NewsletterPopup/NewsletterPopUp';

    .show {
        display: block;
    }

    .hide {
        display: none;
    }
</style>

<script>
import arrow from '~/components/svg/arrow';
import VRuntimeTemplate from "v-runtime-template"
import axios from "axios";

export default {
    name: "calender",
    data() {
        return {
            months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            tb: "",
            events: []
        }
    },
    components: {
        arrow, VRuntimeTemplate
    },
    head() {
        return {
            title: "Kalender - OKAY Ybbs",
            meta: [
                {
                    charset: 'utf-8'
                }
            ]
        }
    },
    methods: {
        next: function () {
            this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
            this.currentMonth = (this.currentMonth + 1) % 12;
            this.updateCalendar(this.currentMonth, this.currentYear);
        },
        prev: function () {
            this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
            this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
            this.updateCalendar(this.currentMonth, this.currentYear);
        },
        updateCalendar: function (month, year) {
            this.tb = "<tbody ref='calendarBody' class='body'>";
            const tmp = (new Date(year, month)).getDay()
            let firstDay = tmp == 0 ? 6 : tmp- 1;

            //Create all Cells
            let date = 0;
            let exit = false
            for (let i = 0; i < 6; i++) {
                //Create each row
                let row = "<tr>";

                //Create each cell and fill it up with data
                for (let j = 0; j < 7; j++) {
                    if (i === 0 && j < firstDay) {
                        //Checks if First day of month is not on monday fills table with cell from prev-month till start
                        let cellText = this.daysInMonth(month - 1, year) - firstDay + j + 1;
                        let cell = "<td class='prev-month month-day'><p class='date'>" + cellText + "</p></td>";
                        row += cell;
                    } else if (date >= this.daysInMonth(month, year) && j === 6) {
                        //Check if date is greater than days in month and Week is completed, Insert last week element
                        date++;
                        let cellText = date % (this.daysInMonth(month, year));
                        let cell = "<td class='prev-month month-day'><p class='date'>" + cellText + "</p></td>";
                        row += cell;

                        exit = true;
                        break;
                    } else if (date >= this.daysInMonth(month, year) && j < 7) {
                        date++;
                        //Checks if date ist greater than month and Week is uncompleted

                        //Create cells to fill up Table with cells from next month
                        let cellText = date % (this.daysInMonth(month, year));
                        let cell = "<td class='prev-month month-day'><p class='date'>" + cellText + "</p></td>";
                        row += cell;
                    } else {
                        date++;
                        let cellText = this.checkEventOnDate(date, month, year);
                        let cell = "<td class='month-day'>" + cellText + "</td>";

                        //Check if it is Current Day
                        if (date === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
                            cell = "<td class='month-day current-day'>" + cellText + "</td>";
                        }
                        row += cell;
                    }
                }
                row += "</tr>";
                this.tb += row;

                if (exit) {
                    break;
                }
            }
            this.tb += "</tbody>";
        },
        daysInMonth: function (month, year) {
            //Returns the Days in a Month (28,29,30,31)
            return 32 - new Date(year, month, 32).getDate();
        },
        checkEventOnDate: function (date, month, year) {
            let tableString = "<p class='date'>" + date + "</p>";
            let badgeNumber = 0;
            let eIds = [];
            for(let value in this.events) {
                if (new Date(this.events[value].start_datum).getMonth() === month && new Date(this.events[value].start_datum).getFullYear() === year) {
                    if (this.events[value].end_datum === undefined) {
                        if (new Date(this.events[value].start_datum).getDate() === date) {
                            badgeNumber++;
                            eIds.push(value);
                            if(!tableString.includes("eventCal"))
                                tableString += "<div class='eventCal oneDay' @click='reroute(" + this.events[value].oaId + ")'><p class='eventTitle'>" + this.events[value].titel + "</p></div>";
                        }
                    } else {
                        if (new Date(this.events[value].start_datum).getDate() <= date && (new Date(this.events[value].end_datum).getDate() >= date || new Date(this.events[value].end_datum).getMonth() >= month)) {
                            badgeNumber++;
                            eIds.push(value);
                            if(!tableString.includes("eventCal"))
                                tableString += "<div class='eventCal oneDay flex flex-center' @click='reroute(" + this.events[value].oaId + ")'><p class='eventTitle'>" + this.events[value].titel + "</p></div>";
                        }
                    }
                } else if (new Date(this.events[value].start_datum).getMonth() < month && new Date(this.events[value].end_datum).getMonth() > month) {
                    badgeNumber++;
                    eIds.push(value);
                    if(!tableString.includes("eventCal"))
                        tableString += "<div class='eventCal oneDay flex flex-center' @click='reroute(" + this.events[value].oaId + ")'><p class='eventTitle'>" + this.events[value].titel + "</p></div>";
                } else if(new Date(this.events[value].end_datum).getMonth() === month) {
                    if (new Date(this.events[value].end_datum).getDate() >= date) {
                        badgeNumber++;
                        eIds.push(value);
                        if(!tableString.includes("eventCal"))
                            tableString += "<div class='eventCal oneDay flex flex-center' @click='reroute(" + this.events[value].oaId + ")'><p class='eventTitle'>" + this.events[value].titel + "</p></div>";
                    }
                }
            }

            if(badgeNumber > 0)  {
                tableString += "<div class='badgeNumber' @click='toggle(" + date + ")'><p>" + badgeNumber + "</p></div>";
                tableString += this.createPopUp(eIds, date, month, year);
            }

            return tableString;
        },
        reroute: function (id) {
            console.log(id);
            this.$router.push("/events/" + id);
        },
        createPopUp: function(array, date, month, year) {
            let modal = "<div class='modal flex flex-center' id='calPopUp" + date +  "' style='display: none;'>";
            let content = "<div class='content flex flex-center'>"

            let close = "<div class='close row' id='close" + date + "' @click='toggle(" + date + ")'> x </div>";

            let header = "<div class='header row'>" + date + "." + (month+1) + "." + year + "</div>";

            content += close;
            content += header;

            let body = "<div class='form row'>";

            for(let id of array) {
                let row = "<div class='row calRow' @click='reroute(" + this.events[id].oaId + ")'><p>";
                row += this.events[id].titel;
                row += "</p></div>";
                body += row;
            }

            body += "</div>";
            content += body + "</div>";

            modal += content + "</div>";

            return modal;
        },
        toggle: function(date) {
            let el = document.getElementById("calPopUp" + date);

            if(el.style.display == "none") {
                el.style.display = "block";
            } else {
                el.style.display = "none";
            }
        }
    },
    async fetch() {
        let req = await axios.get(process.env.baseURL + "/events");
        this.events = req.data;

        this.updateCalendar(this.currentMonth, this.currentYear);
    }
}
</script>
