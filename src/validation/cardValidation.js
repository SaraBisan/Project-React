import Joi from "joi";

const titleSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
});

const subTitleSchema = Joi.object({
  subTitle: Joi.string().min(2).max(256).required(),
});

const phoneSchema = Joi.object({
  phone: Joi.string().pattern(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().required(),
});


const webSchema = Joi.object({
  web: Joi.string().uri().required(),
});

const imageUrlSchema = Joi.object({
  url: Joi.string().uri().required(),
});
const descScheme = Joi.object({
  description: Joi.string().required(),
});
const altScheme = Joi.object({
  alt: Joi.string().required(),
});
const stateScheme = Joi.object({
  state: Joi.string().required(),
});
const countryScheme = Joi.object({
  country: Joi.string().required(),
});
const streetScheme = Joi.object({
  street: Joi.string().required(),
});
const houseNumberScheme = Joi.object({
  houseNumber: Joi.number().required(),
});
const zipScheme = Joi.object({
  zip: Joi.number().required(),
});
const cityScheme = Joi.object({
  city: Joi.string().required(),
});
const validateTitleSchema = (title) => titleSchema.validate(title);
const validateSubTitleSchema = (subTitle) => subTitleSchema.validate(subTitle);
const validatePhoneSchema = (phone) => phoneSchema.validate(phone);
const validateEmailSchema = (email) => emailSchema.validate(email);
const validateWebSchema = (web) => webSchema.validate(web);
const validateImageUrlSchema = (imageUrl) => imageUrlSchema.validate(imageUrl);

const validateDesc = (desc) => descScheme.validate(desc)
const validateAlt = (desc) => altScheme.validate(desc)
const validateState = (desc) => stateScheme.validate(desc)
const validateCountry = (desc) => countryScheme.validate(desc)
const validateStreet = (desc) => streetScheme.validate(desc)
const validateHouseNumber = (desc) => houseNumberScheme.validate(desc)
const validateZip = (desc) => zipScheme.validate(desc)
const validateCity = (desc) => cityScheme.validate(desc)

const validateSchema = {
  title: validateTitleSchema,
  subTitle: validateSubTitleSchema,
  phone: validatePhoneSchema,
  email: validateEmailSchema,
  web: validateWebSchema,
  url: validateImageUrlSchema,
  description: validateDesc,
  alt: validateAlt,
  state: validateState,
  country: validateCountry,
  city: validateCity,
  street: validateStreet,
  houseNumber: validateHouseNumber,
  zip: validateZip
};

export default validateSchema