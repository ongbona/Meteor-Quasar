<template>
<div>
    <q-layout>
        <q-btn style="margin-bottom: 10px" color="primary" icon="person_add" :to="{name:'customerForm',params:{_id:'new'}}" />
        <q-table
            title="Customer"
            :data="customers"
            :columns="col">
            <q-tr
                slot="body"
                slot-scope="data"
                :props="data">
                <q-th>
                    {{data.row.name}}
                </q-th>
                <q-th>
                    {{data.row.gender}}
                </q-th>
                <q-th>
                    {{data.row.age}}
                </q-th>
                <q-th>
                    {{data.row.address}}
                </q-th>
                <q-th>
                    {{data.row.phone}}
                </q-th>
                <q-th>
                    <q-btn
                        color="red"
                        icon="delete"
                        flat
                        round
                        @click="btnRemove(data.row._id)" />
                </q-th>
                <q-th>
                    <q-btn
                        color="info"
                        icon="edit"
                        flat
                        round
                        @click="btnEdit(data.row._id)" />
                </q-th>
            </q-tr>
        </q-table>
    </q-layout>
</div>
</template>

<script>
import {
    insertCustomer,
    findCustomer,
    removeCustomer,
} from '/both/methods/customer_methods'
export default {
    name: 'Customer',
    data() {
        return {
       
            customers: [],
            col: [{
                    align: 'left',
                    label: 'Name',
                    field: 'name',
                },
                {
                    align: 'left',
                    label: 'Age',
                    field: 'age',
                },
                {
                    align: 'left',
                    label: 'Gender',
                    field: 'gender',
                },
                {
                    align: 'left',
                    label: 'Address',
                    field: 'address',
                },
                {
                    align: 'left',
                    label: 'Phone',
                    field: 'phone',
                }
            ]
        }
    },
    mounted() {
        this.getCustomer()
    },
    methods: {
        btnEdit(_id){
            this.$router.push({
                name:'customerForm',
                params:{
                    _id:_id
                }
            })
        },
       btnRemove(id) {
            removeCustomer.callPromise({
                _id: id
            }).then(result => {
                this.getCustomer()
                this.AlertDanger('Deleted item !')
            }).then(err => {
                console.log(err);
            })
        },
        getCustomer() {
            findCustomer.callPromise().then(result => {
                this.customers = result
            })
        },
      
        AlertDanger(val) {
            this.$q.notify({
                message: val,
                type: 'negative',
                position: 'top'
            })
        },
    }
}
</script>
