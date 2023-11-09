import { Schema, model } from 'mongoose'

import { Thread as IThread } from "./threads.interfaces"

const threadSchema = new Schema<IThread>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  board: { type: Schema.Types.ObjectId, ref: 'Board' },
})

const Thread = model<IThread>('Thread', threadSchema)

export default Thread
