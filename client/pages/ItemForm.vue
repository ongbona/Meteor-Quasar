<template>
<q-layout>
    <q-page-container>
        <table class="table">
            <thead>
                <tr class="tr">
                    <th class="th">Name</th>
                    <th class="th">Price</th>
                    <th class="th">Cost</th>
                    <th class="th">Memo</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item,index) in items"
                    class="tr"
                    :key="index">
                    <td class="td">
                        <q-field
                            helper="Please input item name"
                            color='primary'
                            :error="errors.has('name')"
                            :error-label="errors.first('name')">
                            <q-input
                                name='name'
                                v-validate="'required'"
                               
                             
                                v-model="item.name" />
                        </q-field>
                    </td>
                    <td class="td">
                        <q-field
                        helper="Please input item price"
                            :error="errors.has('price')"
                            :error-label="errors.first('price')">
                            <q-input
                                name='price'
                                v-validate="{required:true,numeric:true,min_value:1}"
                                type="number"
                               
                                v-model="item.price" />
                        </q-field>
                    </td>
                    <td class="td">
                        <q-field
                        helper="Please input item cust"
                            :error="errors.has('cust')"
                            :error-label="errors.first('cust')">
                            <q-input
                                name='cust'
                                v-validate="{required:true,numeric:true,min_value:0}"
                                type="number"
                             
                                v-model="item.cust" />
                        </q-field>
                    </td>
                    <td class="td">
                        <q-field
                        helper="Please input item memo">
                            <q-input
                              
                                v-model="item.memo" />
                        </q-field>
                    </td>
                    <td class="td">
                        <q-btn
                            v-if="items.length>1"
                            color="red"
                            round
                            size="13px"
                            icon="clear"
                            @click="deleteRow(index)" />
                        <q-btn
                            round
                            size="13px"
                            v-if="items.length-1==index"
                            color="primary"
                            icon="add"
                            @click="addForm(index)" />
                    </td>
                </tr>
            </tbody>
        
        </table>

        <q-btn
            color="primary"
            icon="add"
            @click="btnAddItem">
            {{fromType}}
        </q-btn>
         <q-btn
            class="float-left	"
            color="info"
            icon="undo"
            @click="$router.back()"
           >
        </q-btn>
    </q-page-container>

</q-layout>
</template>

<script>
import {
    findItemById,
    insertItem,
    updateItem,

} from '/both/methods/item_methods.js'
import {
    Meteor
} from 'meteor/meteor'
export default {
    data: function () {
        return {
            fromType: 'Add item',
            indexs: 1,
            items: [{
                name: '',
                cost: null,
                price: null,
                memo: null,
            }],
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
            this.indexs++

            this.items.push({
                name: '',
                qty: null,
                price: null,
                amount: 0,
            });
        },
        Alert(val) {
            this.$q.notify({

                message: val,
                type: 'positive',
                position: 'top'
            })
        },
        AlertDanger(val) {
            this.$q.notify({

                message: val,
                type: 'negative',
                position: 'top'
            })
        },
        getItem() {
            if (this.$route.params._id != 'new') {
                this.fromType = 'Update item'
                findItemById.callPromise({
                    _id: this.$route.params._id
                }).then(result => {
                    this.form = result
                })
            }
        },
        btnAddItem() {
            this.$validator.validateAll().then(result => {
                if (result) {
                    
                    if (this.fromType == 'Add item') {
                        let cout=0
                        this.items.forEach(doc => {
                            cout++
                            data = {
                                name: doc.name,
                                price: parseFloat(doc.price),
                                cust: parseFloat(doc.cust),
                                memo: doc.memo,
                            }
                            insertItem.callPromise(data).then(result => {
                                console.log(data);
                            })
                        });
                        this.getItem()
                        this.Alert('Added '+cout+' items')
                        this.items=[{
                                name: '',
                                cost: null,
                                price: null,
                                memo: null,
                            }],
                            this.$validator.reset()

                    } else {
                        updateItem.callPromise(this.form).then(result => {
                            this.getItem()
                            this.Alert('Updated item !')

                            this.form = {
                                name: '',
                                price: '',
                                cust: null,
                                memo: '',
                            }
                            this.$validator.reset()
                        })
                        this.fromType = 'Add item'
                    }
                }
            })
        },

    }

}
</script>
