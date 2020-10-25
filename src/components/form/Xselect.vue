<template>
    <ValidationProvider :name="data.title" :rules="rules" v-slot="{ errors }">
        <div class="form-group">
            <label v-if="data.title">{{ data.title }} <span v-if="data.required" class="error">*</span></label>
            <select :name="name" class="form-control" v-if="data.options" v-model="data.value" v-bind="data.html_attr ? data.html_attr : ''">
                <option v-for="option in data.options" :key="option.key" :value="option.key">{{ option.label }}</option>
            </select>
            <div class="invalid-feedback">
                {{ errors[0] }}
            </div>
        </div>
    </ValidationProvider>
</template>

<script>
export default {
    name: "Xselect",
    props: ['data', 'name'],
    computed: {
        rules: function(){
            var myRules = this.data.validate ? this.data.validate : '';

            if(this.data.validate && this.data.validate.indexOf('integer') != -1){
                myRules = myRules.replace("integer", "integers")
            }

            return (this.data.required ? 'required|' : '') + myRules
        }
    },
    created(){
        if(this.data.default){
            this.data.value = this.data.default
        }
    }
}
</script>