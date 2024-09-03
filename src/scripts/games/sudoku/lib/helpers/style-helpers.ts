export const addModuleStyles = (
  template: string,
  styles: { [x: string]: string },
) => {
  const pattern = /mc:(\w+)/g;
  let newTemplate = template;

  let match = pattern.exec(template);
  while (match) {
    newTemplate = newTemplate.replace(match[0], styles[match[1]]);

    match = pattern.exec(template);
  }

  return newTemplate;
};
