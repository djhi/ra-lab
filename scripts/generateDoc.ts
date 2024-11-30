import fs from "fs";
import path from "path";
import glob from "tiny-glob";

const generateDoc = async () => {
  const packages = fs.readdirSync(path.resolve(__dirname, "../packages"));
  let content = [];

  for (const packageName of packages) {
    const docFiles = (await glob(
      `${path.resolve(__dirname, "../packages", packageName, "src")}/**/*.md`
    )).sort(sortByDepth);
    for (const docFile of docFiles) {
      // Add the content of the file
      content.push(fs.readFileSync(path.resolve(__dirname, '..', docFile), "utf-8"));
    }

    fs.writeFileSync(
      path.resolve(__dirname, "../packages", packageName, "README.md"),
      content.join("\n")
    );
  }
};

const sortByDepth = (a: string, b: string) => {
  return a.split("/").length - b.split("/").length;
}

generateDoc()
  .then(() => {
    console.log("Documentation generated");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error generating documentation", error);
    process.exit(1);
  });
