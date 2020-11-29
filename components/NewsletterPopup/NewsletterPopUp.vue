<template>
    <div class="modal flex flex-center" v-if="show">
        <div class="content flex flex-center">
            <div class="close row" @click="modalToggle">
                x
            </div>
            <div class="header row">
                <h3></h3>
            </div>
            <div class="form">
                <form>
                    <div class="row">
                        <label>
                            <div class="label">Vorname:</div>
                            <input type="text" class="input" v-model="vorname" />
                        </label>
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
                            <input type="radio" class="input" v-model="gender" value="m" />
                            <div class="label">Männlich</div>
                            <input type="radio" class="input" v-model="gender" value="w" />
                            <div class="label">Weiblich</div>
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
            console.log(this.gender);

            //Implement API Call to add Newsletter Method to
        }
    },
    data() {
        return {
            vorname: String,
            nachname: String,
            mail: String,
            gender: String
        }
    }
}
</script>

<style scoped lang="scss">
@import "NewsletterPopUp";
</style>