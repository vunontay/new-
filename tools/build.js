import path from "path";
import fs from "fs";

function renderTemplate(template, locals) {
  const result = template.replace(/{{\s*([^}\s]+)\s*}}/g, (match, key) => {
    return locals[key] !== undefined ? locals[key] : "";
  });
  return result;
}

function parseLocals(localsString) {
  if (!localsString) {
    return {};
  }
  try {
    const trimmedString = localsString.replace(/^\s*|\s*$/g, "");
    const strippedString = trimmedString.replace(/^'([\s\S]*)'$/, "$1");
    const result = JSON.parse(strippedString);
    return result;
  } catch (error) {
    console.error("Error parsing locals:", error);
    console.error("Problematic string:", localsString);
    return {};
  }
}

function processIncludes(html, parentDir, parentLocals = {}) {
  const includeRegex =
    /<include\s+src="(.+?)"(?:\s+locals='([\s\S]*?)')?(?:\s+locals="([\s\S]*?)")?\s*><\/include>/g;

  let match;
  let newHtml = html;

  while ((match = includeRegex.exec(newHtml)) !== null) {
    const [includeTag, src, singleQuoteLocals, doubleQuoteLocals] = match;
    const filePath = path.resolve(parentDir, src);

    let content = "";
    try {
      content = fs.readFileSync(filePath, "utf-8");
    } catch (err) {
      console.error(`Error reading file: ${filePath}`, err);
      continue;
    }

    let locals = { ...parentLocals };
    const localsString = singleQuoteLocals || doubleQuoteLocals;
    if (localsString) {
      const parsedLocals = parseLocals(localsString);
      locals = { ...locals, ...parsedLocals };
    }

    content = renderTemplate(content, locals);
    content = processIncludes(content, path.dirname(filePath), locals);
    newHtml = newHtml.replace(includeTag, content);
  }
  return newHtml;
}

function htmlIncludePlugin() {
  return {
    name: "html-include-plugin",
    transformIndexHtml(html, { filename }) {
      const result = processIncludes(html, path.dirname(filename));
      return result;
    },
  };
}
function htmlTransformIndexHtml() {
  return {
    name: "html-transform",
    transformIndexHtml(html) {
      return html
        .replace("<%= title %>", "Default theme")
        .replace("<%= description %>", "Defaul theme agapifa");
    },
  };
}

function renameHtmlPlugin() {
  return {
    name: "rename-html-plugin",
    closeBundle() {
      const oldPath = path.resolve("dist/default/index.html");
      const newPath = path.resolve("dist/default/default.html");
      if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
      }
    },
  };
}
export { htmlIncludePlugin, htmlTransformIndexHtml, renameHtmlPlugin };
