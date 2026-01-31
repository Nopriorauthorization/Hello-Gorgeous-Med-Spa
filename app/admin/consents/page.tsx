'use client';

// ============================================================
// ADMIN CONSENTS PAGE  
// Manage consent templates and view signed consents
// FULLY DYNAMIC - Fetches from database
// ============================================================

import { useState, useEffect } from 'react';
import { createBrowserSupabaseClient } from '@/lib/hgos/supabase';

interface ConsentTemplate {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  content: string;
  version: number;
  is_active: boolean;
  requires_witness: boolean;
  required_for_services: string[] | null;
  created_at: string;
  updated_at: string;
  signed_count?: number;
}

export default function AdminConsentsPage() {
  const [templates, setTemplates] = useState<ConsentTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, totalSigned: 0, expiringSoon: 0 });
  
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ConsentTemplate | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state for editing
  const [editForm, setEditForm] = useState({
    name: '',
    slug: '',
    description: '',
    content: '',
    is_active: true,
    requires_witness: false,
    required_for_services: [] as string[],
  });

  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch consent templates
      const { data: templatesData, error: templatesError } = await supabase
        .from('consent_templates')
        .select('*')
        .order('name');

      if (templatesError) {
        console.error('Error fetching templates:', templatesError);
        // If table doesn't exist, show empty state with option to create
        if (templatesError.code === '42P01') {
          setTemplates([]);
          setError('Consent templates table not found. Please run the clinical schema migration.');
          setLoading(false);
          return;
        }
        throw templatesError;
      }

      // Fetch signed counts for each template
      const templatesWithCounts = await Promise.all(
        (templatesData || []).map(async (template) => {
          const { count } = await supabase
            .from('client_consents')
            .select('*', { count: 'exact', head: true })
            .eq('consent_template_id', template.id);
          
          return { ...template, signed_count: count || 0 };
        })
      );

      setTemplates(templatesWithCounts);

      // Calculate stats
      const totalSigned = templatesWithCounts.reduce((sum, t) => sum + (t.signed_count || 0), 0);
      
      // Count expiring consents (within 30 days)
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      
      const { count: expiringCount } = await supabase
        .from('client_consents')
        .select('*', { count: 'exact', head: true })
        .lt('expires_at', thirtyDaysFromNow.toISOString())
        .gt('expires_at', new Date().toISOString())
        .eq('is_valid', true);

      setStats({
        total: templatesWithCounts.length,
        totalSigned,
        expiringSoon: expiringCount || 0,
      });

    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load consent templates');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (template?: ConsentTemplate) => {
    if (template) {
      setSelectedTemplate(template);
      setEditForm({
        name: template.name,
        slug: template.slug,
        description: template.description || '',
        content: template.content,
        is_active: template.is_active,
        requires_witness: template.requires_witness,
        required_for_services: template.required_for_services || [],
      });
    } else {
      setSelectedTemplate(null);
      setEditForm({
        name: '',
        slug: '',
        description: '',
        content: '',
        is_active: true,
        requires_witness: false,
        required_for_services: [],
      });
    }
    setShowEditModal(true);
  };

  const openPreviewModal = (template: ConsentTemplate) => {
    setSelectedTemplate(template);
    setShowPreviewModal(true);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (selectedTemplate) {
        // Update existing
        const { error } = await supabase
          .from('consent_templates')
          .update({
            name: editForm.name,
            slug: editForm.slug,
            description: editForm.description || null,
            content: editForm.content,
            is_active: editForm.is_active,
            requires_witness: editForm.requires_witness,
            required_for_services: editForm.required_for_services.length > 0 ? editForm.required_for_services : null,
            updated_at: new Date().toISOString(),
            version: selectedTemplate.version + 1, // Increment version on edit
          })
          .eq('id', selectedTemplate.id);

        if (error) throw error;
      } else {
        // Create new
        const { error } = await supabase
          .from('consent_templates')
          .insert({
            name: editForm.name,
            slug: editForm.slug || generateSlug(editForm.name),
            description: editForm.description || null,
            content: editForm.content,
            is_active: editForm.is_active,
            requires_witness: editForm.requires_witness,
            required_for_services: editForm.required_for_services.length > 0 ? editForm.required_for_services : null,
          });

        if (error) throw error;
      }

      setShowEditModal(false);
      fetchTemplates(); // Refresh list
    } catch (err) {
      console.error('Save error:', err);
      alert(err instanceof Error ? err.message : 'Failed to save consent template');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (template: ConsentTemplate) => {
    if (!confirm(`Are you sure you want to delete "${template.name}"? This cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('consent_templates')
        .delete()
        .eq('id', template.id);

      if (error) throw error;
      fetchTemplates();
    } catch (err) {
      console.error('Delete error:', err);
      alert(err instanceof Error ? err.message : 'Failed to delete template');
    }
  };

  const toggleActive = async (template: ConsentTemplate) => {
    try {
      const { error } = await supabase
        .from('consent_templates')
        .update({ is_active: !template.is_active, updated_at: new Date().toISOString() })
        .eq('id', template.id);

      if (error) throw error;
      fetchTemplates();
    } catch (err) {
      console.error('Toggle error:', err);
      alert('Failed to update template status');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Consent Forms</h1>
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-200 rounded-lg h-20"></div>
            ))}
          </div>
          <div className="bg-gray-200 rounded-xl h-64"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Consent Forms</h1>
          <p className="text-gray-500">Manage consent templates and view signed consents</p>
        </div>
        <button 
          onClick={() => openEditModal()}
          className="px-4 py-2 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 transition-colors"
        >
          + Add Template
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Total Templates</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Total Signed</p>
          <p className="text-2xl font-bold text-green-600">{stats.totalSigned.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Expiring Soon (30 days)</p>
          <p className="text-2xl font-bold text-amber-600">{stats.expiringSoon}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Consent Templates</h2>
        </div>
        
        {templates.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-gray-500 mb-4">No consent templates found</p>
            <button
              onClick={() => openEditModal()}
              className="px-4 py-2 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600"
            >
              Create Your First Template
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {templates.map((template) => (
              <div key={template.id} className="px-5 py-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">{template.name}</p>
                    {!template.is_active && (
                      <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                        Inactive
                      </span>
                    )}
                    {template.requires_witness && (
                      <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-full">
                        Witness Required
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {(template.signed_count || 0).toLocaleString()} signed • 
                    Version {template.version} • 
                    Updated {new Date(template.updated_at).toLocaleDateString()}
                  </p>
                  {template.description && (
                    <p className="text-sm text-gray-400 mt-1 truncate max-w-lg">
                      {template.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => openPreviewModal(template)}
                    className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Preview
                  </button>
                  <button 
                    onClick={() => openEditModal(template)}
                    className="px-3 py-1.5 text-sm text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => toggleActive(template)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      template.is_active 
                        ? 'text-amber-600 hover:bg-amber-50' 
                        : 'text-green-600 hover:bg-green-50'
                    }`}
                  >
                    {template.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit/Create Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedTemplate ? 'Edit Consent Template' : 'Create Consent Template'}
              </h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="px-6 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="e.g., Neurotoxin Treatment Consent"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input
                  type="text"
                  value={editForm.slug}
                  onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                  placeholder="auto-generated-from-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank to auto-generate from name</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Brief description of this consent form"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content * (supports Markdown/HTML)</label>
                <textarea
                  value={editForm.content}
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  placeholder="Enter the full consent form text here..."
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.is_active}
                    onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                    className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
                  />
                  <span className="text-sm text-gray-700">Active (available for signing)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.requires_witness}
                    onChange={(e) => setEditForm({ ...editForm, requires_witness: e.target.checked })}
                    className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
                  />
                  <span className="text-sm text-gray-700">Requires witness signature</span>
                </label>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              {selectedTemplate && (
                <button
                  onClick={() => {
                    handleDelete(selectedTemplate);
                    setShowEditModal(false);
                  }}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Delete Template
                </button>
              )}
              <div className="flex items-center gap-3 ml-auto">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !editForm.name || !editForm.content}
                  className="px-4 py-2 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? 'Saving...' : (selectedTemplate ? 'Save Changes' : 'Create Template')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{selectedTemplate.name}</h2>
                <p className="text-sm text-gray-500">Version {selectedTemplate.version}</p>
              </div>
              <button 
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedTemplate.content.replace(/\n/g, '<br>') }}
              />
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowPreviewModal(false);
                  openEditModal(selectedTemplate);
                }}
                className="px-4 py-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
              >
                Edit This Template
              </button>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
