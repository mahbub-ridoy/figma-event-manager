import { useState } from 'react';
import { X, Plus, Trash2, Image as ImageIcon, ChevronUp, ChevronDown } from 'lucide-react';

interface ContentItem {
  id: string;
  type: 'heading' | 'text' | 'button' | 'link' | 'image';
  content: string;
  style?: 'primary' | 'secondary' | 'outline';
  url?: string;
}

interface ContentEditorProps {
  items: ContentItem[];
  onSave: (items: ContentItem[]) => void;
  onCancel: () => void;
}

export function ContentEditor({ items, onSave, onCancel }: ContentEditorProps) {
  const [editingItems, setEditingItems] = useState<ContentItem[]>(items);

  const handleAddItem = (type: ContentItem['type']) => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      type,
      content: type === 'heading' ? 'New Heading' : type === 'text' ? 'New text content' : type === 'button' ? 'Click Here' : type === 'image' ? 'Image Alt Text' : 'Link Text',
      style: type === 'button' ? 'primary' : undefined,
      url: type === 'button' || type === 'link' || type === 'image' ? 'https://example.com' : undefined,
    };
    setEditingItems([...editingItems, newItem]);
  };

  const handleUpdateItem = (id: string, updates: Partial<ContentItem>) => {
    setEditingItems(editingItems.map(item =>
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setEditingItems(editingItems.filter(item => item.id !== id));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...editingItems];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setEditingItems(newItems);
  };

  const handleMoveDown = (index: number) => {
    if (index === editingItems.length - 1) return;
    const newItems = [...editingItems];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setEditingItems(newItems);
  };

  const handleSave = () => {
    onSave(editingItems);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Edit Panel Content</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-slate-100 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Add Content Buttons */}
          <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-lg">
            <button
              onClick={() => handleAddItem('heading')}
              className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm hover:border-[#10B759] transition-all"
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Heading
            </button>
            <button
              onClick={() => handleAddItem('text')}
              className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm hover:border-[#10B759] transition-all"
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Text
            </button>
            <button
              onClick={() => handleAddItem('button')}
              className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm hover:border-[#10B759] transition-all"
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Button
            </button>
            <button
              onClick={() => handleAddItem('link')}
              className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm hover:border-[#10B759] transition-all"
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Link
            </button>
            <button
              onClick={() => handleAddItem('image')}
              className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm hover:border-[#10B759] transition-all"
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Image
            </button>
          </div>

          {/* Content Items */}
          {editingItems.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p>No content yet. Add items using the buttons above.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {editingItems.map((item, index) => (
                <div key={item.id} className="border border-slate-200 rounded-lg p-4 bg-white">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-[#10B759] text-white text-xs rounded">
                        {item.type.toUpperCase()}
                      </span>
                      <span className="text-sm text-slate-500">Item {index + 1}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 hover:bg-red-50 rounded transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>

                  {/* Content Input */}
                  {item.type === 'image' ? (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={item.content}
                        onChange={(e) => handleUpdateItem(item.id, { content: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 text-sm"
                      />
                      {item.content && (
                        <div className="mt-2">
                          <img 
                            src={item.content} 
                            alt="Preview" 
                            className="max-w-full h-32 object-contain rounded border border-slate-200"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EInvalid URL%3C/text%3E%3C/svg%3E';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {item.type === 'heading' ? 'Heading Text' : 
                         item.type === 'text' ? 'Text Content' : 
                         item.type === 'button' ? 'Button Label' : 'Link Text'}
                      </label>
                      <input
                        type="text"
                        value={item.content}
                        onChange={(e) => handleUpdateItem(item.id, { content: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 text-sm"
                      />
                    </div>
                  )}

                  {/* URL Input for buttons and links */}
                  {(item.type === 'button' || item.type === 'link' || item.type === 'image') && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        URL
                      </label>
                      <input
                        type="text"
                        value={item.url || ''}
                        onChange={(e) => handleUpdateItem(item.id, { url: e.target.value })}
                        placeholder="https://example.com"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#10B759] focus:ring-2 focus:ring-[#10B759]/20 text-sm"
                      />
                    </div>
                  )}

                  {/* Button Style Selection */}
                  {item.type === 'button' && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Button Style
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateItem(item.id, { style: 'primary' })}
                          className={`px-4 py-2 rounded text-sm ${
                            item.style === 'primary'
                              ? 'bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          Primary
                        </button>
                        <button
                          onClick={() => handleUpdateItem(item.id, { style: 'secondary' })}
                          className={`px-4 py-2 rounded text-sm ${
                            item.style === 'secondary'
                              ? 'bg-[#5B7C8F] text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          Secondary
                        </button>
                        <button
                          onClick={() => handleUpdateItem(item.id, { style: 'outline' })}
                          className={`px-4 py-2 rounded text-sm ${
                            item.style === 'outline'
                              ? 'border-2 border-[#10B759] text-[#10B759]'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          Outline
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Move Up/Down Buttons */}
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleMoveUp(index)}
                      className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-[#10B759] to-[#0E9F4D] text-white rounded-lg hover:shadow-lg transition-all"
          >
            Save Content
          </button>
        </div>
      </div>
    </div>
  );
}