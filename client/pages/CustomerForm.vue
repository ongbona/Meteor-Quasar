<template>
<div>
    <q-layout>
        <q-field
            :error="errors.first('name')"
            :error-label="errors.first('name')"
            count
            label="Name"
            :label-width="2">
            <q-input
                name='name'
                v-validate="'required'"
                v-model="form.name"
                inverted-light
                color="purple-2"></q-input>
        </q-field>
        <q-field
            :error="errors.first('gender')"
            :error-label="errors.first('gender')"
            count
            label="Gender"
            :label-width="2">
            <q-select
                name='gender'
                v-validate="'required|alpha'"
                inverted-light
                color='purple-2'
                v-model="form.gender"
                :options="genderOst" />
        </q-field>
        <q-field
            :error="errors.first('age')"
            :error-label="errors.first('age')"
            count
            label="Age"
            :label-width="2">
            <q-input
                name='age'
                v-validate="'required|numeric'"
                type="number"
                v-model="form.age"
                inverted-light
                color="purple-2"></q-input>
        </q-field>
        <q-field
            :error="errors.first('address')"
            :error-label="errors.first('address')"
            count
            label="Address"
            :label-width="2">
            <q-input
                name='address'
                v-validate="'required'"
                v-model="form.address"
                inverted-light
                color="purple-2"></q-input>
        </q-field>
        <q-field
            :error="errors.first('phone')"
            :error-label="errors.first('phone')"
            count
            label="Phone"
            :label-width="2">
            <q-input
                name='phone'
                v-validate="'required|numeric'"
                v-model="form.phone"
                inverted-light
                color="purple-2"></q-input>
        </q-field>
        <q-btn
            color="primary"
            :icon="icon"
            @click="btnSubmit">{{formType}}</q-btn>
        <q-btn
            class="float-right"
            color="info"
            icon="undo"
            to='/customer'
            />
     
    </q-layout>
</div>
</template>

<script>
import {
    insertCustomer,
    updateCustomer,
    findCustomerById,
} from '/both/methods/customer_methods'
export default {
    name: 'Customer',
    data() {
        return {
            icon: 'person_add',
            formType: '',
            form: {
                name: '',
                age: null,
                gender: '',
                address: '',
                phone: '',
            },
            genderOst: [{
                    label: 'Male',
                    value: 'Male'
                },
                {
                    label: 'Female',
                    value: 'Female'
                }
            ],

        }
    },
    mounted() {
        this.getCustomer()
    },
    methods: {

        getCustomer() {
           if(this.$route.params._id!='new'){
               this.icon='update'
                findCustomerById.callPromise({
                _id: this.$route.params._id
            }).then(result => {
                this.form = result
            }).then(err=>{
                console.log(err);
            })
           }
         
        },
        Alert(val) {
            this.$q.notify({
                message: val,
                type: 'positive',
                position: 'top'
            })
        },

        btnSubmit() {
            this.$validator.validateAll().then(result => {
                if (result) {
                    if (this.icon == 'person_add') {
                        insertCustomer.callPromise(this.form).then(result => {
                            this.Alert('Added customer')
                            this.getCustomer()
                            this.$validator.reset()
                            this.form = {
                                name: '',
                                age: '',
                                gender: '',
                                address: '',
                                phone: '',
                            }
                        })
                    }
                    else{
                        updateCustomer.callPromise(this.form).then(result=>{
                            this.Alert('Updated customer !')
                            this.getCustomer()
                            this.$validator.reset()
                        })  
                    }
                }
            })
        }
    }
}
</script>
