import type { PackageManager } from "./getUserPkgManager";
import { execa } from "./execAsync";

export const runPkgManagerInstall = async (opts: {
  packageManager: PackageManager;
  devMode: boolean;
  projectDir: string;
  packages: string[];
}) => {
  const { packageManager, devMode, projectDir, packages } = opts;

  const installCmd =
    packageManager === "yarn"
      ? `${packageManager} add`
      : `${packageManager} install`;
  const flag = devMode ? "-D" : "";
  const fullCmd = `${installCmd} ${flag} ${packages.join(" ")}`;
  await execa(fullCmd, { cwd: projectDir });
};
