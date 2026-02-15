import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import "./ResearchFlow.css";

// Custom Node Component
const CustomNode = ({ data }) => {
  return (
    <div className={`custom-node ${data.type}`}>
      <div className="node-icon">{data.icon}</div>
      <div className="node-title">{data.label}</div>
      {data.tooltip && <div className="node-tooltip">{data.tooltip}</div>}
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const ResearchFlow = ({ onPaperClick }) => {
  // Define nodes with phases
  const initialNodes = [
    {
      id: "1",
      type: "custom",
      position: { x: 50, y: 200 },
      data: {
        label: "Research Idea",
        icon: "💡",
        type: "research",
        tooltip:
          "Identifying problems and opportunities in real-world scenarios",
      },
    },
    {
      id: "2",
      type: "custom",
      position: { x: 250, y: 200 },
      data: {
        label: "Literature Review",
        icon: "📚",
        type: "research",
        tooltip:
          "Studying existing work, papers, and state-of-the-art solutions",
      },
    },
    {
      id: "3",
      type: "custom",
      position: { x: 450, y: 200 },
      data: {
        label: "Problem Definition",
        icon: "🎯",
        type: "research",
        tooltip: "Clearly defining research objectives and scope",
      },
    },
    {
      id: "4",
      type: "custom",
      position: { x: 650, y: 200 },
      data: {
        label: "Methodology Design",
        icon: "🔬",
        type: "research",
        tooltip: "Planning the research approach and experimental framework",
      },
    },
    {
      id: "5",
      type: "custom",
      position: { x: 850, y: 200 },
      data: {
        label: "Tech Stack Selection",
        icon: "⚙️",
        type: "development",
        tooltip: "Choosing tools, frameworks, and technologies",
      },
    },
    {
      id: "6",
      type: "custom",
      position: { x: 1050, y: 200 },
      data: {
        label: "System Architecture",
        icon: "🏗️",
        type: "development",
        tooltip: "Designing system components and data flow",
      },
    },
    {
      id: "7",
      type: "custom",
      position: { x: 1250, y: 200 },
      data: {
        label: "Implementation",
        icon: "💻",
        type: "development",
        tooltip: "Building prototypes and conducting experiments",
      },
    },
    {
      id: "8",
      type: "custom",
      position: { x: 1450, y: 200 },
      data: {
        label: "Result Analysis",
        icon: "📊",
        type: "evaluation",
        tooltip: "Analyzing data, metrics, and experimental outcomes",
      },
    },
    {
      id: "9",
      type: "custom",
      position: { x: 1650, y: 200 },
      data: {
        label: "Paper Writing",
        icon: "✍️",
        type: "evaluation",
        tooltip: "Documenting findings and preparing manuscript",
      },
    },
    {
      id: "10",
      type: "custom",
      position: { x: 1850, y: 200 },
      data: {
        label: "Publication",
        icon: "🎓",
        type: "publication",
        tooltip: "Submitting and publishing research papers",
        isPublication: true,
      },
    },
    // Extra nodes
    {
      id: "11",
      type: "custom",
      position: { x: 850, y: 50 },
      data: {
        label: "Team Collaboration",
        icon: "👥",
        type: "support",
        tooltip: "Working with advisors, peers, and domain experts",
      },
    },
    {
      id: "12",
      type: "custom",
      position: { x: 1250, y: 350 },
      data: {
        label: "Iterations",
        icon: "🔄",
        type: "support",
        tooltip: "Refining approach based on feedback and results",
      },
    },
    {
      id: "13",
      type: "custom",
      position: { x: 1850, y: 350 },
      data: {
        label: "Future Work",
        icon: "🚀",
        type: "support",
        tooltip: "Identifying extensions and improvement opportunities",
      },
    },
  ];

  // Define edges (connections)
  const initialEdges = [
    // Main flow
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
      type: "smoothstep",
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      animated: true,
      type: "smoothstep",
    },
    {
      id: "e3-4",
      source: "3",
      target: "4",
      animated: true,
      type: "smoothstep",
    },
    {
      id: "e4-5",
      source: "4",
      target: "5",
      animated: true,
      type: "smoothstep",
    },
    {
      id: "e5-6",
      source: "5",
      target: "6",
      animated: true,
      type: "smoothstep",
    },
    {
      id: "e6-7",
      source: "6",
      target: "7",
      animated: true,
      type: "smoothstep",
    },
    {
      id: "e7-8",
      source: "7",
      target: "8",
      animated: true,
      type: "smoothstep",
    },
    {
      id: "e8-9",
      source: "8",
      target: "9",
      animated: true,
      type: "smoothstep",
    },
    {
      id: "e9-10",
      source: "9",
      target: "10",
      animated: true,
      type: "smoothstep",
    },

    // Supporting connections
    {
      id: "e11-5",
      source: "11",
      target: "5",
      animated: false,
      type: "smoothstep",
      style: { stroke: "#666" },
    },
    {
      id: "e11-6",
      source: "11",
      target: "6",
      animated: false,
      type: "smoothstep",
      style: { stroke: "#666" },
    },
    {
      id: "e11-7",
      source: "11",
      target: "7",
      animated: false,
      type: "smoothstep",
      style: { stroke: "#666" },
    },

    {
      id: "e7-12",
      source: "7",
      target: "12",
      animated: false,
      type: "smoothstep",
      style: { stroke: "#666" },
    },
    {
      id: "e12-6",
      source: "12",
      target: "6",
      animated: false,
      type: "smoothstep",
      style: { stroke: "#666" },
    },

    {
      id: "e10-13",
      source: "10",
      target: "13",
      animated: false,
      type: "smoothstep",
      style: { stroke: "#666" },
    },
  ];

  const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, _setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback(
    (event, node) => {
      if (node.data.isPublication && onPaperClick) {
        onPaperClick();
      }
    },
    [onPaperClick],
  );

  return (
    <div className="research-flow-container">
      <div className="flow-header">
        <h2 className="flow-title">Research Journey Visualization</h2>
        <p className="flow-subtitle">
          An interactive timeline of my research methodology and publication
          process
        </p>
      </div>

      <div className="flow-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.5}
          maxZoom={1.5}
          defaultEdgeOptions={{
            style: { stroke: "#fff", strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: "#fff" },
          }}
        >
          <Background color="#333" gap={16} size={1} variant="dots" />
          <Controls className="flow-controls" showInteractive={false} />
          <MiniMap
            className="flow-minimap"
            nodeColor={(node) => {
              switch (node.data.type) {
                case "research":
                  return "#4a9eff";
                case "development":
                  return "#22c55e";
                case "evaluation":
                  return "#f59e0b";
                case "publication":
                  return "#ef4444";
                case "support":
                  return "#8b5cf6";
                default:
                  return "#666";
              }
            }}
            maskColor="rgba(0, 0, 0, 0.6)"
          />
        </ReactFlow>
      </div>

      <div className="flow-legend">
        <div className="legend-item">
          <div className="legend-color research"></div>
          <span>Research Phase</span>
        </div>
        <div className="legend-item">
          <div className="legend-color development"></div>
          <span>Development Phase</span>
        </div>
        <div className="legend-item">
          <div className="legend-color evaluation"></div>
          <span>Evaluation Phase</span>
        </div>
        <div className="legend-item">
          <div className="legend-color publication"></div>
          <span>Publication Phase</span>
        </div>
        <div className="legend-item">
          <div className="legend-color support"></div>
          <span>Supporting Activities</span>
        </div>
      </div>
    </div>
  );
};

export default ResearchFlow;
