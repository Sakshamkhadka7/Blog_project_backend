import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  const { product, price, descriptions } = req.body;
  const image = req.file.filename;

  if (!product || !price || !descriptions) {
    return res.status(401).json({
      success: false,
      message: "All fields are mandatory",
    });
  }

  const productExist = await Product.findOne({ product });
  if (productExist) {
    return res.status(401).json({
      success: false,
      message: "Product already existed",
    });
  }

  const newProduct = await Product.create({
    product,
    price,
    descriptions,
    image,
  });

  return res.status(200).json({
    success: true,
    message: "Product successfully uploaded",
    product: newProduct,
  });
};

export const displayProduct = async (req, res) => {
  const product = await Product.find();
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product Not Found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Product successfully Found",
    product: product,
  });
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { product, price, descriptions } = req.body;
  const image = req.file.filename;

  const existedId = await Product.findById({ _id: id });
  if (!existedId) {
    return res.status(200).json({
      success: false,
      message: "Id not found",
    });
  }

  const updateProduct = await Product.findByIdAndUpdate(
    id,
    {
      product: product,
      price: price,
      descriptions: descriptions,
      image: image,
    },
    {
      new: true,
    },
  );

  //   updateProduct = await updateProduct.save();

  return res.status(200).json({
    success: true,
    message: "Product successfully updated",
    updateProduct: updateProduct,
  });
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  const existedId = await Product.findById({ _id: id });
  if (!existedId) {
    return res.status(200).json({
      success: false,
      message: "Id not found",
    });
  }

  const deleteProduct = await Product.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Product successfully deleted",
    deleteProduct: deleteProduct,
  });
};
