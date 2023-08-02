import React, { useState } from 'react';
import './ShoppingCart.css'; // Importa el archivo de estilos CSS

const initialProducts = [
  {
    nombre: 'Producto 1',
    marca: 'marca1',
    precio: 10,
    cantidad: 2,
    imagen: 'https://elegifruta.com.ar/wp-content/uploads/2017/07/manzana_roja.jpg',
  },
  {
    nombre: 'Producto 2',
    marca: 'marca2',
    precio: 20,
    cantidad: 1,
    imagen: 'https://statics-cuidateplus.marca.com/cms/styles/natural/azblob/platanos_0.jpg.webp?itok=Nm5QVrwg',
  },
  // Agrega más productos si es necesario
];

function ShoppingCart() {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateTotalPrice = () => {
    const total = filteredProducts.reduce((sum, product) => sum + product.precio * product.cantidad, 0);
    return total;
  };

  return (
    <div className="shopping-cart">
      <h1>Carrito de Compras</h1>
      Buscar: <input
        className='search'
        type="text"
        placeholder="Buscar producto..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className='shopping-cart-info'>
        <div className='show-products'>
          {filteredProducts.map((product, index) => (
            <div className='producto-cart' key={index}>
              <div className='img-product'>
                <img src={product.imagen} alt={product.nombre} />
              </div>
              <div className='name-product'>
                <h3>{product.nombre}</h3>
                <p><b>Marca:</b> {product.marca}</p>
                <p><b>Precio:</b> ${product.precio}</p>
              </div>
              <div className='cantidad-product'>
                <button className='btn-add'>+</button>
                <span className='product-amount'>{product.cantidad}</span>
                <button className='btn-remove'>-</button>
              </div>
              <div className='price-product'>
                <p><b>Total:</b> ${product.precio * product.cantidad}</p>
                <div>
                  <img className='btn-delete' src='https://img.icons8.com/?size=512&id=102550&format=png' alt='delete' />
                </div>
              </div>
            </div>
          ))}
          <div className='total-price'>
            <p><b>Precio Total de la Compra:</b> ${calculateTotalPrice()}</p>
            <button className='btn-buy'><b>Comprar</b></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
