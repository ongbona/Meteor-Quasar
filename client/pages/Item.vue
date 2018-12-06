<template>
<q-layout>
    <q-btn style="margin-bottom: 10px" color="primary" icon="add" :to="{name:'itemForm',params:{_id:'new'}}" />
    
    <q-page-container>
        <!-- <router-view></router-view> -->
        <q-table
            title="Item"
            :data="item"
            :columns="col">
            <q-tr
                slot='body'
                slot-scope="data"
                :props="data">
                <q-td>
                    {{data.row.name}}
                </q-td>
                <q-td>
                    {{data.row.price}}
                </q-td>
                <q-td>
                    {{data.row.cust}}
                </q-td>
                <q-td>
                    {{data.row.memo}}
                </q-td>
                <q-td>
                    <q-btn
                        round
                        dense
                        color="info"
                        icon="edit"
                        label="Edit"
                        @click="btnEdit(data.row._id)" />
                </q-td>
                <q-td>
                    <q-btn
                        round
                        dense
                        color="red"
                        icon="delete"
                        label="Remove"
                        @click="btnRemove(data.row._id)" />
                </q-td>
            </q-tr>
        </q-table>
    </q-page-container>
</q-layout>
</template>

<script>
import {
    findItem,
    removeItem,
} from '/both/methods/item_methods.js'
import {
    Meteor
} from 'meteor/meteor'
export default {
    data: function () {
        return {
           
            item: [],
            col: [{
                    field: 'name',
                    label: 'Name',

                    align: 'left'
                },
                {
                    label: 'Price',
                    field: 'price',
                    align: 'left'
                },
                {
                    label: 'Cust',
                    field: 'cust',
                    align: 'left'
                },

            ]
        }
    },
   
    mounted() {
        this.getItem()
    },
    methods: {
        AlertDanger(val) {
            this.$q.notify({

                message: val,
                type: 'negative',
                position: 'top'
            })
        },
        getItem() {
            findItem.callPromise().then(result => {
                this.item = result
            })
        },

        btnRemove(id) {
            removeItem.callPromise({
                _id: id
            }).then(result => {
                this.getItem()
                this.AlertDanger('Deleted item !')
            }).then(err => {
                console.log(err);
            })
        },
        btnEdit(_id) {
           this.$router.push({
                name: 'itemForm',
                params: {
                    _id: _id
                }
            })
        }
    }

}
</script>
