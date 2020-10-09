<template>
    <main class="root flex flex-center">
        <section class="row-12 flex flex-center header">
            <div class="title" style="margin-top: 5vh">
                Über Uns
            </div>
        </section>
        <section class="content flex flex-center">
            <div class="area flex flex-center">
                <div class="smallSize">
                    <h2>Der Vorstand</h2>
                    <div class="cards flexWrap flex flex-center">
                        <teamCard v-for="team1 in teamLead" :key="team1.mId" :id="team1.mId"/>
                    </div>
                </div>
            </div>
            <div class="area flex flex-center">
                <div class="smallSize">
                    <h2>Mitglieder</h2>
                    <div class="cards flexWrap flex flex-center">
                        <teamCard v-for="team1 in team" :key="team1.mId" :id="team1.mId"/>
                    </div>
                </div>
            </div>
            <div class="area flex flex-center">
                <div class="smallSize">
                    <h2>Projekte</h2>
                    <div class="cards row flex flex-center">
                        <card v-for="project in projects" :key="project.id" :id="projects.id" :title="project.titel" :teaser="project.beschreibung"
                            :date="project.start_datum" :endDate="project.end_datum" :image="project.bilder_pfad + 'plakat.png'"/>
                    </div>
                </div>
            </div>
            <div class="area flex flex-center">
                <div class="smallSize">
                    <h2>Statuten</h2>
                    <accordion :contents="content"/>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import accordion from "@/components/accordion/accordion";
import teamCard from "@/components/teamCard/teamCard";
import card from "@/components/card";

export default {
    name: "infrormation",
    components: {
        accordion, teamCard, card
    },
    data: function () {
        return {
            teamList: [10, 20, 30],
            content: [
                {
                    title: "§1",
                    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                    active: false
                },
                {
                    title: "§2",
                    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                    active: false
                },
                {
                    title: "§3",
                    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                    active: false
                },
            ],
            team: [
                {
                    mId: 1,
                    lead: true
                },
                {
                    mId: 2,
                    lead: true
                },
                {
                    mId: 3,
                    lead: false
                },
                {
                    mId: 4,
                    lead: false
                },
                {
                    mId: 5,
                    lead: false
                },
                {
                    mId: 6,
                    lead: true
                },
            ],
            projects: [
                {
                    id: 1,
                    titel: "Projekt Diplomarbeit",
                    start_datum: new Date(Date.now()).toLocaleDateString(),
                    end_datum: new Date(Date.now()).toLocaleDateString(),
                    bilder_pfad: "http:localhost:4000/projects/1/",
                    beschreibung: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et"
                }
            ]
        }
    },
    computed: {
        teamLead: function () {
            let tmp = [];
            console.log(this.team);
            this.team.forEach(value => {
                if (value.lead) {
                    tmp.push(value);
                }
            });
            console.log(tmp);
            return tmp;
        }
    },
    head() {
        return {
            title: "Über Uns - OKAY Ybbs",
            meta: []
        }
    },
    created() {
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step: 2, newText: "Über Uns"} });
    }
}
</script>

<style scoped lang="scss">
@import '../../assets/style/variable.scss';

.date {
    color: $primary-yellow;
    font-size: 5vh;
    transform: translateY(-30%);
}

.back {
    font-size: 3vh;
    color: $primary-yellow;
    transform: translateY(30%);

    &:hover {
        cursor: pointer;
    }

}

.header {
    margin-top: 10vh;
}

.link {
    transform: translateY(250%);
}

.content {
    width: 100vw;
    margin: 10vh 0;
    color: white;

    h4 {
        color: white;
        font-size: 3vh;
        text-align: center;
    }

    p {
        margin-bottom: 2vh;
    }

    .area {
        background-color: $primary-blue;
        padding: 5vh 0;
        width: 100%;

        h4 {
            padding-bottom: 2vh;
        }

        &:nth-child(even) {
            background-color: transparent;
        }

        .smallSize {
            width: 80%;

            .cards {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-items: center;
                width: $width;
                margin-top: 5vh;

                &.flexWrap {
                    flex: 1 1 calc(#{$width} / 3);
                }
            }
        }

    }
}
</style>