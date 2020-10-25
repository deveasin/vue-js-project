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
        <h1>List</h1>
        <table class="table">
            <thead>
                <tr>
                    <th v-show="!header.hidden" @click="doSort(index, header.sortable)" scope="col" v-for="(header, index) in headers" :key="index">{{ header.title }}
                        <span class="shorting">
                            <i class="sort-by-desc" v-if="header.desc == true"></i>
                            <i class="sort-by-asc" v-if="header.desc == false"></i>
                        </span>
                        <input v-if="header.searchable" @click.stop="" @input="doSearch(index, $event)" class="form-control" :placeholder="`Filter by ${header.title}`" />
                    </th>
                </tr>
            </thead>
            <tbody v-if="list.rows">
                <draggable v-model="list.rows" handle=".handle" group="oka" ghost-class="ghost" @end="onEnd">
                    <transition-group type="transition" name="flip-list">
                        <tr class="handle" v-for="(rowEl, rowIndex) in list.rows" :key="rowIndex">
                            <td v-show="!header.hidden" v-for="(header, key, index) in headers" :key="index"><router-link target="_blank" v-if="key == 'id'" :to="'/form/'+ rowEl[key]">{{rowEl[key]}}</router-link><template v-else>{{rowEl[key]}}</template></td>
                        </tr>
                    </transition-group>
                </draggable>
            </tbody>
        </table>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import { CONFIG } from '../../config'
export default {
    name: "List",
    data(){
        return {
            main_list_copy: {},
            list: {},
            search: {},
            notification: false
        }
    },
    created(){
        fetch(CONFIG.API_URL + '/list.php').then(res => res.json())
        .then(res => {
            this.list = res.data
            this.main_list_copy = {...res.data}

            var self = this;
            this.notification = res;

            setTimeout(function() {
                self.notification = false
            }, 1000)
        })
    },
    methods: {
        onEnd: function(el) {
            fetch(CONFIG.API_URL + '/reorder.php', {
                method: 'POST',
                body: JSON.stringify({
                    'current_item': {
                        'newIndex': el.newIndex,
                        'oldIndex': el.oldIndex
                    }
                })
            }).then(res => res.json())
            .then(res => {
                var self = this;
                this.notification = res;

                setTimeout(function() {
                    self.notification = false
                }, 1000)
            });
        },
        doSort: function (key, sortable) {
            if(!sortable){ return false; }
            var updateHeader = {...this.list},
                order = !updateHeader.headers[0][key].desc;

            updateHeader.headers[0][key].desc = order;
            this.list = updateHeader;

            if(order){
                this.list.rows = this.list.rows.sort((a, b) => {
                    if(!b[key] || !a[key]){ return false; }
                    return b[key] > a[key] ? 1 : -1
                });
            } else {
                 this.list.rows = this.list.rows.sort((a, b) => {
                    if(!b[key] || !a[key]){ return false; }
                    return b[key] < a[key] ? 1 : -1
                });
            }
            
        },
        doSearch: function(index, e) {
             this.search[index] = e.target.value;

             if(!e.target.value){
                 delete this.search[index]
             }
           
            var rows =  [];
            var rows_id = [];
            var temp =  [...this.main_list_copy.rows];
            var search = this.search;

            for(let i = 0; i<temp.length; i++){
                var item = temp[i];

                Object.keys(search).forEach(function(key) {
                    if(search[key].toLowerCase() != '' &&  String(item[key]).toLowerCase().indexOf(search[key].toLowerCase()) != -1){
                      
                      if(rows_id.indexOf(item.id) == -1){
                        rows.push(item);
                        rows_id.push(item.id) 
                      }
                    
                       
                    }
                });


            }

            if(!this.search[index]){
                rows = this.main_list_copy.rows;
            }
            
            this.list.rows = rows
        }
    },
    computed: {
        headers: function(){
            if(this.list.headers && this.list.headers[0]){
                return this.list.headers[0];
            } else {
                 return [];
            }
           
        }
    },
     components: {
        draggable,
    },
}
</script>