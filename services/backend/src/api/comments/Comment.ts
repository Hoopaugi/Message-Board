import { Schema, model } from 'mongoose'

import { Comment as IComment } from "./comments.interfaces"

const commentSchema = new Schema<IComment>({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  thread: { type: Schema.Types.ObjectId, ref: 'Thread' }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    }
  }
})

const Comment = model<IComment>('Comment', commentSchema)

export default Comment
