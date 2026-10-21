const DIRECT_BACKEND_URL = 'https://nextjs-642200683.kloudbeansite.com/api/v1';

function getBaseUrl(): string {
  // In the browser, try relative /api/v1 first
  if (typeof window !== 'undefined') {
    return '/api/v1';
  }
  // On SSR, use internal loopback port 4012
  const serverUrl = process.env.BACKEND_URL || process.env.INTERNAL_BACKEND_URL || 'http://127.0.0.1:4012';
  return `${serverUrl.replace(/\/+$/, '')}/api/v1`;
}

const BASE_URL = getBaseUrl();

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  // Read stored client JWT token
  let token = '';
  if (typeof window !== 'undefined') {
    token = sessionStorage.getItem('ecofone_token') || localStorage.getItem('ecofone_token') || '';
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...(options.headers as Record<string, string> || {}),
  };

  // Primary attempt via relative same-origin route
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      ...options,
      headers,
    });

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }
      return data;
    } else {
      // Non-JSON response (e.g. proxy returned HTML error page), trigger fallback
      throw new Error(`Invalid content-type from proxy: ${contentType}`);
    }
  } catch (primaryErr: any) {
    // If we're in the browser and primary failed, immediately fallback to direct backend
    if (typeof window !== 'undefined' && BASE_URL !== DIRECT_BACKEND_URL) {
      try {
        const directResponse = await fetch(`${DIRECT_BACKEND_URL}/${endpoint}`, {
          ...options,
          headers,
        });

        const data = await directResponse.json();
        if (!directResponse.ok) {
          throw new Error(data.message || 'Direct request failed');
        }
        return data;
      } catch (fallbackErr: any) {
        throw fallbackErr;
      }
    }

    if (primaryErr.name === 'TypeError' || primaryErr.message?.includes('fetch')) {
      throw new Error(`API server connection unavailable (${BASE_URL})`);
    }
    throw primaryErr;
  }
}

export const api = {
  // Auth
  sendOtp: (phone: string) => apiRequest('auth/otp/send', { method: 'POST', body: JSON.stringify({ phone }) }),
  verifyOtp: (phone: string, code: string) => apiRequest('auth/otp/verify', { method: 'POST', body: JSON.stringify({ phone, code }) }),
  googleLogin: (idToken: string) => apiRequest('auth/google', { method: 'POST', body: JSON.stringify({ idToken }) }),
  masterAdminLogin: (password: string) => apiRequest('auth/admin/login', { method: 'POST', body: JSON.stringify({ password }) }),
  changeAdminPassword: (currentPassword: string, newPassword: string) =>
    apiRequest('auth/admin/change-password', { method: 'POST', body: JSON.stringify({ currentPassword, newPassword }) }),

  // Ecommerce
  getCatalog: (params?: any) => {
    const query = params ? new URLSearchParams(params).toString() : '';
    return apiRequest(`ecommerce/catalog?${query}`);
  },
  getSkuDetails: (skuId: string) => apiRequest(`ecommerce/sku/${skuId}`),
  initiateCheckout: (skuId: string, storeId?: string) => apiRequest('ecommerce/checkout', { method: 'POST', body: JSON.stringify({ skuId, storeId }) }),
  verifyPayment: (payload: { orderId: string; razorpayPaymentId: string; razorpaySignature: string }) => 
    apiRequest('ecommerce/verify-payment', { method: 'POST', body: JSON.stringify(payload) }),

  // Tradein
  getQuote: (payload: any) => apiRequest('tradein/quote', { method: 'POST', body: JSON.stringify(payload) }),
  schedulePickup: (payload: any) => apiRequest('tradein/schedule', { method: 'POST', body: JSON.stringify(payload) }),
  getQuotes: () => apiRequest('tradein/quotes'),

  // Franchise
  applyFranchise: (payload: any) => apiRequest('franchise/apply', { method: 'POST', body: JSON.stringify(payload) }),
  calculateRoi: (payload: any) => apiRequest('franchise/calculate-roi', { method: 'POST', body: JSON.stringify(payload) }),
  getFranchiseApps: () => apiRequest('franchise/applications'),
  updateFranchiseAppStatus: (id: string, status: string) => 
    apiRequest(`franchise/applications/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  updateQuoteStatus: (id: string, status: string) => 
    apiRequest(`tradein/quotes/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  // CMS
  getLegacyCmsBlogs: () => apiRequest('cms/blogs'),
  getBlogBySlug: (slug: string) => apiRequest(`cms/blogs/${slug}`),
  getReviews: () => apiRequest('cms/reviews'),
  getReviewsAdmin: () => apiRequest('cms/reviews/admin'),
  updateReviewStatus: (id: string, status: string) => apiRequest(`cms/reviews/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  submitReview: (payload: any) => apiRequest('cms/reviews', { method: 'POST', body: JSON.stringify(payload) }),
  replyToReview: (id: string, reply: string) => apiRequest(`cms/reviews/${id}/reply`, { method: 'PATCH', body: JSON.stringify({ reply }) }),
  verifyReview: (id: string, isVerified: boolean, verifiedProduct?: string) => apiRequest(`cms/reviews/${id}/verify`, { method: 'PATCH', body: JSON.stringify({ isVerified, verifiedProduct }) }),
  deleteReview: (id: string) => apiRequest(`cms/reviews/${id}`, { method: 'DELETE' }),
  updateReview: (id: string, payload: any) => apiRequest(`cms/reviews/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  getJobs: () => apiRequest('cms/jobs'),
  locateStores: async (lat?: number, lng?: number) => {
    try {
      const res = await fetch('/api/stores');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {}
    const query = lat !== undefined && lng !== undefined ? `?lat=${lat}&lng=${lng}` : '';
    return apiRequest(`cms/stores${query}`);
  },
  addStore: async (payload: any) => {
    try {
      const res = await fetch('/api/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return apiRequest('cms/stores', { method: 'POST', body: JSON.stringify(payload) });
  },
  deleteStore: async (id: string) => {
    try {
      const res = await fetch(`/api/stores?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (res.ok) return await res.json();
    } catch (e) {}
    return apiRequest(`cms/stores/${id}`, { method: 'DELETE' });
  },
  updateStore: async (id: string, payload: any) => {
    try {
      const res = await fetch('/api/stores', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...payload })
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return apiRequest(`cms/stores/${id}`, { method: 'PATCH', body: JSON.stringify(payload) });
  },
  aiChat: (message: string, history: any[]) => apiRequest('cms/ai/chat', { method: 'POST', body: JSON.stringify({ message, history }) }),
  resolveMapsUrl: (url: string) => apiRequest(`cms/resolve-maps?url=${encodeURIComponent(url)}`),
  geocodeAddress: (address: string) => apiRequest(`cms/geocode?address=${encodeURIComponent(address)}`),
  getTeamMembers: () => apiRequest('cms/team'),
  addTeamMember: (payload: any) => apiRequest('cms/team', { method: 'POST', body: JSON.stringify(payload) }),
  updateTeamMember: (id: string, payload: any) => apiRequest(`cms/team/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  deleteTeamMember: (id: string) => apiRequest(`cms/team/${id}`, { method: 'DELETE' }),
  reorderTeamMembers: (ids: string[]) => apiRequest('cms/team-reorder', { method: 'PATCH', body: JSON.stringify({ ids }) }),

  // Sub-Admin management
  subAdminLogin: (password: string) => apiRequest('sub-admin/login', { method: 'POST', body: JSON.stringify({ password }) }),
  listSubAdmins: () => apiRequest('sub-admin'),
  createSubAdmin: (payload: { username: string; password: string; permissions: string[] }) =>
    apiRequest('sub-admin', { method: 'POST', body: JSON.stringify(payload) }),
  deleteSubAdmin: (id: string) => apiRequest(`sub-admin/${id}`, { method: 'DELETE' }),
  resetSubAdminPassword: (id: string, password: string) =>
    apiRequest(`sub-admin/${id}/password`, { method: 'PATCH', body: JSON.stringify({ password }) }),
  updateSubAdminPermissions: (id: string, permissions: string[]) =>
    apiRequest(`sub-admin/${id}/permissions`, { method: 'PATCH', body: JSON.stringify({ permissions }) }),
  verifySubAdminPassword: (id: string, password: string) =>
    apiRequest(`sub-admin/${id}/verify-password`, { method: 'POST', body: JSON.stringify({ password }) }),

  // System Logs
  getSystemLogs: () => apiRequest('system-log'),
  createSystemLog: (action: string) => apiRequest('system-log', { method: 'POST', body: JSON.stringify({ action }) }),
  clearSystemLogs: (filterType: string) => apiRequest(`system-log?filterType=${filterType}`, { method: 'DELETE' }),

  // Enquiries deletion
  clearEnquiries: (targetType: string, filterType: string, startDate?: string, endDate?: string) => {
    let url = `franchise/applications?targetType=${targetType}&filterType=${filterType}`;
    if (startDate) url += `&startDate=${encodeURIComponent(startDate)}`;
    if (endDate) url += `&endDate=${encodeURIComponent(endDate)}`;
    return apiRequest(url, { method: 'DELETE' });
  },

  // Certificates management
  getCertificates: () => apiRequest('certificate'),
  createCertificate: (payload: any) => apiRequest('certificate', { method: 'POST', body: JSON.stringify(payload) }),
  deleteCertificate: (id: string) => apiRequest(`certificate/${id}`, { method: 'DELETE' }),
  
  getBrandsSection: () => apiRequest('cms/brands-section'),
  updateBrandsSection: (payload: any) => apiRequest('cms/brands-section', { method: 'PUT', body: JSON.stringify(payload) }),

  // Research Articles
  getResearchArticles: () => apiRequest('cms/research-articles'),
  createResearchArticle: (payload: any) => apiRequest('cms/research-articles', { method: 'POST', body: JSON.stringify(payload) }),
  deleteResearchArticle: (id: string) => apiRequest(`cms/research-articles/${id}`, { method: 'DELETE' }),

  // Careers & Job Openings CMS
  getCareerJobs: async () => {
    try {
      const res = await fetch('/api/careers/openings');
      if (res.ok) return await res.json();
    } catch (e) {}
    return [];
  },
  createCareerJob: async (payload: any) => {
    const res = await fetch('/api/careers/openings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },
  updateCareerJob: async (payload: any) => {
    const res = await fetch('/api/careers/openings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },
  deleteCareerJob: async (id: string) => {
    const res = await fetch(`/api/careers/openings?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  // Career Candidate Applications
  getCareerApplications: async () => {
    try {
      const res = await fetch('/api/careers/applications');
      if (res.ok) return await res.json();
    } catch (e) {}
    return [];
  },
  submitCareerApplication: async (payload: any) => {
    const res = await fetch('/api/careers/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },
  updateCareerApplicationStatus: async (id: string, status: string) => {
    const res = await fetch('/api/careers/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    return await res.json();
  },
  deleteCareerApplication: async (id: string) => {
    const res = await fetch(`/api/careers/applications?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  // Contact Inquiries (Completely separate from Franchise applications)
  getContactMessages: async () => {
    try {
      const res = await fetch('/api/contact');
      if (res.ok) return await res.json();
    } catch (e) {}
    return [];
  },
  submitContactMessage: async (payload: any) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },
  updateContactMessageStatus: async (id: string, status: string) => {
    const res = await fetch('/api/contact', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    return await res.json();
  },
  deleteContactMessage: async (id: string, clearAll?: boolean) => {
    const query = clearAll ? '?clearAll=true' : `?id=${encodeURIComponent(id)}`;
    const res = await fetch(`/api/contact${query}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  // Blog Management & Publishing CMS (TechByte)
  getBlogs: async (params?: { category?: string; status?: string; query?: string; slug?: string }) => {
    try {
      const query = params ? new URLSearchParams(params as any).toString() : '';
      const res = await fetch(`/api/blogs${query ? `?${query}` : ''}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.error('Error in getBlogs API:', e);
    }
    return { success: false, blogs: [] };
  },
  createBlog: async (payload: any) => {
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  },
  updateBlog: async (idOrPayload: string | any, maybePayload?: any) => {
    const payload = typeof idOrPayload === 'string' ? { id: idOrPayload, ...maybePayload } : idOrPayload;
    const res = await fetch('/api/blogs', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  },
  deleteBlog: async (id: string) => {
    const res = await fetch(`/api/blogs?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    return await res.json();
  },
  uploadBlogImage: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/blogs/upload', {
      method: 'POST',
      body: formData,
    });
    return await res.json();
  },
};

