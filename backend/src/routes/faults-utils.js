function parseJsonArray(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [value];
  } catch {
    return value.split(/[;；]/).map((s) => s.trim()).filter(Boolean);
  }
}

function formatFault(fault) {
  return {
    ...fault,
    causes: parseJsonArray(fault.causes),
    relatedParts: parseJsonArray(fault.relatedParts),
    solutions: parseJsonArray(fault.solutions)
  };
}

module.exports = { parseJsonArray, formatFault };
