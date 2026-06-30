import { faker } from '@faker-js/faker';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'manager' | 'editor' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  joinedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in-progress' | 'review' | 'done';
  dueDate: Date;
}

export interface AnalyticsData {
  visitors: number;
  conversions: number;
  revenue: number;
  bounceRate: number;
  timestamp: Date;
}

// ─── Factories ──────────────────────────────────────────────────

export function createUser(overrides?: Partial<User>): User {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    avatar: faker.image.avatar(),
    role: faker.helpers.arrayElement(['admin', 'manager', 'editor', 'viewer']),
    status: faker.helpers.arrayElement(['active', 'active', 'active', 'inactive', 'pending']),
    joinedAt: faker.date.past({ years: 2 }),
    ...overrides,
  };
}

export function createUsers(count: number): User[] {
  return Array.from({ length: count }, () => createUser());
}

export function createTask(overrides?: Partial<Task>): Task {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 3, max: 7 }),
    description: faker.lorem.paragraph(),
    assignee: faker.person.fullName(),
    priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'critical']),
    status: faker.helpers.arrayElement(['todo', 'in-progress', 'review', 'done']),
    dueDate: faker.date.future({ years: 1 }),
    ...overrides,
  };
}

export function createTasks(count: number): Task[] {
  return Array.from({ length: count }, () => createTask());
}

export function createAnalyticsSnapshot(): AnalyticsData {
  return {
    visitors: faker.number.int({ min: 100, max: 50000 }),
    conversions: faker.number.int({ min: 10, max: 5000 }),
    revenue: faker.number.float({ min: 100, max: 100000, fractionDigits: 2 }),
    bounceRate: faker.number.float({ min: 10, max: 90, fractionDigits: 1 }),
    timestamp: faker.date.recent({ days: 1 }),
  };
}

export function createAnalyticsSeries(days: number): AnalyticsData[] {
  return Array.from({ length: days }, () => createAnalyticsSnapshot());
}
