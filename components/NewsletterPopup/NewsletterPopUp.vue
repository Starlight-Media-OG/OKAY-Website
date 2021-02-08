<template>
    <div class="modal flex flex-center" v-if="show">
        <div class="content flex flex-center">
            <div class="close row" @click="modalToggle">
                x
            </div>
            <div class="header row">
                <h3>Hier können Sie sich zum Newsletter anmelden!</h3>
            </div>
            <div class="form row">
                <form>
                    <div class="row">
                        <label>
                            <div class="label">Vorname: *</div>
                            <input type="text" class="input" v-model="vorname" required tabindex="1" />
                        </label>
                    </div>

                    <div class="row">
                        <label>
                            <div class="label">Nachname: *</div>
                            <input type="text" class="input" v-model="nachname" required tabindex="2" />
                        </label>
                    </div>

                    <div class="row">
                        <label>
                            <div class="label">Mail Adressse: *</div>
                            <input type="email" class="input" v-model="mail" required tabindex="3" />
                        </label>
                    </div>

                    <div class="row">
                        <label>
                            <div class="label">Geschlecht: *</div>
                            <div class="row">
                                <input type="radio" value="m" name="gender" id="m" v-model="gender" required class="radio" tabindex="4" />
                                <label for="m">Männlich</label>

                                <input type="radio" value="f" name="gender" id="f" v-model="gender" required class="radio" tabindex="5" />
                                <label for="f">Weiblich</label>

                                <input type="radio" value="x" name="gender" id="x" v-model="gender" required class="radio" tabindex="6" />
                                <label for="x">Divers</label>
                            </div>
                        </label>
                    </div>
                </form>
            </div>
            <div class="buttons row flex flex-center">
                <button class="success" @click="send()" tabindex="7" aria-label="Absenden">
                    Absenden
                </button>
                <button class="failure" @click="modalToggle()" tabindex="8" aria-label="Abbrechen">
                    Abbrechen
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "NewsletterPopUp",
    props: {
        show: false
    },
    methods: {
        modalToggle: function() {
            this.show =! this.show;
        },
        send: async function() {
            let req = await axios.post(process.env.baseURL + "/mailadressen", {
                "vorname": this.vorname,
                "nachname": this.nachname,
                "email": this.mail,
                "geschlecht": this.gender
            });

            if(req.status === 200) {
                let reqVerteiler = await axios.post(process.env.baseURL + "/newsletter", {
                    "mailerId": req.data.id
                });
            } else if(req.status === 404) {
                
            }

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