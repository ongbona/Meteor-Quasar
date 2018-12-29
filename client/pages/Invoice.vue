<template>
<q-layout>
    <q-btn
        style="margin-bottom: 10px"
        color="primary"
        icon="add"
        :to="{name:'invoiceForm',params:{_id:'new',name:'invoice'}}" />

    <q-page-container>
        <!-- <router-view></router-view> -->
        <q-table
            title="Invoice"
            :data="item"
            :columns="col">
            <q-tr
                slot='body'
                slot-scope="data"
                :props="data">
                <q-td>
                    {{data.row.customerDoc.name}}
                </q-td>
                <q-td>
                    {{data.row.date | getDate}}
                </q-td>
                <q-td>
                    {{data.row.items | getTotal}}
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
var numeral = require('numeral');
import moment, {
    invalid
} from 'moment'
import {
    removeInvoice,
    findInvoice
} from '/both/methods/invoice_methods.js'
import _ from 'lodash'
export default {
    name: "invoice",
    data() {
        return {

            item: [],
            col: [{
                    field: 'name',
                    label: 'Name',
                    align: 'left'
                },
                {
                    label: 'Date',
                    field: 'date',
                    align: 'left'
                },
                {
                    label: 'Total',
                    field: 'items',
                    align: 'left'
                },

            ]
        }
    },
    filters: {
        getDate(val) {
            return moment(val).format('DD-MM-YYYY')
        },
        getTotal(val){
            let total=null
            val.forEach(doc => {
                total+=doc.amount
            });
            return numeral(total).format('$ 0,0[.]00')
        }
    },
    mounted() {
        this.getInvoice()
    },
    methods: {
        btnRemove(id){
            removeInvoice.callPromise({_id:id}).then(result=>{
                this.getInvoice()
            })
        },
        btnEdit(id) {
            this.$router.push({
                name: 'invoiceForm',
                params: {
                    _id: id,
                    name:'invoice'
                }
            })
        },
        getInvoice() {
            findInvoice.callPromise().then(result => {
                this.item = result
            }).catch(error => {
                console.log(error);
            })

        }

    }
};
</script>
