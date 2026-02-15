import React, { useMemo } from "react";
import ReactFlow, { Background, Controls, MarkerType } from "reactflow";
import "reactflow/dist/style.css";
import "./ResearchFlowchart.css";

const ResearchFlowchart = ({ flowNodes, flowEdges, isPreview = false }) => {
  // Generate nodes and edges from flowNodes array
  const { nodes, edges } = useMemo(() => {
    const generatedNodes = [];
    const generatedEdges = [];

    const horizontalSpacing = isPreview ? 160 : 280;
    const verticalSpacing = isPreview ? 70 : 100;

    // Check if new format (objects) or old format (strings)
    const isNewFormat =
      flowNodes.length > 0 &&
      typeof flowNodes[0] === "object" &&
      flowNodes[0].id;

    if (isNewFormat) {
      // New format with custom positioning
      flowNodes.forEach((node) => {
        const nodeType = node.type || "normal";

        // Determine node style based on type
        let nodeStyle = {
          background: "#000",
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "8px",
          padding: isPreview ? "8px 12px" : "12px 16px",
          fontSize: isPreview ? "9px" : "12px",
          fontWeight: "600",
          width: isPreview ? "130px" : "220px",
          textAlign: "center",
          minHeight: isPreview ? "40px" : "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        };

        // Style variations based on node type
        if (nodeType === "start") {
          nodeStyle.background =
            "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)";
          nodeStyle.border = "2px solid rgba(100, 200, 255, 0.6)";
          nodeStyle.fontWeight = "700";
        } else if (nodeType === "end") {
          nodeStyle.background =
            "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)";
          nodeStyle.border = "2px solid rgba(100, 255, 150, 0.6)";
          nodeStyle.fontWeight = "700";
        } else if (nodeType === "split" || nodeType === "merge") {
          nodeStyle.background =
            "linear-gradient(135deg, #2a1a1a 0%, #3a2a2a 100%)";
          nodeStyle.border = "2px solid rgba(255, 200, 100, 0.5)";
        } else if (
          nodeType === "parallel" ||
          nodeType === "branch-left" ||
          nodeType === "branch-right"
        ) {
          nodeStyle.background =
            "linear-gradient(135deg, #1a1a2a 0%, #2a2a3a 100%)";
          nodeStyle.border = "1.5px solid rgba(200, 150, 255, 0.5)";
        }

        generatedNodes.push({
          id: node.id,
          data: { label: node.label },
          position: {
            x: node.col * horizontalSpacing,
            y: node.row * verticalSpacing,
          },
          type: "default",
          style: nodeStyle,
        });
      });

      // Create edges from flowEdges array
      if (flowEdges && flowEdges.length > 0) {
        flowEdges.forEach((edge, index) => {
          const isFeedback = edge.type === "feedback";

          generatedEdges.push({
            id: `edge-${index}`,
            source: edge.from,
            target: edge.to,
            type: isFeedback ? "smoothstep" : "smoothstep",
            animated: !isPreview && !isFeedback,
            style: {
              stroke: isFeedback ? "rgba(255, 255, 255, 0.3)" : "#fff",
              strokeWidth: isPreview ? 1.5 : 2,
              strokeDasharray: isFeedback ? "5,5" : "none",
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: isFeedback ? "rgba(255, 255, 255, 0.3)" : "#fff",
              width: isPreview ? 15 : 20,
              height: isPreview ? 15 : 20,
            },
          });
        });
      }
    } else {
      // Old format - simple grid layout
      const nodesPerRow = 3;
      flowNodes.forEach((label, index) => {
        const row = Math.floor(index / nodesPerRow);
        const col = index % nodesPerRow;

        generatedNodes.push({
          id: `node-${index}`,
          data: { label },
          position: {
            x: col * horizontalSpacing,
            y: row * verticalSpacing,
          },
          type: "default",
          style: {
            background: "#000",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "8px",
            padding: isPreview ? "8px 12px" : "12px 16px",
            fontSize: isPreview ? "10px" : "12px",
            fontWeight: "500",
            width: isPreview ? "140px" : "200px",
            textAlign: "center",
          },
        });

        // Create edge to next node
        if (index < flowNodes.length - 1) {
          generatedEdges.push({
            id: `edge-${index}`,
            source: `node-${index}`,
            target: `node-${index + 1}`,
            type: "smoothstep",
            animated: !isPreview,
            style: {
              stroke: "#fff",
              strokeWidth: isPreview ? 1 : 2,
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "#fff",
              width: isPreview ? 15 : 20,
              height: isPreview ? 15 : 20,
            },
          });
        }
      });
    }

    return { nodes: generatedNodes, edges: generatedEdges };
  }, [flowNodes, flowEdges, isPreview]);

  return (
    <div className={`research-flowchart ${isPreview ? "preview" : "full"}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: isPreview ? 0.15 : 0.2 }}
        nodesDraggable={!isPreview}
        nodesConnectable={false}
        elementsSelectable={!isPreview}
        zoomOnScroll={!isPreview}
        panOnScroll={!isPreview}
        panOnDrag={!isPreview}
        minZoom={isPreview ? 0.8 : 0.5}
        maxZoom={isPreview ? 1 : 1.5}
        attributionPosition="bottom-right"
      >
        <Background
          color="#333"
          gap={isPreview ? 12 : 16}
          size={isPreview ? 0.5 : 1}
        />
        {!isPreview && <Controls showInteractive={false} />}
      </ReactFlow>
    </div>
  );
};

export default ResearchFlowchart;
