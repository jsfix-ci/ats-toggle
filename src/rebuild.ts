import * as fs from "fs";
import * as chalk from "chalk";
import * as plist from "plist";

import { Runtime } from "./types";

export async function rebuild(runtime: Runtime): Promise<boolean> {
  if (!runtime) {
    return false;
  }

  try {
    const content: string = plist.build(runtime.model);
    await fs.promises.writeFile(runtime.targetFile, content, "utf8");
    console.log(
      chalk.greenBright(`✔︎ Updated ${runtime.targetFile}`),
    );
  } catch (err) {
    console.log(chalk.redBright(`"X ${err.message}`));
    return false;
  }
  return true;
}
