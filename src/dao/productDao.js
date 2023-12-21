const Product = require('./models/productModel');

class ProductDao {
  async getAllProducts() {
    try {
      return await Product.find();
    } catch (error) {
      throw new Error('Error al obtener todos los productos');
    }
  }

  async getProductById(productId) {
    try {
      return await Product.findById(productId);
    } catch (error) {
      throw new Error('Error al obtener el producto por ID');
    }
  }

  async addProduct(newProduct) {
    try {
      return await Product.create(newProduct);
    } catch (error) {
      throw new Error('Error al agregar el producto');
    }
  }

  async updateProduct(productId, updatedProduct) {
    try {
      return await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }

  async deleteProduct(productId) {
    try {
      return await Product.findByIdAndDelete(productId);
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }
}

module.exports = new ProductDao();

