import { Schema, model } from 'mongoose';
const userSchema = new Schema({
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
}, {
    toJSON: {
        getters: true,
        virtuals: true
    },
    timestamps: true
});
// userSchema.virtual('friendsCount').get(function () {
//     return this.friends?.length;
//   });
const User = model('User', userSchema);
export default User;
