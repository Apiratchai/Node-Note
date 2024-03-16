import React, { useEffect, useRef, useState } from "react";
import Graph from "react-graph-vis";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import NoteTakingLayout from "../../../components/NoteTakingLayout";
import { MenuIcon } from "lucide-react";
import { Button } from "../../../@/components/ui/button";

interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}

const App = ({ isCollapsed, onResetWidth }: NavbarProps) => {
    const [graphData, setGraphData] = useState(null);
    const documents = useQuery(api.documents.getSearch); // Fetch all documents
    const [search] = useState("");

    // Filter documents based on your criteria
    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    });

    const graphRef = useRef(null);// for recentering

    useEffect(() => {
        // Construct graph data using all documents or filtered documents, as needed
        if (documents) {
            const nodes = [];
            const edges = [];
            const groupColors = {}; // Object to store colors for each group

            documents.forEach((document) => {
                nodes.push({
                    id: document._id,
                    label: document.title,
                    parent: document.parentDocument // Store parent information in each node
                });

                if (document.parentDocument) {
                    edges.push({
                        from: document._id,
                        to: document.parentDocument
                    });
                }

                // Assign group colors based on parentDocument
                const group = document.parentDocument ? document.parentDocument.toString() : document._id.toString();
                if (!groupColors[group]) {
                    groupColors[group] = getRandomColor(); // Generate a random color for each group
                }
            });

            // Propagate color from great-grandparents to their descendants
            nodes.forEach((node) => {
                if (!node.parent) {
                    const color = groupColors[node.id.toString()];
                    propagateColor(node, color, nodes, groupColors);
                }
            });

            const graphData = {
                nodes: nodes,
                edges: edges
            };
            setGraphData(graphData);
        }
    }, [documents]);

    function propagateColor(node, color, allNodes, groupColors) {
        node.color = color;
        allNodes.forEach((n) => {
            if (n.parent === node.id) {
                propagateColor(n, color, allNodes, groupColors);
            }
        });
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        let lastColorValue = -1; // Initialize with a value outside the color range

        // Generate light shades for each color component
        for (let i = 0; i < 3; i++) {
            let randomValue;
            do {
                randomValue = Math.floor(Math.random() * 128) + 128; // Limit to range 128-255 for lighter shades
            } while (Math.abs(randomValue - lastColorValue) < 32); // Ensure a minimum difference of 32 between color components

            color += letters[randomValue >> 4]; // Get hexadecimal digit for the first component
            color += letters[randomValue & 0x0F]; // Get hexadecimal digit for the second component

            lastColorValue = randomValue;
        }
        return color;
    }


    const options = {
        layout: {
            hierarchical: {
                enabled: true,
                direction: 'DU', // You can also use 'RL' for Right to Left radial layout
                sortMethod: 'directed',
                levelSeparation: 200, // Adjust the distance between levels
                treeSpacing: 10, // Adjust the spacing between trees (groups)
                blockShifting: true,
                edgeMinimization: true,
                parentCentralization: true,
            },
        },
        autoResize: true,
        nodes: {
            font: {
                size: 30,
            },
            shape: 'dot',
            borderWidth: 2,
            chosen: {
                node: function (values, id, selected, hovering) {
                    values.borderWidth = selected || hovering ? 4 : 2;
                },
            },
        },
        edges: {
            color: '#888',
            width: 2,
        },
        interaction: {
            multiselect: true,
            hover: true,
            zoomView: true,
        },
        navigationButtons: true,
        height: "500", // Increase height for better visualization
        width: "500", // Adjust width as needed
        // height: "772px", // Increase height for better visualization
        // width: "1440px", // Adjust width as needed
        physics: {
            enabled: true,
            hierarchicalRepulsion: {
                centralGravity: 0, // Set centralGravity to 0 for center-to-outer layout
                springLength: 100, // Adjust springLength for node spacing
                springConstant: 0.05, // Adjust springConstant for layout tension
                nodeDistance: 300, // Adjust nodeDistance for radial distance
            },
        },
    };

    const events = {
        select: function (event) {
            var { nodes, edges } = event;
        },
    };

    const handleRecenter = () => {
        console.log('Recentering...');
        console.log('Graph ref:', graphRef.current); // Check if graphRef is valid
        console.log('Graph network:', graphRef.current?.network); // Check if network is valid
        if (graphRef.current && graphRef.current.network) {
            graphRef.current.network.fit(); // Fit the graph to re-center it
        }
    };


    return (
        <NoteTakingLayout>
            <div className="flex justify-center items-center h-full">
                <div className="flex flex-col items-center">
                    <nav className="pl-5 bg-white flex items-center gap-x-4">
                        {isCollapsed && (
                            <MenuIcon
                                role="button"
                                onClick={onResetWidth}
                                className="h-6 w-6 hover:bg-gray-100"
                            />
                        )}
                        <div className="flex items-center justify-between w-full py-2">
                            <div className="font-semibold text-3xl">GraphView</div>
                        </div>
                    </nav>
                    <nav className="absolute flex justify-center top-[85%] right-[10%] z-[9999999]">
                        <div>
                            <Button onClick={handleRecenter}>Recenter</Button>
                        </div>
                    </nav>
                    {graphData && (
                        <Graph graph={graphData} options={options} events={events} ref={graphRef} />
                    )}
                </div>
            </div>
        </NoteTakingLayout>
    );
};

export default App;