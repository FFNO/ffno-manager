export type Nullable<T> = T | null;

export type NullableObject<T> = { [K in keyof T]: T[K] | null };

export type DeepNullable<T> = {
  [K in keyof T]: DeepNullable<T[K]> | null;
};

export enum MemberRole {
  ADMIN,
  LANDLORD,
  TENANT,
  SERVICE_WORKER,
}

export enum ContactType {
  TENANT,
  SERVICE_WORKER,
}

export enum Gender {
  MALE,
  FEMALE,
}

export enum PropertyType {
  SINGLE_UNIT,
  MULTIPLE_UNIT,
}

export enum InvoiceStatus {
  PENDING,
  PAID,
  PARTIAL,
  OVERDUE,
}

export enum InvoiceCategory {
  UNIT_CHARGE,
}

export enum RequestCategory {
  UNIT_LEASE,
}

export enum RequestStatus {
  PENDING,
  ACCEPTED,
  REJECTED,
}

export enum UnitStatus {
  GOOD,
  MAINTAINING,
  BAD,
}
