import mongoose from "mongoose";

export interface IRestaurant {
  user: mongoose.Schema.Types.ObjectId;
  restaurant: string;
  city: string;
  deliveryTime: number;
  cuisines: string[];
  imageUrl: string;
  menus: mongoose.Schema.Types.ObjectId[];
}
export interface IRestaurantDocument extends IRestaurant, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema = new mongoose.Schema<IRestaurantDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    cuisines: {
      type: [String],
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    menus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
