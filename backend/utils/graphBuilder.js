/**
 * Constructs a graph represented as an adjacency list while tracking parent-child relationships.
 * Adheres to "first parent wins" and tracks duplicates/invalid entries.
 */
const buildRelationGraph = (entries, validateFn) => {
    const adjList = new Map();
    const nodeParentMap = new Map();
    const invalidEntries = [];
    const duplicatesSet = new Set();
    const recordedEdges = new Set();
    
    let validFormatCount = 0;

    entries.forEach(entry => {
        const trimmed = entry?.trim() || "";

        if (!validateFn(trimmed)) {
            invalidEntries.push(entry);
            return;
        }

        validFormatCount++;

        if (recordedEdges.has(trimmed)) {
            duplicatesSet.add(trimmed);
            return;
        }

        recordedEdges.add(trimmed);
        const [source, target] = trimmed.split("->");

        // First parent wins: ignore if child already has a parent
        if (nodeParentMap.has(target)) return;

        nodeParentMap.set(target, source);

        if (!adjList.has(source)) adjList.set(source, []);
        adjList.get(source).push(target);
    });

    return {
        graph: adjList,
        parentRef: nodeParentMap,
        invalid: invalidEntries,
        duplicates: Array.from(duplicatesSet),
        input_stats: {
            total_entries: entries.length,
            valid_format: validFormatCount,
            invalid_format: invalidEntries.length,
            duplicates: duplicatesSet.size
        }
    };
};

module.exports = { buildRelationGraph };