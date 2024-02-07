const ProductDao = require('../daos/productDao');

class ProductController {
  async getAllProducts() {
    try {
      return await ProductDao.getAllProducts();
    } catch (error) {
      throw new Error('Error al obtener todos los productos (DB)');
    }
  }

  async getProductById(productId) {
    try {
      return await ProductDao.getProductById(productId);
    } catch (error) {
      throw new Error('Error al obtener el producto por ID (DB)');
    }
  }

  async addProduct(newProduct) {
    try {
      return await ProductDao.addProduct(newProduct);
    } catch (error) {
      throw new Error('Error al agregar el producto (DB)');
    }
  }

  async updateProduct(productId, updatedProduct) {
    try {
      return await ProductDao.updateProduct(productId, updatedProduct);
    } catch (error) {
      throw new Error('Error al actualizar el producto (DB)');
    }
  }

  async deleteProduct(productId) {
    try {
      return await ProductDao.deleteProduct(productId);
    } catch (error) {
      throw new Error('Error al eliminar el producto (DB)');
    }
  }
}

module.exports = new ProductController();
