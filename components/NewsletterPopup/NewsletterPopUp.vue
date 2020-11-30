<template>
    <div class="modal flex flex-center" v-if="show">
        <div class="content flex flex-center">
            <div class="header row">
                <h3>Bitte melden Sie sich beim Newsletter an!</h3>
            </div>
            <div class="form row">
                <form>
                    <div class="row">
                        <label>
                            <div class="label">Vorname:</div>
                            <input type="text" class="input" v-model="vorname" />
                        </label>
                    </div>

                    <div class="row">
                        <label>
                            <div class="label">Nachname:</div>
                            <input type="text" class="input" v-model="nachname" />
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
                            <div class="label">Geschlecht:</div>
                            <select class="input" v-model="gender">
                                <option value="m">Männlich</option>
                                <option value="f">Weiblich</option>
                                <option value="x">Divers</option>
                            </select>
                        </label>
                    </div>
                </form>
            </div>
            <div class="buttons row flex flex-center">
                <button class="success" @click="send()">
                    Absenden
                </button>
                <button class="failure" @click="modalToggle()">
                    Abbrechen
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NewsletterPopUp",
    props: {
        show: false
    },
    methods: {
        modalToggle: function() {
            this.show =! this.show;
        },
        send: function() {
            //SEND DATA TO API

            this.modalToggle();
        }
    },
    data() {
        return {
            vorname: "",
            nachname: "",
            mail: "",
            gender: ""
        }
    }
}
</script>

<style scoped lang="scss">
@import "NewsletterPopUp";
</style>