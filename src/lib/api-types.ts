// API Response Types
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  data?: T;
  id?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  details?: Record<string, unknown>;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

// Contact API Types
export interface ContactRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactResponse extends ApiSuccessResponse {
  id: string;
}

// Auth API Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse extends ApiSuccessResponse {
  token?: string;
}

// File Upload Types
export interface FileUploadResponse extends ApiSuccessResponse {
  url: string;
  filename: string;
}

// Validation Error Types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationErrorResponse extends ApiErrorResponse {
  errors: ValidationError[];
}
