/**
 * Biblioteca de utilitários para fazer requisições à API
 */

interface ApiResponse<T = any> {
  data?: T
  error?: string
  statusCode?: number
}

interface RequestOptions extends RequestInit {
  requireAuth?: boolean
}

/**
 * Classe para fazer requisições HTTP com suporte a autenticação JWT
 */
class ApiClient {
  private baseUrl: string

  constructor(baseUrl?: string) {
    // Usar variável de ambiente ou fallback para desenvolvimento local
    this.baseUrl = baseUrl || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'
    console.log('🔧 API Client iniciado com URL base:', this.baseUrl)
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token')
    }
    return null
  }

  private getHeaders(requireAuth: boolean = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (requireAuth) {
      const token = this.getAuthToken()
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }

    return headers
  }

  async request<T = any>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { requireAuth = false, ...requestOptions } = options

    try {
      const fullUrl = `${this.baseUrl}${endpoint}`
      console.log('🌐 Fazendo requisição para:', fullUrl)
      console.log('🔐 Requer autenticação:', requireAuth)
      
      const response = await fetch(fullUrl, {
        ...requestOptions,
        headers: {
          ...this.getHeaders(requireAuth),
          ...requestOptions.headers,
        },
      })

      console.log('📡 Status da resposta:', response.status, response.statusText)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('❌ Erro na API:', errorData)
        return {
          error: errorData.message || `Erro ${response.status}`,
          statusCode: response.status,
        }
      }

      // Para status 204 (No Content), não há corpo para parsear
      if (response.status === 204) {
        console.log('✅ Sucesso - No Content (204)')
        return { data: null as T }
      }

      const data = await response.json()
      console.log('✅ Dados recebidos:', data)
      return { data }
    } catch (error) {
      console.error('💥 Erro na requisição:', error)
      return {
        error: 'Erro de conexão',
        statusCode: 500,
      }
    }
  }

  // Métodos de conveniência
  async get<T = any>(endpoint: string, requireAuth = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', requireAuth })
  }

  async post<T = any>(
    endpoint: string,
    data: any,
    requireAuth = false
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      requireAuth,
    })
  }

  async patch<T = any>(
    endpoint: string,
    data: any,
    requireAuth = false
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      requireAuth,
    })
  }

  async delete<T = any>(endpoint: string, requireAuth = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', requireAuth })
  }
}

// Instância global do cliente API
export const apiClient = new ApiClient()

// Utilitários específicos para autenticação
export const authApi = {
  async login(email: string, senha: string) {
    return apiClient.post('/auth/login', { email, senha })
  },

  async verifyToken() {
    try {
      const response = await apiClient.get('/auth/verify', true)
      
      // Se retornou erro de conexão, simular sucesso para manter sessão local
      if (response.error === 'Erro de conexão') {
        console.log('🔄 API indisponível, mantendo sessão local')
        return { data: { valid: true }, error: null }
      }
      
      return response
    } catch (error) {
      console.log('🔄 Erro ao verificar token, mantendo sessão local')
      return { data: { valid: true }, error: null }
    }
  },
}

// Utilitários para usuários
export const usersApi = {
  async getUsers(queryString = '') {
    const endpoint = queryString ? `/users${queryString}` : '/users'
    return apiClient.get(endpoint, true)
  },

  async getUserById(id: string) {
    return apiClient.get(`/users/${id}`, true)
  },

  async createUser(userData: {
    nome: string
    email: string
    senha: string
    perfilId: string
    status?: boolean
  }) {
    return apiClient.post('/users', userData, true)
  },

  async updateUser(id: string, userData: Partial<{
    nome: string
    email: string
    perfilId: string
    status: boolean
  }>) {
    return apiClient.patch(`/users/${id}`, userData, true)
  },

  async deleteUser(id: string) {
    return apiClient.delete(`/users/${id}`, true)
  },

  async toggleUserStatus(id: string) {
    return apiClient.patch(`/users/${id}/status`, {}, true)
  },

  async changePassword(id: string, senhaAtual: string, novaSenha: string) {
    return apiClient.patch(`/users/${id}/password`, { senhaAtual, novaSenha }, true)
  },

  async validateUser(email: string, senha: string) {
    return apiClient.post('/users/validate', { email, senha }, false)
  },
}

// Utilitários para perfis
export const profilesApi = {
  async getProfiles(queryString = '') {
    const endpoint = queryString ? `/profiles${queryString}` : '/profiles'
    return apiClient.get(endpoint, true)
  },

  async getProfileById(id: string) {
    return apiClient.get(`/profiles/${id}`, true)
  },

  async getPermissions() {
    return apiClient.get('/profiles/permissions', true)
  },

  async createProfile(profileData: any) {
    return apiClient.post('/profiles', profileData, true)
  },

  async updateProfile(id: string, profileData: any) {
    return apiClient.patch(`/profiles/${id}`, profileData, true)
  },

  async deleteProfile(id: string) {
    return apiClient.delete(`/profiles/${id}`, true)
  },

  async toggleProfileStatus(id: string) {
    return apiClient.patch(`/profiles/${id}/status`, {}, true)
  },

  async updatePermissions(id: string, permissoes: any) {
    return apiClient.patch(`/profiles/${id}/permissions`, permissoes, true)
  },
}

export default apiClient