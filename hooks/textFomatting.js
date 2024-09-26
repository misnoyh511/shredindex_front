const titleCase = (string) => string.replace(/^_*(.)|_+(.)/g, (c, d) => (c ? c.toUpperCase() : ` ${d.toUpperCase()}`));

export const textWithLineBreaks = ({ text }) => {
  if (text) {
    return text.split('\n\n').map((paragraph) =>
      `<p>${paragraph.replace(/\n/g, '<br />')}</p>`
    ).join('');
  }
  return '';
};
export default titleCase;
