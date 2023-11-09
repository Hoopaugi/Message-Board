import { Schema, model } from 'mongoose'

import { Board as IBoard } from "./boards.interfaces"

const boardSchema = new Schema<IBoard>({
  name: { type: String, required: true },
  threads: [{ type: Schema.Types.ObjectId, ref: 'Thread' }]
})

const Board = model<IBoard>('Board', boardSchema)

export default Board
