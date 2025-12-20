import { Permissoes, PermissionModule } from "@/interfaces/IAuthContext"

// Constantes das permissões disponíveis conforme documentação da API
export const PERMISSION_MODULES = {
  USER_MANAGEMENT: 'user_management',
  OPERATION: 'operation', 
  REPORTS_ANALYTICS: 'reports_analytics',
  ADVANCED: 'advanced'
} as const

export const PERMISSIONS = {
  // Módulo de Gestão de Usuário
  CADASTRO_USUARIO: 'cadastro_usuario',
  CADASTRO_PERFIL: 'cadastro_perfil',
  
  // Módulo de Operação
  CADASTRO_MORADORES: 'cadastro_moradores',
  REGISTRAR_PAGAMENTOS: 'registrar_pagamentos',
  GERENCIAR_PONTOS: 'gerenciar_pontos',
  
  // Módulo de Relatórios e Análises
  VISUALIZAR_DASHBOARDS: 'visualizar_dashboards',
  EXPORTAR_RELATORIOS: 'exportar_relatorios',
  
  // Módulo Avançado
  ACESSO_FINANCAS: 'acesso_financas',
  ACESSO_ADMINISTRACAO: 'acesso_administracao'
} as const

// Mapeamento de permissões legadas do frontend para as novas da API
export const PERMISSION_MAPPING = {
  'cadastroUsuarios': PERMISSIONS.CADASTRO_USUARIO,
  'gerenciarPerfis': PERMISSIONS.CADASTRO_PERFIL,
  'cadastroMoradores': PERMISSIONS.CADASTRO_MORADORES,
  'registrarPagamentos': PERMISSIONS.REGISTRAR_PAGAMENTOS,
  'gerenciarPontos': PERMISSIONS.GERENCIAR_PONTOS,
  'visualizarDashboards': PERMISSIONS.VISUALIZAR_DASHBOARDS,
  'exportarRelatorios': PERMISSIONS.EXPORTAR_RELATORIOS,
  'acessoFinancas': PERMISSIONS.ACESSO_FINANCAS,
  'acessoAdministracao': PERMISSIONS.ACESSO_ADMINISTRACAO
}

// Utilitários para trabalhar com permissões
export class PermissionUtils {
  /**
   * Verifica se um usuário tem uma permissão específica
   */
  static hasPermission(permissions: Permissoes | undefined, permission: string): boolean {
    if (!permissions) return false

    const apiPermission = PERMISSION_MAPPING[permission as keyof typeof PERMISSION_MAPPING]
    if (!apiPermission) return false

    // Buscar em todos os módulos pela permissão
    for (const moduleKey of Object.keys(permissions)) {
      const module = permissions[moduleKey as keyof Permissoes]
      if (module?.permissions?.includes(apiPermission)) {
        return true
      }
    }

    return false
  }

  /**
   * Verifica se um usuário tem permissões de administração
   */
  static isAdmin(permissions: Permissoes | undefined): boolean {
    return this.hasPermission(permissions, 'cadastroUsuarios') || 
           this.hasPermission(permissions, 'gerenciarPerfis')
  }

  /**
   * Verifica se um usuário pode acessar funcionalidades operacionais
   */
  static canOperate(permissions: Permissoes | undefined): boolean {
    return this.hasPermission(permissions, 'cadastroMoradores') ||
           this.hasPermission(permissions, 'registrarPagamentos') ||
           this.hasPermission(permissions, 'gerenciarPontos')
  }

  /**
   * Verifica se um usuário pode visualizar relatórios
   */
  static canViewReports(permissions: Permissoes | undefined): boolean {
    return this.hasPermission(permissions, 'visualizarDashboards') ||
           this.hasPermission(permissions, 'exportarRelatorios')
  }

  /**
   * Retorna todas as permissões de um módulo específico
   */
  static getModulePermissions(permissions: Permissoes | undefined, moduleName: keyof Permissoes): string[] {
    return permissions?.[moduleName]?.permissions || []
  }

  /**
   * Cria uma estrutura vazia de permissões
   */
  static createEmptyPermissions(): Permissoes {
    return {
      user_management: {
        name: PERMISSION_MODULES.USER_MANAGEMENT,
        permissions: []
      },
      operation: {
        name: PERMISSION_MODULES.OPERATION,
        permissions: []
      },
      reports_analytics: {
        name: PERMISSION_MODULES.REPORTS_ANALYTICS,
        permissions: []
      },
      advanced: {
        name: PERMISSION_MODULES.ADVANCED,
        permissions: []
      }
    }
  }

  /**
   * Cria permissões completas de administrador
   */
  static createAdminPermissions(): Permissoes {
    return {
      user_management: {
        name: PERMISSION_MODULES.USER_MANAGEMENT,
        permissions: [PERMISSIONS.CADASTRO_USUARIO, PERMISSIONS.CADASTRO_PERFIL]
      },
      operation: {
        name: PERMISSION_MODULES.OPERATION,
        permissions: [PERMISSIONS.CADASTRO_MORADORES, PERMISSIONS.REGISTRAR_PAGAMENTOS, PERMISSIONS.GERENCIAR_PONTOS]
      },
      reports_analytics: {
        name: PERMISSION_MODULES.REPORTS_ANALYTICS,
        permissions: [PERMISSIONS.VISUALIZAR_DASHBOARDS, PERMISSIONS.EXPORTAR_RELATORIOS]
      },
      advanced: {
        name: PERMISSION_MODULES.ADVANCED,
        permissions: [PERMISSIONS.ACESSO_FINANCAS, PERMISSIONS.ACESSO_ADMINISTRACAO]
      }
    }
  }

  /**
   * Valida se a estrutura de permissões está correta
   */
  static validatePermissions(permissions: any): permissions is Permissoes {
    if (!permissions || typeof permissions !== 'object') return false

    const requiredModules = [
      PERMISSION_MODULES.USER_MANAGEMENT,
      PERMISSION_MODULES.OPERATION,
      PERMISSION_MODULES.REPORTS_ANALYTICS,
      PERMISSION_MODULES.ADVANCED
    ]

    for (const module of requiredModules) {
      const moduleData = permissions[module]
      if (!moduleData || !Array.isArray(moduleData.permissions)) {
        return false
      }
    }

    return true
  }
}

export default PermissionUtils