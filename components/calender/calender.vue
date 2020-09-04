<template>
    <div class="calender">
        <div class="month">
            <div class="flex flex-center" style="height: 100%;">
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
                    <th class="day">Mon</th>
                    <th class="day">Die</th>
                    <th class="day">Mit</th>
                    <th class="day">Don</th>
                    <th class="day">Fre</th>
                    <th class="day">Sam</th>
                    <th class="day">Son</th>
                </tr>
            </thead>
            <VRuntimeTemplate :template="this.tb" />
        </table>
    </div>
</template>

<style lang="scss">
    @import 'calender.scss';
</style>

<script>
    import arrow from '~/components/svg/arrow';
    import VRuntimeTemplate from "v-runtime-template"

    export default {
        name: "calender",
        data() {
            return {
                months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
                currentMonth: new Date().getMonth(),
                currentYear: new Date().getFullYear(),
                tb: "",
                events: [
                    {
                        "titel": "Heinz Knapp",
                        "beschreibung": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam",
                        "bilder_path": "img/HeinzKnapp",
                        "start_datum": new Date("5.9.2020").toLocaleDateString(),
                        "end_datum": new Date("10.9.2020").toLocaleDateString(),
                        "oaId": 1020
                    }
                ]
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
                let firstDay = (new Date(year, month)).getDay() - 1;

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
                        this.tb += "</tbody>";
                        break;
                    }
                }
            },
            daysInMonth: function (month, year) {
                //Returns the Days in a Month (28,29,30,31)
                return 32 - new Date(year, month, 32).getDate();
            },
            checkEventOnDate: function (date, month, year) {
                let tableString = "<p class='date'>" + date + "</p>";
                this.events.forEach((value) => {
                    if (new Date(value.start_datum).getMonth() === month && new Date(value.start_datum).getFullYear() === year) {
                        if (value.ende_Datum === undefined) {
                            if (new Date(value.start_datum).getDate() === date) {
                                tableString += "<div class='eventCal oneDay' @click='reroute(" + value.oaId + ")'><p class='eventTitle'>" + value.titel + "</p></div>";
                            }
                        } else {
                            if (new Date(value.start_datum).getDate() <= date && new Date(value.end_datum).getDate >= date) {
                                tableString += "<div class='eventCal oneDay flex flex-center' @click='reroute(" + value.oaId + ")'><p class='eventTitle'>" + value.titel + "</p></div>";
                            }
                        }
                    }
                });

                return tableString;
            },
            reroute: function (id) {
                this.$router.push("/events/" + id);
            }
        },
        async fetch() {
            //Fetch Data from DB / API and save in Events
        },
        mounted() {
            this.updateCalendar(this.currentMonth, this.currentYear);
        }
    }
</script>