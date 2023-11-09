import { Schema, model } from 'mongoose'

import { Thread as IThread } from "./threads.interfaces"

const threadSchema = new Schema<IThread>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  board: { type: Schema.Types.ObjectId, ref: 'Board' },
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

const Thread = model<IThread>('Thread', threadSchema)

export default Thread
