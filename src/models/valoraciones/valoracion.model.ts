import { Schema, model, Types } from 'mongoose';

const RatingSchema = new Schema({
  calendar: {
    type: Schema.Types.ObjectId,
    ref: 'Calendar',
    required: true
  },
  score: {
    type: Number,
    required: true,
    enum: [0, 1], // Sistema binario (0 = negativo, 1 = positivo)
    validate: {
      validator: Number.isInteger,
      message: 'La puntuación debe ser un valor entero'
    }
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export interface IRating{
   _id?: Types.ObjectId;
  calendar: Types.ObjectId;
  score: 0 | 1;
  timestamp: Date;
}

const Rating = model<IRating>('Rating', RatingSchema);
export default Rating;