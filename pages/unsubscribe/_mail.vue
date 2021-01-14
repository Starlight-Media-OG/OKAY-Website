<template>

</template>

<script>
import axios from "axios";

export default {
    name: "unsubscribeFromNewsletter",
    data: () => {
        return {
            mail: "",
            message: ""
        }
    },
    async fetch() {
        this.mail = this.$route.params.mail;
        console.log(this.mail)
        let mail = this.mail;

        //Get Id to Mail Address
        let req = await axios.get(process.env.baseURL + "/mailadressen/" + mail);

        if(req.status === 200) {
            console.log(req.status + " and data " + req.data)
            let mailId = req.data.mailerId;

            //Delete Mail from Verteiler
            let delVerteiler = await axios.delete(process.env.baseURL + "/newsletter/" + mailId);

            if(delVerteiler.status === 200) {
                let delMail = await axios.delete(process.env.baseURL + "/mailadressen/" + mailId);

                this.$router.push("/");
            }
        }
    },
    async mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        });

        await this.$fetch();

        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        });
    }
}
</script>