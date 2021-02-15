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
                    <div class="row danger" v-if="this.error != ''">
                        <p>{{ this.error }}</p>
                    </div>
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
                    <div class="row">
                        <input type="checkbox" required name="dsg" v-model="dsg" tabindex="7" id="dsg" /> <label for="dsg" @click="event.preventDefault(); document.getElementById('dsg').selected =! document.getElementById('dsg').selected">Hiermit erkläre ich mich mit den <nuxt-link to="/dsgvo">Nutzungsbedingungen</nuxt-link> einverstanden.</label>
                    </div>
                    <div class="row">
                        <input type="checkbox" required name="want" v-model="want" tabindex="8" id="want" /> <label for="want" @click="event.preventDefault(); document.getElementById('want').selected =! document.getElementById('want').selected">Hiermit stimme ich den erhalt von Werbemails vom Verein "Offene Kultur Aus Ybbs" zu.</label>
                    </div>
                </form>
            </div>
            <div class="buttons row flex flex-center">
                <button class="success" @click="send()" tabindex="9" aria-label="Absenden">
                    Absenden
                </button>
                <button class="failure" @click="modalToggle()" tabindex="10" aria-label="Abbrechen">
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
            if(this.vorname != "" && this.nachname != "" && this.mail != "" && this.gender != "" && this.dsg && this.want) {

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

                    this.error = "";
                    this.modalToggle();
                } else if(req.status === 404) {
                    this.error = "Wir konnten Sie nicht zum Newsletter hinzufügen probieren Sie die Anmeldung später erneut.";
                }
            } else {
                this.error = "Bitte füllen Sie alle Felder aus!";
            }
        }
    },
    data() {
        return {
            vorname: "",
            nachname: "",
            mail: "",
            gender: "",
            dsg: false,
            want: false,
            error: "",
        }
    }
}
</script>

<style scoped lang="scss">
@import "NewsletterPopUp";
</style>