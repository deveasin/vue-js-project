<template>
    <div class="form-group radio-field">
        <label v-if="data.title">{{ data.title }} <span v-if="data.required" class="error">*</span></label>

        <div class="form-check" v-for="(option, index) in data.options" :key="index">
            <input :required="data.required" :checked="data.default == option.key ? true : false" :name="name" class="form-check-input" type="radio" value="" :id="'defaultCheck1' + index">
            <label class="form-check-label" :for="'defaultCheck1' + index">
                {{option.label}}
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: "Xradio",
    props: ['data', 'name']
}
</script>