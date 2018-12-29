<template>
<div>
    <table class="table">
        <thead>
            <tr class="tr">
                <th class="th">Name</th>
                <th class="th">Qty</th>
                <th class="th">Price</th>
                <th class="th">Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(item,index) in items"
                class="tr"
                :key="index">

                <td class="td">
                    <q-field
                        style="width:200px"
                        :error="errors.has('item')"
                        :error-label="errors.first('item')">
                        <q-select
                            inverted-light
                            color="grey"
                            v-validate="'required'"
                            name='item'
                            :value="item.itemId"
                            @change="val =>
                            { 
                            item.itemId = val;
                            itemOpt.forEach(doc=>{
                                if(item.itemId==doc.value){
                                    item.price=doc.price
                                }
                            });
                             item.amount=item.qty*item.price
                            }"
                            :options="itemOpt" />
                    </q-field>
                </td>

                <td class="td">
                    <q-field
                        v-if="item.itemId!=''"
                        :error="errors.has('qty')"
                        :error-label="errors.first('qty')">

                        <q-input
                        @keyup.17="addForm"
                            name='qty'
                            v-validate="{required:true,numeric:true}"
                            inverted-light
                            color="grey"
                            :value="item.qty"
                            @change="val =>
                            { 
                            item.qty = val;
                            item.amount=item.qty*item.price
                            }"
                            type="number" />
                    </q-field>
                    <q-field
                        v-else
                        :error="errors.has('item')"
                        :error-label="errors.first('item')">
                        <q-input
                            disable
                            inverted
                            color="brown" />
                    </q-field>
                </td>

                <td class="td">
                    <q-input inverted-light color="grey" disable="" :value="item.price" @change="val =>
                            { 
                            item.price = val;
                            item.amount=item.qty*item.price
                            }" type="number" />
                </td>
                <!-- {{item.price}} -->
                <td class="td">
                    {{item.amount}} $
                </td>

                <td class="td">
                    <q-btn
                        v-if="items.length>1"
                        color="red"
                        icon="clear"
                        @click="deleteRow(index)" />
                    <!-- add form -->
                    <q-btn
                        v-if="items.length-1==index"
                        color="primary"
                        icon="add"
                        @click="addForm(index)" />
                </td>
            </tr>
        </tbody>
        <tr>
            <th class="th" colspan="3"></th>
            <th class="th">{{getTotal() | getPrice}}</th>
        </tr>
    </table>
    <!-- <q-alert class="float-left">Total {{getTotal() | getPrice}}</q-alert> -->

</div>
</template>

<script>
var moment = require('moment');
moment().format();
var numeral = require('numeral');

import {
    findCustomer
} from '/both/methods/customer_methods'
import {
    findItem
} from '/both/methods/item_methods'
import {
    insertInvoice,
    findOneInvoice,
    updateInvoice,
} from '/both/methods/invoice_methods.js'
export default {
    name: 'Customer',
    props: ['items'],
    data() {
        return {

            icon: 'add',
            iconSubmit: 'add',

            itemOpt: [],

        }
    },
    filters: {
        getPrice(doc) {
            return numeral(doc).format('0,0[.]00 $')
        }
    },
    watch: {
        item() {
            this.itemOpt.forEach(doc => {
                if (doc.value == this.item.name) {
                    this.item.price = doc.price
                }
            });
        }
    },
    mounted() {

        this.getItem()

    },
    methods: {
        deleteRow(index) {
            this.items.splice(index, 1)
        },
        addForm(val) {

            this.items.push({
                itemId: '',
                qty: null,
                price: null,
                amount: 0,
            });
        },

        getTotal() {
            let a = 0
            this.items.forEach(doc => {
                a += doc.amount
            });
            return a
        },
        // btnEditItem(data) {
        //     this.item = data.itemId
        //     this.price = data.price
        //     this.qty = data.qty
        //     this.index = data.__index
        //     this.icon = 'update'
        // },
        // btnRemoveItem(index) {
        //     this.items.splice(index, 1)
        // },

        // clearItem() {
        //     this.item = ''
        //     this.price = null
        //     this.qty = null
        // },
        getCustomer() {

            findCustomer.callPromise().then(result => {
                result.forEach(doc => {
                    this.customerOpt.push({
                        value: doc._id,
                        label: doc.name,
                    })
                });
            })

        },
        getItem() {
            findItem.callPromise().then(result => {

                result.forEach(doc => {
                    this.itemOpt.push({
                        value: doc._id,
                        label: doc.name,
                        price: doc.price
                    })
                });

            })
        },
        Alert(val) {
            this.$q.notify({
                message: val,
                type: 'positive',
                position: 'top'
            })
        },
        addItem() {
            let name = '';
            this.itemOpt.forEach(doc => {
                if (this.item == doc.value) {
                    name = doc.label
                }
            });
            this.items.push({
                itemId: this.item,
                name: name,
                price: this.price,
                qty: this.qty,
                amount: parseFloat(this.price) * parseFloat(this.qty)
            })
            this.clearItem()
        },
        btnAddItem() {
            this.$validator.validateAll().then(result => {
                if (result) {
                    if (this.icon == 'add') {
                        this.addItem()
                    } else {
                        this.btnRemoveItem(this.index)
                        this.addItem()
                        this.icon = 'add'
                    }
                    this.$validator.reset()
                }
            })
        }

    }
}
</script>
