import { Document, Schema, model, models } from "mongoose";

export interface IAnimal extends Document {
  _id: string;
  name: string;
  species: {_id: string, name: string};
  imageUrl: string;
  description: string;
}

const AnimalSchema = new Schema({
  name: { type: String, required: true },
  species: { type: Schema.Types.ObjectId, ref: 'Species', required: true }, // Reference to the Species model
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
});

const Animal = models.Animal || model('Animal', AnimalSchema);

export default Animal;
