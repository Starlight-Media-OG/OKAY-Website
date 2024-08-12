<script setup>
const props = defineProps({
    koms: Array,
    images: Array,
    eId: Number,
});

const activeAdd = ref(false);
const txt = ref('');
const name = ref('');
const mail = ref('');
const newsletter = ref(false);
const files = ref([]);
const modalShow = ref(false);
const dsg = ref(false);

const imagesId = (arr, id) => {
    return arr.filter((item) => item.id == id);
};

const registerFiles = (e) => {
    files.value = e.target.files;
};

const send = async () => {
    if (name.value != '' && dsg.value) {
        if (props.eId != '' || props.eId != undefined) {
            let req = await $fetch(
                useRuntimeConfig().public.baseURL + '/kommentare/',
                {
                    method: 'POST',
                    body: {
                        email: mail.value,
                        username: name.value,
                        kommentar_text: txt.value,
                        datum:
                            new Date().getFullYear() +
                            '-' +
                            ('0' + (new Date().getMonth() + 1)).slice(-2) +
                            '-' +
                            ('0' + new Date().getDate()).slice(-2),
                        oaId: props.eId,
                    }
                },
            );

            let komId = req.id;

            if (komId != undefined) {
                await $fetch(
                    useRuntimeConfig().public.baseURL + '/setEvent',
                    {
                        method: 'POST',
                        body: {
                            komId: komId,
                            oaId: props.eId,
                        }
                    },
                );
            }

            if (files.value != undefined || files.value != {}) {
                let url = useRuntimeConfig().public.baseImage + '/images/upload/events/';

                let formData = new FormData();

                for (const i of Object.keys(files.value)) {
                    formData.append('files', files.value[i]);
                }

                await $fetch(url, {
                    method: 'POST',
                    body: formData
                });
            }

            txt.value = '';
            modalShow.value = false;
        }
    }
};

const initials = (kom) => {
    if (kom.username.indexOf(' ') >= 0) {
        let tmp = kom.username.split(' ');
        tmp = tmp[0].charAt(0).toUpperCase() + tmp[1].charAt(0).toUpperCase();
        return tmp;
    } else {
        return ' ' + kom.username.charAt(0);
    }
};

const toggleModal = () => {
    modalShow.value = !modalShow.value;
};

const isImage = (path) => {
    return contains(path, ['.jpg', '.jpeg', '.bmp', '.png', '.svg', '.ico', '.gif']);
};

const contains = (string, arr) => {
    return arr.some(check => string.includes(check));
};
</script>

<template>
    <div class="commentBox" style="margin-bottom: 0">
        <div class="heading">
            <h2>Kommentare</h2>
        </div>
        <div class="flex flex-center">
            <div class="comments">
                <div v-for="kom in koms" :key="kom.komId" class="comment">
                    <div class="singleCommentBox">
                        <div class="row">
                            <div class="shotName">
                                <p>{{ initials(kom) }}</p>
                            </div>
                            <div class="name">
                                {{ kom.username }}
                            </div>
                        </div>
                        <div class="row">
                            <div class="text">
                                {{ kom.kommentar_text }}
                            </div>
                        </div>
                        <div
                            class="flex flex-center"
                            v-if="imagesId(images, kom.komId) != undefined"
                        >
                            <div
                                class="images flex flex-center"
                                v-if="imagesId(images, kom.komId).length != 0"
                            >
                                <div class="row">
                                    <div
                                        v-for="image in imagesId(images, kom.komId)"
                                        :key="image"
                                        class="col flex flex-center"
                                    >
                                        <img
                                            :src="image.image"
                                            alt="Bild von der Ausstellung"
                                            v-if="isImage(image.image)"
                                        />
                                        <video
                                            :src="image.image"
                                            alt="Bild von der Ausstellung"
                                            v-if="!isImage(image.image)"
                                            controls
                                        ></video>
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
                    <input
                        type="text"
                        placeholder="Einen Kommentar hinzufügen..."
                        class="input"
                        v-model="txt"
                        name="komText"
                        tabindex="1"
                        aria-label="Kommentartext hinzufügen"
                    />
                </div>
                <div
                    class="addButton flex flex-center"
                    @click="activeAdd = !activeAdd"
                    tabindex="2"
                >
                    <p class="text center">+</p>
                    <div
                        class="flowUp"
                        :class="{ 'flowUp-active': activeAdd }"
                    >
                        <div class="row flex flex-center">
                            <input
                                type="file"
                                name="files"
                                multiple
                                @change="registerFiles"
                                tabindex="3"
                                aria-label="Bilder zum Kommentar hinzufügen"
                            />
                        </div>
                    </div>
                </div>
                <div class="sendButton" @click="toggleModal()">
                    <p class="text center check">
                        <button
                            type="submit"
                            title="Kommentar absenden"
                            tabindex="4"
                            aria-label="Kommentar absenden"
                        >
                            <SvgArrow direction="right"/>
                        </button>
                    </p>
                </div>
            </div>
        </div>

        <div class="modal flex flex-center" v-if="modalShow">
            <div class="content">
                <div class="close row" @click="toggleModal">x</div>
                <div class="header row">
                    <h3>Wollen Sie den Kommentar hinzufügen</h3>
                </div>
                <div class="form">
                    <form>
                        <div class="row">
                            <label>
                                <div class="label">Name: *</div>
                                <input
                                    type="text"
                                    class="input"
                                    v-model="name"
                                    required
                                    tabindex="1"
                                    aria-label="Name"
                                />
                            </label>
                        </div>

                        <div class="row">
                            <input
                                type="checkbox"
                                required
                                name="dsg"
                                v-model="dsg"
                                tabindex="3"
                                id="dsg"
                            />
                            <label
                                for="dsg"
                            >Hiermit erkläre ich mich mit den
                                <nuxt-link to="/dsgvo">
                                    Nutzungsbedingungen
                                </nuxt-link>
                                einverstanden.</label
                            >
                        </div>
                    </form>
                </div>
                <div class="buttons row flex flex-center">
                    <button
                        class="success"
                        @click="send()"
                        tabindex="4"
                        aria-label="Absenden"
                    >
                        Absenden
                    </button>
                    <button
                        class="failure"
                        @click="toggleModal()"
                        tabindex="5"
                        aria-label="Abbrechen"
                    >
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