import SimpleSchema from "simpl-schema";
import { Mongo } from "meteor/mongo";

const Customer = new Mongo.Collection("customers");
let schema = {};

schema.customers = new SimpleSchema({
    name:{
        min:1,
        max:20,
        type:String
    },
    age:{
        min:18,
        max:45,
        type:Number,
    },
    gender:{
        type:String,
    },
    address:{
        type:String,
        min:3,
    },
    phone:{
        type:String,
    }
});
Customer.attachSchema(schema.customers);
export default Customer;
