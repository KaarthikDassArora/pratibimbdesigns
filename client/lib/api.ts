import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  User, 
  ApiResponse, 
  Post,
  PostsResponse,
  Review,
  CreateReviewRequest,
  UpdateReviewRequest,
  ProfileUpdateRequest,
  ChangePasswordRequest
} from '../../shared/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network error' }));
    throw new ApiError(response.status, errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Helper function to get auth headers
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// Authentication API
export const authApi = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse<AuthResponse>(response);
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse<AuthResponse>(response);
  },

  async getProfile(): Promise<ApiResponse<{ user: User }>> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    return handleResponse<ApiResponse<{ user: User }>>(response);
  },

  async updateProfile(profileData: ProfileUpdateRequest): Promise<ApiResponse<{ user: User }>> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    return handleResponse<ApiResponse<{ user: User }>>(response);
  },

  async changePassword(passwordData: ChangePasswordRequest): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(passwordData),
    });
    return handleResponse<ApiResponse>(response);
  },
};

// Posts API
export const postsApi = {
  async getPosts(): Promise<ApiResponse<PostsResponse>> {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      headers: getAuthHeaders(),
    });
    return handleResponse<ApiResponse<PostsResponse>>(response);
  },

  async getPost(id: string): Promise<ApiResponse<Post>> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse<ApiResponse<Post>>(response);
  },

  async createPost(postData: { title: string; content: string; published?: boolean }): Promise<ApiResponse<Post>> {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(postData),
    });
    return handleResponse<ApiResponse<Post>>(response);
  },

  async updatePost(id: string, postData: { title?: string; content?: string; published?: boolean }): Promise<ApiResponse<Post>> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(postData),
    });
    return handleResponse<ApiResponse<Post>>(response);
  },

  async deletePost(id: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse<ApiResponse>(response);
  },
};

// Health check API
export const healthApi = {
  async check(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/health`);
    return handleResponse<ApiResponse>(response);
  },
};

// Lead capture/email API
export const leadApi = {
  async sendLead(formData: { name: string; email: string; phone: string; projectDescription: string }) {
    const response = await fetch(`${API_BASE_URL}/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return handleResponse<ApiResponse>(response);
  },
};

// Reviews API
export const reviewsApi = {
  async getReviews(): Promise<ApiResponse<{ reviews: Review[]; pagination: any }>> {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      headers: getAuthHeaders(),
    });
    return handleResponse<ApiResponse<{ reviews: Review[]; pagination: any }>>(response);
  },

  async getMyReviews(): Promise<ApiResponse<{ reviews: Review[] }>> {
    const response = await fetch(`${API_BASE_URL}/reviews/my`, {
      headers: getAuthHeaders(),
    });
    return handleResponse<ApiResponse<{ reviews: Review[] }>>(response);
  },

  async createReview(reviewData: CreateReviewRequest): Promise<ApiResponse<{ review: Review }>> {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reviewData),
    });
    return handleResponse<ApiResponse<{ review: Review }>>(response);
  },

  async updateReview(id: string, reviewData: UpdateReviewRequest): Promise<ApiResponse<{ review: Review }>> {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(reviewData),
    });
    return handleResponse<ApiResponse<{ review: Review }>>(response);
  },

  async deleteReview(id: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse<ApiResponse>(response);
  },
};

// Contact API
export const contactApi = {
  async sendContact(formData: { name: string; email: string; message: string; phone?: string }) {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return handleResponse<ApiResponse>(response);
  },
};

// Utility functions
export const apiUtils = {
  setAuthToken(token: string) {
    localStorage.setItem('authToken', token);
  },

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  },

  removeAuthToken() {
    localStorage.removeItem('authToken');
  },

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  },
}; 