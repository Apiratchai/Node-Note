import { useQuery } from "convex/react";
import React, { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { api } from "../../../convex/_generated/api";

function App() {
    const [graphData, setGraph] = useState(null);
    const documents = useQuery(api.documents.getSearch); // Fetch all documents
    const [search] = useState("");

    // Filter documents based on your criteria
    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    });

    useEffect(() => {
        const graphData = {
            nodes: [
                { id: 1, label: "Node 1", title: "node 1 tooltip text" },
                { id: 2, label: "Node 2", title: "node 2 tooltip text" },
                { id: 3, label: "Node 3", title: "node 3 tooltip text" },
                { id: 4, label: "Node 4", title: "node 4 tooltip text" },
                { id: 5, label: "Node 5", title: "node 5 tooltip text" }
            ],
            edges: [
                { from: 1, to: 2 },
                { from: 1, to: 3 },
                { from: 2, to: 4 },
                { from: 2, to: 5 }
            ]
        };

        setGraph(graphData);
    }, []);

    const options = {
        layout: {
            hierarchical: true
        },
        edges: {
            color: "#000000"
        },
        height: "500px"
    };

    const events = {
        select: function (event) {
            var { nodes, edges } = event;
        }
    };

    return (
        <div className="flex flex-col"> {/* Apply flex properties for column layout */}
            {filteredDocuments?.map((document, index) => (
                <div
                    key={document._id}
                    role="button"
                    className="flex items-center border-b py-2"
                >
                    <span className="pl-2 hover:bg-gray-100 w-full">
                        {document.title}
                    </span>
                </div>
            ))}
            <div>
                {graphData && (
                    <Graph
                        graph={graphData}
                        options={options}
                        events={events}
                    />
                )}

            </div>
        </div>
    );
}

    export default App;
