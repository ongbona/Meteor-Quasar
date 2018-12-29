<template>
<div>
   
    <q-field
        count
        label="Item"
        :error="errors.has('item')"
        :error-label="errors.first('item')"
        :label-width="2">
        <q-select
            v-validate="'required'"
            name='item'
            inverted-light
            color='purple-2'
            v-model="item"
            :options="itemOpt" />
    </q-field>
    <q-field
        count
        label="Price"
        :error="errors.has('price')"
        :error-label="errors.first('price')"
        :label-width="2">
        <q-input
            v-validate="'required|numeric'"
            disable
            name='price'
            v-model="price"
            inverted-light
            color="purple-2"></q-input>
    </q-field>
    <q-field
        count
        label="Quantity"
        :error="errors.has('quantity')"
        :error-label="errors.first('quantity')"
        :label-width="2">
        <q-input
            v-validate="'required|numeric'"
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
    <q-alert class="float-right">Total {{getTotal() | getPrice}}</q-alert>

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
            index: '',
            icon: 'add',
            iconSubmit: 'add',
            price: null,
            qty: null,
            item: '',
            // items: [],
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

        this.getItem()

    },
    methods: {

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
