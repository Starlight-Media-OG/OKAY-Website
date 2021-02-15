<template>
    <div class="flex flex-center" style="height: 80vh;">
        <div class="row danger" v-if="this.error != ''" v-html="this.error">
        </div>
        <div class="row success-alert" v-if="this.success!=''">
            {{this.success}}
        </div>

        <div class="row">
            <div class="link center" style="margin-top: 2rem;">
                <nuxt-link class="further-link" to="/" aria-label="Zu den Events"><em class="underline">Zur Startseite</em></nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "unsubscribeFromNewsletter",
    data: () => {
        return {
            mail: "",
            message: "",
            error: "",
            success: ""
        }
    },
    async fetch() {
        this.mail = this.$route.params.mail;
        let mail = this.mail;

        //Get Id to Mail Address
        try {
            let req = await axios.get(process.env.baseURL + "/mailadressen/" + mail);

            if(req.status === 200) {
                console.log(req.status + " and data " + req.data)
                let mailId = req.data.mailerId;

                //Delete Mail from Verteiler
                let delVerteiler = await axios.delete(process.env.baseURL + "/newsletter/" + mailId);

                if(delVerteiler.status === 200) {
                    let delMail = await axios.delete(process.env.baseURL + "/mailadressen/" + mailId);
                }

                this.success = "Sie wurden erfolgreich vom Newsletter abgemeldet! Schade dass Sie uns verlassen😢."
            } else if (req.status === 404) {
                this.error = "Ihre Mail Adresse konnte nicht gefunden werden. Falls Sie sich nicht abmelden können schreiben Sie uns eine Mail an: <a href='mailto:kulturverein@okay-ybbs.at'>kulturverein@okay-ybbs.at</a>"
            }
        } catch {
            this.error = "Ihre Mail Adresse konnte nicht gefunden werden. <br/ > Falls Sie sich nicht abmelden können schreiben Sie uns eine Mail an: <a href='mailto:kulturverein@okay-ybbs.at'>kulturverein@okay-ybbs.at</a>"
        }
    },
    mounted() {
        this.$store.commit('breadcrumbs/clear');
        this.$store.commit('breadcrumbs/addPositionedBreadcrumb', {
            todo: {
                step: 1,
                text: "Startseite",
                link: "/"
            }
        });
    }
}
</script>