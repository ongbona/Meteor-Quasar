import Customer from '../collections/customer.js';
import SimpleSchema from 'simpl-schema';
import{Meteor} from 'meteor/meteor'
export const insertCustomer=new ValidatedMethod({
    name:'m_insertCustomer',
    mixins:[CallPromiseMixin],
    validate:new SimpleSchema({
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
    }).validator(),
    run(doc){
        console.log(doc);
        return Customer.insert(doc)
    }
})
export const updateCustomer=new ValidatedMethod({
    name:'m_updateCustomer',
    mixins:[CallPromiseMixin],
    validate:new SimpleSchema({
        _id:String,
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
    }).validator(),
    run(doc){
        console.log(doc);
        return Customer.update({_id:doc._id},{$set:doc})
    }
})
export const findCustomer = new ValidatedMethod({
    name: 'm_findCustomer',
    mixins: [CallPromiseMixin],
    validate: null,
    run() {
      return Customer.find().fetch();
    }
  });
export const findCustomerById = new ValidatedMethod({
    name: 'm_findCustomerById',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        _id:String,
    }).validator(),
    run(_id) {
        console.log(_id);
      return Customer.findOne(_id)
    }
  });

  export const removeCustomer = new ValidatedMethod({
    name: 'm_removeCustomer',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
      _id: String,
    }).validator(),
    run(_id) {
      return Customer.remove(_id)
    }
  });