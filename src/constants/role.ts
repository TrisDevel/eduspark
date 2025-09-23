export const ROLES = {
    ADMIN : "ADMIN",
    TEACHER : "TEACHER",
    USER : "USER"
} as const

export type Role = typeof ROLES[keyof typeof ROLES]