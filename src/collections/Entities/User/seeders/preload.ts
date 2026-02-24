// FILE: src/collections/Entities/User/seeders/preload.ts
export const PRELOAD_USER = (categoriesIds: number[]) => [
  {
    email: 'admin@afmotorsport.com',
    password: 'password123',
    name: 'Admin User',
    roles: ['admin']
  },
  {
    email: 'customer1@example.com',
    password: 'customer123',
    name: 'John Customer',
    roles: ['customer']
  },
  {
    email: 'customer2@example.com',
    password: 'customer456',
    name: 'Jane Customer',
    roles: ['customer']
  }
] as const
