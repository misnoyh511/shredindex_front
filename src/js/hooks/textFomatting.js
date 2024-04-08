const titleCase = (string) => string.replace(/^_*(.)|_+(.)/g, (c, d) => (c ? c.toUpperCase() : ` ${d.toUpperCase()}`));

export default titleCase;
