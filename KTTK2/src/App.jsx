import { useState, useEffect } from 'react';
import ProductItem from './components/ProductItem';
import "../src/App.css"

function App() {
  const loadProductsFromLocalStorage = () => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
  };

  const [products, setProducts] = useState(loadProductsFromLocalStorage());
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    stock: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    if (!form.name || !form.price || !form.category || !form.stock) return;

    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: parseInt(form.price),
      category: form.category,
      stock: parseInt(form.stock)
    };
    setProducts(prev => [...prev, newProduct]);
    setForm({ name: '', price: '', category: '', stock: '' });
  };

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const filteredProducts = products.filter(p => {
    const matchesName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    return matchesName && matchesCategory;
  });

  const uniqueCategories = [...new Set(products.map(p => p.category))];

  const totalProducts = filteredProducts.length;
  const totalStock = filteredProducts.reduce((sum, p) => sum + p.stock, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

      {/* Form thêm sản phẩm */}
      <div className="mb-6 space-y-2">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tên sản phẩm"
          className="border p-2 w-full"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Giá"
          type="number"
          className="border p-2 w-full"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Danh mục"
          className="border p-2 w-full"
        />
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Tồn kho"
          type="number"
          className="border p-2 w-full"
        />
        <button
          onClick={handleAddProduct}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Thêm sản phẩm
        </button>
      </div>

      {/* Ô tìm kiếm và dropdown lọc */}
      <input
        type="text"
        placeholder="Tìm sản phẩm theo tên..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border p-2 mb-4 w-full"
      >
        <option value="">-- Lọc theo danh mục --</option>
        {uniqueCategories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Hiển thị tổng số */}
      <p className="mb-4 font-medium">
        Tổng sản phẩm: {totalProducts} | Tổng tồn kho: {totalStock}
      </p>

      {/* Bảng sản phẩm */}
      <table className="table-auto w-full border border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Tên sản phẩm</th>
            <th className="border p-2">Giá</th>
            <th className="border p-2">Danh mục</th>
            <th className="border p-2">Tồn kho</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(p => (
            <ProductItem key={p.id} product={p} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
