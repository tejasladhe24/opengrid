import {
  pgEnum,
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  jsonb,
  numeric,
  integer,
} from "drizzle-orm/pg-core"
import { timestamps } from "./utils"
import { relations } from "drizzle-orm"

const entityTypes = ["CUSTOMER", "BUSINESS"] as const
const visibilities = ["PUBLIC", "PRIVATE"] as const

export const $entityType = pgEnum("entityType", entityTypes)
export const $visibility = pgEnum("visibility", visibilities)

export const $user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").default(false).notNull(),
  image: text("image"),
  entityType: $entityType("entityType").notNull(),
  ...timestamps,
})

export type DBUser = typeof $user.$inferSelect

export const $session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expiresAt").notNull(),
    token: text("token").notNull().unique(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId")
      .notNull()
      .references(() => $user.id, { onDelete: "cascade" }),
    activeOrganizationId: text("activeOrganizationId"),
    ...timestamps,
  },
  (table) => [index("session_userId_idx").on(table.userId)]
)

export type DBSession = typeof $session.$inferSelect

export const $account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => $user.id, { onDelete: "cascade" }),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("idToken"),
    accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
    refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
    scope: text("scope"),
    password: text("password"),
    ...timestamps,
  },
  (table) => [index("account_userId_idx").on(table.userId)]
)

export type DBAccount = typeof $account.$inferSelect

export const $verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
    ...timestamps,
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
)

export type DBVerification = typeof $verification.$inferSelect

export const $organization = pgTable("organization", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  logo: text("logo"),
  metadata: jsonb("metadata"),
  visibility: $visibility("visibility").default("PUBLIC").notNull(),
  ...timestamps,
})

export const $businessRelations = relations($organization, ({ many }) => ({
  members: many($member),
}))

export type DBOrganization = typeof $organization.$inferSelect

const MEMBER_ROLES = ["member", "admin", "owner"] as const

export const $role = pgEnum("role", MEMBER_ROLES)

export type DBRole = (typeof $role.enumValues)[number]

export const $member = pgTable("member", {
  id: text("id").primaryKey(),
  organizationId: text("organizationId")
    .notNull()
    .references(() => $organization.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => $user.id, { onDelete: "cascade" }),
  role: $role("role").default("member").notNull(),
  ...timestamps,
})

export const $memberRelations = relations($member, ({ one }) => ({
  organization: one($organization, {
    fields: [$member.organizationId],
    references: [$organization.id],
  }),
  user: one($user, {
    fields: [$member.userId],
    references: [$user.id],
  }),
}))

export type DBmember = typeof $member.$inferSelect & {
  user: typeof $user.$inferSelect
}

export const $invitation = pgTable("invitation", {
  id: text("id").primaryKey(),
  organizationId: text("organizationId")
    .notNull()
    .references(() => $organization.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  role: text("role"),
  status: text("status").default("pending").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  inviterId: text("inviterId")
    .notNull()
    .references(() => $user.id, { onDelete: "cascade" }),
})

export type DBInvitation = typeof $invitation.$inferSelect

export const $product = pgTable("product", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  images: text("images"),
  metadata: jsonb("metadata"),
  organizationId: text("organizationId")
    .notNull()
    .references(() => $organization.id, { onDelete: "cascade" }),
  ...timestamps,
})

export type DBProduct = typeof $product.$inferSelect

export const $userBusinessRelationshipType = pgEnum(
  "userBusinessRelationshipType",
  ["DIRECT", "PLATFORM"]
)

export const $order = pgTable("order", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => $user.id, { onDelete: "cascade" }),
  organizationId: text("organizationId")
    .notNull()
    .references(() => $organization.id, { onDelete: "cascade" }),
  relationshipType: $userBusinessRelationshipType("relationshipType").notNull(),
  totalAmount: numeric("totalAmount", { precision: 10, scale: 2 }).notNull(),
  platformFee: numeric("platformFee", { precision: 10, scale: 2 }).notNull(),
  ...timestamps,
})

export type DBOrder = typeof $order.$inferSelect

export const $orderItem = pgTable("orderItem", {
  id: text("id").primaryKey(),
  orderId: text("orderId")
    .notNull()
    .references(() => $order.id, { onDelete: "cascade" }),
  productId: text("productId")
    .notNull()
    .references(() => $product.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  ...timestamps,
})

export const $referral = pgTable("referral", {
  id: text("id").primaryKey(),
  organizationId: text("organizationId")
    .notNull()
    .references(() => $organization.id, { onDelete: "cascade" }),
  referralCode: text("referralCode").unique(),
  ...timestamps,
})

export type DBReferral = typeof $referral.$inferSelect

export const $pointsLedger = pgTable("pointsLedger", {
  id: text("id").primaryKey(),
  entityType: $entityType("entityType").notNull(),
  userId: text("userId").references(() => $user.id, { onDelete: "cascade" }),
  organizationId: text("organizationId").references(() => $organization.id, {
    onDelete: "cascade",
  }),
  delta: integer("delta").notNull(),
  message: text("message").notNull(),
  ...timestamps,
})

export type DBPointsLedger = typeof $pointsLedger.$inferSelect

export const schema = {
  // enums
  entityType: $entityType,
  role: $role,
  visibility: $visibility,

  // tables
  user: $user,
  session: $session,
  account: $account,
  verification: $verification,
  organization: $organization,
  member: $member,
  invitation: $invitation,
  order: $order,
  orderItem: $orderItem,
  referral: $referral,
  pointsLedger: $pointsLedger,

  // relations
  businessRelations: $businessRelations,
  memberRelations: $memberRelations,
}
