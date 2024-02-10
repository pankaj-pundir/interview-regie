// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
// export const parser = "tsx";

// Press ctrl+space for code completion
// export const parser = "tsx"; // Adjust if your code is not TSX

const transformations = {
  findById: "findByPk",
  findByIdAndDelete: "findByPkAndDelete",
  findByIdAndUpdate: "findByPkAndUpdate", // Added transformation
};

export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.Identifier)
    .filter((path) => {
      return Object.keys(transformations).includes(path.node.name);
    })
    .forEach((path) => {
      const replacementName = transformations[path.node.name];
      j(path).replaceWith(j.identifier(replacementName));
    })
    .toSource();
}


// running commands
// npx jscodeshift --transform transform.ts --dry --parser tsx --extensions ts src/student/student.controller.ts
// npx jscodeshift --transform transform.ts --dry --parser tsx --extensions ts src
// npx jscodeshift --transform transform.ts --parser tsx --extensions ts src



// export const parser = "tsx"; // Adjust if your code is not TSX

// const transformations = {
//   findById: "findByPk",
//   findByIdAndDelete: "destroy", // Sequelize method for deletion
//   findByIdAndUpdate: "findByPkAndUpdate"
// };

// export default function transformer(file, api) {
//   const j = api.jscodeshift;

//   return j(file.source)
//     .find(j.CallExpression) // Target CallExpressions
//     .filter((path) => {
//       // Match exact method names (case-insensitive)
//       const calleeName = path.node.callee.name;
//       const lowerCaseName = calleeName ? calleeName.toLowerCase() : null;

//       return (
//         lowerCaseName &&
//         (lowerCaseName === "findbyid" || lowerCaseName === "findbyidandupdate" || lowerCaseName === "findbyidanddelete")
//       );
//     })
//     .forEach((path) => {
//       const replacementName = transformations[path.node.callee.name.toLowerCase()];

//       if (replacementName) {
//         // Ensure replacementName exists
//         const transformedArgs = path.node.arguments.map((arg) => j(arg).toSource()); // Preserve arguments

//         // Remove 'exec()' calls directly:
//         if (
//           path.node.callee.property.name === "exec" // Handle potentially missing properties
//         ) {
//           j(path).replaceWith(j.callExpression(j.identifier(replacementName), transformedArgs));
//         } else {
//           // Regular transformation for other cases
//           j(path).replaceWith(j.callExpression(j.identifier(replacementName), transformedArgs));
//         }
//       } else {
//         console.warn(`Unable to find replacement for call: ${path.node.callee.name}`); // Log warnings for unmatched calls
//       }
//     })
//     .toSource();
// }









// // not the correct code

// export const parser = "tsx"; // Adjust if your code is not TSX

// const transformations = {
//   findByIdAndUpdate: "findByPkAndUpdate" // Sequelize method
// };

// export default function transformer(file, api) {
//   const j = api.jscodeshift;

//   return j(file.source)
//     .find(j.CallExpression) // Target CallExpressions
//     .filter((path) => {
//       return Object.keys(transformations).includes(path.node.callee.property.name);
//     })

//     .forEach((path) => {
//       const replacementName = transformations[path.node.callee.property.name];

//       if (replacementName) {
//         // Preserve arguments and add 'new: true' if needed
//         const transformedArgs = [
//           // Existing arguments: studentId, updateStudentDto
//           path.node.arguments[0],
//           path.node.arguments[1],
//           // Add 'new: true' if not already present
//           ...(!path.node.arguments[2] ||
//           !path.node.arguments[2].properties.some((prop) => prop.key.name === "new")
//             ? [j.objectProperty(j.identifier("new"), j.booleanLiteral(true))]
//             : [])
//         ];

//         j(path).replaceWith(
//   j.callExpression(
//     j.memberExpression(
//       j.thisExpression(), // Access the current object
//       j.memberExpression(
//         j.identifier("studentModel"),
//         j.identifier(replacementName, true) // Explicitly add the dot between studentModel and replacementName
//       )
//     ), // Access studentModel and the replacement method
//     transformedArgs
//   )
// );

//       } else {
//         console.warn(`Unable to find replacement for call: ${path.node.callee.name}`);
//       }
//     })
//     .toSource();
// }







// // student model missing

// export const parser = "tsx"; // Adjust if your code is not TSX

// const transformations = {
//   findByIdAndUpdate: "findByPkAndUpdate" // Sequelize method
// };

// export default function transformer(file, api) {
//   const j = api.jscodeshift;

//   return j(file.source)
//     .find(j.CallExpression) // Target CallExpressions
//     .filter((path) => {
//       return Object.keys(transformations).includes(path.node.callee.property.name);
//     })

//     .forEach((path) => {
//       const replacementName = transformations[path.node.callee.property.name];

//       if (replacementName) {
//         // Preserve arguments and add 'new: true' if needed
//         const transformedArgs = [
//           // Existing arguments: studentId, updateStudentDto
//           path.node.arguments[0],
//           path.node.arguments[1],
//           // Add 'new: true' if not already present
//           ...(!path.node.arguments[2] || !path.node.arguments[2].properties.some((prop) => prop.key.name === "new")
//             ? [j.objectProperty(j.identifier("new"), j.booleanLiteral(true))]
//             : [])
//         ];

//         console.log(path);
//         j(path).replaceWith(
//           j.callExpression(
//             j.memberExpression(
//               j.thisExpression(), // Access the current object

//               j.identifier(replacementName, true) // Explicitly add the dot between studentModel and replacementName
//             ), // Access studentModel and the replacement method
//             transformedArgs
//           )
//         );
//       } else {
//         console.warn(`Unable to find replacement for call: ${path.node.callee.name}`);
//       }
//     })
//     .toSource();
// }
