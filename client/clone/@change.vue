<template>
<div>
    <h5>Wellcome to the Dynamic form</h5>

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
                    <q-input
                        v-model="item.name"
                        type="text" />
                </td>

                <td class="td">
                    <q-input
                       :value="item.qty"
                        @change="val =>
                            { 
                            item.qty = val;
                            item.amount=item.qty*item.price
                            }"
                        type="text" />
                </td>

                <td class="td">
                    <q-input
                        :value="item.price"
                        @change="val =>
                            { 
                            item.price = val;
                            item.amount=item.qty*item.price
                            }"
                        type="text" />
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
    </table>
    <q-btn
        color="green"
        label="Submit"
        @click="btnSubmit" />

</div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            indexs: 1,
            items: [{
                name: '',
                qty: null,
                price: null,
                amount: 0,
            }],
            data: [],
        }
    },

    watch: {

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
        btnSubmit() {
      
            console.log(this.items);
        }
    }
}
</script>
