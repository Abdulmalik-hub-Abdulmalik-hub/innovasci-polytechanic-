// =====================================================
// PORTAL SEPARATION & ACCESS CONTROL
// Ensures strict separation between Management & Academic Portals
// =====================================================

import { UserRole, ROLE_TO_PORTAL, PortalType } from '@/types';

/**
 * Validates if a user role can access a specific portal
 * Throws an error if the role tries to access an unauthorized portal
 */
export function validatePortalAccess(role: UserRole, requestedPortal: PortalType): boolean {
  const authorizedPortal = ROLE_TO_PORTAL[role];
  return authorizedPortal === requestedPortal;
}

/**
 * Get the authorized portal for a role
 */
export function getAuthorizedPortal(role: UserRole): PortalType {
  return ROLE_TO_PORTAL[role];
}

/**
 * Check if a role is a management portal user
 */
export function isManagementPortalUser(role: UserRole): boolean {
  return ROLE_TO_PORTAL[role] === 'management';
}

/**
 * Check if a role is an academic portal user
 */
export function isAcademicPortalUser(role: UserRole): boolean {
  return ROLE_TO_PORTAL[role] === 'academic';
}

/**
 * Check if a role is a student portal user
 */
export function isStudentPortalUser(role: UserRole): boolean {
  return ROLE_TO_PORTAL[role] === 'student';
}

/**
 * Get all roles allowed in the management portal
 */
export function getManagementPortalRoles(): UserRole[] {
  return (Object.entries(ROLE_TO_PORTAL) as [UserRole, PortalType][])
    .filter(([_, portal]) => portal === 'management')
    .map(([role, _]) => role);
}

/**
 * Get all roles allowed in the academic portal
 */
export function getAcademicPortalRoles(): UserRole[] {
  return (Object.entries(ROLE_TO_PORTAL) as [UserRole, PortalType][])
    .filter(([_, portal]) => portal === 'academic')
    .map(([role, _]) => role);
}

/**
 * Get all roles allowed in the student portal
 */
export function getStudentPortalRoles(): UserRole[] {
  return (Object.entries(ROLE_TO_PORTAL) as [UserRole, PortalType][])
    .filter(([_, portal]) => portal === 'student')
    .map(([role, _]) => role);
}

/**
 * Prevents cross-portal role assignment
 * Used during user creation/update to ensure role-portal consistency
 */
export function validateRolePortalConsistency(role: UserRole, assignedPortal: PortalType): {
  isValid: boolean;
  authorizedPortal?: PortalType;
  error?: string;
} {
  const authorizedPortal = ROLE_TO_PORTAL[role];
  
  if (authorizedPortal !== assignedPortal) {
    return {
      isValid: false,
      authorizedPortal,
      error: `Role '${role}' can only be assigned to '${authorizedPortal}' portal, not '${assignedPortal}'`,
    };
  }
  
  return { isValid: true, authorizedPortal };
}

/**
 * Portal-specific navigation paths
 * Used to redirect users to their authorized portal
 */
export const PORTAL_PATHS: Record<PortalType, string> = {
  management: '/portal/management/dashboard',
  academic: '/portal/academic/dashboard',
  student: '/portal/student/dashboard',
};

/**
 * Gets the redirect path for a role after login
 */
export function getLoginRedirectPath(role: UserRole): string {
  const portal = ROLE_TO_PORTAL[role];
  return PORTAL_PATHS[portal];
}

/**
 * Portal access restrictions (for middleware enforcement)
 */
export const PORTAL_RESTRICTIONS = {
  management: {
    allowedRoles: getManagementPortalRoles(),
    basePath: '/portal/management',
    loginPath: '/login/management',
  },
  academic: {
    allowedRoles: getAcademicPortalRoles(),
    basePath: '/portal/academic',
    loginPath: '/login/academic',
  },
  student: {
    allowedRoles: getStudentPortalRoles(),
    basePath: '/portal/student',
    loginPath: '/login/student',
  },
};

/**
 * Check if a role should see management-only features
 */
export function shouldShowManagementFeatures(role: UserRole): boolean {
  return isManagementPortalUser(role);
}

/**
 * Check if a role should see academic-only features
 */
export function shouldShowAcademicFeatures(role: UserRole): boolean {
  return isAcademicPortalUser(role);
}
