import { FinalResult } from "../types/helpers";

const column = Symbol("column");
const primaryKeyColumn = Symbol("primaryKeyColumn");
const tableDefinition = Symbol("tableDefinition");

export const ids = {
  column,
  primaryKeyColumn,
  tableDefinition,
} as const;

export type ColumnStorageType = "INTEGER" | "REAL" | "TEXT" | "BLOB";

export function Column(name: string, storageType: ColumnStorageType) {
  return Object.freeze({
    type: ids.column,
    name,
    storageType,
    nullable: true,
  } as const);
}

export function NotNull(column: ReturnType<typeof Column>) {
  return Object.freeze({
    type: ids.column,
    name: column.name,
    storageType: column.storageType,
    nullable: false,
  } as const);
}

export function PrimaryKey(column: ReturnType<typeof Column>) {
  return Object.freeze({
    type: ids.primaryKeyColumn,
    name: column.name,
    storageType: column.storageType,
  } as const);
}

type ColumnsComponent<Result> = () => Generator<
  ReturnType<typeof Column | typeof NotNull | typeof PrimaryKey>,
  Result,
  void
>;

export function Table<ColumnsResult>(
  name: string,
  columns: ColumnsComponent<ColumnsResult>
) {
  return Object.freeze({
    type: ids.tableDefinition,
    name,
    columns,
    ifNotExists: false,
  } as const);
}

export function IfNotExists<ColumnsResult>(
  table: Readonly<{
    type: typeof tableDefinition;
    name: string;
    columns: ColumnsComponent<ColumnsResult>;
    ifNotExists: false;
  }>
) {
  return Object.freeze({
    ...table,
    ifNotExists: true,
  } as const);
}

export function createTableStatement(
  tableDefinition: ReturnType<typeof Table | typeof IfNotExists>
) {
  const { name, columns, ifNotExists } = tableDefinition;

  return [
    `CREATE TABLE `,
    ifNotExists ? `IF NOT EXISTS ` : "",
    `${name}(\n\t`,
    Array.from(
      function* () {
        for (const message of columns()) {
          if (message.type === ids.column) {
            if (message.nullable) {
              yield `${message.name} ${message.storageType}`;
            } else {
              yield `${message.name} ${message.storageType} NOT NULL`;
            }
          } else if (message.type === ids.primaryKeyColumn) {
            yield `${message.name} ${message.storageType} PRIMARY KEY`;
          }
        }
      }.call(null)
    ).join(",\n\t"),
    "\n);",
  ].join("");
}

export function createInsertStatement<
  ColumnsResult extends Record<string, number | string | Uint8Array>
>(
  tableDefinition: Readonly<{
    name: string;
    columns: ColumnsComponent<ColumnsResult>;
  }>,
  values: Partial<ColumnsResult>
) {
  const { name } = tableDefinition;
  const valuesMap = new Map(Object.entries(values));

  return [
    `INSERT INTO `,
    `${name}(`,
    Array.from(valuesMap.keys()).join(", "),
    `) VALUES (`,
    Array.from(valuesMap.keys(), (key) => `:${key}`).join(", "),
    `);`,
  ].join("");
}

export function createInsertArgs<
  ColumnsResult extends Record<string, number | string | Uint8Array>
>(
  tableDefinition: Readonly<{
    name: string;
    columns: ColumnsComponent<ColumnsResult>;
  }>,
  values: Partial<ColumnsResult>
) {
  return [
    createInsertStatement(tableDefinition, values),
    Object.fromEntries(
      Array.from(Object.entries(values), ([key, value]) => [`:${key}`, value])
    ),
  ];
}
