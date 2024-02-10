export const parser = "tsx"; // Adjust if your code is not TSX

const transformations = {
  findByIdAndUpdate: "findByPkAndUpdate", // Sequelize method
  findById: "findByPk",
  findByIdAndDelete: "findByPkAndDelete"
};

export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.CallExpression) // Target CallExpressions
    .filter((path) => {
      return Object.keys(transformations).includes(path.node.callee.property.name);
    })

    .forEach((path) => {
      console.log(path);
      const replacementName = transformations[path.node.callee.property.name];
      console.log(replacementName);

      if (replacementName) {
        // Preserve arguments and add 'new: true' if needed
        const transformedArgs = [
          // Existing arguments: studentId, updateStudentDto
          path.node.arguments[0],
          path.node.arguments[1],
          // Add 'new: true' if not already present
          ...(!path.node.arguments[2] || !path.node.arguments[2].properties.some((prop) => prop.key.name === "new")
            ? [j.objectProperty(j.identifier("new"), j.booleanLiteral(true))]
            : [])
        ];
        console.log(transformedArgs);

        j(path).replaceWith(
          j.callExpression(
            j.memberExpression(
              j.thisExpression(), // Access the current object
              j.identifier(replacementName, true) // Explicitly add the dot between studentModel and replacementName
            ), // Acess studentModel and the replacement method
            transformedArgs
          )
        );
      } else {
        console.warn(`Unable to find replacement for call: ${path.node.callee.name}`);
      }
    })
    .toSource();
}
