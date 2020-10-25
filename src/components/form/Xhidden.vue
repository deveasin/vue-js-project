<template>
    <div class="form-group">
        <label v-if="data.title">{{ data.title }}</label>
        <input type="hidden" class="form-control" v-model="data.value" v-bind="data.html_attr ? data.html_attr : ''" v-bind:readonly="data.readonly">
    </div>
</template>

<script>
export default {
    name: "Xhidden",
    props: ['data']
}
</script>