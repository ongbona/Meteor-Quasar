<template>
<div>
    <q-layout>

        <div class="shadow-2 container row">
            <q-field
            class="col-6"
                :label-width="1"
                label="From date">
                <q-datetime
                    style="width:400px"
                    inverted-light
                    color='purple-2'
                    v-model="timeStart"
                    type="date" />
            </q-field>
            <q-field
            class="col-6"
                :label-width="1"
                label="To date">
                <q-datetime
                 style="width:400px"
                    inverted-light
                    color='purple-2'
                    v-model="timeStop"
                    type="date" />
            </q-field>
            <br>
        </div>
            <div>
                <q-btn
                style="margin-top:10px;margin-bottom:10px"
                class="float-right btn"
                color="primary"
                icon="send"
                label="Submit"
                @click="btnSubmit" />
            </div>
        <table  class="table shadow-6 border hover" v-show="invoices.length>0">
            <thead>
                <tr  class="tr">
                    <th class="th">Date</th>
                    <th class="th">No</th>
                    <th class="th">Customer</th>
                    <th class="th">Item</th>
                    <th class="th">Qty</th>
                    <th class="th">Price</th>
                    <th class="th">Amount</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(doc,i) in invoices">
                    <template v-for="(item,itemIndex) in doc.items">
                        <tr class="tr"
                            v-if="itemIndex==0"
                            :key="item.itemId">
                            <td class="td">{{doc.date | formatDate}}</td>
                            <td class="td">
                              <router-link :to="{name:'invoiceForm',params:{_id:doc._id, name:'reportByDate'}}">{{i}}</router-link>
                            </td>
                            <td class="td">{{doc.customerName}}</td>
                            <td class="td">{{item.itemName}}</td>
                            <td class="td">{{item.qty}}</td>
                            <td class="td">{{item.price | formatTotal}}</td>
                            <td class="td">{{item.amount | formatTotal}}</td>
                        </tr>
                        <tr class="tr"
                            v-else
                            :key="item.itemId">
                            <td class="td" colspan="3"></td>
                            <td class="td">{{item.itemName}}</td>
                            <td class="td">{{item.qty}}</td>
                            <td class="td">{{item.price | formatTotal}}</td>
                            <td class="td">{{item.amount | formatTotal}}</td>
                        </tr>
                    </template>
                    <tr  class="tr" :key="doc._id">
                        <td class="td" colspan="6"></td>
                        <td class="td">{{doc.total | formatTotal}}</td>
                    </tr>
                </template>

            </tbody>
        </table>
        <h1 v-show="visible">No data</h1>
    </q-layout>
</div>
</template>

<script>
import {
    findInvoiceListReport,
} from '/both/methodsReport/invoiceReport.js'
import moment from "moment";
var numeral = require('numeral');
export default {
    name: "invoiceLise",
    data() {
        return {
            visible:false,
            timeStart: moment('2018-10-01').format('YYYY-MM-DD'),
            timeStop: moment(Date()).format('YYYY-MM-DD'),
            invoices: [],
            items: [],
        };

    },
    filters: {
        formatDate(val) {
            return moment(val).format("DD-MM-YYYY")
        },
        formatTotal(val) {
            return numeral(val).format('$0,0.[000]')
        },
        
    },
    methods: {

        btnSubmit() {
            let selector = {
                date: {
                    $gte: moment(this.timeStart).startOf('day').toDate(),
                    $lte: moment(this.timeStop).endOf('day').toDate(),
                },
                // date: {
                //     $gte: moment('2018-10-1').endOf('day').toDate(),
                //     $lte: moment('2018-10-12').endOf('day').toDate(),

                // }
            }

            findInvoiceListReport.callPromise(selector).then(result => {
                // this.invoices=result

                this.invoices = result
                if (this.invoices.length == 0) {
                    this.Alert('No data','negative')
                    this.visible=true
                } else {
                    this.Alert('Success','positive')
                }
            }).catch(err => {
                console.log(err);
            })
        },
        Alert(val,type) {
            this.$q.notify({
                type: type,
                position: 'top',
                message: val,
            })
        }

    }
};
</script>
