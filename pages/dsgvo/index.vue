<script setup>
import { useBreadcrumbStore } from "~/store/breadcrumb.store";

useHead({
    title: "DSGVO - OKAY Ybbs",
    meta: [
        {
            name: "description",
            content: "Die Datenschutzgrundverordnung von OKAY",
        },
        {
            name: "keywords",
            content: "DSGVO, Verein, Speicherdauer, Recht, Person",
        },
    ],
});

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.$reset();
breadcrumbStore.addBreadcrumb({ step: 1, text: "Startseite", link: "/" });
breadcrumbStore.addBreadcrumb({ step: 2, text: "DSGVO", link: "/dsgvo" });
</script>

<template>
    <div class="flex flex-center height-100">
        <div class="row" style="width: 75vw">
            <div class="row header flex flex-center" style="margin-top: 10vh">
                <h1 class="title">Datenschutz</h1>
            </div>
            <h2>Speicherung persönlicher Daten</h2>
            <p>
                Persönliche Daten, die Sie uns auf dieser Website übermitteln,
                wie zum Beispiel Name und E-Mail-Adresse oder andere
                persönlichen Angaben im Rahmen der Übermittlung eines Formulars
                oder Beitrags, werden nur zum jeweils angegebenen Zweck
                verwendet. Ihre Daten werden nur auf unseren Servern gespeichert
                und unter keine Umständen an dritte weitergegeben
            </p>
            <h2>Verweise und Links</h2>
            <p>
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf
                deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
                diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
                wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
                überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
                Verlinkung nicht erkennbar.
            </p>
            <h2>Google Maps Datenschutzerklärung</h2>
            <p>
                Wir benützen auf unserer Website Google Maps der Firma Google
                Inc. (1600 Amphitheatre Parkway Mountain View, CA 94043, USA).
                Mit Google Maps können wir Ihnen Standorte besser zeigen und
                damit unser Service an Ihre Bedürfnisse anpassen. Durch die
                Verwendung von Google Maps werden Daten an Google übertragen und
                auf den Google-Servern gespeichert.
            </p>
            <h2>Google Fonts Lokal</h2>
            <p>
                Auf unserer Webseite nutzen wir Google Fonts der Firma Google
                Inc. (1600 Amphitheatre Parkway Mountain View, CA 94043, USA).
                Wir haben die Google-Schriftarten lokal, d.h. auf unserem
                Webserver – nicht auf den Servern von Google – eingebunden.
                Dadurch gibt es diesbezüglich keine Verbindung zu Google-Servern
                und somit auch keine Datenübertragung oder Speicherung.
            </p>
            <h2>Verantwortlich für die Datenverarbeitung</h2>
            <p>
                Kulturverein <br />
                „Offene Kultur Aus Ybbs“ (OKAY) <br />
                Sandtorgasse 3 <br />
                3370 Ybbs an der Donau, <br />
                ZVR-Zl. 391625836
            </p>
            <h2>Rechtsgrundlagen</h2>
            <p>
                Vereinsgesetz; Erfüllung rechtlicher Verpflichtungen;
                Einwilligung der betroffenen Person
            </p>
            <h2>Speicherdauer</h2>
            <p>
                Ihre Daten werden solange gespeichert, solange diese benötigt
                werden (z.B. Solange Sie einen Newsletter abonniert haben wird
                Ihr Name, Geschlecht und Ihre Mail Adresse gespeichert
            </p>
            <h2>Betroffenenrechte</h2>
            <p>
                Die Mitglieder haben folgende Rechte betreffend ihre
                personenbezogenen Daten:
            </p>
            <ul class="noStyle">
                <li>Recht auf Auskunft</li>
                <li>Recht auf Berichtigung oder Löschung</li>
                <li>Recht auf Einschränkung der Verarbeitung</li>
                <li>Recht auf Widerspruch</li>
            </ul>
            <p>
                Jede betroffenen Person hat das Recht, Beschwerde bei der
                Datenschutzbehörde zu erheben.
            </p>
            <h2>Newsletter</h2>
            <p>
                Sie haben die Möglichkeit, über unsere Website unseren
                Newsletter zu abonnieren. Hierfür benötigen wir Ihre
                E-Mail-Adresse, ihren Namen, ihr Geschlecht und ihre Erklärung,
                dass Sie mit dem Bezug des Newsletters einverstanden sind.
            </p>
            <p>
                Ihre Daten werden nur für die Dauer des erhaltes des Newsletters
                gespeichert, sobald Sie sich von diesem abmelden werden alle
                gespeichert Daten gelöscht. Sie können sich über einen Link im
                Newsletter vom Erhalt weiterer Newsletter abmelden.
            </p>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "../../assets/style/variable";

.header {
    @include font($header-font-name, 3rem, white, bold);
    margin-bottom: 5vh;
    margin-left: 0;

    .title {
        @media screen and (max-width: $breakpoint-medium-max) {
            font-size: 2.5rem;
            margin-left: -5vw;
        }
    }
}

h2 {
    @include font($header-font-name, 1.5rem, white, 600);
    margin-bottom: 1rem;
}

p {
    @include font($flow-font-name, 1rem, white);
    margin-bottom: 1.5rem;
}

.height-100 {
    min-height: 100vh;
}
</style>
