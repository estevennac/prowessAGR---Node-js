import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//Esquema para crear la tabla USUARIOS en la base de datos
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, //only one email
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    image: {
      public_id: { type: String },
      secure_url: { type: String },
    },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true, //para fechas
    versionKey: false, //para version
  }
);

UserSchema.methods.encrypPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);
export default User;
