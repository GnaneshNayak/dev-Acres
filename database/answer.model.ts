import { Schema, model, models, Document } from 'mongoose';

export interface IAnswer extends Document {
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  content: string;
  createAt: Date;
}

const answerSchema = new Schema({
  author: { type: Schema.Types.ObjectId, require: true, ref: 'User' },
  question: { type: Schema.Types.ObjectId, require: true, ref: 'Question' },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  content: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
});

const Answer = models.Answer || model('Answer', answerSchema);

export default Answer;
