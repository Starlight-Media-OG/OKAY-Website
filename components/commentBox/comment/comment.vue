<template>
    <div class="comment">
        <div class="row">
            <div class="shotName">
                {{this.ID}}
            </div>
            <div class="name">
                {{this.kommentar.name}}
            </div>
        </div>
        <div class="row">
            <div class="text">
                {{this.kommentar.text}}
            </div>
        </div>
        <div class="images" v-if="this.kommentar.bilder_path != undefined">
            <div class="row">
                <div class="col" v-for="image in images">
                    <img :src="image.pathFull" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
</style>

<script>
    export default {
        name: 'comment',
        props: {
            komId: String,
        },
        data() {
            return {
                kommentar: {}
            }
        },
        created() {
            this.kommentar = {
                "email": "a.b@c.d",
                "username": "Philipp Dvorak",
                "text": "Das war eine wunderschöne Ausstellung, ich habe keine Ideen mehr was hier noch stehen könnte",
                "bilder_path": "img/HeinzKnapp/Kommentar" + komId
            }
        },
        async fetch() {
            //Fetch Data from DB over Middleware or not
        },
        computed: {
            ID: function () {
                let tmp = this.kommentar.username.split(" ");

                tmp = tmp[0].chartAt(1).toUpperCase() + tmp[1].charAt(1).toUpperCase;

                return tmp
            },
            images: function () {
                let path = this.kommentar.bilder_path;
                let r = require.context(path, true, /\.png$/);

                let arr = [];

                console.log(r);
                r.keys().forEach(key => (this.arr.push({ pathFull: key(r), pathShort: key })));

                return arr;
            }
        }
    }
</script>