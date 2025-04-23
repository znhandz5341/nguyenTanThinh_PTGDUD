import { useState } from 'react';

function App() {
  const [products] = useState([
    { id: 1, name: 'Áo thun', price: 150000, category: 'Thời trang', stock: 10 },
    { id: 2, name: 'Laptop Dell', price: 15000000, category: 'Công nghệ', stock: 5 },
    { id: 3, name: 'Nồi cơm điện', price: 700000, category: 'Gia dụng', stock: 8 }
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>
      <table className="table-auto w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Tên sản phẩm</th>
            <th className="border p-2">Giá</th>
            <th className="border p-2">Danh mục</th>
            <th className="border p-2">Tồn kho</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.price.toLocaleString()} đ</td>
              <td className="border p-2">{p.category}</td>
              <td className="border p-2">{p.stock}</td>
              <td className="border p-2"><button className="bg-red-500 text-white px-3 py-1 rounded">Xoá</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
