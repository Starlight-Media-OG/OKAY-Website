<template>
    <main class="root flex flex-center">
        <section class="row-12 flex flex-center">
            <div class="title home col-3">
                <h1 class="line-height1">Offene</h1>
                <p class="line-height2">Kultur</p>
                <p class="vertical opacity-50">Aus</p>
                <p class="line-height3">Ybbs</p>
                <div class="link linkToFolder">
                    <a class="linkTop underline" @click="scrollTo('#folder')">Blättern Sie durch den Folder </a>
                </div>
            </div>
            <div id="canvasSuper" class="image col-6">
                <canvas id="canvas3d" class="image" style="transform: translateX(-35%) translateY(-5%);"></canvas>
            </div>
            <div class="flex flex-center arrow-super">
                <div class="arrow flex flex-center" @click="scrollTo('#scroll')">
                    <arrow class="arrow-bottom" direction="bottom" />
                </div>
            </div>
        </section>
        <section style="margin-top:-20vh;" class="row-max">
            <div class="area">
                <iframe src="https://cdn.flipsnack.com/widget/v2/widget.html?hash=xkldq00n30" width="100%" height="480"
                    seamless="seamless" scrolling="no" frameBorder="0" allowFullScreen class="folder" id="folder" title="Vorstellungsfolder des Kulturverein Ybbs"></iframe>
                <div class="link center" style="margin-top: 2rem;">
                    <a href="/pdfs/vorstellungsfolder.pdf" download="/pdfs/vorstellungsfolder.pdf" class="further-link" aria-label="Vorstellungsfolder herunterladen"
                        target="_blank">Folder Herunterladen!</a>
                </div>
            </div>
            <div class="area flex flex-center">
                <div id="scroll" class="events">
                    <h2 class="reduceMobile">Events</h2>
                    <div v-for="event of events" :key="event.oaId" class="singleEvents">
                        <card :id="event.oaId" :date="event.start_datum" :endDate="event.end_datum"
                            :image="event.bilder_path + '/plakat.jpg'" :teaser="event.beschreibung" :title="event.titel"
                            events />
                    </div>
                    <div class="link center" style="margin-top: 3rem;">
                        <nuxt-link class="further-link" to="/events" aria-label="Zu den Events"><em class="underline">Zu den Events</em></nuxt-link>
                    </div>
                </div>
            </div>
            <div class="area flex flex-center">
                <div class="news">
                    <h2 class="reduceMobile">News</h2>
                    <div v-for="news1 of news" :key="news1.nId" class="singleNews">
                        <card :id="news1.nId" :date="news1.datum" :image="news1.bilder_path + '/plakat.jpg'"
                            :teaser="news1.anreisser" :title="news1.titel" news />
                    </div>
                    <div class="link center" style="margin-top: 3rem;">
                        <nuxt-link class="further-link" to="/news" aria-label="Zu den News"><em class="underline">Zu den News</em></nuxt-link>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

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

        @media screen and (min-width: $breakpoint-large) and (max-width: $breakpoint-large-max) {
            line-height: 12vh;
        }
    }

    .line-height3 {
        line-height: 20vh;
        transform: translateY(-33vh);

        @media screen and (max-width: $breakpoint-medium-max) {
            transform: translateY(-15vh);
            line-height: 11vh;
        }

        @media screen and (min-width: $breakpoint-large) and (max-width: $breakpoint-large-max) {
            line-height: 30vh;
        }
    }

    .folder {
        height: 70vh;
        padding: 5vh 0;
    }

    .linkToFolder {
        font-size: 2rem;
        line-height: 2rem;
        transform: translateY(-35vh);

        @media screen and (max-width: $breakpoint-medium-max) {
            transform: translateY(-17vh);
        }

        @media screen and (min-width: $breakpoint-large) and (max-width: $breakpoint-large-max) {
            transform: translateY(-42vh);
        }
    }
</style>

<script>
    import card from "~/components/card.vue";
    import arrow from "~/components/svg/arrow.vue"
    import * as BABYLON from 'babylonjs';
    import axios from "axios";

    export default {
        name: "index",
        components: {
            card,
            arrow
        },
        head() {
            return {
                title: "Startseite - OKAY Ybbs",
                meta: [{
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
        async mounted() {
            this.$nextTick(() => {
                this.$nuxt.$loading.start();
            });

            this.$store.commit('breadcrumbs/clear');
            this.$store.commit('breadcrumbs/addPositionedBreadcrumb', {
                todo: {
                    step: 1,
                    text: "Startseite",
                    link: "/"
                }
            });

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
            const animation = new BABYLON.Animation("animationIn", "rotation.y", 30, BABYLON.Animation
                .ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

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
            engine.setHardwareScalingLevel(0.8);

            //Das Objekt wird gerendert
            engine.runRenderLoop(function () {
                scene.render();
            });
            //endregion

            await this.$fetch();
            this.$nextTick(() => {
                this.$nuxt.$loading.finish();
            });
        },
        async fetch() {

            //region Events

            try {
    let reqE = await axios.get(process.env.baseURL + "/events/recent/3");
    let events = reqE.data;

    this.events = events;
}
catch {
    this.events = [];
}


            //endregion

            //region news

            let req = await axios.get(process.env.baseURL + "/news/recent/3");
            let news = req.data;

            for (let n in news) {
                if (news[n].anreisser === "") {
                    news[n].anreisser = news[n].bericht;
                }
            }

            this.news = news;

            //endregion
        }
    }
</script>
