import { Schema, model } from 'mongoose'

import { Board as IBoard } from "./boards.interfaces"

const boardSchema = new Schema<IBoard>({
  name: { type: String, required: true },
  threads: [{ type: Schema.Types.ObjectId, ref: 'Thread' }]
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

const Board = model<IBoard>('Board', boardSchema)

export default Board
