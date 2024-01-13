import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';


const BgForceGraph = () => {
  const simulationRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const center = { x: width / 2, y: height / 2 };

    const nodes = createNodes(center, width, height);

    const links = createLinks(nodes, 0.01);

    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-20)) // Increase repulsion between nodes
      .force('collision', d3.forceCollide().radius(d => d.radius + 100).strength(0.05))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink(links).id(d => d.id).strength(0.01))
      .force('x', d3.forceX().strength(0.01))
      .force('y', d3.forceY().strength(0.01));

    const canvas = d3.select('#bgForceGraph').append('canvas')
      .attr('width', width)
      .attr('height', height)
      .style('position', 'fixed')
      .style('top', 0)
      .style('left', 0)
      .style('right', 0)
      .style('bottom', 0)
      .style('pointer-events', 'none')
      .style('z-index', -1)
      .style('background-image', 'linear-gradient(180deg, #545e7c , #2025b6 )'); // Apply background image directly to the canvas

    const context = canvas.node().getContext('2d');

    simulation.on('tick', () => {
      context.clearRect(0, 0, width, height);
      context.save();

      // Draw links
      context.beginPath();
      links.forEach(link => {
        context.moveTo(link.source.x, link.source.y);
        context.lineTo(link.target.x, link.target.y);
      });
      context.strokeStyle = 'rgba(255, 255, 255, 0.3)'; // Set link color and opacity
      context.stroke();

      // Draw nodes
      nodes.forEach(d => {
        context.beginPath();
        context.arc(d.x, d.y, d.radius, 0, 2 * Math.PI);
        context.fillStyle = '#1e40af'; // Set node color
        context.fill();
      });

      context.restore();
    });

    simulationRef.current = simulation;

    // Animation loop for continuous movement
    const animate = () => {
      simulationRef.current.alpha(0.3).restart();
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  function createNodes(center, width, height) {
    return d3.range(60).map(() => {
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.sqrt(Math.random()) * Math.min(width, height) / 2;

      const x = center.x + radius * Math.cos(angle);
      const y = center.y + radius * Math.sin(angle);

      return {
        id: uuidv4(),
        x,
        y,
        radius: Math.random() * 50 + 7,
      };
    });
  }

  function createLinks(nodes, linkProbability) {
    const links = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() < linkProbability) {
          links.push({ source: nodes[i], target: nodes[j] });
        }
      }
    }
    return links;
  }

  return <div id="bgForceGraph"></div>;
};

export default BgForceGraph;
