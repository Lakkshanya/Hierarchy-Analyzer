/**
 * Analyzes the graph to identify hierarchies, cycles, and calculate summary statistics.
 */

const getUniqueNodes = (graph, parents) => {
    const nodes = new Set();
    graph.forEach((children, parent) => {
        nodes.add(parent);
        children.forEach(c => nodes.add(c));
    });
    parents.forEach((p, c) => {
        nodes.add(p);
        nodes.add(c);
    });
    return nodes;
};

const detectCycle = (node, graph, visited, recStack) => {
    if (recStack.has(node)) return true;
    if (visited.has(node)) return false;

    visited.add(node);
    recStack.add(node);

    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors) {
        if (detectCycle(neighbor, graph, visited, recStack)) return true;
    }

    recStack.delete(node);
    return false;
};

const buildNestedStructure = (node, graph) => {
    const subtree = {};
    const children = graph.get(node) || [];
    children.forEach(child => {
        subtree[child] = buildNestedStructure(child, graph);
    });
    return subtree;
};

const calculateTreeDepth = (node, graph) => {
    const children = graph.get(node) || [];
    if (children.length === 0) return 1;

    let maxBranchDepth = 0;
    children.forEach(child => {
        maxBranchDepth = Math.max(maxBranchDepth, calculateTreeDepth(child, graph));
    });
    return maxBranchDepth + 1;
};

const processHierarchies = (graph, parentRef) => {
    const allNodes = getUniqueNodes(graph, parentRef);
    const globalVisited = new Set();
    const resultHierarchies = [];

    let treeCount = 0;
    let cycleCount = 0;
    let maxPathDepth = 0;
    let topTreeRoot = "";

    allNodes.forEach(node => {
        if (globalVisited.has(node)) return;

        const componentNodes = new Set();
        const traversalStack = [node];
        while (traversalStack.length > 0) {
            const current = traversalStack.pop();
            if (componentNodes.has(current)) continue;
            componentNodes.add(current);
            globalVisited.add(current);

            (graph.get(current) || []).forEach(child => traversalStack.push(child));
            if (parentRef.has(current)) traversalStack.push(parentRef.get(current));
        }

        const orphans = Array.from(componentNodes).filter(n => !parentRef.has(n));
        const componentRoot = orphans.length > 0 
            ? orphans.sort()[0] 
            : Array.from(componentNodes).sort()[0];

        const hasGraphCycle = detectCycle(componentRoot, graph, new Set(), new Set());

        if (hasGraphCycle) {
            cycleCount++;
            resultHierarchies.push({
                root: componentRoot,
                tree: {},
                has_cycle: true,
                nodes: Array.from(componentNodes).sort()
            });
        } else {
            treeCount++;
            const treeStructure = { [componentRoot]: buildNestedStructure(componentRoot, graph) };
            const currentDepth = calculateTreeDepth(componentRoot, graph);

            if (currentDepth > maxPathDepth || (currentDepth === maxPathDepth && componentRoot < topTreeRoot)) {
                maxPathDepth = currentDepth;
                topTreeRoot = componentRoot;
            }

            resultHierarchies.push({
                root: componentRoot,
                tree: treeStructure,
                depth: currentDepth
            });
        }
    });

    return {
        hierarchies: resultHierarchies,
        summary: {
            total_trees: treeCount,
            total_cycles: cycleCount,
            largest_tree_root: topTreeRoot || null
        }
    };
};

module.exports = { processHierarchies };