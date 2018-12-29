<template>
<div>
    <q-btn
        class="float"
        color="info"
        icon="undo"
        @click="$router.back()" />
    <q-layout
        class="shadow-2"
        style="padding:20px;margin-top:10px">
        <q-page-container>
            <table>
                <tr>
                    <td class="td">Date</td>
                    <td>
                        <q-field
                            style="width:390px"
                            :error="errors.first('date')"
                            :error-label="errors.first('date')">
                            <q-datetime
                                inverted-light
                                color="grey"
                                type="date"
                                name='date'
                                v-validate="'required'"
                                v-model="date"></q-datetime>
                        </q-field>
                    </td>
                    <td class="td">Customer</td>
                    <td>
                        <q-field
                            style="width:390px"
                            :error="errors.first('customer')"
                            :error-label="errors.first('customer')">
                            <q-select
                                inverted-light
                                color="grey"
                                :options="customerOpt"
                                name='customer'
                                v-validate="'required'"
                                v-model="customer"></q-select>
                        </q-field>
                    </td>
                </tr>
            </table>

            <!-- Item -->
            <add-item-component :items="items"></add-item-component>
                    <th class="th">
                        <q-btn
                            color="primary"
                            label="Submit"
                            @click="btnSubmit" />
                    </th>
        </q-page-container>
    </q-layout>
</div>
</template>

<script>
import AddItemComponent from '../components/AddItemComponent'

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
    components: {
        AddItemComponent
    },
    data() {
        return {
            items: [{
                itemId: '',
                qty: null,
                price: 0,
                amount: 0,
            }],
            icon: 'add',
            iconSubmit: 'add',
            index: '',
            date: moment(Date()).format('YYYY-MM-DD'),
            invoices: [],
            customer: '',
            customerOpt: [],

        }
    },

    mounted() {

        this.getCustomer()
        this.getInvoice()
    },
    methods: {
        Alert(val, type) {
            this.$q.notify({
                message: val,
                type: type,
                position: 'top'
            })
        },
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
        btnSubmit(val) {
            this.$validator.validateAll().then(resul => {
                if (resul) {
                    // let items = []
                    // this.items.forEach(doc => {
                    //     items.push({
                    //         itemId: doc.itemId,
                    //         price: doc.price,
                    //         qty: doc.qty,
                    //         amount: doc.amount,
                    //     })
                    // });
                    if (this.iconSubmit == 'add') {
                        doc = {
                            date: new Date(this.date),
                            customerId: this.customer,
                            items: this.items,
                        }
                        console.log(doc);
                        insertInvoice.callPromise(doc).then(result => {
                            this.Alert('Added document !', 'positive')
                            this.items = [{
                                itemId: '',
                                qty: null,
                                price: 0,
                                amount: 0,
                            }]
                        }).catch(error => {
                            this.Alert('Failed please check again !', 'negative')
                        })
                    } else {
                        // update
                        doc = {
                            _id: this.$route.params._id,
                            date: new Date(this.date),
                            customerId: this.customer,
                            items: this.items,
                        }
                        console.log('Doc:' + doc);
                        updateInvoice.callPromise(doc).then(result => {
                            this.Alert('Updated invoice', 'positive')
                        }).catch(error => {
                            this.Alert('Failed please check again!', 'negative')
                        })
                        // alert('Edit')
                    }
                }
            })
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

    }
}
</script>
