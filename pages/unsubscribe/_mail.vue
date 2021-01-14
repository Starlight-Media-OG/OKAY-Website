<template>
</template>

<script>
import axios from "axios";

export default {
    name: "unsubscribeFromNewsletter",
    data: () => {
        return {
            "mail": ""
        }
    },
    async fetch() {
        this.mail = this.$route.params.mail;
        console.log(this.mail)
        let mail = this.mail;

        //Get Id to Mail Address
        let req = await axios.get(process.env.baseURL + "/mailadresse/" + mail);

        if(req.status === 200) {
            console.log(req.status + " and data " + req.data)
            let mailId = req.data.mailerId;

            //Delete Mail from Verteiler
            let delVerteiler = await axios.delete(process.env.baseURL + "/newsletter/" + mailId);

            if(delVerteiler.status === 200) {
                let delMail = await axios.delete(process.env.baseURL + "/mailadressen/" + mailId);

                if(delMail.status === 200) {
                    this.$nuxt.router.push("/");
                }
            }
        }
    }
}
</script>