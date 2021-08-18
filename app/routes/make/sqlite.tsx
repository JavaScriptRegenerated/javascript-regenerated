import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { LoaderFunction, useRouteData } from "remix";
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
import { ClientModule } from "../../view/clientModule";
import { CodeBlock } from "../../view/code";
import { formatJavaScript } from "../../view/codeFormatting";
import { X } from "../../view/structure";

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

type BreakfastFoodsColumnTypes = FinalResult<ReturnType<typeof BreakfastFoodsSchema>>

const BreakfastFoodsTable = IfNotExists(
  Table("breakfastFoods", BreakfastFoodsSchema)
);
// const BreakfastFoodsTable = IfNotExists(
//   Table("breakfastFoods", BreakfastFoodsSchema)
// );

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

const clientSource = `
  console.log(window.initSqlJs);
  async function main() {
    const SQL = await window.initSqlJs({ locateFile: file => \`https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/\${file}\` });
    const db = new SQL.Database();
    const binaryArray = db.export();
    console.log(db.export());
  }
  main();
`;

export default function MakeSqlite() {
  const data: Await<ReturnType<typeof loader>> = useRouteData();

  const [sqlLoaded, updateSqlLoaded] = useState(false);
  const breakfastFoodsCreateTableStatement =
    createTableStatement(BreakfastFoodsTable);
  const insertStatement = createInsertStatement(BreakfastFoodsTable, { name: "banana", healthyLevel: 5 });

  useLayoutEffect(() => {
    const el = (
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/sql-wasm.min.js"
        integrity="sha512-l5XgljO54rARJoeqQoY4w0sAJVFd/0GVSvFNtr9YSCSEe+M7Lg0tDw7WQg1J06Mr0/2f9M6ExdHBChwxWammKA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
    );

    const script = document.createElement("script");
    Object.assign(script, el.props);
    script.addEventListener("load", () => {
      updateSqlLoaded(true);
    });
    document.body.appendChild(script);
  }, []);
  useEffect(() => {
    if (sqlLoaded) {
      async function main() {
        const SQL = await (window as any).initSqlJs({
          locateFile: (file: string) =>
            `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/${file}`,
        });
        const db = new SQL.Database();
        
        db.run(breakfastFoodsCreateTableStatement);

        db.run(...createInsertArgs(BreakfastFoodsTable, { name: "banana", healthyLevel: 4 }));
        db.run(...createInsertArgs(BreakfastFoodsTable, { name: "apple", healthyLevel: 5 }));
        db.run(...createInsertArgs(BreakfastFoodsTable, { name: "muesli", healthyLevel: 4 }));

        // db.run(`INSERT INTO breakfastFoods(name) VALUES ("banana");`);
        // db.run(`INSERT INTO breakfastFoods(name) VALUES ("apple");`);
        // db.run(`INSERT INTO breakfastFoods(name) VALUES ("muesli");`);
        const [{ values: [[count]] }] = db.exec(`SELECT COUNT(*) FROM breakfastFoods;`)
        console.log({ count });

        const all = db.exec(`SELECT * FROM breakfastFoods;`)
        console.log(all);

        console.log(db.export());
      }
      main();
    }
  }, [sqlLoaded]);

  return (
    <main data-measure="center">
      <h1>Sqlite</h1>

      <div>
        <CodeBlock language="javascript">
          {data.source.components.BreakfastFoodsSchema}
        </CodeBlock>
        <div>
          <CodeBlock language="sql">
            {breakfastFoodsCreateTableStatement}
          </CodeBlock>
          <CodeBlock language="sql">
            {insertStatement}
          </CodeBlock>
        </div>
      </div>
      {sqlLoaded && <ClientModule source={clientSource} />}
    </main>
  );
}
