const nodes = [
  { id: "01", title: "Client", detail: "Browser / UI", className: "node-client" },
  { id: "02", title: "API layer", detail: "Routes + validation", className: "node-api" },
  { id: "03", title: "Business logic", detail: "Services + rules", className: "node-logic" },
  { id: "04", title: "Data layer", detail: "MongoDB / persistence", className: "node-data" },
];
export function ArchitectureMap() {
  return <div className="architecture-wrap"><div className="architecture-map" aria-label="Simplified request flow diagram">{nodes.map((node, i) => <div className={`architecture-node ${node.className}`} key={node.id}><span>{node.id}</span><strong>{node.title}</strong><small>{node.detail}</small>{i < nodes.length - 1 && <div className="node-arrow" aria-hidden="true">↓</div>}</div>)}</div><p className="diagram-caption">REQUEST FLOW / CONCEPTUAL MAP — adapt to each project’s actual architecture.</p></div>;
}
