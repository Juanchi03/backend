

app.get('/api/products', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const skip = (page - 1) * limit;
    const sortOption = sort === 'desc' ? -1 : 1;
    
    const filter = query ? { category: query } : {};

    const products = await ProductModel.find(filter)
      .sort({ price: sortOption })
      .limit(parseInt(limit))
      .skip(skip);

    const totalProducts = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;
    const prevPage = hasPrevPage ? page - 1 : null;
    const prevLink = hasPrevPage ? `/api/products?limit=${limit}&page=${prevPage}&sort=${sort}&query=${query}` : null;
    const nextLink = hasNextPage ? `/api/products?limit=${limit}&page=${nextPage}&sort=${sort}&query=${query}` : null;

    res.status(200).json({
      status: 'success',
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Error al obtener los productos' });
  }
});


app.use('/api/carts', require('./src/routes/carts'));




