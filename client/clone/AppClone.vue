<template>
<div>
    <q-layout>
        <div>
            <q-toolbar color="secondary">
                <q-btn
                    flat
                    round
                    dense
                    icon="home"
                    to='/' />
                <q-btn
                    flat
                    label="Item"
                    to='/item' />
                <q-btn-dropdown
                    label="Manage"
                    flat>
                    <!-- dropdown content -->
                    <q-list link>
                        <q-item to='/item'>
                            <q-item-main>
                                <q-item-tile label>Item</q-item-tile>
                            </q-item-main>
                        </q-item>
                        <q-item to='/customer'>
                            <q-item-main>
                                <q-item-tile label>Customer</q-item-tile>
                            </q-item-main>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </q-toolbar>
            <q-page-container >
                <h5>{{$route.meta.title}}</h5>
                <router-view class="container shadow-1"></router-view>
            </q-page-container>
        </div>
        
    </q-layout>
    
</div>
</template>

<script>
import '/node_modules/quasar-extras/material-icons';

if (Meteor.isCordova && cordova.platformId == 'ios') {
    import('/node_modules/quasar-framework/dist/umd/quasar.ios.min.css');
} else {
    import('/node_modules/quasar-framework/dist/umd/quasar.mat.min.css');
}

//swap the comments on these lines if you want to compile for ios
import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QTabs,
    QTab,
    QRouteTab,
    QBtn,
    QIcon,
    QItemMain,
    QItemSide,
    QList,
    QListHeader,
    QLayoutHeader,
    QLayoutFooter,
    QLayoutDrawer,
    QPageContainer,
    QItem,
} from '/node_modules/quasar-framework/dist/quasar.mat.esm.js';
// import {
//     QLayout, QToolbar, QToolbarTitle, QTabs, QTab, QRouteTab, QBtn, QIcon,
//     QItemMain, QItemSide, QList, QListHeader, QLayoutHeader, QLayoutFooter, QLayoutDrawer, QPageContainer, QItem
// } from '/node_modules/quasar-framework/dist/quasar.ios.esm.js';

export default {
    name: 'App',
     components: {
        QLayoutFooter,
        QLayoutHeader,
        QLayoutDrawer,
        QLayout,
        QToolbar,
        QToolbarTitle,
        QTabs,
        QTab,
        QRouteTab,
        QBtn,
        QIcon,
        QItemMain,
        QItemSide,
        QList,
        QListHeader,
        QPageContainer,
        QItem,
    },
}
</script>
