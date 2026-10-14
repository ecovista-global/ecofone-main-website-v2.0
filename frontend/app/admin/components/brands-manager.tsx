'use client';
import React, { useState, useEffect } from 'react';
import { api } from '../../../lib/api';

export default function BrandsManager() {
  const [brands, setBrands] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // New Brand State
  const [newName, setNewName] = useState('');
  const [newLogo, setNewLogo] = useState('');
  const [newType, setNewType] = useState('image'); // 'text', 'image', 'svg'
  const [newColor, setNewColor] = useState('#000000');

  // Drag State
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const data = await api.getBrandsSection();
      setBrands(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBrands = async (newBrands: any[]) => {
    try {
      await api.updateBrandsSection(newBrands);
    } catch (err) {
      console.error(err);
      alert('Failed to save brands order');
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newLogo) return;

    const newBrand = {
      id: Date.now().toString(),
      name: newName,
      logo: newLogo,
      type: newType,
      color: newColor,
    };
    const updated = [...brands, newBrand];
    setBrands(updated);
    await saveBrands(updated);
    
    setNewName('');
    setNewLogo('');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    const updated = brands.filter(b => b.id !== id);
    setBrands(updated);
    await saveBrands(updated);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      handleDragEnd();
      return;
    }
    const updated = [...brands];
    const [item] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, item);
    
    setBrands(updated);
    handleDragEnd();
    await saveBrands(updated);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">Manage Top Brands</h2>
        <p className="text-sm text-slate-500">Drag and drop to reorder. Add logos manually via image URL.</p>
      </div>

      <form onSubmit={handleAdd} className="flex flex-wrap gap-4 mb-8 bg-slate-50 p-4 rounded-lg border">
        <input 
          type="text" 
          placeholder="Brand Name" 
          className="border p-2.5 rounded flex-1 min-w-[200px]"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Logo (Text or Image URL)" 
          className="border p-2.5 rounded flex-1 min-w-[200px]"
          value={newLogo}
          onChange={(e) => setNewLogo(e.target.value)}
        />
        <select 
          className="border p-2.5 rounded bg-white"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
        >
          <option value="image">Image URL</option>
          <option value="text">Text Only</option>
          <option value="svg">SVG (Predefined)</option>
        </select>
        <input 
          type="color" 
          title="Brand Color"
          className="w-12 h-11 cursor-pointer"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded hover:bg-blue-700">
          Add
        </button>
      </form>

      <div className="space-y-3">
        {brands.map((brand, index) => (
          <div
            key={brand.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`flex items-center justify-between p-4 bg-white border rounded shadow-sm cursor-move transition-colors ${
              dragOverIndex === index ? 'border-blue-500 border-2 bg-blue-50/30' : 'border-slate-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-slate-400 font-bold w-6">#{index + 1}</span>
              <div className="w-12 h-12 bg-slate-50 border rounded flex items-center justify-center p-1">
                {brand.type === 'image' ? (
                  <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" />
                ) : (
                  <span className="font-bold text-sm" style={{ color: brand.color }}>{brand.logo.substring(0,4)}</span>
                )}
              </div>
              <div>
                <span className="font-bold text-slate-800 block">{brand.name}</span>
                <span className="text-xs text-slate-400 uppercase">{brand.type}</span>
              </div>
            </div>
            
            <button 
              onClick={() => handleDelete(brand.id)}
              className="text-red-500 hover:text-red-700 font-bold px-3 py-1 bg-red-50 rounded hover:bg-red-100"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
