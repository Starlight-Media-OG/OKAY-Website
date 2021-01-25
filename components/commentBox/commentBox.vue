<template>
    <div class="commentBox">
        <div class="heading">
            <h2>Kommentare</h2>
        </div>
        <div class=" flex flex-center">
            <div class="comments">
                <div v-for="kom in koms" :key="kom.komId" class="comment">
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
                                {{kom.kommentar_text}}
                            </div>
                        </div>
                        <div class="flex flex-center" v-if="kom.images != undefined">
                            <div class="images flex flex-center">
                                <div class="row">
                                    <div v-for="image in kom.images" :key="image" class="col flex flex-center">
                                        <img :src="image" alt="Bild von der Ausstellung" />
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
                    <p class="text center">+</p>
                    <div class="flowUp" :class="{'flowUp-active': this.activeAdd}">
                        <div class="row flex flex-center">
                            <input type="file" name="files" multiple @change="registerFiles">
                        </div>
                    </div>
                </div>
                <div class="sendButton" @click="toggleModal()">
                    <p class="text center check">
                        <button type="submit">
                            <check /> </button>
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
                                <div class="label">Name: *</div>
                                <input type="text" class="input" v-model="name" required/>
                            </label>
                        </div>

                        <div class="row">
                            <label>
                                <div class="label">Mail Adressse: *</div>
                                <input type="email" class="input" v-model="mail" required/>
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

        <NewsletterPopUp :show="newsletterPopUp" />
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
        name: "CommentBox",
        props: {
            eId: Number,
        },
        components: {
            check,
            NewsletterPopUp
        },
        data() {
            return {
                activeAdd: false,
                txt: "",
                koms: [],
                name: "",
                mail: "",
                newsletter: false,
                files: [],
                modalShow: false,
                newsletterPopUp: false,
                fileUplaodTarget: process.env.baseImage + "/images/upload/events/"
            }
        },
        methods: {
            registerFiles: function(e) {
                this.files = e.target.files;
            },
            send: async function () {
                if(this.name != "" && this.mail != "") {
                    if (this.eId != "") {
                        let req = await axios.post(process.env.baseURL + "/kommentare/", {
                            "email": this.mail,
                            "username": this.name,
                            "kommentar_text": this.txt,
                            "datum": new Date().getFullYear() + "-" + ('0' + (new Date().getMonth() + 1)).slice(
                                -2) + "-" + ('0' + new Date().getDate()).slice(-2),
                            "oaId": this.eId
                        });

                        let komId = req.data.id;

                        if (komId != undefined) {
                            await axios.post(process.env.baseURL + "/setEvent", {
                                "komId": komId,
                                "oaId": this.eId
                            })
                        }

                        if(this.files != undefined || this.files != {}) {
                            //Send Request to API
                            let url = process.env.baseImage + "/images/upload/events/";
                            
                            let formData = new FormData();

                            for (const i of Object.keys(this.files)) {
                                formData.append('files', this.files[i])
                            }

                            let req = axios.post(url, formData);

                            if(req.status === 200) {
                                console.log(req.data);
                            }
                        }


                        this.txt = "";
                        this.toggleModal();

                        if (this.newsletter === true)
                            this.newsletterPopUp = !this.newsletterPopUp;

                    }
                }
            },
            initials: function (kom) {
                if (kom.username.indexOf(" ") >= 0) {
                    let tmp = kom.username.split(" ");

                    tmp = tmp[0].charAt(0).toUpperCase() + tmp[1].charAt(0).toUpperCase();

                    return tmp;
                } else {
                    return " " + kom.username.charAt(0);
                }
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
            let error = false;

            let reqComment = await axios.get(process.env.baseURL + "/kommentare/getKommentare/" + this.eId).catch(()=>{
                error =true;
            });

            if(!error) {
                this.koms = reqComment.data;

                for (const item of this.koms) {
                    if (item.bilder_path != null) {
                        let data = await axios.get(item.bilder_path);
                        if (data.data.status === true) {
                            item.images = [];
                            for (const value of data.data.data) {
                                item.images.push(process.env.baseImage + value.replace("server/uploads", ""));
                            }
                        }
                    }
                }
            }
        },
    }
</script>