/**
 * atlas-graph.ts — Systems Atlas Architectural Knowledge Graph
 * Defines nodes, clusters, and architectural relationships connecting R&D projects.
 *
 * Coordinates are in SVG user units. Labels are short on purpose: the full
 * system name is shown only in the inspector, so neighboring nodes do not collide.
 */

export interface AtlasNode {
  id: string;
  name: string;
  label: readonly string[];
  tier: 'Tier A' | 'Tier B' | 'Tier C' | 'Tier D';
  cluster: 'Agentic AI' | 'Security & Governance' | 'Memory & Provenance' | 'Knowledge & RAG' | 'Edge & Embedded' | 'Quantum & Trust';
  stage: 'Concept' | 'Design' | 'Prototype' | 'Validated' | 'Deployed' | 'Collaborative';
  shortDesc: string;
  differentiator: string;
  slug?: string;
  x: number;
  y: number;
  size: number;
}

export interface AtlasLink {
  source: string;
  target: string;
  relation: string;
}

export const ATLAS_CLUSTERS = [
  { id: 'Agentic AI', label: 'Agentic AI & Runtimes', color: 'var(--cluster-agentic)' },
  { id: 'Security & Governance', label: 'Security & Tool Governance', color: 'var(--cluster-security)' },
  { id: 'Memory & Provenance', label: 'Memory & Provenance', color: 'var(--cluster-memory)' },
  { id: 'Knowledge & RAG', label: 'Knowledge & RAG Labs', color: 'var(--cluster-knowledge)' },
  { id: 'Edge & Embedded', label: 'Edge & Embedded Systems', color: 'var(--cluster-edge)' },
  { id: 'Quantum & Trust', label: 'Quantum & Cryptographic Trust', color: 'var(--cluster-quantum)' },
] as const;

export const ATLAS_NODES: AtlasNode[] = [
  {
    id: 'PX01',
    name: 'Paradox AI',
    label: ['Paradox AI'],
    tier: 'Tier A',
    cluster: 'Agentic AI',
    stage: 'Validated',
    shortDesc: 'Contract-governed agent runtime with task-DAGs and transactional checkpoints.',
    differentiator: 'Separates agent reasoning from persistent intent, decisions, and execution state.',
    slug: 'paradox-ai',
    x: 0,
    y: -108,
    size: 22,
  },
  {
    id: 'PX02',
    name: 'CodeAgent',
    label: ['CodeAgent'],
    tier: 'Tier A',
    cluster: 'Security & Governance',
    stage: 'Validated',
    shortDesc: 'Air-gapped DevSecOps scanner with SARIF normalization and AST patch generation.',
    differentiator: 'Normalized cross-scanner policy enforcement with zero network telemetry.',
    slug: 'codeagent',
    x: -155,
    y: -8,
    size: 22,
  },
  {
    id: 'PX03',
    name: 'ORCH-Mem',
    label: ['ORCH-Mem'],
    tier: 'Tier A',
    cluster: 'Memory & Provenance',
    stage: 'Prototype',
    shortDesc: 'Causal memory middleware preventing context exhaustion in long-horizon agents.',
    differentiator: 'Causal-dependency and recovery-cost-guided eviction over simple recency.',
    slug: 'private-memory-os',
    x: 0,
    y: -38,
    size: 22,
  },
  {
    id: 'PX04',
    name: 'Engineering Knowledge RAG',
    label: ['Knowledge', 'RAG'],
    tier: 'Tier A',
    cluster: 'Knowledge & RAG',
    stage: 'Prototype',
    shortDesc: 'Hybrid sparse/dense retrieval playground with cross-encoder reranking.',
    differentiator: 'Systematic cross-stage ablation matrix with strict citation provenance.',
    slug: 'engineering-knowledge-rag',
    x: -78,
    y: 78,
    size: 22,
  },
  {
    id: 'PX05',
    name: 'Private Memory OS',
    label: ['Private', 'Memory OS'],
    tier: 'Tier A',
    cluster: 'Memory & Provenance',
    stage: 'Design',
    shortDesc: 'Local-first memory engine with human verification and temporal provenance.',
    differentiator: 'AI proposes candidate memory; humans explicitly authorize truth.',
    slug: 'private-memory-os',
    x: 82,
    y: -28,
    size: 20,
  },
  {
    id: 'PX06',
    name: 'VehicleGPT',
    label: ['VehicleGPT'],
    tier: 'Tier A',
    cluster: 'Edge & Embedded',
    stage: 'Prototype',
    shortDesc: 'On-device vehicle telemetry intelligence running within a 12W power envelope.',
    differentiator: 'Deterministic analytics compute numerical ground truth; LLM conveys results.',
    slug: 'vehiclegpt',
    x: 82,
    y: 72,
    size: 20,
  },
  {
    id: 'PX07',
    name: 'Secure Agent Tool Execution',
    label: ['Secure Agent', 'Tools'],
    tier: 'Tier A',
    cluster: 'Security & Governance',
    stage: 'Design',
    shortDesc: 'Host-enforced Zero-Trust MCP tool proxy with scope-attenuated tokens.',
    differentiator: 'Multi-hop capability delegation with state-machine audit ratchets.',
    slug: 'codeagent',
    x: -78,
    y: -108,
    size: 18,
  },
  {
    id: 'PX08',
    name: 'TrustWise 2.0 R&D',
    label: ['TrustWise', '2.0'],
    tier: 'Tier A',
    cluster: 'Knowledge & RAG',
    stage: 'Design',
    shortDesc: 'Evidence-governed research intelligence with claim falsification loops.',
    differentiator: 'End-to-end evidence lifecycle: source -> typed evidence -> verified claim.',
    slug: 'engineering-knowledge-rag',
    x: -155,
    y: 62,
    size: 18,
  },
  {
    id: 'PX09',
    name: 'Sanjaya.ai',
    label: ['Sanjaya.ai'],
    tier: 'Tier A',
    cluster: 'Agentic AI',
    stage: 'Prototype',
    shortDesc: 'Privacy-first browser agent with local accessibility-tree DOM redaction.',
    differentiator: 'Redacts sensitive PII before transmitting tokens to downstream models.',
    slug: 'sanjaya-ai',
    x: -78,
    y: -28,
    size: 20,
  },
  {
    id: 'PX10',
    name: 'EngiTrust / Crosscheck',
    label: ['EngiTrust', 'Crosscheck'],
    tier: 'Tier A',
    cluster: 'Knowledge & RAG',
    stage: 'Prototype',
    shortDesc: 'Applicable-evidence retrieval verifying operating conditions and document revisions.',
    differentiator: 'Filters out technically inapplicable text even when semantically similar.',
    slug: 'engineering-knowledge-rag',
    x: 0,
    y: 92,
    size: 18,
  },
  {
    id: 'PX13',
    name: 'QGuard',
    label: ['QGuard'],
    tier: 'Tier B',
    cluster: 'Quantum & Trust',
    stage: 'Design',
    shortDesc: 'Workload-aware quantum-ready cyber defense for high-consequence computing.',
    differentiator: 'Joint optimization of cyber threat risk and cost of defensive intervention.',
    x: 82,
    y: -108,
    size: 16,
  },
  {
    id: 'PX18',
    name: 'VEGAPilot-RT',
    label: ['VEGAPilot-RT'],
    tier: 'Tier B',
    cluster: 'Edge & Embedded',
    stage: 'Design',
    shortDesc: 'Deterministic UAV autopilot targeting indigenous ARIES v3 / VEGA processors.',
    differentiator: 'Bounded control loops and fail-safe recovery with zero cloud dependency.',
    x: 158,
    y: 42,
    size: 16,
  },
  {
    id: 'PX20',
    name: 'SLAC-H',
    label: ['SLAC-H'],
    tier: 'Tier B',
    cluster: 'Security & Governance',
    stage: 'Design',
    shortDesc: 'Hybrid risk-aware routing for local vs cloud automated code remediation.',
    differentiator: 'Trust-boundary policy gates preventing restricted code export.',
    x: -155,
    y: -78,
    size: 16,
  },
  {
    id: 'PX23',
    name: 'Dual-Family PQC KEM',
    label: ['Dual-Family', 'PQC KEM'],
    tier: 'Tier B',
    cluster: 'Quantum & Trust',
    stage: 'Prototype',
    shortDesc: 'Post-quantum key encapsulation combining and simulated noisy-recovery evaluation.',
    differentiator: 'Specification-led hybrid KEM testing under simulated channel degradation.',
    x: 158,
    y: -72,
    size: 16,
  },
];

export const ATLAS_LINKS: AtlasLink[] = [
  { source: 'PX01', target: 'PX03', relation: 'Causal Memory Middleware' },
  { source: 'PX01', target: 'PX07', relation: 'Tool Proxy & Security Enforcement' },
  { source: 'PX01', target: 'PX09', relation: 'Bounded Perception Subsystem' },
  { source: 'PX03', target: 'PX05', relation: 'Episodic Context -> Human Verification' },
  { source: 'PX04', target: 'PX10', relation: 'Benchmark Lab -> Applicability Engine' },
  { source: 'PX04', target: 'PX08', relation: 'Retrieval Kernel -> Research Intelligence' },
  { source: 'PX02', target: 'PX20', relation: 'Offline Scanner -> Hybrid Remediation' },
  { source: 'PX07', target: 'PX02', relation: 'Policy Governance Framework' },
  { source: 'PX06', target: 'PX18', relation: 'Onboard Telemetry & Real-Time Control' },
  { source: 'PX13', target: 'PX23', relation: 'HPC Network Defense -> PQC Key Encapsulation' },
];
