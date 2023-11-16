import mongoose from "mongoose";

const Schema = mongoose.Schema;


const flavorSchema = new Schema ({
  name: { type: String },
  image: { type: String },
  description: { type: String },
  apto: {
    vegano: {type: Boolean},
    celiaco: {type: Boolean}
  }
});

export default mongoose.model("Flavor", flavorSchema, "Flavors");