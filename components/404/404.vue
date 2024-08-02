<script setup>
import * as BABYLON from "babylonjs";

const babylonCanvas = ref(null);

onMounted(() => {
    let engine = new BABYLON.Engine(babylonCanvas, true);
    let modell;

    //Verhindern das der Babylon Loading Screen gezeigt wird
    BABYLON.SceneLoader.ShowLoadingScreen = false;

    let scene = new BABYLON.Scene(engine);
    let camera = new BABYLON.FreeCamera(
        "camera",
        new BABYLON.Vector3(0, 1, 0),
        scene,
    );

    //Erstellen der Beleuchtung (indirekte Beleuchtung, kein Spot)
    let light = new BABYLON.HemisphericLight(
        "HemiLight",
        new BABYLON.Vector3(0, 1.5, 1.2),
        scene,
    );
    light.intensity = 9.0;
    light.diffuse = new BABYLON.Color3(0.9, 0.9, 0.9);
    light.specular = new BABYLON.Color3(0, 0, 0);
    light.groundColor = new BABYLON.Color3(0, 0, 0);

    //Festlegung der Animationsparameter für das drehen des Modells
    let animation = new BABYLON.Animation(
        "animationIn",
        "rotation.y",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE,
    );
    //In diesem Array werden die einzelnen Animationsstadien gespeichert, zwischen welchen Interpoliert wird
    let keys = [];
    //Bei Frame: 0 wird das Objekt um auf den Wert 0.25 gedreht
    keys.push({
        frame: 0,
        value: 0.25,
    });
    //Bei Frame: 30 wird das Objekt um auf den Wert 0.6 gedreht
    keys.push({
        frame: 30,
        value: 0.6,
    });
    //Der Animation werden die Framestadien zugewiesen
    animation.setKeys(keys);

    // Die Szene wird geladen
    BABYLON.SceneLoader.Append(
        "/assets/",
        "404-Modell.babylon",
        scene,
        function (meshes) {
            //Die Meshs werden auf Basis ihrer ID geladen
            modell = scene.getMeshByID("Modell");

            //Hintergrund der Scene auf Transparent setzen
            scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

            //Die Anfangswerte für die Rotation des Objekts
            modell.rotation.y = 0.25;

            //Dem Mird wird der Animatiosablauf zugewiesen
            modell.animations = [];
            modell.animations.push(animation);

            //Wird ausgelöst, sobald sich die Maus über dem Canvas-Element befindet
            babylonCanvas.onmouseover = function () {
                //Die Animation wird ausgelöst
                scene.beginAnimation(modell, 0, 10, false);
            };

            //Wird ausgelöst, sobald die Maus das Canvas-Element verlässt
            babylonCanvas.onmouseout = function () {
                //Die Animation wird nun rückwertsbeginned abgespielt
                scene.beginAnimation(modell, 10, 0, false);
            };
        },
    );

    //Sorgt für Anti-Aliasing, um Unebenheiten in diagonalen Linien zu vehindern
    engine.setHardwareScalingLevel(0.3);

    //Das Objekt wird gerendert
    engine.runRenderLoop(function () {
        scene.render();
    });
});
</script>

<template>
    <main class="root flex flex-center">
        <canvas id="babylonCanvas" class="row" ref="babylonCanvas"></canvas>
        <h1 class="row title flex flex-center" style="margin-top: -20vh">
            Ups!
        </h1>
        <h2>Ein Fehler ist aufgetreten!</h2>
        <div class="row link center" style="margin-top: 4vh">
            <nuxt-link to="/" class="further-link">
                <em class="underline">Zurück zur Startseite</em>
            </nuxt-link>
        </div>
    </main>
</template>

<style scoped lang="scss">
.super {
    position: relative;
    width: 100vw;
    height: 65vh;
}
</style>
