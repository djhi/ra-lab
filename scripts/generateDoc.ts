import fs from "fs";
import path from "path";
import glob from "tiny-glob";

const generateDoc = async () => {
  const packages = fs.readdirSync(path.resolve(__dirname, "../packages"));

  for (const packageName of packages) {
    const template = fs.readFileSync(
      path.resolve(__dirname, "../packages", packageName, "README_template.md"),
      "utf-8"
    );
    const docFiles = (await glob(
      `${path.resolve(__dirname, "../packages", packageName, "src")}/**/*.md`
    )).sort(sortByDepth);
    let docContent = template;

    for (const docFile of docFiles) {
      // Add a new line
      docContent += "\n";
      // Add the content of the file
      docContent += fs.readFileSync(path.resolve(__dirname, '..', docFile), "utf-8");
    }

    fs.writeFileSync(
      path.resolve(__dirname, "../packages", packageName, "README.md"),
      docContent
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
