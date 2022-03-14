import { useEffect, useState } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import {
  Column,
  createInsertArgs,
  createInsertStatement,
  createTableStatement,
  IfNotExists,
  NotNull,
  PrimaryKey,
  Table,
} from "../../model/sqlite";
import { Await, FinalResult } from "../../types/helpers";
import { useClientScript } from "../../view/clientModule";
import { CodeBlock } from "../../view/code";
import { formatJavaScript } from "../../view/codeFormatting";

function* BreakfastFoodsSchema() {
  // const id: unique symbol = yield PrimaryKey(Column("id", "INTEGER"));
  // const name: unique symbol = yield NotNull(Column("name", "TEXT"));
  // const healthyLevel: unique symbol = yield Column("healthyLevel", "INTEGER");
  // const imageData: unique symbol = yield Column("imageData", "BLOB");
  const id: number = yield PrimaryKey(Column("id", "INTEGER"));
  const name: string = yield NotNull(Column("name", "TEXT"));
  const healthyLevel: number = yield Column("healthyLevel", "INTEGER");
  const imageData: Uint8Array = yield Column("imageData", "BLOB");
  return { id, name, healthyLevel, imageData } as const;
}

const BreakfastFoodsTable = IfNotExists(
  Table("breakfastFoods", BreakfastFoodsSchema)
);

export async function loader(args: Parameters<LoaderFunction>[0]) {
  return {
    source: {
      components: {
        BreakfastFoodsSchema: formatJavaScript(BreakfastFoodsSchema.toString()),
      },
      functions: {
        createTableStatement: formatJavaScript(createTableStatement.toString()),
      },
    },
  };
}

function setUpDatabase(database: any) {
  const breakfastFoodsCreateTableStatement =
    createTableStatement(BreakfastFoodsTable);
  database.run(breakfastFoodsCreateTableStatement);

  database.run(
    ...createInsertArgs(BreakfastFoodsTable, {
      name: "banana",
      healthyLevel: 4,
    })
  );
  database.run(
    ...createInsertArgs(BreakfastFoodsTable, { name: "apple", healthyLevel: 5 })
  );
  database.run(
    ...createInsertArgs(BreakfastFoodsTable, {
      name: "muesli",
      healthyLevel: 4,
    })
  );

  // database.run(`INSERT INTO breakfastFoods(name) VALUES ("banana");`);
  // database.run(`INSERT INTO breakfastFoods(name) VALUES ("apple");`);
  // database.run(`INSERT INTO breakfastFoods(name) VALUES ("muesli");`);
  const [
    {
      values: [[count]],
    },
  ] = database.exec(`SELECT COUNT(*) FROM breakfastFoods;`);
  console.log({ count });

  const all = database.exec(`SELECT * FROM breakfastFoods;`);
  console.log(all);
}

export default function MakeSqlite() {
  const data: Await<ReturnType<typeof loader>> = useLoaderData();

  const breakfastFoodsCreateTableStatement =
    createTableStatement(BreakfastFoodsTable);
  const insertStatement = createInsertStatement(BreakfastFoodsTable, {
    name: "banana",
    healthyLevel: 5,
  });

  const sqlJSRoot = new URL(
    "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/"
  );

  const sqlLoaded = useClientScript(
    <script
      src={new URL("sql-wasm.min.js", sqlJSRoot).toString()}
      integrity="sha512-l5XgljO54rARJoeqQoY4w0sAJVFd/0GVSvFNtr9YSCSEe+M7Lg0tDw7WQg1J06Mr0/2f9M6ExdHBChwxWammKA=="
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
  );
  const [database, setDatabase] = useState(null as any);
  useEffect(() => {
    if (sqlLoaded) {
      async function main() {
        const SQL = await (window as any).initSqlJs({
          locateFile: (file: string) => new URL(file, sqlJSRoot).toString(),
        });
        const db = new SQL.Database();
        setUpDatabase(db);
        setDatabase(db);
      }
      main();
    }
  }, [sqlLoaded]);

  function renderQuery(query: string) {
    if (database == null) return <></>;

    const result = database.exec(query);
    return (
      <div>
        <CodeBlock language="sql">{query}</CodeBlock>
        <CodeBlock language="json">{JSON.stringify(result, null, 2)}</CodeBlock>
      </div>
    );
  }

  return (
    <main data-measure="wide center">
      <h1>Sqlite</h1>

      <div>
        <CodeBlock language="javascript">
          {data.source.components.BreakfastFoodsSchema}
        </CodeBlock>
        <div>
          <CodeBlock language="sql">
            {breakfastFoodsCreateTableStatement}
          </CodeBlock>
          <CodeBlock language="sql">{insertStatement}</CodeBlock>
          {renderQuery("SELECT COUNT(*) FROM breakfastFoods;")}
          {renderQuery("SELECT * FROM breakfastFoods;")}
        </div>
      </div>
    </main>
  );
}
