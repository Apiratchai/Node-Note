import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Doc, Id } from '../../../convex/_generated/dataModel';
import { ForceGraph3D } from 'react-force-graph'; // Import the ForceGraph3D component

const GraphView = () => {
    // Fetch data using useQuery
    const documents = useQuery(api.documents.getForGraph);
    const [graphData, setGraphData] = useState(null); // State to store graph data

    useEffect(() => {
        // Sample data structure
        const sampleData = {
            "nodes": [
                { "id": 1, "name": "Node 1" },
                { "id": 2, "name": "Node 2" },
                { "id": 3, "name": "Node 3" }
            ],
            "links": [
                { "source": 1, "target": 2 },
                { "source": 2, "target": 3 },
                { "source": 3, "target": 1 }
            ]
        };

        // Set the sample data to the state
        setGraphData(sampleData);
    }, []); // Empty dependency array ensures this effect runs only once

    // Render the ForceGraph3D component with the fetched data
    return (
        <div>
            {graphData && (
                <ForceGraph3D
                    nodeAutoColorBy="group"
                    graphData={graphData} />
            )}
        </div>
    );
}

export default GraphView;
