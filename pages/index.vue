<script setup>
import { useBreadcrumbStore } from "~/store/breadcrumb.store";
import * as BABYLON from "babylonjs";

useHead({
    title: "Startseite - OKAY Ybbs",
    meta: [
        {
            charset: "utf-8",
        },
        {
            name: "description",
            content:
                "Herzlich Willkommen beim OKAY! Wir sind ein Kulturverein mit Sitz in Ybbs an der Donau. Du bist für Kultur interessiert dann schau bei uns vorbei.",
        },
    ],
});

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.$reset();
breadcrumbStore.addBreadcrumb({
    step: 1,
    text: "Startseite",
    link: "/",
});

const { data: events } = await useFetch(
    useRuntimeConfig().public.baseURL + "/events/3",
);
const { data: news } = await useFetch(
    useRuntimeConfig().public.baseURL + "/news/3",
).then((response) => {
    if (!response.data.value) {
        return [];
    }
    return response.data.value.map((news) => {
        return {
            ...news,
            anreisser: news.anreiser === "" ? news.bericht : news.anreisser,
        };
    });
});

onMounted(() => {
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
    const camera = new BABYLON.FreeCamera(
        "camera",
        new BABYLON.Vector3(0, 1, 0),
        scene,
    );

    //Erstellen der Beleuchtung (indirekte Beleuchtung, kein Spot)
    const light = new BABYLON.HemisphericLight(
        "HemiLight",
        new BABYLON.Vector3(0, 1.5, 1.2),
        scene,
    );
    light.intensity = 2.5;

    //Definition welche Farben bei z.B. bei bestimmten Lichteindrücken hinzu gerechnet werden sollen
    light.diffuse = new BABYLON.Color3(0.9, 0.9, 0.9);
    light.specular = new BABYLON.Color3(0, 0, 0);
    light.groundColor = new BABYLON.Color3(0, 0, 0);

    // Die Szene welche sich in der Datei "/babylon/rahmen.babylon" befindet wird geladen
    BABYLON.SceneLoader.Append(
        "/babylon/",
        "rahmen.babylon",
        scene,
        function (meshes) {
            //Die Meshes werden auf Basis ihrer ID geladen
            rahmen = scene.getMeshByID("Rahmen");
            bild = scene.getMeshByID("Bild");

            //Hintergrund der Scene auf Transparent setzen
            scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

            //Die Anfangswerte für die Rotation der Objekte setzen
            bild.rotation.y = 0.4;
            rahmen.rotation.y = 0.4;
        },
    );

    //Sorgt für Anti-Aliasing, um Unebenheiten in diagonalen Linien zu vehindern
    engine.setHardwareScalingLevel(0.8);

    //Das Objekt wird gerendert
    engine.runRenderLoop(function () {
        scene.render();
    });
});

function scrollTo(target) {
    let options = {
        container: "body",
        easing: "ease-in-out",
        force: true,
        cancelable: false,
        x: false,
        y: true,
    };

    // TODO: Update this fucking shit to use scroll-To plugin
    this.$scrollTo(target, 500, options);
}
</script>

<template>
    <main class="root flex flex-center">
        <section class="row-12 flex flex-center">
            <div class="title home col-3">
                <h1 class="line-height1">Offene</h1>
                <p class="line-height2">Kultur</p>
                <p class="vertical opacity-50">Aus</p>
                <p class="line-height3">Ybbs</p>
                <div class="link linkToFolder">
                    <a class="linkTop underline" @click="scrollTo('#folder')">
                        Blättern Sie durch den Folder
                    </a>
                </div>
            </div>
            <div id="canvasSuper" class="image-no-shadow col-6">
                <canvas
                    id="canvas3d"
                    class="image-no-shadow"
                    style="transform: translateX(-35%) translateY(-5%)"
                ></canvas>
            </div>
            <div class="flex flex-center arrow-super">
                <div
                    class="arrow flex flex-center"
                    @click="scrollTo('#scroll')"
                >
                    <SvgArrow class="arrow-bottom" direction="bottom" />
                </div>
            </div>
        </section>
        <section style="margin-top: -20vh" class="row-max">
            <div class="area flex flex-center">
                <div id="scroll" class="events">
                    <h2 class="reduceMobile">Events</h2>
                    <div
                        v-for="event of events"
                        :key="event.oaId"
                        class="singleEvents"
                    >
                        <card
                            :id="event.oaId"
                            :date="event.start_datum"
                            :endDate="event.end_datum"
                            :image="event.bilder_path + '/plakat.jpg'"
                            :teaser="event.beschreibung"
                            :title="event.titel"
                            events
                        />
                    </div>
                    <div class="link center" style="margin-top: 3rem">
                        <nuxt-link
                            class="further-link"
                            to="/events"
                            aria-label="Zu den Events"
                        >
                            <em class="underline">Zu den Events</em>
                        </nuxt-link>
                    </div>
                </div>
            </div>
            <div class="area flex flex-center">
                <div class="news">
                    <h2 class="reduceMobile">News</h2>
                    <div
                        v-for="news1 of news"
                        :key="news1.nId"
                        class="singleNews"
                    >
                        <card
                            :id="news1.nId"
                            :date="news1.datum"
                            :image="news1.bilder_path + '/plakat.jpg'"
                            :teaser="news1.anreisser"
                            :title="news1.titel"
                            news
                        />
                    </div>
                    <div class="link center" style="margin-top: 3rem">
                        <nuxt-link
                            class="further-link"
                            to="/news"
                            aria-label="Zu den News"
                            ><em class="underline">Zu den News</em></nuxt-link
                        >
                    </div>
                </div>
            </div>
            <div class="area">
                <iframe
                    src="https://cdn.flipsnack.com/widget/v2/widget.html?hash=xkldq00n30"
                    width="100%"
                    height="480"
                    seamless="seamless"
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen
                    class="folder"
                    id="folder"
                    title="Vorstellungsfolder des Kulturverein Ybbs"
                ></iframe>
                <div class="link center" style="margin-top: 2rem">
                    <a
                        href="/pdfs/vorstellungsfolder.pdf"
                        download="/pdfs/vorstellungsfolder.pdf"
                        class="further-link"
                        aria-label="Vorstellungsfolder herunterladen"
                        target="_blank"
                    >
                        Folder Herunterladen!
                    </a>
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
