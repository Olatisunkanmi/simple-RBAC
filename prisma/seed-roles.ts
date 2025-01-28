import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create organization
  const organization = await prisma.organization.create({
    data: {
      name: 'Default Organization',
    },
  });

  // Create admin role with full permissions
  const adminRole = await prisma.role.create({
    data: {
      name: 'admin',
      description: 'System administrator with full access',
      isSystem: true,
      organizationId: organization.id,
      permissions: {
        create: [
          {
            action: 'manage',
            resource: 'all',
            description: 'Full system access',
            fields: {
              create: [{ name: '*', description: 'All fields' }],
            },
          },
        ],
      },
    },
  });

  // Create user role with limited permissions
  const userRole = await prisma.role.create({
    data: {
      name: 'user',
      description: 'Regular user with limited access',
      isSystem: true,
      organizationId: organization.id,
      permissions: {
        create: [
          {
            action: 'read',
            resource: 'User',
            description: 'Can read own user data',
            conditions: {
              id: '${currentUser.id}',
            },
            fields: {
              create: [
                { name: 'fullName', description: 'User full name' },
                { name: 'email', description: 'User email' },
              ],
            },
          },
          {
            action: 'update',
            resource: 'User',
            description: 'Can update own user data',
            conditions: {
              id: '${currentUser.id}',
            },
            fields: {
              create: [
                { name: 'fullName', description: 'User full name' },
                { name: 'phoneNumber', description: 'User phone number' },
              ],
            },
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
