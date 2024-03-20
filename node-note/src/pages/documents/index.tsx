import React, { useEffect, useRef, useState } from "react";
import Graph from "react-graph-vis";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import NoteTakingLayout from "../../../components/NoteTakingLayout";
import { MenuIcon, LocateFixedIcon } from "lucide-react";
import { Button } from "../../../@/components/ui/button";
import { useRouter } from "next/router";

interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}

const App = ({ isCollapsed, onResetWidth }: NavbarProps) => {
    const [graphData, setGraphData] = useState(null);
    const [redrawGraph, setRedrawGraph] = useState(false); // State variable to trigger graph redraw
    const documents = useQuery(api.documents.getSearch);
    const router = useRouter();
    const graphRef = useRef(null);
    const [nodePositions, setNodePositions] = useState({});


    useEffect(() => {
        if (documents) {
            const nodes = [];
            const edges = [];
            const groupColors = {};
            const predefinedColors = [
                '#FF5733', '#33FF57', '#5733FF', '#FF33C3', '#33C3FF', '#C3FF33',
                '#FF3333', '#33FF33', '#3333FF', '#FF3366', '#FF9933', '#33FF99',
                '#333333', '#CCCCCC', '#FF66FF', '#66FFFF', '#6666FF', '#FF0066',
                '#0066FF', '#66FF00'
            ];
            let colorIndex = 0;

            documents.forEach((document) => {
                nodes.push({
                    id: document._id,
                    label: document.title,
                    parent: document.parentDocument
                });

                if (document.parentDocument) {
                    edges.push({
                        from: document._id,
                        to: document.parentDocument
                    });
                }

                const group = document.parentDocument ? document.parentDocument.toString() : document._id.toString();
                if (!groupColors[group]) {
                    groupColors[group] = predefinedColors[colorIndex];
                    colorIndex = (colorIndex + 1) % predefinedColors.length; // Move to the next color
                }
            });

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
        function propagateColor(node, color, allNodes, groupColors) {
            node.color = color;
            allNodes.forEach((n) => {
                if (n.parent === node.id) {
                    propagateColor(n, color, allNodes, groupColors);
                }
            });
        }
    }, [documents, redrawGraph]); // Include redrawGraph in dependencies to trigger graph redraw


    const options = {
        layout: {
            hierarchical: {
                enabled: true,
                direction: 'DU',
                sortMethod: 'directed',
                levelSeparation: 250, // Decrease this value for closer trees
                treeSpacing: 150, // Decrease this value for closer trees
                blockShifting: true,
                edgeMinimization: true,
                parentCentralization: true,
            },
        },
        nodes: {
            font: {
                size: 20,
            },
            shape: 'dot',
            size: 20,
            borderWidth: 2,
            chosen: {
                node: function (values, id, selected, hovering) {
                    values.borderWidth = selected || hovering ? 4 : 2;
                },
            },
            dragging: true, // Enable node dragging
        },
        edges: {
            color: '#888',
            width: 2,
        },
        height: "772px",
        width: "1440px",
        physics: {
            enabled: true,
        },
        stabilization: {
            enabled: true,
        },
    };


    const events = {
        selectNode: function (event) {
            const { nodes } = event;
            if (nodes.length > 0) {
                const nodeId = nodes[0]; // Assuming only one node is selected
                const documentUrl = `/documents/${nodeId}`; // Construct the document URL
                router.push(documentUrl); // Navigate to the document URL
            }
        },
    };

    const handleRedrawGraph = () => {
        setRedrawGraph((prevState) => !prevState); // Toggle redrawGraph state to force graph redraw
    };

    return (
        <NoteTakingLayout>
            <div className="flex justify-center items-center h-full w-full graphbg">
                <div className="flex flex-col items-center relative">
                    <nav className="pl-5 bg-white flex items-center gap-x-4">
                        {isCollapsed && (
                            <MenuIcon
                                role="button"
                                onClick={onResetWidth}
                                className="h-6 w-6 hover:bg-gray-100 cursor-pointer"
                            />
                        )}
                        <div className="flex items-center justify-between w-full py-2">
                            <div className="font-semibold text-3xl pl-0 pr-4">GraphView</div>
                        </div>
                    </nav>
                    <div className="absolute top-[80%] right-[3%] mt-4 mr-4 z-[999999999999]">
                        <Button onClick={handleRedrawGraph} className="cursor-pointer">
                            <LocateFixedIcon className="h-[60px] w-[60px] text-blue-500" />
                            <div className="pt-1 text-blue-600">RESET</div>
                        </Button>
                    </div>
                    <div className="absolute top-[60%] right-[5%] text-gray-500 flex flex-col">
                        <p className="font-semibold mb-2">How to Use This Graph View</p>
                        <ul className="list-disc pl-5">
                            <li>Click nodes to open documents.</li>
                            <li>Drag nodes to move them.</li>
                            <li>Click &quot;Reset&quot; to reset the graph.</li>
                            <li>Scroll to zoom in/out.</li>
                            <li>Drag on whitespace to pan.</li>
                        </ul>
                    </div>

                    {graphData && (
                        <Graph key={redrawGraph} graph={graphData} options={options} events={events} ref={graphRef} />
                    )}
                </div>
            </div>
        </NoteTakingLayout>
    );
};

export default App;
