<template>
    <q-layout view="hHr LpR lFf">
                <q-page-container>
        <q-field
            :label-width="2"
            label="Name"
            color='primary'
            :error="errors.first('name')"
            :error-label="errors.first('name')"
            :count="10">
            <q-input
                name='name'
                v-validate="'required'"
                inverted-light
                color="purple-2"
                v-model="form.name" />
        </q-field>
        <q-field
            :error="errors.first('price')"
            :error-label="errors.first('price')"
            :label-width="2"
            count
            label="Price">
            <q-input
                name='price'
                v-validate="{required:true,numeric:true,min_value:1}"
                type="number"
                inverted-light
                color="purple-2"
                v-model="form.price" />
        </q-field>
        <q-field
            :error="errors.first('cust')"
            :error-label="errors.first('cust')"
            :label-width="2"
            label="Cust"
            :count="10">
            <q-input
                name='cust'
                v-validate="{required:true,numeric:true,min_value:0}"
                type="number"
                inverted-light
                color="purple-2"
                v-model="form.cust" />
        </q-field>
        <q-field
            :label-width="2"
            label="Memo"
            :count="10">
            <q-input
                inverted-light
                color="purple-2"
                v-model="form.memo" />
        </q-field>

        <q-btn
            color="primary"
            icon="add"
            @click="btnAddItem">
            {{fromType}}
        </q-btn>
        <q-btn
            class="float-right	"
            color="info"
            icon="undo"
            to='/item'>
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
            form: {
                name: '',
                price: '',
                cust: null,
                memo: '',
            },
        }
    },
    mounted() {
        this.getItem()
    },
    methods: {
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
            if(this.$route.params._id!='new'){
                this.fromType='Update item'
                findItemById.callPromise({_id:this.$route.params._id}).then(result => {
                this.form = result
            })
            }
        },
        btnAddItem() {
            this.$validator.validateAll().then(result => {
                if (result) {
                    if (this.fromType == 'Add item') {
                        let doc = {
                            name: this.form.name,
                            price: parseFloat(this.form.price),
                            cust: parseFloat(this.form.cust),
                            memo: this.form.memo,
                        }
                        insertItem.callPromise(doc).then(result => {

                            this.getItem()
                            this.Alert('Added item')
                            this.form = {
                                name: '',
                                price: '',
                                cust: null,
                                memo: '',
                            }
                            this.$validator.reset()
                        })
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
