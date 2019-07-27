export default function getSourceName(sourcesList, sourceCode) {
  if (!sourcesList) {
    return '';
  }

  const source = sourcesList.filter(p => p.source_name === sourceCode)[0];

  return source ? source.display_name : '';
}
