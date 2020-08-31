<template>
    <div class="commentBox">
        <h2>Kommentare</h2>

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
                    <div class="images" v-if="kom.bilder_path != undefined">
                        <div class="row">
                            <div class="col">

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
                    <div class="flowUp" :class="{activeAdd: this.activeAdd}">
                        <div class="row">
                            <input type="file" accept="image/*" name="uploaded" multiple @change="previewFiles()" ref="myFiles" />
                        </div>
                    </div>
                </div>
                <div class="sendButton" @click="toggleModal()">
                    <p class="text center check">
                        <input type="submit" value="&check;" />
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
                                Name:
                                <input type="text" class="input" v-model="name" />
                            </label>
                        </div>

                        <div class="row">
                            <label>
                                Mail Adressse:
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
    </div>
</template>

<style scoped lang="scss">
    @import "commentBox";
</style>

<script>
    import axios from 'axios';

    export default {
        name: "comment",
        props: {
            eId: String,
        },
        data() {
            return {
                activeAdd: false,
                txt: "Einen Kommentar hinzufügen...",
                koms: [
                    {
                        id: 120,
                        email: "a.b@c.d",
                        username: "Philipp Dvorak",
                        text: "Das war eine wunderschöne Ausstellung, ich habe keine Ideen mehr was hier noch stehen könnte",
                        bilder_path: "img/" + this.eId + "/Kommentar" + 120 + "/"
                    }, {
                        id: 123,
                        email: "a.b@c.d",
                        username: "Philipp Dvorak",
                        text: "Das war eine wunderschöne Ausstellung, ich habe keine Ideen mehr was hier noch stehen könnte",
                        bilder_path: "img/" + this.eId + "/Kommentar" + 123 + "/"
                    }, {
                        id: 122,
                        email: "a.b@c.d",
                        username: "Philipp Dvorak",
                        text: "Das war eine wunderschöne Ausstellung, ich habe keine Ideen mehr was hier noch stehen könnte",
                        bilder_path: "img/" + this.eId + "/Kommentar" + 130 + "/"
                    }
                ],
                name: "",
                mail: "",
                newsletter: true,
                files: [],
                modalShow: true
            }
        },
        methods: {
            send: async function () {
                //Send text to DB

                if (this.files != []) {
                    let data = await axios.post("http://localhost:4000/images/upload", this.files);
                    console.log(data.data);
                }

                toggleModal();
            },
            initials: function (kom) {
                let tmp = kom.username.split(" ");

                tmp = tmp[0].charAt(0).toUpperCase() + tmp[1].charAt(0).toUpperCase();

                return tmp;
            },
            previewfiles() {
                if (this.$refs.myFiles.files !== undefinded)
                    this.files = this.$refs.myFiles.files;
            },
            toggleModal: function () {
                this.modalShow = !this.modalShow;
            }
        },
        async fetch() {
            //Fetch Comments
        },
    }
</script>