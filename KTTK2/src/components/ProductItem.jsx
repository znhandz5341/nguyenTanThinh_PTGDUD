import React from 'react';

function ProductItem({ product, onDelete }) {
  return (
    <tr>
      <td className="border p-2">{product.name}</td>
      <td className="border p-2">{product.price.toLocaleString()} đ</td>
      <td className="border p-2">{product.category}</td>
      <td className="border p-2">{product.stock}</td>
      <td className="border p-2 text-center">
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Xoá
        </button>
      </td>
    </tr>
  );
}

export default ProductItem;
