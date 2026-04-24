const express = require("express");
const cors = require("cors");

const { isWellFormedEdge } = require("./utils/validator");
const { buildRelationGraph } = require("./utils/graphBuilder");
const { processHierarchies } = require("./utils/hierarchy");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({ error: "Input 'data' must be an array of strings." });
        }

        const { graph, parentRef, invalid, duplicates, input_stats } = 
            buildRelationGraph(data, isWellFormedEdge);

        const { hierarchies, summary } = 
            processHierarchies(graph, parentRef);

        res.json({
            user_id: "lakkshanyasuresh_01072005",
            email_id: "ls4150@srmist.edu.in",
            college_roll_number: "RA2311003020481",
            hierarchies,
            invalid_entries: invalid,
            duplicate_edges: duplicates,
            input_stats,
            summary
        });

    } catch (error) {
        console.error("Backend Processing Error:", error);
        res.status(500).json({ error: "An internal server error occurred while processing the hierarchy." });
    }
});

app.listen(PORT, () => {
    console.log(`Hierarchy Analyzer API running on port ${PORT}`);
});