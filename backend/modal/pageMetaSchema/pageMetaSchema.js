const mongoose = require('mongoose');

const PageMetaSchema = new mongoose.Schema({
  page: { type: String, required: true },
  pageSlug:{ type: String, required: true },
  title: { type: String, required: true },
  metaKeywords: { type: [String], default: [] },
  description: { type: String, required: true },
  canonicalUrl: { type: String },
  robots: { type: String, default: "index, follow" },
  language: { type: String, default: "en-US" },
  geoRegion: { type: String, default: "" },

  ogTitle: { type: String },
  ogType: { type: String, default: "website" },
  ogDescription: { type: String },
  ogImageUrl: { type: String },
  ogSiteName: { type: String },

  twitterCard: { type: String },
  twitterSite: { type: String },
  twitterCreator: { type: String },
  twitterTitle: { type: String },
  twitterDescription: { type: String },
  twitterImageUrl: { type: String },

  schemaMarkup: { type: String },

  hreflang: { type: String, default: "en-us" },
  mobileFriendly: { type: String, default: "yes" },
  xmlSitemap: { type: String },
  copyright: { type: String },
  contentAuthor: { type: String },

  breadcrumbSchema: { type: Boolean, default: false },
  ampUrl: { type: String },

  securityTxt: { type: String },
  cspHeader: { type: String },

  googleSiteVerification: { type: String },

  enableHTTP3: { type: Boolean, default: false },
  enableBrotli: { type: Boolean, default: false },

  createdBy: { type: String, required: true },
  updatedBy: { type: String },

}, { timestamps: true });

module.exports = mongoose.model('PageMeta', PageMetaSchema);
