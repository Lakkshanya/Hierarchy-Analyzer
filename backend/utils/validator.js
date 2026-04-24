/**
 * Validates if an edge follows the pattern "X->Y" where X and Y are single uppercase letters.
 */
const isWellFormedEdge = (raw) => {
    if (typeof raw !== "string") return false;
    
    const entry = raw.trim();
    const edgePattern = /^[A-Z]->[A-Z]$/;

    if (!edgePattern.test(entry)) return false;

    const [src, dest] = entry.split("->");
    return src !== dest; // Self-loops invalid
};

module.exports = { isWellFormedEdge };