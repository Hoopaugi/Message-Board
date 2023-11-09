import { Schema, model } from 'mongoose'

import { Comment as IComment } from "./comments.interfaces"

const commentSchema = new Schema<IComment>({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  thread: { type: Schema.Types.ObjectId, ref: 'Thread' }
})

const Comment = model<IComment>('Comment', commentSchema)

export default Comment
