import { model, Schema } from 'mongoose'

const task = new Schema({
    task: {
        type:String,
        required:true,
        trim:true
    },
    done:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})


export default model('Task', task)