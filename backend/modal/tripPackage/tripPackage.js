// models/package.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Ladakh Bike Expedition package
const packageSchema = new Schema({
  title: { type: String, required: true },
  titleSlug: { type: String, required: true },
  pickupLocation: { type: String, default: "" },
  dropLocation: { type: String, default: "" },
  numberOfDays: { type: String,  },
  numberOfNights: { type: String,  },
  overview: { type: String, required: true },
  packagePrice: { type: String,  },
  packagePromotional: { type: String,  },
  isVisaFree: { type: Boolean, required: true },
  country: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
  tripTagName: { type: String, required: true },
  startingDate: { type: String, },
  isPickupAndDropAvailable: { type: Boolean, required: true },
  packageImage: { type: Object},
  packageSubImages: [{ type: String,required:true},],
  activityData: [
    {
      activityDay: { type: String,  },
      activityTitle: { type: String,  },
      activityDescription: [{ type: String,}]
    }
  ],
  createdAt: { type: Date, default: Date.now } // Add createdAt field
});

// Export the schema as a model
const package = mongoose.model('package', packageSchema);

module.exports = package;
