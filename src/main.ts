import { createCommand } from "commander";
import { show } from "./show";
import { toggle } from "./toggle";

async function main() {
  const program = createCommand();
  program.version(
    "1.0.0",
    "-v, --version",
    "output the current version",
  );
  program
    .command("show <plist_path>")
    .description("show the current ATS status")
    .action(async (plistPath: string) => {
      await show(plistPath);
    });
  program
    .command("toggle <plist_path>")
    .description("toggle ATS on or off")
    .action(async (plistPath: string) => {
      await toggle(plistPath);
    });
  await program.parseAsync(process.argv);
}

main().catch((err) => console.error(err));
