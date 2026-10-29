/**
 * atlas-graph.ts — Systems Atlas Architectural Knowledge Graph
 * Defines nodes, clusters, and architectural relationships connecting R&D projects.
 */

export interface AtlasNode {
  id: string;
  name: string;
  tier: 'Tier A' | 'Tier B' | 'Tier C' | 'Tier D';
  cluster: 'Agentic AI' | 'Security & Governance' | 'Memory & Provenance' | 'Knowledge & RAG' | 'Edge & Embedded' | 'Quantum & Trust';
  stage: 'Concept' | 'Design' | 'Prototype' | 'Validated' | 'Deployed' | 'Collaborative';
  shortDesc: string;
  differentiator: string;
  slug?: string; // Links to case study if available
  x: number;     // Normalized coordinate (-100 to 100)
  y: number;     // Normalized coordinate (-100 to 100)
  size: number;   // Radius for visualization
}

export interface AtlasLink {
  source: string;
  target: string;
  relation: string;
}

export const ATLAS_CLUSTERS = [
  { id: 'Agentic AI', label: 'Agentic AI & Runtimes', color: 'var(--accent-blue, #2563EB)' },
  { id: 'Security & Governance', label: 'Security & Tool Governance', color: 'var(--color-primary, #EF4444)' },
  { id: 'Memory & Provenance', label: 'Memory & Provenance', color: 'var(--accent-violet, #7C3AED)' },
  { id: 'Knowledge & RAG', label: 'Knowledge & RAG Labs', color: 'var(--accent-teal, #0F766E)' },
  { id: 'Edge & Embedded', label: 'Edge & Embedded Systems', color: 'var(--accent-amber, #D97706)' },
  { id: 'Quantum & Trust', label: 'Quantum & Cryptographic Trust', color: '#0284C7' },
] as const;

export const ATLAS_NODES: AtlasNode[] = [
  // Tier A: Flagships
  {
    id: 'PX01',
    name: 'Paradox AI',
    tier: 'Tier A',
    cluster: 'Agentic AI',
    stage: 'Validated',
    shortDesc: 'Contract-governed agent runtime with task-DAGs and transactional checkpoints.',
    differentiator: 'Separates agent reasoning from persistent intent, decisions, and execution state.',
    slug: 'paradox-ai',
    x: 0,
    y: -35,
    size: 24,
  },
  {
    id: 'PX02',
    name: 'CodeAgent',
    tier: 'Tier A',
    cluster: 'Security & Governance',
    stage: 'Validated',
    shortDesc: 'Air-gapped DevSecOps scanner with SARIF normalization and AST patch generation.',
    differentiator: 'Normalized cross-scanner policy enforcement with zero network telemetry.',
    slug: 'codeagent',
    x: -55,
    y: -20,
    size: 22,
  },
  {
    id: 'PX03',
    name: 'ORCH-Mem',
    tier: 'Tier A',
    cluster: 'Memory & Provenance',
    stage: 'Prototype',
    shortDesc: 'Causal memory middleware preventing context exhaustion in long-horizon agents.',
    differentiator: 'Causal-dependency and recovery-cost-guided eviction over simple recency.',
    slug: 'private-memory-os', // Related case study
    x: 35,
    y: -25,
    size: 22,
  },
  {
    id: 'PX04',
    name: 'Engineering Knowledge RAG',
    tier: 'Tier A',
    cluster: 'Knowledge & RAG',
    stage: 'Prototype',
    shortDesc: 'Hybrid sparse/dense retrieval playground with cross-encoder reranking.',
    differentiator: 'Systematic cross-stage ablation matrix with strict citation provenance.',
    slug: 'engineering-knowledge-rag',
    x: -30,
    y: 35,
    size: 22,
  },
  {
    id: 'PX05',
    name: 'Private Memory OS',
    tier: 'Tier A',
    cluster: 'Memory & Provenance',
    stage: 'Design',
    shortDesc: 'Local-first memory engine with human verification and temporal provenance.',
    differentiator: 'AI proposes candidate memory; humans explicitly authorize truth.',
    slug: 'private-memory-os',
    x: 55,
    y: 5,
    size: 20,
  },
  {
    id: 'PX06',
    name: 'VehicleGPT',
    tier: 'Tier A',
    cluster: 'Edge & Embedded',
    stage: 'Prototype',
    shortDesc: 'On-device vehicle telemetry intelligence running within a 12W power envelope.',
    differentiator: 'Deterministic analytics compute numerical ground truth; LLM conveys results.',
    slug: 'vehiclegpt',
    x: 40,
    y: 45,
    size: 20,
  },
  {
    id: 'PX07',
    name: 'Secure Agent Tool Execution',
    tier: 'Tier A',
    cluster: 'Security & Governance',
    stage: 'Design',
    shortDesc: 'Host-enforced Zero-Trust MCP tool proxy with scope-attenuated tokens.',
    differentiator: 'Multi-hop capability delegation with state-machine audit ratchets.',
    slug: 'codeagent',
    x: -25,
    y: -50,
    size: 18,
  },
  {
    id: 'PX08',
    name: 'TrustWise 2.0 R&D',
    tier: 'Tier A',
    cluster: 'Knowledge & RAG',
    stage: 'Design',
    shortDesc: 'Evidence-governed research intelligence with claim falsification loops.',
    differentiator: 'End-to-end evidence lifecycle: source -> typed evidence -> verified claim.',
    slug: 'engineering-knowledge-rag',
    x: -60,
    y: 30,
    size: 18,
  },
  {
    id: 'PX09',
    name: 'Sanjaya.ai',
    tier: 'Tier A',
    cluster: 'Agentic AI',
    stage: 'Prototype',
    shortDesc: 'Privacy-first browser agent with local accessibility-tree DOM redaction.',
    differentiator: 'Redacts sensitive PII before transmitting tokens to downstream models.',
    slug: 'sanjaya-ai',
    x: -15,
    y: -15,
    size: 20,
  },
  {
    id: 'PX10',
    name: 'EngiTrust / Crosscheck',
    tier: 'Tier A',
    cluster: 'Knowledge & RAG',
    stage: 'Prototype',
    shortDesc: 'Applicable-evidence retrieval verifying operating conditions and document revisions.',
    differentiator: 'Filters out technically inapplicable text even when semantically similar.',
    slug: 'engineering-knowledge-rag',
    x: -10,
    y: 55,
    size: 18,
  },

  // Key Tier B Nodes for Architectural Breadth
  {
    id: 'PX13',
    name: 'QGuard',
    tier: 'Tier B',
    cluster: 'Quantum & Trust',
    stage: 'Design',
    shortDesc: 'Workload-aware quantum-ready cyber defense for high-consequence computing.',
    differentiator: 'Joint optimization of cyber threat risk and cost of defensive intervention.',
    x: 65,
    y: -40,
    size: 16,
  },
  {
    id: 'PX18',
    name: 'VEGAPilot-RT',
    tier: 'Tier B',
    cluster: 'Edge & Embedded',
    stage: 'Design',
    shortDesc: 'Deterministic UAV autopilot targeting indigenous ARIES v3 / VEGA processors.',
    differentiator: 'Bounded control loops and fail-safe recovery with zero cloud dependency.',
    x: 60,
    y: 50,
    size: 16,
  },
  {
    id: 'PX20',
    name: 'SLAC-H',
    tier: 'Tier B',
    cluster: 'Security & Governance',
    stage: 'Design',
    shortDesc: 'Hybrid risk-aware routing for local vs cloud automated code remediation.',
    differentiator: 'Trust-boundary policy gates preventing restricted code export.',
    x: -70,
    y: -45,
    size: 16,
  },
  {
    id: 'PX23',
    name: 'Dual-Family PQC KEM',
    tier: 'Tier B',
    cluster: 'Quantum & Trust',
    stage: 'Prototype',
    shortDesc: 'Post-quantum key encapsulation combining and simulated noisy-recovery evaluation.',
    differentiator: 'Specification-led hybrid KEM testing under simulated channel degradation.',
    x: 80,
    y: -20,
    size: 16,
  },
];

export const ATLAS_LINKS: AtlasLink[] = [
  // Agentic AI & Runtime Core
  { source: 'PX01', target: 'PX03', relation: 'Causal Memory Middleware' },
  { source: 'PX01', target: 'PX07', relation: 'Tool Proxy & Security Enforcement' },
  { source: 'PX01', target: 'PX09', relation: 'Bounded Perception Subsystem' },

  // Memory & Provenance Pipeline
  { source: 'PX03', target: 'PX05', relation: 'Episodic Context -> Human Verification' },

  // Knowledge & RAG Pipeline
  { source: 'PX04', target: 'PX10', relation: 'Benchmark Lab -> Applicability Engine' },
  { source: 'PX04', target: 'PX08', relation: 'Retrieval Kernel -> Research Intelligence' },

  // Security & DevSecOps Ecosystem
  { source: 'PX02', target: 'PX20', relation: 'Offline Scanner -> Hybrid Remediation' },
  { source: 'PX07', target: 'PX02', relation: 'Policy Governance Framework' },

  // Edge & Embedded Hub
  { source: 'PX06', target: 'PX18', relation: 'Onboard Telemetry & Real-Time Control' },

  // Quantum & Cryptographic Resilience
  { source: 'PX13', target: 'PX23', relation: 'HPC Network Defense -> PQC Key Encapsulation' },
];
