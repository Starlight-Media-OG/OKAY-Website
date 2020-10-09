<template>
    <div class="flex flex-center height-100">
        <div class="row">
            <div class="row header flex flex-center">
                <h1 class="title">Datenschtuz</h1>
            </div>
            <h2>Speicherung persönlicher Daten</h2>
            <p>Persönliche Daten, die Sie uns auf dieser Website übermitteln, wie zum Beispiel Name und E-Mail-Adresse oder andere persönlichen Angaben im Rahmen der Übermittlung eines Formulars oder Beitrags, werden gemeinsam mit dem Zeitpunkt und der IP-Adresse nur zum jeweils angegebenen Zweck verwendet, sicher verwahrt und nicht an Dritte weitergegeben.</p>
            <h2>Verweise und Links</h2>
            <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p>
            <h2>Google Maps Datenschutzerklärung</h2>
            <p>Wir benützen auf unserer Website Google Maps der Firma Google Inc. (1600 Amphitheatre Parkway Mountain View, CA 94043, USA). Mit Google Maps können wir Ihnen Standorte besser zeigen und damit unser Service an Ihre Bedürfnisse anpassen. Durch die Verwendung von Google Maps werden Daten an Google übertragen und auf den Google-Servern gespeichert.</p>
            <h2>Google Fonts Lokal</h2>
            <p>Auf unserer Webseite nutzen wir Google Fonts der Firma Google Inc. (1600 Amphitheatre Parkway Mountain View, CA 94043, USA). Wir haben die Google-Schriftarten lokal, d.h. auf unserem Webserver – nicht auf den Servern von Google – eingebunden. Dadurch gibt es diesbezüglich keine Verbindung zu Google-Servern und somit auch keine Datenübertragung oder Speicherung.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "index-dsgvo",
    created() {
        this.$store.commit("breadcrumbs/addPositionedBreadcrumb", { todo: {step: 2, newText: "DSGVO"} });
    }
}
</script>

<style scoped lang="scss">
@import "../../assets/style/variable";

.header {
    @include font($header-font-name, 3rem, white, bold);
    margin-bottom: 5vh;
}

h2 {
    @include font($header-font-name, 2rem, white, 600);
    margin-bottom: 1rem;
}

p {
    @include font($flow-font-name, 1re, white);
    margin-bottom: 1.5rem;
}

.height-100 {
    height: 100vh;
}
</style>