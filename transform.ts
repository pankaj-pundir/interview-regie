// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
// export const parser = "tsx";

// Press ctrl+space for code completion
export default function transform(file, api) {
    const j = api.jscodeshift;
  
    return j(file.source)
      .find(j.Identifier)
      .forEach((path) => {
        j(path).replaceWith(
          j.identifier(path.node.name.split("").reverse().join(""))
        );
      })
      .toSource();
  }
  

// running commands
// npx jscodeshift --transform transform.ts --dry --parser tsx --extensions ts src/student/student.controller.ts
// npx jscodeshift --transform transform.ts --dry --parser tsx --extensions ts src
// npx jscodeshift --transform transform.ts --parser tsx --extensions ts src
