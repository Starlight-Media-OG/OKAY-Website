<template>
    <main class="root flex flex-center">
        <section class="row-12 flex flex-center">
            <div class="title col-3" style="margin-top: 17vh;">
                <p class="line-height1">Offene</p>
                <p class="line-height2">Kultur</p>
                <p class="vertical opacity-50">Aus</p>
                <p class="line-height3">Ybbs</p>
            </div>
            <div id="canvasSuper" class="image col-6">
                <canvas id="canvas3d" class="image" style="transform: translateX(-30%);"></canvas>
            </div>
            <div class="flex flex-center arrow-super">
                <div class="arrow flex flex-center" @click="scrollTo('#scroll')">
                    <arrow class="arrow-bottom" direction="bottom"/>
                </div>
            </div>
        </section>
        <section style="margin:0;">
            <div id="scroll" class="events">
                <h2>Events</h2>
                <div v-for="event of events" :key="event.oaId" class="singleEvents">
                    <card :id="event.oaId" :date="event.start_datum" :endDate="event.ende_Datum"
                          :image="event.bilder_path + '/plakat.jpg'" :teaser="event.beschreibung" :title="event.titel"
                          events/>
                </div>
                <div class="link center">
                    <nuxt-link class="further-link" to="/events"><em class="underline">Zu den Events</em></nuxt-link>
                </div>
            </div>
            <div class="news">
                <h2>News</h2>
                <div v-for="news1 of news" :key="news1.nId" class="singleNews">
                    <card :id="news1.nId" :date="news1.datum" :image="news1.bilder_path + '/plakat.jpg'"
                          :teaser="news1.anreiser" :title="news1.titel" news/>
                </div>
                <div class="link center">
                    <nuxt-link class="further-link" to="/news"><em class="underline">Zu den News</em></nuxt-link>
                </div>
            </div>
            <div id='ypembedcontainer' class='embed-container' data-page-height='640' data-page-width='304'>
                <iframe allowfullscreen="true" allowtransparency="true"
                        frameborder="0" src="https://www.yumpu.com/de/embed/view/OY98EDRV7pPng1rx">
                </iframe>
                <br>
                <a href="https://www.yumpu.com/de/document/view/65158466/vostellungsfolder-okay-offene-kultur-aus-ybbs"
                target="_blank" title="Vostellungsfolder OKAY - Offene Kultur aus Ybbs">Vostellungsfolder OKAY - Offene
                Kultur aus Ybbs</a>
            </div>
        </section>
    </main>
</template>

<style></style>

<style lang="scss" scoped>
@import "../assets/style/variable.scss";

.arrow {
    z-index: 99;
    background-color: $primary-blue;
    width: 5vw;
    height: 5vw;
    border-radius: 20px;
}

.arrow-bottom {
    width: 80%;
    height: 80%;
    cursor: pointer;
}

.arrow-super {
    width: 100vw;
    height: 10vh;
    position: absolute;
    right: 25vw;
    bottom: 5vh;
    animation: jump 2s infinite alternate;
    z-index: 1;

    @media screen and (max-width: $breakpoint-medium-max) {
        display: none;
    }
}

@keyframes jump {
    0% {
        bottom: 5vh;
    }

    100% {
        bottom: 15vh;
    }
}

.line-height1 {
    line-height: 15vh;

    @media screen and (max-width: $breakpoint-medium-max) {
        line-height: 8vh;
    }
}

.line-height2 {
    line-height: 16vh;

    @media screen and (max-width: $breakpoint-medium-max) {
        line-height: 9vh;
    }
}

.line-height3 {
    line-height: 20vh;

    @media screen and (max-width: $breakpoint-medium-max) {
        line-height: 11vh;
    }
}

.embed-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
    margin-bottom:5vh;
}

.embed-container iframe, .embed-container object, .embed-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>

<script>
import card from "~/components/card.vue";
import arrow from "~/components/svg/arrow.vue"
import * as BABYLON from 'babylonjs';

export default {
    name: "index",
    components: {
        card, arrow
    },
    head() {
        return {
            title: "Startseite - OKAY Ybbs",
            meta: [
                {
                    charset: 'utf-8'
                },
                {
                    name: "description",
                    content: "Herzlich Willkommen beim OKAY! Wir sind ein Kulturverein mit Sitz in Ybbs an der Donau. Du bist für Kultur interessiert dann schau bei uns vorbei."
                }
            ]
        }
    },
    data() {
        return {
            events: Array,
            news: Array
        }
    },
    methods: {
        scrollTo: function (target) {
            let options = {
                container: 'body',
                easing: 'ease-in-out',
                force: true,
                cancelable: false,
                x: false,
                y: true
            }

            this.$scrollTo(target, 500, options)
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
        });

        window.addEventListener("load", () => {
            this.$nuxt.$loading.finish();
        });

        this.$store.commit('breadcrumbs/clear');
        this.$store.commit('breadcrumbs/addPositionedBreadcrumb', {todo: {step: 1, text: "Startseite", link: "/"}});

        //region Babylon Code

        //Verweis auf das Element erzeugen, in welchem das 3D-Modell dargestellt wird
        const canvas = document.getElementById("canvas3d");
        const canvasSuper = document.getElementById("canvasSuper");

        //Deklaration der Render Engine
        const engine = new BABYLON.Engine(canvas, true);

        //Deklaration der Objekten in welchen die Meshes gespeichert werden
        let rahmen, bild;

        //Verhindern das der Babylon Loading Screen gezeigt wird
        BABYLON.SceneLoader.ShowLoadingScreen = false;

        //Erstellen einer Szene
        const scene = new BABYLON.Scene(engine);

        //Zuweisen der Kamera aus welcher man die Szene sieht
        const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 1, 0), scene);

        //Erstellen der Beleuchtung (indirekte Beleuchtung, kein Spot)
        const light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1.5, 1.2), scene);
        light.intensity = 2.5;

        //Definition welche Farben bei z.B. bei bestimmten Lichteindrücken hinzu gerechnet werden sollen
        light.diffuse = new BABYLON.Color3(0.9, 0.9, 0.9);
        light.specular = new BABYLON.Color3(0, 0, 0);
        light.groundColor = new BABYLON.Color3(0, 0, 0);

        //Festlegung der Animationsparameter für das drehen des Bilderrahmens
        const animation = new BABYLON.Animation("animationIn", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        //In diesem Array werden die einzelnen Animationsstadien gespeichert, zwischen welchen Interpoliert wird
        let keys = [];

        //Bei Frame: 0 wird das Objekt um auf den Wert 0.4 gedreht
        keys.push({
            frame: 0,
            value: 0.4
        });

        //Bei Frame: 30 wird das Objekt um auf den Wert 0.8 gedreht
        keys.push({
            frame: 30,
            value: 0.8
        });

        //Der Animation werden die Framestadien zugewiesen
        animation.setKeys(keys);

        // Die Szene welche sich in der Datei "/babylon/rahmen.babylon" befindet wird geladen
        BABYLON.SceneLoader.Append("/babylon/", "rahmen.babylon", scene, function (meshes) {

            //Die Meshs werden auf Basis ihrer ID geladen
            rahmen = scene.getMeshByID("Rahmen");
            bild = scene.getMeshByID("Bild");

            //Hintergrund der Scene auf Transparent setzen
            scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

            //Die Anfangswerte für die Rotation der Objekte setzen
            bild.rotation.y = 0.4;
            rahmen.rotation.y = 0.4;

            //Dem Bild wird der Animatiosablauf zugewiesen
            bild.animations = [];
            bild.animations.push(animation);

            //Dem rahmen wird der Animatiosablauf zugewiesen
            rahmen.animations = [];
            rahmen.animations.push(animation);

            //Wird ausgelöst, sobald sich die Maus über dem Canvas-Element befindet
            canvasSuper.addEventListener("mouseover", function (event) {
                //Die Animation wird ausgelöst
                scene.beginAnimation(bild, 0, 10, false);
                scene.beginAnimation(rahmen, 0, 10, false);
            });

            //Wird ausgelöst, sobald die Maus das Canvas-Element verlässt
            canvasSuper.addEventListener("mouseleave", function (event) {
                //Die Animation wird nun rückwertsbeginned abgespielt
                scene.beginAnimation(bild, 10, 0, false);
                scene.beginAnimation(rahmen, 10, 0, false);
            });
        });

        //Sorgt für Anti-Aliasing, um Unebenheiten in diagonalen Linien zu vehindern
        engine.setHardwareScalingLevel(0.5);

        //Das Objekt wird gerendert
        engine.runRenderLoop(function () {
            scene.render();
        });
        //endregion
    },
    async fetch() {
        //Fetch Data from DB via Middleware... Save in events and news Variable
        this.events = [
            {
                "titel": "Heinz Knapp",
                "beschreibung": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam",
                "bilder_path": "img/HeinzKnapp",
                "start_datum": "21.Mai 2020",
                "ende_Datum": "28.Mai 2020",
                "oaId": 1020
            },
            {
                "titel": "Heinz Knapp",
                "beschreibung": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam",
                "bilder_path": "img/HeinzKnapp",
                "start_datum": "21.Mai 2020",
                "oaId": 1020
            },
            {
                "titel": "Heinz Knapp",
                "beschreibung": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam",
                "bilder_path": "img/HeinzKnapp",
                "start_datum": "21.Mai 2020",
                "oaId": 1020
            }
        ];
        this.news = [
            {
                "titel": "Heinz Knapp",
                "anreiser": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam",
                "bilder_path": "img/HeinzKnapp",
                "datum": "21.Mai 2020",
                "nId": 1020
            },
            {
                "titel": "Heinz Knapp",
                "anreiser": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam",
                "bilder_path": "img/HeinzKnapp",
                "datum": "21.Mai 2020",
                "nId": 1020
            },
            {
                "titel": "Heinz Knapp",
                "anreiser": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam",
                "bilder_path": "img/HeinzKnapp",
                "datum": "21.Mai 2020",
                "nId": 1020
            }
        ];
    }
}
</script>