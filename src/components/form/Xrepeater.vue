<template>
    <div class="form-group">
        <label v-if="data.title">{{ data.title }} <span v-if="data.required" class="error">*</span></label>

        <div class="repeater-fields-group">
            <div class="repeater-single-section" v-for="(value, mindex) in myfields" :key="mindex">
                <component v-for="(myData, key) in value" :key="key+'-'+mindex" v-bind:is="'X'+ myData.type" :name="key+'-'+mindex" :data="myData"></component>
            </div>

            <button type="button" class="btn btn-outline-primary" @click="add">Add</button>
        </div>
        
    </div>
</template>

<script>
import Xtext from './Xtext';
import Xemail from './Xemail';
import Xselect from './Xselect';
import Xhidden from './Xhidden';
import Xtextarea from './Xtextarea';
import Xradio from './Xradio';

export default {
    name: "Xrepeater",
    props: ['data'],
    data: function(){
        return {
            repeater: {},
            fields: []
        }
    },
    created: function(){
        this.fields.push(this.data.repeater_fields);
        this.repeater = this.data.repeater_fields;
    },
    methods: {
        add: function(){
            this.fields.push(this.repeater)
        }
    },
    computed: {
        myfields: function(){
            var temp = [...this.fields];
            
            return temp;
        }
    },
    components: {
        Xtext,
        Xemail,
        Xselect,
        Xhidden,
        Xtextarea,
        Xradio
    }
}
</script>