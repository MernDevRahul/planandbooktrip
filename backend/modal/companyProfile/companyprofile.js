const mongoose = require('mongoose');

// Define the company profile schema
const companyProfileSchema = new mongoose.Schema({
  logo_image: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  email_id: {
    type: String,
    required: true,
  },
  company_description:{
type: String,
required: true,
  },
  social_media_links: {
    youtube: {
      type: String,
      default: '',
    },
    instagram: {
      type: String,
      default: '',
    },
    linkedin: {
      type: String,
      default: '',
    },
    facebook: {
      type: String,
      default: '',
    },
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postal_code: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  footer_sub_images: [
    {
      type: String,
    },
  ],
}, { timestamps: true });

// Create a model from the schema
const CompanyProfile = mongoose.model('CompanyProfile', companyProfileSchema);

module.exports = CompanyProfile;
