import { Document, Schema, model, models } from "mongoose";
import { ISpecies } from "./species.model"; // Import the ISpecies interface from species.model

export interface IAnimal extends Document {
  _id: string;
  name: string;
  species: {_id: string, name: string}; // Reference to the Species model
}

const AnimalSchema = new Schema({
  name: { type: String, required: true },
  species: { type: Schema.Types.ObjectId, ref: 'Species', required: true } // Reference to the Species model
});

const Animal = models.Animal || model<IAnimal>('Animal', AnimalSchema);

export default Animal;
