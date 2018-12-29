<template>
<div>
    <q-layout>
        <q-field
            :error="errors.first('date')"
            :error-label="errors.first('date')"
            count
            label="Date"
            :label-width="2">
            <q-input
                type="date"
                name='date'
                v-validate="'required'"
                v-model="date"
                inverted-light
                color="purple-2"></q-input>
        </q-field>
        <q-field
            :error="errors.first('customer')"
            :error-label="errors.first('customer')"
            count
            label="Customer"
            :label-width="2">
            <q-select
                :options="customerOpt"
                name='customer'
                v-validate="'required'"
                inverted-light
                color='purple-2'
                v-model="customer"></q-select>
        </q-field>
        <hr>
        <!-- Item -->

        <q-field
            count
            label="Item"
            :label-width="2">
            <q-select
                name='item'
                inverted-light
                color='purple-2'
                v-model="item"
                :options="itemOpt" />
        </q-field>
        <q-field
            count
            label="Price"
            :label-width="2">
            <q-input
                disable
                name='price'
                v-model="price"
                inverted-light
                color="purple-2"
                ></q-input>
        </q-field>
        <q-field
            count
            label="Quantity"
            :label-width="2">
            <q-input
                type="number"
                name='quantity'
                v-model="qty"
                inverted-light
                color="purple-2"></q-input>
        </q-field>

        <!-- btn Add item -->
        <q-btn
            color="primary"
            :icon="icon"
            @click="btnAddItem" />

        <q-btn
            class="float"
            color="info"
            icon="undo"
            :to="{name:$route.params.name}" />
        <q-table
            :data="items"
            :columns="field">
            <q-tr
                slot="body"
                slot-scope="data"
                :props="data">
                <q-th>{{data.row.name}}</q-th>
                <q-th>{{data.row.price | getPrice}}</q-th>
                <q-th>{{data.row.qty}}</q-th>
                <q-th>{{data.row.amount | getPrice}}</q-th>
                <q-th>
                    <q-btn
                        color="info"
                        icon="edit"
                        @click="btnEditItem(data.row)" />
                    <q-btn
                        color="red"
                        icon="delete"
                        @click="btnRemoveItem(data.row.__index)" />
                </q-th>
            </q-tr>
        </q-table>
        <q-alert class="float-left">Total {{getTotal() | getPrice}}</q-alert>
        <q-btn
            color="green"
            :icon="iconSubmit"
            class="float-right"
            @click="btnSubmit" />
    </q-layout>
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
    data() {
        return {
            index: '',
            date: moment(Date()).format('YYYY-MM-DD'),
            icon: 'add',
            iconSubmit: 'add',
            price: null,
            qty: null,
            formType: '',
            item: '',
            items: [],
            invoices: [],
            customer: '',
            customerOpt: [],
            itemOpt: [],
            field: [{
                    label: 'Item',
                    align: 'left',
                    field: 'name',
                },
                {
                    label: 'Price',
                    align: 'left',
                    field: 'price',
                },
                {
                    label: 'Qty',
                    align: 'left',
                    field: 'qty',
                },
                {
                    label: 'Amount',
                    align: 'left',
                    field: 'amount',
                },
            ]

        }
    },
    filters: {
     
        getPrice(doc) {
            return numeral(doc).format('$ 0,0[.]00')
        }
    },
    watch: {
        item() {
            this.itemOpt.forEach(doc => {
                if (doc.value == this.item) {
                    this.price = doc.price
                }
            });
        }
    },
    mounted() {
        this.getCustomer()
        this.getItem()
        this.getInvoice()
    },
    methods: {
        getInvoice() {
            if (this.$route.params._id != 'new') {
                this.iconSubmit = 'update'
                findOneInvoice.callPromise(this.$route.params._id).then(result => {
                    this.invoices = result
                    this.date = moment(result.date).format('YYYY-MM-DD')
                    this.items = result.items
                    this.customer = result.customerId
                })

            }

        },
        btnSubmit() {
            this.$validator.validateAll().then(resul => {
                if (resul) {
                    let items = []
                    this.items.forEach(doc => {
                        items.push({
                            itemId: doc.itemId,
                            price: doc.price,
                            qty: doc.qty,
                            amount: doc.amount,
                        })
                    });
                    if (this.iconSubmit == 'add') {
                        doc = {
                            date: new Date(this.date),
                            customerId: this.customer,
                            items: items,
                        }
                  
                        insertInvoice.callPromise(doc).then(result => {
                            this.Alert('Added document !')
                        })
                    } else {
                        // update
                        doc = {
                            _id:this.$route.params._id,
                            date: new Date(this.date),
                            customerId: this.customer,
                            items: items,
                        }
                        updateInvoice.callPromise(doc).then(result=>{
                            this.Alert('Updated invoice')
                        })
                        // alert('Edit')
                    }
                }
            })
        },
        getTotal() {
            let a = 0
            this.items.forEach(doc => {
                a += doc.amount
            });
            return a
        },
        btnEditItem(data) {
            this.item = data.itemId
            this.price = data.price
            this.qty = data.qty
            this.index = data.__index
            this.icon = 'update'
        },
        btnRemoveItem(index) {
            this.items.splice(index, 1)
        },

        clearItem() {
            this.item = ''
            this.price = null
            this.qty = null
        },
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
                console.log(result);
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
            if (this.item != "" && this.price != null && this.qty != null) {
                if (this.icon == 'add') {
                    this.addItem()
                } else {
                    this.btnRemoveItem(this.index)
                    this.addItem()
                    this.icon = 'add'
                }
            } else {
                this.Alert('You have to fill the the form')
            }
        }

    }
}
</script>
