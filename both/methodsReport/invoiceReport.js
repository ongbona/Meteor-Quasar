import Invoice from '/both/collections/invoice'
import Item from '/both/collections/item'
import SimpleSchema from 'simpl-schema'
import {
    Meteor
} from 'meteor/meteor'

export const findData = new ValidatedMethod({
    name: 'findDatas',
    mixins: [CallPromiseMixin],
    validate: null,
    run() {
        if (Meteor.isServer) {
            let data = Invoice.aggregate(
                [{
                        $unwind: '$items'
                    },
                    {
                        $lookup: {
                            from: 'items',
                            localField: 'items.itemId',
                            foreignField: '_id',
                            as: 'itemDoc'
                        }
                    },
                    {
                        $unwind: '$itemDoc'
                    },
                    {
                        $lookup: {
                            from: 'customers',
                            localField: 'customerId',
                            foreignField: '_id',
                            as: 'customerDoc'
                        }
                    },
                    {
                        $unwind: '$customerDoc'
                    },
                    {
                        $group: {
                            _id: "$customerId",
                            customerId: {
                                $last: '$customerId'
                            },
                            customerName: {
                                $last: '$customerDoc.name'
                            },
                            customerDoc: {
                                $last: '$customerDoc'
                            },
                            items: {
                                $addToSet: {
                                    date: '$date',
                                    itemId: '$items.itemId',
                                    itemName: '$itemDoc.name',
                                    itemDoc: '$itemDoc',
                                    "qty": '$items.qty',
                                    "price": '$items.price',
                                    "amount": '$items.amount'
                                }
                            },
                            total: {
                                $sum: '$items.amount'
                            }
                        }
                    },
                ]
            )

            return data
        }
    }
})
export const findInvoiceListReport = new ValidatedMethod({
    name: 'mfindInvoiceListReport',
    mixins: [CallPromiseMixin],
    validate: null,
    run(selector) {
        if (Meteor.isServer) {
            let data = Invoice.aggregate(
            [
                {
                $match: selector
                },
                 {
                    $unwind: '$items',
                },

                {
                    $lookup: {
                        from: "items",
                        localField: "items.itemId",
                        foreignField: "_id",
                        as: "itemDoc"
                    }
                },
                {
                    $lookup: {
                        from: "customers",
                        localField: "customerId",
                        foreignField: "_id",
                        as: "customerDoc",
                    }
                },
                {
                    $unwind: '$customerDoc',
                },
                {
                    $unwind: '$itemDoc'
                },
                {
                    $group: {
                        _id: "$_id",
                        date: {
                            $last: '$date'
                        },
                        customerName: {
                            $last: '$customerDoc.name',
                        },
                        items: {
                            $addToSet: {
                                itemsId: '$items.itemId',
                                itemName: '$itemDoc.name',
                                qty: '$items.qty',
                                price: '$items.price',
                                amount: '$items.amount'
                            }
                        },
                        total: {
                            $sum: '$items.amount'
                        }


                    }
                },
                {
                    $sort: {
                        customerName: 1
                    }
                }

            ])
            return data
        }
    }
})

export const findInvoice_with_customer = new ValidatedMethod({
    name: 'm_findInvoice_with_customer',
    mixins: [CallPromiseMixin],
    validate: null,
    run() {
        if (Meteor.isServer) {

            let data = Invoice.aggregate([

                {
                    $unwind: '$items',
                },

                {
                    $lookup: {
                        from: "items",
                        localField: "items.itemId",
                        foreignField: "_id",
                        as: "itemDoc"
                    }
                },
                {
                    $lookup: {
                        from: "customers",
                        localField: "customerId",
                        foreignField: "_id",
                        as: "customerDoc",
                    }
                },
                {
                    $unwind: '$customerDoc',
                },
                {
                    $unwind: '$itemDoc'
                },
                {
                    $group: {
                        _id: "$_id",
                        date: {
                            $last: '$date'
                        },
                        customerName: {
                            $last: '$customerDoc.name',
                        },
                        items: {
                            $addToSet: {
                                itemsId: '$items.itemId',
                                itemName: '$itemDoc.name',
                                qty: '$items.qty',
                                price: '$items.price',
                                amount: '$items.amount'
                            }
                        },
                        total: {
                            $sum: '$items.amount'
                        }


                    }
                },
                {
                    $sort: {
                        customerName: 1
                    }
                }

            ])
            return data
        }
    }
})