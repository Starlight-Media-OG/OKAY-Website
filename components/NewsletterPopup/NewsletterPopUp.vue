<script setup>
const { show } = defineProps({
    show: Boolean,
});

const emits = defineEmits(["toggle:show"]);

const vorname = ref("");
const nachname = ref("");
const mail = ref("");
const gender = ref("");
const dsg = ref(false);
const want = ref(false);
const error = ref("");

const modalToggle = () => {
    emits("toggle:show");
};

const send = async () => {
    if (
        this.vorname != "" &&
        this.nachname != "" &&
        this.mail != "" &&
        this.gender != "" &&
        this.dsg &&
        this.want
    ) {
        let req = await $fetch(
            useRuntimeConfig().public.baseURL + "/mailadressen",
            {
                method: "post",
                body: {
                    vorname: this.vorname,
                    nachname: this.nachname,
                    email: this.mail,
                    geschlecht: this.gender,
                },
            },
        );

        if (req.status === 200) {
            let reqVerteiler = await $fetch(
                useRuntimeConfig().public.baseURL + "/newsletter",
                {
                    method: "post",
                    body: {
                        mailerId: req.data.id,
                    },
                },
            );

            this.error = "";
            this.modalToggle();
        } else if (req.status === 404) {
            this.error =
                "Wir konnten Sie nicht zum Newsletter hinzufügen probieren Sie die Anmeldung später erneut.";
        }
    } else {
        this.error = "Bitte füllen Sie alle Felder aus!";
    }
};
</script>

<template>
    <div class="modal flex flex-center" v-if="show">
        <div class="content flex flex-center">
            <div class="close row" @click="modalToggle">x</div>
            <div class="header row">
                <h3>Hier können Sie sich zum Newsletter anmelden!</h3>
            </div>
            <div class="form row">
                <form>
                    <div class="row danger" v-if="error != ''">
                        <p>{{ error }}</p>
                    </div>
                    <div class="row">
                        <label>
                            <div class="label">Vorname: *</div>
                            <input
                                type="text"
                                class="input"
                                v-model="vorname"
                                required
                                tabindex="1"
                            />
                        </label>
                    </div>

                    <div class="row">
                        <label>
                            <div class="label">Nachname: *</div>
                            <input
                                type="text"
                                class="input"
                                v-model="nachname"
                                required
                                tabindex="2"
                            />
                        </label>
                    </div>

                    <div class="row">
                        <label>
                            <div class="label">Mail Adressse: *</div>
                            <input
                                type="email"
                                class="input"
                                v-model="mail"
                                required
                                tabindex="3"
                            />
                        </label>
                    </div>

                    <div class="row">
                        <label>
                            <div class="label">Geschlecht: *</div>
                            <div class="row">
                                <input
                                    type="radio"
                                    value="m"
                                    name="gender"
                                    id="m"
                                    v-model="gender"
                                    required
                                    class="radio"
                                    tabindex="4"
                                />
                                <label for="m">Männlich</label>

                                <input
                                    type="radio"
                                    value="f"
                                    name="gender"
                                    id="f"
                                    v-model="gender"
                                    required
                                    class="radio"
                                    tabindex="5"
                                />
                                <label for="f">Weiblich</label>

                                <input
                                    type="radio"
                                    value="x"
                                    name="gender"
                                    id="x"
                                    v-model="gender"
                                    required
                                    class="radio"
                                    tabindex="6"
                                />
                                <label for="x">Divers</label>
                            </div>
                        </label>
                    </div>
                    <div class="row">
                        <input
                            type="checkbox"
                            required
                            name="dsg"
                            v-model="dsg"
                            tabindex="7"
                            id="dsg"
                        />
                        <label
                            for="dsg"
                            @click="
                                (event) => {
                                    event.preventDefault();
                                    dsg = !dsg;
                                }
                            "
                            >Hiermit erkläre ich mich mit den
                            <nuxt-link to="/dsgvo">
                                Nutzungsbedingungen
                            </nuxt-link>
                            einverstanden.
                        </label>
                    </div>
                    <div class="row">
                        <input
                            type="checkbox"
                            required
                            name="want"
                            v-model="want"
                            tabindex="8"
                            id="want"
                        />
                        <label
                            for="want"
                            @click="
                                (event) => {
                                    event.preventDefault();
                                    want = !want;
                                }
                            "
                        >
                            Hiermit stimme ich den erhalt von Werbemails vom
                            Verein "Offene Kultur Aus Ybbs" zu.
                        </label>
                    </div>
                </form>
            </div>
            <div class="buttons row flex flex-center">
                <button
                    class="success"
                    @click="send()"
                    tabindex="9"
                    aria-label="Absenden"
                >
                    Absenden
                </button>
                <button
                    class="failure"
                    @click="modalToggle()"
                    tabindex="10"
                    aria-label="Abbrechen"
                >
                    Abbrechen
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "NewsletterPopUp";
</style>
