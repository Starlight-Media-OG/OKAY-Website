<template>
    <div class="commentBox">
        <div class="heading">
            <h2>Kommentare</h2>
        </div>
        <div class=" flex flex-center">
            <div class="comments">
                <div v-for="kom in koms" :key="kom.id" class="comment">
                    <div class="singleCommentBox">
                        <div class="row">
                            <div class="shotName">
                                <p>{{initials(kom)}}</p>
                            </div>
                            <div class="name">
                                {{kom.username}}
                            </div>
                        </div>
                        <div class="row">
                            <div class="text">
                                {{kom.text}}
                            </div>
                        </div>
                        <div class="flex flex-center" v-if="kom.images.length !== 0">
                            <div class="images flex flex-center">
                                <div class="row">
                                    <div v-for="image in kom.images" :key="image" class="col flex flex-center">
                                        <img :src="image" alt="Bild von der Ausstellung" @click="selectedImage = image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="addComment flex flex-center">
            <div class="box flex flex-center">
                <div class="textInput">
                    <input type="text" placeholder="Einen Kommentar hinzufügen..." class="input" v-model="txt" />
                </div>
                <div class="addButton flex flex-center" @click="activeAdd =! activeAdd">
                    <p class="text center" style="font-size: 5vh;">+</p>
                    <div class="flowUp" :class="{'flowUp-active': this.activeAdd}">
                        <div class="row flex flex-center">
                            <input type="file" accept="image/*" name="uploaded" multiple @change="previewFiles()" ref="myFiles" />
                        </div>
                    </div>
                </div>
                <div class="sendButton" @click="toggleModal()">
                    <p class="text center check">
                        <button type="submit"> <check /> </button>
                    </p>
                </div>
            </div>
        </div>

        <div class="modal flex flex-center" v-if="modalShow">
            <div class="content">
                <div class="close row" @click="toggleModal">
                    x
                </div>
                <div class="header row">
                    <h3>Wollen Sie den Kommentar hinzufügen</h3>
                </div>
                <div class="form">
                    <form>
                        <div class="row">
                            <label>
                                <div class="label">Name:</div>
                                <input type="text" class="input" v-model="name" />
                            </label>
                        </div>

                        <div class="row">
                            <label>
                                <div class="label">Mail Adressse:</div>
                                <input type="email" class="input" v-model="mail" />
                            </label>
                        </div>

                        <div class="row">
                            <label>
                                <input type="checkbox" class="checkInput" v-model="newsletter" />
                                Newsletter Abonnieren
                            </label>
                        </div>
                    </form>
                </div>
                <div class="buttons row flex flex-center">
                    <button class="success" @click="send()">
                        Absenden
                    </button>
                    <button class="failure" @click="toggleModal()">
                        Abbrechen
                    </button>
                </div>
            </div>
        </div>

        <NewsletterPopUp :show="newsletterPopUp"/>
    </div>


</template>

<style scoped lang="scss">
    @import "commentBox";
</style>

<script>
import axios from 'axios';
import check from "~/components/svg/check.vue";
import NewsletterPopUp from "~/components/NewsletterPopup/NewsletterPopUp";

export default {
        name: "comment",
        props: {
            eId: Number,
        },
        components: {
            check, NewsletterPopUp
        },
        data() {
            return {
                activeAdd: false,
                txt: "",
                koms: [],
                name: "",
                mail: "",
                newsletter: true,
                files: [],
                modalShow: false,
                newsletterPopUp: false
            }
        },
        methods: {
            send: async function () {
                let reqkomId = await axios.get(process.env.baseURL + "/kommentare")
                console.log("Kommentar id: " + reqkomId.data.komId);
                let komId = reqkomId.data.komId === undefined ? 1 : reqkomId.data.komId;

                let req = await axios.post(process.env.baseURL + "/kommentare/", {
                    "email": this.mail,
                    "username": this.name,
                    "kommentar_text": this.txt,
                    "datum": new Date().getFullYear() + "-" + ('0' + (MyDate.getMonth()+1)).slice(-2) + "-" + ('0' + new Date().getDate()).slice(-2),
                    "bilder_pfad": process.env.baseImage + "/images?path=uploads/events/" + this.$props.eId + "/comment" + komId
                });
                console.log(req.status);

                if(req.status === 200 && this.files != null) {
                    if (this.files !== []) {
                        let data = await axios.post(process.env.baseImage + "/images/upload/events/", this.files);
                        this.$nuxt.refresh();
                    }
                }

                this.toggleModal();

                this.newsletterPopUp =! this.newsletterPopUp;
            },
            initials: function (kom) {
                let tmp = kom.username.split(" ");

                tmp = tmp[0].charAt(0).toUpperCase() + tmp[1].charAt(0).toUpperCase();

                return tmp;
            },
            previewFiles() {
                if (this.$refs.myFiles.files !== undefined)
                    this.files = this.$refs.myFiles.files;
            },
            toggleModal: function () {
                this.modalShow = !this.modalShow;
            }
        },
        async fetch() {
            let req = await axios.get(process.env.baseURL + "/kommentare/getKommentare/" + this.$props.eId);
            this.koms = req.data;

            for (const item of this.koms) {
                if (item.bilder_path != null) {
                    let data = await axios.get(item.bilder_path);
                    if (data.data.status === true) {
                        for (const value of data.data.data) {
                            item.images.push("http://server.okay-ybbs.at:4000" + value.replace("server/uploads", ""));
                        }
                    }
                }
            }
        },

    }
</script>