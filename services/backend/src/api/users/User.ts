import { Schema, model } from 'mongoose'

import { User as IUser } from "./users.interfaces"

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: false },
  passwordHash: { type: String, required: true },
  threads: [{ type: Schema.Types.ObjectId, ref: 'Thread' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret.passwordHash
      delete ret._id
      delete ret.__v
    }
  }
})

const User = model<IUser>('User', userSchema)

export default User
