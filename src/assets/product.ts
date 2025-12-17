type Product = {
  /* UUID of the product */
  rowid: string;
  /* Barcode of the product */
  code: string;
  /* URL of the product on openfoodfacts.org */
  url: string;
  /* Creator of the product entry in the openfoodfacts database */
  creator: string;
  /* Date and time of the creation of the product entry in the openfoodfacts database */
  /* Format: date-time */
  /* Example: 2016-04-30T19:09:12Z */
  created_datetime: string;
  /* Name of the product */
  product_name: string;
  /* Brands producing the product */
  brands: string;
  /* Categories of the product */
  categories: string;
  /* Nutri-Score of the product */
  nutriscore_score: string;
  /* Grade of the Nutri-Score of the product */
  nutriscore_grade: string;
  /* Completeness of the entry of the product in the database */
  /* Given from 0 (name only) over 1 (all fields given) to >1 when additinal information is given */
  completeness: string;
  /* URL of the product image */
  image_url: string;
};

export default Product;