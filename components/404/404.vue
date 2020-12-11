<template>
    <div class="super">
        <canvas id="canvas"></canvas>
    </div>
</template>

<script>
import * as BABYLON from 'babylonjs';

export default {
    name: "error",
    mounted() {
        //Verweis auf das Element erzeugen, in welchem das 3D-Modell dargestellt wird
        var canvas = document.getElementById("canvas");
        //Deklaration der Render Engine
        var engine = new BABYLON.Engine(canvas, true);
        //Deklaration der Objekten in welchen die Meshes gespeichert werden
        var modell;

        //Verhindern das der Babylon Loading Screen gezeigt wird
        BABYLON.SceneLoader.ShowLoadingScreen = false;

        //Erstellen einer Szene
        var scene = new BABYLON.Scene(engine);

        //Zuweisen der Kamera aus welcher man die Szene sieht
        var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 1, 0), scene);

        //Erstellen der Beleuchtung (indirekte Beleuchtung, kein Spot)
        var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1.5, 1.2), scene);
        light.intensity = 12.0;
        //Definition welche Farben bei z.B. bei bestimmten Lichteindrücken hinzu gerechnet werden sollen
        light.diffuse = new BABYLON.Color3(0.9, 0.9, 0.9);
        light.specular = new BABYLON.Color3(0, 0, 0);
        light.groundColor = new BABYLON.Color3(0, 0, 0);

        //Festlegung der Animationsparameter für das drehen des Modells
        var animation = new BABYLON.Animation("animationIn", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        //In diesem Array werden die einzelnen Animationsstadien gespeichert, zwischen welchen Interpoliert wird
        var keys = [];
        //Bei Frame: 0 wird das Objekt um auf den Wert 0.25 gedreht
        keys.push({
            frame: 0,
            value: 0.25
        });
        //Bei Frame: 30 wird das Objekt um auf den Wert 0.5 gedreht
        keys.push({
            frame: 30,
            value: 0.6
        });
        //Der Animation werden die Framestadien zugewiesen
        animation.setKeys(keys);

        // Die Szene wird geladen
        BABYLON.SceneLoader.Append("/assets/", "404-Modell.babylon", scene, function (meshes) {

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
            canvas.onmouseover = function () {
                //Die Animation wird ausgelöst
                scene.beginAnimation(modell, 0, 10, false);
            }

            //Wird ausgelöst, sobald die Maus das Canvas-Element verlässt
            canvas.onmouseout = function () {
                //Die Animation wird nun rückwertsbeginned abgespielt
                scene.beginAnimation(modell, 10, 0, false);
            }
        });

        //Sorgt für Anti-Aliasing, um Unebenheiten in diagonalen Linien zu vehindern
        engine.setHardwareScalingLevel(0.3);

        //Das Objekt wird gerendert
        engine.runRenderLoop(function () {
            scene.render();
        });
    }
}
</script>

<style scoped lang="scss">
    .super {
        width: 100vw;
        height: 65vh;
        position: relative;

        #canvas {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateY(-50%) translateX(-52%);
            z-index: 0;
        }
    }
</style>