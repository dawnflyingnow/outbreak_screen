<template>
<Three :themeName="themeName"></Three>
</template>

<script>
import Three from "@/components/Three";
export default {
    components: {
        Three,
    },

    props: ["themeName"],
};
</script>

<style>
</style>
