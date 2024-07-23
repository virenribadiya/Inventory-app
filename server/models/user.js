import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const salt_rounds = 12;

const addressSchema = new mongoose.Schema({
    address_line_1: {
        type: String,
        required: [true, "address line one is required"],
        minlength: [3, "address line one must be at least 3 characters long"],
        maxlength: [100, "address line one must be at most 100 characters long"],
        match: [/^[a-zA-Z0-9\s\-]+$/, "allowing spaces, hyphens, and alphanumeric characters"]
    },
    city: {
        type: String,
        required: [true, "city is required"],
        minlength: [3, "city must be at least 3 characters long"],
        maxlength: [30, "city must be at most 30 characters long"],
    },
    state: {
        type: String,
        required: [true, "state is required"],
        minlength: [3, "state must be at least 3 characters long"],
        maxlength: [30, "state must be at most 30 characters long"],
    },
    country: {
        type: String,
        required: [true, "country is required"],
        minlength: [3, "country must be at least 3 characters long"],
        maxlength: [30, "country must be at most 30 characters long"],
    },
    pinCode: {
        type: Number,
        required: [true, "pincode is required"],
        validate: {
            validator: function (value) {
                return /^\d{6}$/.test(value);
            },
            message: "Invalid pincode. It must be a 6-digit number.",
        }
    },
    phoneNo: { type: String, required: [true, "phone No is required"], }
});

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, },
        password: { type: String, required: true },
        picture: { type: String, default: "" },
        address: [{ type: addressSchema, }],
        role: { type: String, default: "User", },
        isGoogleOAuth: { type: Boolean, default: false },
        isDelete: { type: Boolean, default: false }
    }, { timestamps: true });


// UserSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     try {
//       const salt = await bcrypt.genSalt(salt_rounds);
//       this.password = await bcrypt.hash(this.password, salt);
//       next();
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     next();
//   }
// });

// UserSchema.pre("findOneAndUpdate", async function (next) {
//   let update = this.getUpdate()
//   if ('password' in update) {
//     try {
//       const salt = await bcrypt.genSalt(salt_rounds);
//       update.password = await bcrypt.hash(update.password, salt);
//       next();
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     next();
//   }
// });


export const User = mongoose.model("user", UserSchema);

