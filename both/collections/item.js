import SimpleSchema from "simpl-schema";
import { Mongo } from "meteor/mongo";

const Item = new Mongo.Collection("items");
let schema = {};

schema.items = new SimpleSchema({
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
  }
});
Item.attachSchema(schema.items);
export default Item;
