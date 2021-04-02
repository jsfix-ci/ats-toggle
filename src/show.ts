import Table = require("cli-table");
import { ExpectedPlistModel, Runtime } from "./types";
import { load } from "./load";

export async function show(plistPath: string) {
  const runtime: Runtime | null = await load(plistPath);
  if (!runtime) {
    return;
  }

  const model: ExpectedPlistModel = runtime.model;
  const { NSExceptionDomains } = model.NSAppTransportSecurity;
  const atsStatus = !!NSExceptionDomains ? "Disabled" : "Enabled";
  const table = new Table({ head: ["Feature", "Status"] });
  table.push(["App Transport Security", atsStatus]);
  console.log(table.toString());
}
