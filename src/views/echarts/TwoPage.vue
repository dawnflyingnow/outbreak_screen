<template>
<Two :themeName="themeName"></Two>
</template>

<script>
import Two from "@/components/Two";
export default {
    components: {
        Two,
    },

    props: ["themeName"],
};
</script>

<style>
</style>
