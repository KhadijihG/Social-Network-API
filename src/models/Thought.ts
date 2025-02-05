import { Schema, Types, model, type Document } from 'mongoose';

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions:[typeof reactionSchema]
}
interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody:string,
    username: string,
    createdAt: Date,
}
const reactionSchema = new Schema<IReaction>(
    {
        reactionId:{
            type:Schema.Types.ObjectId,
            default:()=>new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            minlength:1,
            maxlength:280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
    }
)
const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength:1,
            maxlength:280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
       reactions:[reactionSchema]
        
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    },
);

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
