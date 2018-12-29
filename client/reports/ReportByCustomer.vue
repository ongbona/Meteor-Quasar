<template>
<div>
    <q-layout>

        <table class="table shadow-6 border hover">
            <thead>
                <tr class="tr" >
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
                <template v-for="(doc,i) in reports">
                    <template v-for="(item,itemIndex) in doc.items">
                        <tr class="tr"
                            v-if="itemIndex==0"
                            :key="item.itemId">
                            <td class="td">{{doc.date | getDate}}</td>
                            <td class="td">
                              <router-link :to="{name:'invoiceForm',params:{_id:doc._id, name:'reportByCustomer'}}">{{i}}</router-link>
                            </td>
                            <td class="td">{{doc.customerName}}</td>
                            <td class="td">{{item.itemName}}</td>
                            <td class="td">{{item.qty}}</td>
                            <td class="td">{{item.price | getMoney}}</td>
                            <td class="td">{{item.amount | getMoney}}</td>
                        </tr>
                        <tr  class="tr"
                            v-else
                            :key="item.itemId">
                            <td class="td" colspan="3"></td>
                            <td class="td">{{item.itemName}}</td>
                            <td class="td">{{item.qty}}</td>
                            <td class="td">{{item.price | getMoney}}</td>
                            <td class="td">{{item.amount | getMoney}}</td>
                        </tr>
                    </template>
                    <tr  class="tr"  :key="doc._id">
                        <td class="td" colspan="6"></td>
                        <td class="td">{{doc.total | getMoney}}</td>
                    </tr>
                </template>

            </tbody>
        </table>

    </q-layout>
</div>
</template>

<script>
var numeral = require('numeral');
import moment from 'moment'
import {
    findInvoice_with_customer,
} from '/both/methodsReport/invoiceReport.js'
export default {
    name: 'Report_By_Customer',
    data() {
        return {
            reports: [],

        }
    },
    filters: {
        getDate(val) {
            return moment(val).format('DD-MM-YYYY')
        },
        getMoney(val) {
            return numeral(val).format('0,0[.]00 $')
        },
    },
    mounted() {
        this.getReport()
    },
    methods: {
        getReport() {
            findInvoice_with_customer.callPromise().then(result => {
                this.reports = result
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style>

/*!
 * Bootstrap v4.1.3 (https://getbootstrap.com/)
 * Copyright 2011-2018 The Bootstrap Authors
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
/* 
:root {
  --blue: #007bff;
  --indigo: #6610f2;
  --purple: #6f42c1;
  --pink: #e83e8c;
  --red: #dc3545;
  --orange: #fd7e14;
  --yellow: #ffc107;
  --green: #28a745;
  --teal: #20c997;
  --cyan: #17a2b8;
  --white: #fff;
  --gray: #6c757d;
  --gray-dark: #343a40;
  --primary: #007bff;
  --secondary: #6c757d;
  --success: #28a745;
  --info: #17a2b8;
  --warning: #ffc107;
  --danger: #dc3545;
  --light: #f8f9fa;
  --dark: #343a40;
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --font-family-sans-serif: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  --font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
} 

*,





table {
  border-collapse: collapse;
}

caption {
  padding-top: .75rem;
  padding-bottom: .75rem;
  color: #6c757d;
  text-align: left;
  caption-side: bottom;
}

th {
  text-align: inherit;
}

label {
  display: inline-block;
  margin-bottom: .5rem;
}


.table {
  width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
}

.table td,
.table th {
  padding: .75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.table tbody+tbody {
  border-top: 2px solid #dee2e6;
}

.table .table {
  background-color: #fff;
}

.table-sm td,
.table-sm th {
  padding: .3rem;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-bordered td,
.table-bordered th {
  border: 1px solid #dee2e6;
}

.table-bordered thead td,
.table-bordered thead th {
  border-bottom-width: 2px;
}

.table-borderless tbody+tbody,
.table-borderless td,
.table-borderless th,
.table-borderless thead th {
  border: 0;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0,0,0,.05);
}

.table-hover tbody tr:hover {
  background-color: rgba(0,0,0,.075);
}

.table-primary,
.table-primary > td,
.table-primary > th {
  background-color: #b8daff;
}

.table-hover .table-primary:hover {
  background-color: #9fcdff;
}

.table-hover .table-primary:hover > td,
.table-hover .table-primary:hover > th {
  background-color: #9fcdff;
}

.table-secondary,
.table-secondary > td,
.table-secondary > th {
  background-color: #d6d8db;
}

.table-hover .table-secondary:hover {
  background-color: #c8cbcf;
}

.table-hover .table-secondary:hover > td,
.table-hover .table-secondary:hover > th {
  background-color: #c8cbcf;
}

.table-success,
.table-success > td,
.table-success > th {
  background-color: #c3e6cb;
}

.table-hover .table-success:hover {
  background-color: #b1dfbb;
}

.table-hover .table-success:hover > td,
.table-hover .table-success:hover > th {
  background-color: #b1dfbb;
}

.table-info,
.table-info > td,
.table-info > th {
  background-color: #bee5eb;
}

.table-hover .table-info:hover {
  background-color: #abdde5;
}

.table-hover .table-info:hover > td,
.table-hover .table-info:hover > th {
  background-color: #abdde5;
}

.table-warning,
.table-warning > td,
.table-warning > th {
  background-color: #ffeeba;
}

.table-hover .table-warning:hover {
  background-color: #ffe8a1;
}

.table-hover .table-warning:hover > td,
.table-hover .table-warning:hover > th {
  background-color: #ffe8a1;
}

.table-danger,
.table-danger > td,
.table-danger > th {
  background-color: #f5c6cb;
}

.table-hover .table-danger:hover {
  background-color: #f1b0b7;
}

.table-hover .table-danger:hover > td,
.table-hover .table-danger:hover > th {
  background-color: #f1b0b7;
}

.table-light,
.table-light > td,
.table-light > th {
  background-color: #fdfdfe;
}

.table-hover .table-light:hover {
  background-color: #ececf6;
}

.table-hover .table-light:hover > td,
.table-hover .table-light:hover > th {
  background-color: #ececf6;
}

.table-dark,
.table-dark > td,
.table-dark > th {
  background-color: #c6c8ca;
}

.table-hover .table-dark:hover {
  background-color: #b9bbbe;
}

.table-hover .table-dark:hover > td,
.table-hover .table-dark:hover > th {
  background-color: #b9bbbe;
}

.table-active,
.table-active > td,
.table-active > th {
  background-color: rgba(0,0,0,.075);
}

.table-hover .table-active:hover {
  background-color: rgba(0,0,0,.075);
}

.table-hover .table-active:hover > td,
.table-hover .table-active:hover > th {
  background-color: rgba(0,0,0,.075);
}

.table .thead-dark th {
  color: #fff;
  background-color: #212529;
  border-color: #32383e;
}

.table .thead-light th {
  color: #495057;
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.table-dark {
  color: #fff;
  background-color: #212529;
}

.table-dark td,
.table-dark th,
.table-dark thead th {
  border-color: #32383e;
}

.table-dark.table-bordered {
  border: 0;
}

.table-dark.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(255,255,255,.05);
}

.table-dark.table-hover tbody tr:hover {
  background-color: rgba(255,255,255,.075);
}
@media (max-width:575.98px) {
  .table-responsive-sm {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }

  .table-responsive-sm > .table-bordered {
    border: 0;
  }
}
@media (max-width:767.98px) {
  .table-responsive-md {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }

  .table-responsive-md > .table-bordered {
    border: 0;
  }
}
@media (max-width:991.98px) {
  .table-responsive-lg {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }

  .table-responsive-lg > .table-bordered {
    border: 0;
  }
}
@media (max-width:1199.98px) {
  .table-responsive-xl {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }

  .table-responsive-xl > .table-bordered {
    border: 0;
  }
}

.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

.table-responsive > .table-bordered {
  border: 0;
}



.d-table {
  display: table!important;
}

.d-table-row {
  display: table-row!important;
}

.d-table-cell {
  display: table-cell!important;
}

  .d-sm-table {
    display: table!important;
  }

  .d-sm-table-row {
    display: table-row!important;
  }

  .d-sm-table-cell {
    display: table-cell!important;
  }



  .d-md-table {
    display: table!important;
  }

  .d-md-table-row {
    display: table-row!important;
  }

  .d-md-table-cell {
    display: table-cell!important;
  }



  .d-lg-table {
    display: table!important;
  }

  .d-lg-table-row {
    display: table-row!important;
  }

  .d-lg-table-cell {
    display: table-cell!important;
  }



  .d-xl-table {
    display: table!important;
  }

  .d-xl-table-row {
    display: table-row!important;
  }

  .d-xl-table-cell {
    display: table-cell!important;
  }


  .d-print-table {
    display: table!important;
  }

  .d-print-table-row {
    display: table-row!important;
  }

  .d-print-table-cell {
    display: table-cell!important;
  }


  thead {
    display: table-header-group;
  }

  img,
  tr {
    page-break-inside: avoid;
  }

  h2,
  h3,
  p {
    orphans: 3;
    widows: 3;
  }

  h2,
  h3 {
    page-break-after: avoid;
  }
  @page {
    size: a3;
  }

  body {
    min-width: 992px!important;
  }

  .container {
    min-width: 992px!important;
  }

  .navbar {
    display: none;
  }

  .badge {
    border: 1px solid #000;
  }

  .table {
    border-collapse: collapse!important;
  }

  .table td,
  .table th {
    background-color: #fff!important;
  }

  .table-bordered td,
  .table-bordered th {
    border: 1px solid #dee2e6!important;
  }

  .table-dark {
    color: inherit;
  }

  .table-dark tbody+tbody,
  .table-dark td,
  .table-dark th,
  .table-dark thead th {
    border-color: #dee2e6;
  }

  .table .thead-dark th {
    color: inherit;
    border-color: #dee2e6;
  } */

/*# sourceMappingURL=bootstrap.min.css.map */

</style>


