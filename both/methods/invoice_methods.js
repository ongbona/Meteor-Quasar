import Invoice from '../collections/invoice.js';
import Item from '../collections/item'
import SimpleSchema from 'simpl-schema'
import _ from 'lodash'
import {
    Meteor
} from 'meteor/meteor'

export const findInvoice = new ValidatedMethod({
    name: 'mfindInvoice',
    mixins: [CallPromiseMixin],
    validate: null,
 run() {
        if (Meteor.isServer) {

            //this for native 
            // let data = await Invoice.rawCollection().aggregate(
            //     [{
            //         $lookup: {
            //             from: 'customers',
            //             localField: 'customerId',
            //             foreignField: '_id',
            //             as: 'customerDoc',
            //         }
            //     }]
            // ).toArray()

            let data = Invoice.aggregate(
                [
                    {
                    $lookup: {
                        from: 'customers',
                        localField: 'customerId',
                        foreignField: '_id',
                        as: 'customerDoc',
                    }
                },
                {
                    $unwind: '$customerDoc'
                }
            ]
            )
            return data
            // Invoice.find().fetch()
        }
    }
})

export const findOneInvoice = new ValidatedMethod({
    name: 'mfindInvoiceOne',
    mixins: [CallPromiseMixin],
    validate: null,
    run(_id) {
        if (Meteor.isServer) {
            let data = Invoice.findOne(_id)
            _.forEach(data.items, o => {
                let item = Item.findOne({
                    _id: o.itemId
                })
                o.name = item && item.name
            })
            console.log(data);
            return data
        }

    }
})
export const updateInvoice = new ValidatedMethod({
    name: 'mupdateInvoice',
    mixins: [CallPromiseMixin],
    validate: null,
    run(doc) {
        console.log(doc);
        return Invoice.update({
            _id: doc._id
        }, {
            $set: doc
        })
    }
})
export const removeInvoice = new ValidatedMethod({
    name: 'm_removeInvoice',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        _id: String
    }).validator(),
    run(id) {
        return Invoice.remove(id)
    }
})
export const insertInvoice = new ValidatedMethod({
    name: 'minsertInvoice',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        customerId: {
            type: String,
        },
        date: {
            type: Date,
        },
        items: {
            type: Array,
        },
        'items.$': {
            type: Object,
        },
        'items.$.itemId': {
            type: String,
        },
        'items.$.qty': {
            type: Number,
        },
        'items.$.price': {
            type: Number,
        },
        'items.$.amount': {
            type: Number,
        },
    }).validator(),
    run(doc) {
        return Invoice.insert(doc)
    }
})