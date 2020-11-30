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
            <div class="box">
                <div class="textInput">
                    <input type="text" placeholder="Einen Kommentar hinzufügen..." class="input" v-model="txt" />
                </div>
                <div class="addButton" @click="activeAdd =! activeAdd">
                    <p class="text center">+</p>
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
            eId: String,
        },
        components: {
            check, NewsletterPopUp
        },
        data() {
            return {
                activeAdd: false,
                txt: "Einen Kommentar hinzufügen...",
                koms: [
                    {
                        id: 10,
                        username: "Philipp Dvorak",
                        text: "Das war eine wunderschöne Ausstellung, ich habe keine Ideen mehr was hier noch stehen könnte",
                        bilder_path: "http://server.okay-ybbs.at:4000/images?path=uploads/events/1020/comment10",
                        images: []
                    }, {
                        id: 123,
                        username: "Philipp Dvorak",
                        text: "Das war eine wunderschöne Ausstellung, ich habe keine Ideen mehr was hier noch stehen könnte",
                        bilder_path: null,
                        images: []
                    }, {
                        id: 122,
                        username: "Philipp Dvorak",
                        text: "Das war eine wunderschöne Ausstellung, ich habe keine Ideen mehr was hier noch stehen könnte",
                        bilder_path: null,
                        images: []
                    }
                ],
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
                //Send text to DB

                /* if (this.files !== []) {
                    let data = await axios.post("http://server.okay-ybbs.at:4000/images/upload/events/", this.files);
                    console.log(data.data);
                } */

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
            //Fetch Comments

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