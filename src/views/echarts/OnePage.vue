<template>
<One :themeName="themeName"></One>
</template>

<script>
import One from "@/components/One";
export default {
    components: {
        One,
    },
    props: ["themeName"],
};
</script>

<style>
</style>
