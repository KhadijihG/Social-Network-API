import { Schema, Types, model, type Document } from 'mongoose';



interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[],
    friends: Schema.Types.ObjectId[]
}



const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    },
    ],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ]
},
    {
        toJSON: {
            getters: true,
            virtuals:true
        },
        timestamps: true
    }
);
// userSchema.virtual('friendsCount').get(function () {
//     return this.friends?.length;
//   });
const User = model('User', userSchema);

export default User;
