<script setup>
import { useBreadcrumbStore } from "~/store/breadcrumb.store";

useHead({
    title: "Über Uns - OKAY Ybbs",
    meta: [
        {
            charset: "utf-8",
        },
        {
            name: "description",
            content: "Allgemeine Informationen über den Kulturverein aus Ybbs",
        },
        {
            name: "keywords",
            content:
                "KIZ, Vereinshaus, OKAY, Allgemeine Information, Projekte, Mitglieder",
        },
    ],
});

const content = [
    {
        title: "§1 - Name des Vereins",
        text: "Der Verein führt den Namen „Offene Kultur Aus Ybbs“, die Kurzbezeichnung lautet „OKAY“",
        active: false,
    },
    {
        title: "§2 - Stiz des Vereins",
        text: "Der Verein hat seinen Sitz in Ybbs an der Donau und erstreckt seine Tätigkeit auf das Gebiet der Stadtgemeinde Ybbs und Umgebung sowie auf deren Partnerstädte und das gesamte Bundesgebiet.",
        active: false,
    },
    {
        title: "§3 - Zweck des Vereins",
        text:
            "(1) Der Zweck des Vereines ist die Durchführung, Förderung und Unterstützung kultureller, wissenschaftlicher, künstlerischer, bildender und völkerverbindender Aktivitäten im Tätigkeitsgebiet. Hierzu wird eine enge Zusammenarbeit mit den örtlichen Vereinen sowie der Stadtgemeinde angestrebt.<br/>" +
            "(2) Die Tätigkeit des Vereines ist nicht auf Gewinn ausgerichtet.<br/>" +
            "(3) Der Verein verfolgt keine wie immer geartete parteipolitische Zwecke.<br/>",
        active: false,
    },
    {
        title: "§4 - Mittel zur Erreichung des Vereinszweckes",
        text:
            "(1) Der Vereinszweck soll durch die in den Abs. 2 und 3 angeführten Tätigkeiten und finanziellen Mittel erreicht werden.<br/>" +
            "(2) Für die Verwirklichung des Vereinszweckes vorgesehene Tätigkeiten sind<br/>" +
            "a)\tKulturveranstaltungen aller Art, z.B.<br/>" +
            "i.\tKonzerte<br/>" +
            "ii.\tVorträge und Lesungen<br/>" +
            "iii.\tVersammlungen<br/>" +
            "iv.\tAusstellungen<br/>" +
            "v.\tReisen<br/>" +
            "b)\tHerausgabe von Veröffentlichungen.<br/>" +
            "c)\tArbeiten in Zusammenhang mit kulturellen und historischen Dokumenten.<br/>" +
            "(3) Die erforderlichen finanziellen Mittel sollen aufgebracht werden durch:<br/>" +
            "a)\tdie Beiträge der Vereinsmitglieder<br/>" +
            "b)\tErträge aus Veranstaltungen<br/>" +
            "c)\tSubventionen öffentlicher und anderer Institutionen<br/>" +
            "d)\tSpenden und Unterstützungen (Sponsorleistungen).<br/>",
        active: false,
    },
    {
        title: "§5 - Arten der Mitgliedschaft",
        text:
            "(1) Der Verein besteht aus ordentlichen (Voll-, Anschluss- (Lebenspartner), und Schüler/Studentenmitgliedschaft), unterstützenden und Ehrenmitgliedern.<br/>" +
            "(2) Jede natürliche Person kann sowohl ordentliches, unterstützendes als auch Ehrenmitglied werden.<br/>" +
            "(3) Juristische Personen können nur unterstützende Mitglieder werden.<br/>",
        active: false,
    },
    {
        title: "§6 - Erwerb der Mitgliedschaft",
        text:
            "1) Die Aufnahme erfolgt aufgrund einer schriftlichen Beitrittserklärung. Der Vorstand behält sich das Recht vor, in begründeten Fällen die Mitgliedschaft abzulehnen.<br/>" +
            "(2) Personen, die sich um diesen Verein oder das kulturelle Leben in Ybbs außergewöhnliche Verdienste erworben haben, können auf Antrag des Vorstandes durch die Mitgliederversammlung als Ehrenmitglieder in den Verein aufgenommen werden. Diese haben die gleichen Rechte wie unterstützende Mitglieder, sind jedoch von der Bezahlung eines Mitgliedsbeitrages befreit.<br/>",
        active: false,
    },
    {
        title: "§7 - Beendigung der Mitgliedschaft",
        text:
            "<br/>" +
            "(1) Die Mitgliedschaft erlischt durch Tod, bei juristischen Personen durch Verlust der Rechtspersönlichkeit, durch freiwilligen Austritt oder durch Ausschluss.<br/>" +
            "(2) Der Austritt ist dem Vorstand schriftlich mitzuteilen.<br/>" +
            "(3) Der Vorstand kann ein Mitglied ausschließen, wenn dieses trotz zweimaliger schriftlicher Mahnung länger als sechs Monate mit der Zahlung der Mitgliedsbeiträge im Rückstand ist.<br/>" +
            "(4) Der Ausschluss eines Mitglieds aus dem Verein kann vom Vorstand mit einfacher Mehrheit bei einem Schiedsgericht (§ 15) beantragt werden, wenn es insbesondere<br/>" +
            "a) die Pflichten eines Mitgliedes (§ 8) gröblich verletzt oder den Verein bewusst oder grob fahrlässig schädigt,<br/>" +
            "b) das Ansehen des Vereines fortgesetzt in der Öffentlichkeit schädigt,<br/>" +
            "c) Meinungsverschiedenheiten in Vereinsangelegenheiten in schädigender Art öffentlich austrägt oder<br/>" +
            "d) durch sein Verhalten die Arbeit in den Gremien des Vereines ernsthaft behindert.<br/>",
        active: false,
    },
    {
        title: "§8 - Rechte und Pflichten der Vereinsmitglieder",
        text:
            "(1) Alle Mitglieder haben das Recht an den Mitgliederversammlungen teilzunehmen und dort das Wort zu ergreifen.<br/>" +
            "(2) Ordentliche Mitglieder haben überdies das aktive und passive Wahlrecht, sowie das Recht auf schriftliche Antragstellung an den Vereinsvorstand. <br/>" +
            "(3) Ein Mitglied kann jederzeit mit sofortiger Wirkung aus dem Verein austreten, wenn es dies schriftlich und nachweislich erklärt.<br/>" +
            "Betreffend die Zahlungsverpflichtungen gilt Abs. 6.<br/>" +
            "(4) Die Vereinsmitglieder sind zur Einhaltung der Statuten, sowie zur Befolgung der von den ordnungsgemäß gewählten Organen in Vereinsangelegenheiten gefassten Beschlüsse verpflichtet.<br/>" +
            "(5) Jedes Mitglied hat das Recht, Vereinsmitgliedschaften und die Teilnahme an Vereinsveranstaltungen zu bewerben.<br/>" +
            "(6) Der jährliche Mitgliedsbeitrag ist binnen vier Wochen ab Zahlungsaufforderung für das laufende Vereinsjahr zu bezahlen und wird im Falle eines Ausscheidens während eines Jahres auch nicht anteilsmäßig zurückerstattet. Bei Bankeinzugser-mächtigung sind Änderungen der Bankverbindungen dem Verein unverzüglich bekannt zu geben.<br/>" +
            "(7) Bei Eintritt ist der erste Jahresgesamtbeitrag erst im folgenden Jahr fällig.<br/>" +
            "(8) Die Vereinsmitglieder erhalten für ihre allfälligen Vereinstätigkeiten keinerlei Zuwendungen.<br/>",
        active: false,
    },
    {
        title: "§9 - Organe des Vereins",
        text:
            "(1) Die Organe des Vereines sind:<br/>" +
            "1. Die Mitgliederversammlung (§ 10)<br/>" +
            "2. Der Vereinsvorstand (§ 11)<br/>" +
            "3. Das Schiedsgericht (§ 15)<br/>" +
            "4. Die Rechnungsprüfer (§ 14)<br/>" +
            "(2) Die Funktionsdauer der Organe gemäß Z 2 und 4 beträgt drei Jahre.<br/>",
        active: false,
    },
    {
        title: "§10 - Mitgliederversammlung",
        text:
            "(1) Die ordentliche Mitgliederversammlung findet einmal im Kalenderjahr (Vereinsjahr) als „Jahreshauptversammlung“ statt. Eine außerordentliche Mitgliederversammlung findet auf Beschluss des Vorstandes, der ordentlichen Mitgliederversammlung oder schriftlich begründetem Antrag von mindestens einem Zehntel der stimmberechtigten Mitglieder oder schließlich auf Verlangen der Rechnungsprüfer binnen 4 Wochen statt.<br/>" +
            "(2) Sofern nicht ausdrücklich anderen Organen vorbehalten, entscheidet die Mitgliederversammlung alle wichtigen Angelegenheiten des Vereines, insbesondere<br/>" +
            "a)Neu- bzw. Ergänzungswahlen der Organe des Vereins gemäß §9 Z 2 und 4<br/>" +
            "b)Festsetzung des Mitgliedsbeitrages<br/>" +
            "c)Bericht der Kontrolle und eventuelle Entlastung des Vorstandes und der mit den Kassengeschäften betrauten Personen<br/>" +
            "d)alle Angelegenheiten, die vom Vorstand in die Tagesordnung der Mitgliederversammlung aufgenommen wurden<br/>" +
            "e)Änderung der Statuten<br/>" +
            "f)Auflösung des Vereines.<br/>" +
            "(3) Lit. a) bis d) werden mit einfacher Mehrheit entschieden, Lit. e) mit einer Zwei-Drittel-Mehrheit und für eine Auflösung des Vereines (Lit. f)) sind drei Viertel aller abgegebenen Stimmen nötig.<br/>" +
            "(4) Die Einladung zur Mitgliederversammlung ist schriftlich spätestens zwei Wochen vorher an alle Mitglieder des Vereines zu richten. Diese Einladung braucht nicht nachweislich erfolgen, wenn sie entweder in der Gemeindezeitung oder in allfälligen Vereinsnachrichten oder durch Anschlag an der Gemeindeamtstafel oder auf einer allfälligen Vereinsankündigungstafel erfolgt.<br/>" +
            "(5) Die Mitgliederversammlung ist ohne Rücksicht auf die Zahl der Anwesenden beschlussfähig.<br/>",
        active: false,
    },
    {
        title: "§11 - Vereinsvorstand",
        text:
            "(1) Der Vereinsvorstand besteht aus dem Obmann, zwei Obmann-Stellvertretern, dem Kassier, dessen Stellvertreter, dem Schriftführer und dessen Stellvertreter.<br/>" +
            "(2) Der Vorstand entscheidet in allen Angelegenheiten, die durch diese Satzung nicht anderen Vereinsorganen zugewiesen sind, kann jedoch einzelne Entscheidungen der Mitgliederversammlung übertragen.<br/>" +
            "(3) Der Vorstand bestellt, unterstützt, überwacht und koordiniert die einzelnen Arbeits- und Projektgruppen. Dazu haben die Verantwortlichen – bei deren Verhinderung ihre Stellvertreter – an erweiterten Vorstandssitzungen mit beratender Stimme teilzunehmen.<br/>" +
            "(4) Der Vorstand hat eine Einnahmen- und Ausgabenrechnung samt Vermögensrechnung innerhalb der ersten fünf Monate eines Rechnungsjahres für das vorangegangene Rechnungsjahr zu erstellen und den Rechnungsprüfern vorzulegen.<br/>" +
            "(5) Der Vorstand setzt den Termin und die Tagesordnung für die Mitgliederversammlung fest.<br/>" +
            "(6) Der Vorstand kann temporär und Themen/Projekt bezogen Mitglieder kooptieren; sie haben beratende Stimme.<br/>" +
            "(7) Der Vereinsvorstand ist zumindest bei Anwesenheit des Obmanns, oder eines seiner Stellvertreter, und zwei weiteren gewählten Vorstandsmitgliedern beschlussfähig und entscheidet mit einfacher Mehrheit der zur Zeit der Beschlussfassung anwesenden Vorstandsmitglieder. Bei Stimmengleichheit gilt §17 Abs. 7.<br/>" +
            "(8) In dringenden Angelegenheiten kann der Vorstand über einen begründeten An-trag des Obmannes einen schriftlichen Rundlaufbeschluss fassen. Hierzu ist es erforderlich, dass dieser Antrag allen Vorstandsmitgliedern zugegangen ist und von diesen binnen einer Woche eine Reaktion (Zustimmung, Ablehnung, keine Antwort = Stimmenthaltung) einlangt (einfacher Mehrheitsbeschluss). Bei einem Verlangen, den Antrag in einer Sitzung zu beschließen, ist dieser auf die Tagesordnung der nächsten Vorstandsitzung zu setzen und gilt als nicht behandelt/erledigt.<br/>" +
            "Neben der Begründung des Antrages (Dringlichkeit) ist das Ergebnis des schriftlichen Rundlaufes in das Protokoll der folgenden Vorstandssitzung aufzunehmen.<br/>",
        active: false,
    },
    {
        title: "§12 - Obmann",
        text:
            "(1) Der Obmann vertritt den Verein nach außen, führt den Vorsitz in der Mitgliederversammlung und im Vorstand und unterfertigt die Schriftstücke des Vereins. Näheres regelt § 17.<br/>" +
            "(2) Bei Gefahr im Verzug oder wenn dem Verein andernfalls Schaden drohen würde, ist der Obmann berechtigt und verpflichtet, auch in Angelegenheiten, die in den Wirkungsbereich anderer Vereinsorgane fallen, selbständig Anordnungen zu treffen, diese bedürfen jedoch der ehebaldigsten nachträglichen Genehmigung durch das zuständige Vereinsorgan.<br/>" +
            "(3) Der Obmann ist berechtigt, an allen Sitzungen der Arbeits- und Projektgruppen teilzunehmen.<br/>",
        active: false,
    },
    {
        title: "§13 - Die übrigen Vorstandsmitglieder",
        text:
            "(1) Alle Vorstandsmitglieder sind berechtigt, an allen Sitzungen der Arbeits- und Projektgruppen teilzunehmen.<br/>" +
            "(2) Der Kassier ist berechtigt und verpflichtet, alle vom Vorstand beschlossenen Kassengeschäfte zu vollziehen.<br/>" +
            "(3) Der Schriftführer ist verpflichtet die Protokolle der Mitgliederversammlung und der Vorstandssitzung zu verfassen, sowie den gesamten Schriftverkehr des Vereines abzuwickeln.<br/>" +
            "(4) Die Agenden gemäß Abs. 2 und 3 können mit Vorstandsbeschluss auf einen Stellvertreter aufgeteilt werden.<br/>",
        active: false,
    },
    {
        title: "§14 - Rechnungsprüfer",
        text:
            "(1) Die zwei Rechnungsprüfer werden von der Mitgliederversammlung auf die Dauer der Funktionsperiode des Vorstandes gewählt. Ist eine Bestellung noch vor der nächsten Mitgliederversammlung notwendig, so hat der Vorstand diese auszuwählen und zu bestellen. Sie müssen unabhängig und unbefangen sein und dürfen nicht dem Vorstand angehören. <br/>" +
            "(2) Den Rechnungsprüfern obliegt insbesondere die Prüfung der Finanzgebarung des Vereines auf die Ordnungsmäßigkeit der Rechnungslegung und die statutengemäße Verwendung der Mittel für jedes Rechnungsjahr sowie die Erstellung eines Prüfberichtes innerhalb von vier Monaten ab Erstellung der Einnahmen- und Ausgabenrechnung (Rechnungsabschluss) durch den Vorstand und die unverzügliche Übermittlung des Prüfberichtes an den Vorstand.<br/>",
        active: false,
    },
    {
        title: "§15 - Das Schiedsgericht",
        text:
            "(1) Bei allfälligen Streitigkeiten zwischen Vereinsmitgliedern bzw. im Falle des § 7 Abs. 3 und 4 wird auf Verlangen jeweils ein Schiedsgericht bestellt. Dieses besteht aus dem vom Vorstand gewählten Vorsitzenden und höchstens vier weiteren Mitgliedern, die jeweils zu gleichen Teilen von den Streitparteien namhaft gemacht werden. Kann oder will eine Streitpartei keinen einzigen Vertreter namhaft machen, gilt der Streitfall ohne weiteres Verfahren im Sinne (Antrag) der Gegenpartei entschieden. In einem Verfahren gemäß § 7 gilt der Vereinsvorstand als Streitpartei. Entscheidungen erfolgen mit einfacher Mehrheit.<br/>" +
            "(2) Die Mitglieder des Schiedsgerichts, ausgenommen der Vorsitzende, dürfen nicht dem Vereinsvorstand angehören.<br/>",
        active: false,
    },
    {
        title: "§16 - Arbeits- und Projektgruppen",
        text:
            "(1) Zu seiner Entlastung kann der Vereinsvorstand zur Durchführung einzelner Veranstaltungen, Veranstaltungsreihen oder Behandlung einzelner Sachgebiete Arbeits- und Projektgruppen bilden.<br/>" +
            "(2) Im Rahmen der vom Vorstand genehmigten Arbeits- und Projektinhalte entscheiden die Arbeits- und Projektgruppen selbständig.<br/>" +
            "(3) Der Leiter der jeweiligen Arbeits- und Projektgruppe wird vom Vorstand bestimmt.<br/>" +
            "(4) Die Leiter – bei deren Verhinderung ein Stellvertreter – können an erweiterten Vorstandssitzungen mit beratender Stimme teilnehmen.<br/>" +
            "(5) Auch die Beiziehung vereinsfremder Personen zu den Sitzungen der Arbeits- und Projektgruppen ist möglich.<br/>" +
            "(6) Zum Zweck der Planung, Vorschau, Budgetierung und Nachkontrolle der Zielerreichung haben die Arbeits- und Projektgruppen bindend bis 30. September eine schriftliche Planung ihrer Aktivitäten für das Folgejahr dem erweiterten Vorstand zur Beurteilung und nötigen Beschlussfassung durch den Vorstand vorzulegen.<br/>" +
            "Diese schriftliche Planung enthält Art, Umfang und Inhalt der vorgesehenen Aktivitäten/Veranstaltungen/Projekte und einen detaillierten Finanzierungsplan.<br/>" +
            "Die nötige Mittelaufbringung hierzu ist im Sinne des Vereinswohles verpflichtende Aufgabe der jeweiligen Arbeits- und Projektgruppen.<br/>" +
            "Dies gilt gleichermaßen auch für Veranstaltungen des Vereins, welche keiner Arbeits- und Projektgruppe zugeordnet sind.<br/>" +
            "(7) Für die Durchführung der unter Abs. 6 angeführten Nachkontrolle ist bis spätestens zwei Monate nach einer Aktivität, Veranstaltung oder nach dem Projektabschluss eine schriftliche Abrechnung dem Vorstand vorzulegen.<br/>",
        active: false,
    },
    {
        title: "§17 - Verfahren",
        text:
            "Falls in diesen Satzungen im Einzelfall nichts anderes bestimmt wird, gilt grundsätzlich Folgendes:<br/>" +
            "(1) Die Wahl des Obmanns hat in einem gesonderten Wahlgang, auf Verlangen schriftlich und geheim, zu erfolgen. <br/>" +
            "(2) Alle anderen Wahlgänge in allen Vereinsorganen sind getrennt, auf Verlangen schriftlich und geheim, durchzuführen.<br/>" +
            "(3) Über schriftliches Verlangen von einem Drittel aller anwesenden Stimmberechtigten ist über einzelne Personen oder Funktionen gesondert abzustimmen.<br/>" +
            "(4) Wahlvorschläge müssen für ihre Gültigkeit spätestens zwei Wochen vor der Wahl beim Obmann eingelangt sein.<br/>" +
            "(5) Gibt es für eine Funktion verschiedene Wahlvorschläge, so wird über diese nacheinander solange abgestimmt, bis ein Kandidat die Mehrheit erhält und dieser die Wahl auch annimmt. Über die Reihenfolge der Abstimmung entscheidet der Wahlvorsitzende, der vom Vorstand im Vorhinein bestimmt wird, ihm nicht angehört und kein Kandidat sein darf.<br/>" +
            "(6) Ein verhindertes Vorstandsmitglied wird vom jeweiligen Stellvertreter mit allen Rechten und Pflichten vertreten.<br/>" +
            "(7) Bei Stimmengleichheit gilt der Antrag als abgelehnt.<br/>" +
            "(8) Das Protokoll der Mitgliederversammlung wird vom Vorsitzenden, dem Schriftführer und zwei anwesenden Vereinsmitgliedern, die nicht dem Vorstand angehören, unterfertigt.<br/>" +
            "(9) Protokolle von Vorstandssitzungen werden vom Obmann, dem Schriftführer und einem weiteren anwesenden Vorstandsmitglied unterzeichnet.<br/>" +
            "(10) Schriftstücke des Vereins werden vom Obmann und vom Schriftführer unterfertigt. Wenn finanzielle Verpflichtungen eingegangen werden, ist zusätzlich die Unterschrift des Kassiers erforderlich.<br/>" +
            "Beschaffungen bis insgesamt € 400,00 sind davon ausgenommen, wenn im Zuge einer Projektbewilligung dafür im Vorhinein die Zustimmung des Vorstands eingeholt worden ist. Unmittelbar nach Durchführung derartiger Transaktionen ist die Abrechnung dem Kassier vorzulegen.<br/>" +
            "(11) Der Vorstand kann unter Wahrung von § 12 Abs. 1 einzelne Arbeits- und Projektgruppen zum Teil oder im vollen Umfang zur Unterzeichnung ihrer Schriftstücke ermächtigen, solang dadurch keine Verpflichtungen eingegangen werden.<br/>" +
            "Der Obmann hat von wesentlichen, vereinsrelevanten Dokumenten der Arbeits- und Projektgruppen unverzüglich eine elektronische Kopie, auf Verlangen eine Hardcopy, zu erhalten.<br/>" +
            "(12) Der Schriftlichkeit entspricht auch die Verwendung elektronischer Medien. Allgemeine Veröffentlichungen, insbesondere die Einladung zur Mitgliederversammlung, können auch auf der Homepage des Vereines erfolgen.<br/>",
        active: false,
    },
    {
        title: "§18 - Vereinsauflösung",
        text: "Im Falle der Auflösung oder Aufhebung des Vereines oder bei Wegfall des bisherigen begünstigten Vereinszweckes ist das nach Abdeckung der Passiva verbleibende Vereinsvermögen ausschließlich für gemeinnützige, mildtätige oder kirchliche Zwecke im Sinne der §§ 34 ff Bundesabgabenordnung (BAO) zu verwenden.",
        active: false,
    },
    {
        title: "§19 - Genderhinweis",
        text: "Im Sinne einer besseren Lesbarkeit wird in den Satzungen nur die männliche Bezeichnung verwendet, obwohl alle Geschlechter angesprochen werden.",
        active: false,
    },
];

const { data: team } = await useFetch(
    useRuntimeConfig().public.baseURL + "/mitgleider",
);
const { data: projects } = await useFetch(
    useRuntimeConfig().public.baseURL + "/projekte",
);

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.$reset();
breadcrumbStore.addBreadcrumb({ step: 1, text: "Startseite", link: "/" });
breadcrumbStore.addBreadcrumb({
    step: 2,
    text: "Über Uns",
    link: "/information",
});
</script>

<template>
    <main class="root flex flex-center">
        <section class="row-12 flex flex-center header">
            <div class="title" style="margin-top: 5vh">
                <h1>Über uns</h1>
            </div>
        </section>
        <section class="content flex flex-center" style="margin-bottom: 0">
            <div class="area flex flex-center">
                <div class="smallSize">
                    <h2>Der Vorstand</h2>
                    <div class="cards flexWrap flex flex-center">
                        <teamCard
                            v-for="team1 in team"
                            :key="team1.mId"
                            :id="team1.mId"
                        />
                    </div>
                </div>
            </div>
<!--            <div class="area flex flex-center">-->
<!--                <div class="smallSize">-->
<!--                    <h2>Projekte</h2>-->
<!--                    <div class="cards row flex flex-center">-->
<!--                        <card-->
<!--                            v-for="project in projects"-->
<!--                            :key="project.pId"-->
<!--                            :id="project.pId"-->
<!--                            :title="project.titel"-->
<!--                            :teaser="project.beschreibung"-->
<!--                            :date="project.start_datum"-->
<!--                            :endDate="project.end_datum"-->
<!--                            :image="project.bilder_path + '/plakat.jpg'"-->
<!--                            projects-->
<!--                        />-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <div class="area flex flex-center" style="margin-bottom: 0">
                <div class="smallSize">
                    <h2>Statuten</h2>
                    <accordion :contents="content" />
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped lang="scss">
@import "../../assets/style/variable.scss";

.root {
    overflow: hidden;
}

.header {
    margin-top: 10vh;

    h1 {
        font-size: 20vh;

        @media screen and (max-width: $breakpoint-medium-max) {
            font-size: 8vh;
        }
    }
}

.link {
    transform: translateY(250%);
}

.content {
    width: 100vw;
    margin: 10vh 0;
    color: white;

    h4 {
        color: white;
        font-size: 3vh;
        text-align: center;
    }

    p {
        margin-bottom: 2vh;
    }

    .area {
        padding: 5vh 0;
        width: 100%;

        h4 {
            padding-bottom: 2vh;
        }

        .smallSize {
            width: 80%;

            .cards {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-items: center;
                width: $width;
                margin-top: 5vh;

                &.flexWrap {
                    flex: 1 1 calc(#{$width} / 3);
                }
            }
        }
    }
}
</style>
