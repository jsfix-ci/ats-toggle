import * as fs from "fs";
import * as path from "path";
import * as chalk from "chalk";
import * as plist from "plist";
import { ExpectedPlistModel, Runtime } from "./types";

export async function load(
  plistPath: string,
): Promise<Runtime | null> {
  const targetFile = path.resolve(plistPath);
  console.log(chalk.yellow(`Parsing: ${targetFile}`));
  let model: ExpectedPlistModel;
  try {
    const { readFile } = fs.promises;
    const content = await readFile(targetFile, { encoding: "utf8" });
    model = plist.parse(content) as ExpectedPlistModel;
  } catch (err) {
    console.log(chalk.redBright(`"X ${err.message}`));
    return null;
  }

  const { NSAppTransportSecurity = null } = model;

  if (!NSAppTransportSecurity) {
    console.log(
      chalk.redBright(
        "X Missing NSAppTransportSecurity key in Info.plist",
      ),
    );
    return null;
  }
  return { model, targetFile };
}
