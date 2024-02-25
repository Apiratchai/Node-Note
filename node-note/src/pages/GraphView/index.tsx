import React, { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import NoteTakingLayout from "../../../components/NoteTakingLayout";

function App() {
    const [graphData, setGraphData] = useState(null);
    const documents = useQuery(api.documents.getSearch); // Fetch all documents
    const [search] = useState("");

    // Filter documents based on your criteria
    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    });

    useEffect(() => {
        // Construct graph data using all documents or filtered documents, as needed
        if (documents) {
            const nodes = [];
            const edges = [];

            documents.forEach(document => {
                nodes.push({
                    id: document._id,
                    label: document.title
                });

                if (document.parentDocument) {
                    edges.push({
                        from: document._id,
                        to: document.parentDocument
                    });
                }
            });

            const graphData = {
                nodes: nodes,
                edges: edges
            };
            setGraphData(graphData);
        }
    }, [documents]);

    const options = {
        hierarchical: {
            enable: false,
            direction: "UD",
            sortMethod: "directed",
            nodeSpacing: 250,
            levelSeparation: 300,
            treeSpacing: 400,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,

        },
        edges: {
            color: "#888", // Adjust edge color
            width: 2, // Adjust edge width
        },
        interaction: {
            multiselect: true,
            navigation: true,
            hover: true, // Enable node hover effect
        },
        height: "830px", // Increase height for better visualization
        width: "1450px", // Adjust width as needed
        nodes: {
            font: {
                size: 30,
            },

        },
        physics: {
            enabled: true,
            barnesHut: {
                gravitationalConstant: -8000,
                springConstant: 0.05,
                springLength: 200,
            },
        },
    };


    const events = {
        select: function (event) {
            var { nodes, edges } = event;
        }
    };

    return (
        <NoteTakingLayout>
            <div className="">
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
        </NoteTakingLayout>
    );
}

export default App;
