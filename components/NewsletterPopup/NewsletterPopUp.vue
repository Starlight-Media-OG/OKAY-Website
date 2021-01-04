<template>
    <div class="modal flex flex-center" v-if="show">
        <div class="content flex flex-center">
            <div class="close row" @click="modalToggle">
                x
            </div>
            <div class="header row">
                <h3>Bitte melden Sie sich beim Newsletter an!</h3>
            </div>
            <div class="form row">
                <form>
                    <div class="row">
                        <label>
                            <div class="label">Vorname: *</div>
                            <input type="text" class="input" v-model="vorname" required />
                        </label>
                    </div>

                    <div class="row">
                        <label>
                            <div class="label">Nachname: *</div>
                            <input type="text" class="input" v-model="nachname" required />
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
                            <div class="label">Geschlecht: *</div>
                            <div class="row">
                                <input type="radio" value="m" name="gender" id="m" v-model="gender" required class="radio" />
                                <label for="m">Männlich</label>

                                <input type="radio" value="f" name="gender" id="f" v-model="gender" required class="radio" />
                                <label for="f">Weiblich</label>

                                <input type="radio" value="x" name="gender" id="x" v-model="gender" required class="radio" />
                                <label for="x">Divers</label>
                            </div>
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