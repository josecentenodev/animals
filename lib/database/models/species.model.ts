import { Document, Schema, model, models } from "mongoose";

export interface ISpecies extends Document {
  _id: string;
  name: string;
}

const SpeciesSchema = new Schema({
  name: { type: String, required: true, unique: true },
})

const Species = models.Species || model('Species', SpeciesSchema);

export default Species;