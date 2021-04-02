import * as inq from "inquirer";
import * as chalk from "chalk";
import Table = require("cli-table");
import { ExpectedPlistModel, Runtime } from "./types";
import { load } from "./load";
import { rebuild } from "./rebuild";

export async function ask(
  message: string,
): Promise<{ answer: boolean }> {
  return inq.prompt({
    type: "confirm",
    name: "answer",
    message,
  });
}

export async function toggle(plistPath: string) {
  const runtime: Runtime | null = await load(plistPath);
  if (!runtime) {
    return;
  }

  const model: ExpectedPlistModel = runtime.model;

  let atsStatus;

  if (!model.NSAppTransportSecurity.NSAllowsArbitraryLoads) {
    const { answer } = await ask(
      "App Transport Security is currently Enabled. Do you want to Disable App Transport Security?",
    );
    if (!answer) {
      console.log(
        chalk.yellow(`✔︎ No changes made to ${runtime.targetFile}`),
      );
      return;
    }
    // ats is enabled. disable ats
    model.NSAppTransportSecurity.NSAllowsArbitraryLoads = true;
    model.NSAppTransportSecurity.NSExceptionDomains = {
      localhost: {
        NSExceptionAllowsInsecureHTTPLoads: true,
      },
    };
    atsStatus = "Disabled";
  } else {
    const { answer } = await ask(
      "App Transport Security is currently Disabled. Do you want to Enable App Transport Security?",
    );
    if (!answer) {
      console.log(
        chalk.yellow(`✔︎ No changes made to ${runtime.targetFile}`),
      );
      return;
    }
    // ats is disabled. enable ats
    model.NSAppTransportSecurity.NSAllowsArbitraryLoads = false;
    delete model.NSAppTransportSecurity.NSExceptionDomains;
    atsStatus = "Enabled";
  }

  const success: boolean = await rebuild(runtime);

  if (!success) {
    return;
  }

  const table = new Table({ head: ["Feature", "Status"] });
  table.push(["App Transport Security", atsStatus]);
  console.log(table.toString());
}
