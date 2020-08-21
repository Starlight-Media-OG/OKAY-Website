<template>
    <div class="commmentBox">
        <h2>Kommentare</h2>

        <div class="comments">
            <comment v-for="kom in komId" :key="kom" :id="kom" />
        </div>

        <div class="addComment">
            <div class="box">
                <div class="textInput">
                    Einen Kommnetar hinzufügen
                </div>
                <div class="addButton">
                    +
                    <div class="active">

                    </div>
                </div>
                <div class="sendButton">
                    &check;
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import "commentBox";
</style>

<script>
    import comment from "~/components/commentBox/comment/comment.vue";

    export default {
        name: "comment",
        props: {
            eId: String,
            komId: []
        },
        components: {
            comment
        }
    }
</script>