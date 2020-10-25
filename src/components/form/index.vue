<template>
    <div>
        <div class="message" v-if="notification">
            <div v-if="notification.status == 'success'" class="alert alert-success" role="alert">
                <p v-for="(msg, index) in notification.messages" :key="index">{{msg}}</p>
            </div>
            <div v-else class="alert alert-danger" role="alert">
                <p v-for="(msg, index) in notification.messages" :key="index">{{msg}}</p>
            </div>
        </div>

       
        <div v-if="fields != null">
        <h1>Form</h1>
        <ValidationObserver v-slot="{ handleSubmit, reset }">
            <form @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="reset">
                <h1 v-for="(field, name) in fields" :key="field.id">
                    <component v-bind:is="'X'+field.type" :name="name" :data="field"></component>
                </h1>
                <button type="submit">Submit</button>
            </form>
        </ValidationObserver>
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
import Xrepeater from './Xrepeater';
import { CONFIG } from '../../config'

export default {
    name: "Form",
    data(){
        return {
            fields: null,
            notification: false
        }
    },
    created(){
        var url = this.$route.params.id ? CONFIG.API_URL + '/get_form.php?id=' + this.$route.params.id : CONFIG.API_URL + '/get_form.php';
        fetch(url).then(res => res.json())
            .then(res => {
                this.fields = res.data.fields[0];
                var self = this;
                this.notification = res;

                setTimeout(function() {
                    self.notification = false
                }, 1000)
            })
    },
    methods: {
        onSubmit: function(){
            fetch(CONFIG.API_URL + '/submit_form.php', {
                method: 'POST',
                body: {
                    'submitted': true
                }
            }).then(res => res.json())
            .then(res => {
                var self = this;
                this.notification = res;

                setTimeout(function() {
                    self.notification = false
                }, 1000)
            });
        }
    },
    components: {
        Xtext,
        Xemail,
        Xselect,
        Xhidden,
        Xtextarea,
        Xradio,
        Xrepeater
    }
}
</script>

<style scoped>
    .error{
        color: red;
    }
</style>