export type Nullable<T> = T | null;

export type NullableObject<T> = { [K in keyof T]: T[K] | null };

export type DeepNullable<T> = {
  [K in keyof T]: DeepNullable<T[K]> | null;
};

export enum ContactType {
  TENANT,
  SERVICE_WORKER,
}

export enum RequestCategory {
  UNIT_LEASE,
}

export enum InvoiceCategory {
  UNIT_CHARGE,
}

export enum UnitStatus {
  GOOD,
  MAINTAINING,
  BAD,
}
