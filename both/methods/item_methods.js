import {
  Meteor
} from 'meteor/meteor';
import Item from '../collections/item';
import SimpleSchema from "simpl-schema";

export const insertItem = new ValidatedMethod({
  name: 'minsertItem',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    name: {
      type: String,
      max: 100
    },
    price: {
      type: Number,
      min: 1
    },
    cust: {
      type: Number,
      min: 1
    },
    memo: {
      type: String,
      max: 200,
      optional: true
    },

  }).validator(),
  run(doc) {
    return Item.insert(doc)
  }
});
export const findItem = new ValidatedMethod({
  name: 'mfindItem',
  mixins: [CallPromiseMixin],
  validate: null,
  run() {
    return Item.find().fetch();
  }
});
export const removeItem = new ValidatedMethod({
  name: 'mremoveItem',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String,
  }).validator(),
  run(_id) {
    return Item.remove(_id)
  }
});
export const updateItem = new ValidatedMethod({
  name: 'mupdateItem',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: {
      type: String
    },
    name: {
      type: String,
      max: 100
    },
    price: {
      type: Number,
      min: 1
    },
    cust: {
      type: Number,
      min: 1
    },
    memo: {
      type: String,
      max: 200,
      optional: true
    },

  }).validator(),
  run(doc) {
    return Item.update({
      _id: doc._id
    }, {
      $set: doc
    })
  }
})
export const findItemById = new ValidatedMethod({
  name: 'mfindItemById',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String
  }).validator(),
  run(_id) {
    return Item.findOne(_id)
  }
})