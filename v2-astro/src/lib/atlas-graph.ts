/**
 * atlas-graph.ts — Systems Atlas Architectural Knowledge Graph
 * Defines nodes, clusters, and architectural relationships connecting R&D projects.
 * Grounded in the Doctoral-Grade Portfolio Forensic Master Report (Nov 7, 2026).
 *
 * Coordinates are in SVG user units. Labels are short on purpose: the full
 * system name is shown in the inspector, preventing node label collision.
 */

export interface AtlasNode {
  id: string;
  name: string;
  label: readonly string[];
  tier: 'Tier A' | 'Tier B' | 'Tier C' | 'Tier D';
  cluster:
    | 'Pillar 1: AI/ML & Agentic'
    | 'Pillar 2: Security & Cryptography'
    | 'Pillar 3: Healthcare & Decentralized'
    | 'Pillar 4: Developer Tooling & IDEs'
    | 'Pillar 5: Enterprise Web & Platforms'
    | 'Pillar 6: Scientific & Space R&D';
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
  { id: 'Pillar 1: AI/ML & Agentic', label: 'Pillar 1: AI/ML & Agentic', color: 'var(--cluster-agentic)' },
  { id: 'Pillar 2: Security & Cryptography', label: 'Pillar 2: Security & Crypto', color: 'var(--cluster-security)' },
  { id: 'Pillar 3: Healthcare & Decentralized', label: 'Pillar 3: Healthcare & Web3', color: 'var(--cluster-memory)' },
  { id: 'Pillar 4: Developer Tooling & IDEs', label: 'Pillar 4: Developer Tooling', color: 'var(--cluster-knowledge)' },
  { id: 'Pillar 5: Enterprise Web & Platforms', label: 'Pillar 5: Enterprise Web', color: 'var(--cluster-edge)' },
  { id: 'Pillar 6: Scientific & Space R&D', label: 'Pillar 6: Space & Scientific', color: 'var(--cluster-quantum)' },
] as const;

export const ATLAS_NODES: AtlasNode[] = [
  // Pillar 1: AI/ML & Agentic Systems
  {
    id: 'PX01',
    name: 'CCN Transformer (MC-CTViT)',
    label: ['MC-CTViT', 'EEG Model'],
    tier: 'Tier A',
    cluster: 'Pillar 1: AI/ML & Agentic',
    stage: 'Validated',
    shortDesc: 'Compute-efficient multi-cross CNN-Transformer-ViT for EEG emotion classification across DEAP/SEED.',
    differentiator: 'Decoupled spatio-temporal attention yielding 99.9% compute reduction over joint tensors.',
    slug: 'mc-ctvit-eeg-transformer',
    x: 0,
    y: -108,
    size: 22,
  },
  {
    id: 'PX02',
    name: 'TrustWise AdaptiveRag',
    label: ['TrustWise', 'RAG'],
    tier: 'Tier A',
    cluster: 'Pillar 1: AI/ML & Agentic',
    stage: 'Validated',
    shortDesc: 'Enterprise privacy-preserving RAG platform with tri-isolated data planes and citation calibration.',
    differentiator: 'Correlation budget leakage prevention (epsilon <= bound) with <15ms fast-path BM25 pre-filtering.',
    slug: 'trustwise-adaptiverag',
    x: -65,
    y: -95,
    size: 20,
  },
  {
    id: 'PX03',
    name: 'Agentic Browser Defense',
    label: ['Agentic', 'Defense'],
    tier: 'Tier A',
    cluster: 'Pillar 1: AI/ML & Agentic',
    stage: 'Validated',
    shortDesc: 'Host-side least-privilege mediation proxy neutralizing prompt injections and tool hijacking.',
    differentiator: '0.0377 ms HMAC capability token verification with monotonic nonces and forward-secure hash ratchet.',
    slug: 'agentic-browser-defense',
    x: 65,
    y: -95,
    size: 20,
  },
  {
    id: 'PX04',
    name: 'VehicleGPT Edge',
    label: ['VehicleGPT'],
    tier: 'Tier A',
    cluster: 'Pillar 1: AI/ML & Agentic',
    stage: 'Validated',
    shortDesc: 'Automotive CAN-bus diagnostic intelligence running within a 12W power envelope.',
    differentiator: 'ISO 26262 listen-only hardware interface with int8 quantized phrase table routing.',
    slug: 'vehiclegpt',
    x: -120,
    y: -50,
    size: 18,
  },
  {
    id: 'PX05',
    name: 'StockAI Market Engine',
    label: ['StockAI', 'Quant'],
    tier: 'Tier A',
    cluster: 'Pillar 1: AI/ML & Agentic',
    stage: 'Validated',
    shortDesc: 'Enterprise quantitative market research engine with TimescaleDB hypertables and Celery workers.',
    differentiator: 'Sub-10ms indicator calculations across 2,000+ assets with idempotent input hashing.',
    slug: 'stockai-platform',
    x: -155,
    y: 0,
    size: 18,
  },

  // Pillar 2: Cybersecurity & Cryptography
  {
    id: 'PX06',
    name: 'VulRAG Local Security & APR',
    label: ['VulRAG', 'Security'],
    tier: 'Tier A',
    cluster: 'Pillar 2: Security & Cryptography',
    stage: 'Validated',
    shortDesc: 'Air-gapped vulnerability scanner and closed-loop AST automated program repair platform.',
    differentiator: 'Multi-analyzer static consensus (Semgrep, Bandit, YARA) with 100% syntactically valid AST diffs.',
    slug: 'vulrag-security',
    x: 120,
    y: -50,
    size: 22,
  },
  {
    id: 'PX07',
    name: 'Hierarchical NetFlow IDS',
    label: ['NetFlow', 'IDS'],
    tier: 'Tier A',
    cluster: 'Pillar 2: Security & Cryptography',
    stage: 'Validated',
    shortDesc: 'Two-stage asymmetric gating and tabular flow transformer for real-time cyber defense.',
    differentiator: 'Microsecond binary anomaly gate clearing >98% benign flows in <10µs; tabular transformer on anomalies.',
    slug: 'hierarchical-ids',
    x: 155,
    y: 0,
    size: 20,
  },
  {
    id: 'PX08',
    name: 'Post-Quantum Cryptography & QRFL',
    label: ['PQC &', 'QRFL'],
    tier: 'Tier A',
    cluster: 'Pillar 2: Security & Cryptography',
    stage: 'Validated',
    shortDesc: 'Euclidean lattice cryptography monograph and quantum-resistant federated learning simulation.',
    differentiator: 'Zero-install self-contained Tectonic engine with ML-KEM/Kyber and ML-DSA/Dilithium evaluations.',
    slug: 'quantum-cryptography',
    x: 140,
    y: 55,
    size: 18,
  },

  // Pillar 3: Healthcare & Decentralized Identity
  {
    id: 'PX09',
    name: 'SIH Swasthya Health Network',
    label: ['SIH', 'Swasthya'],
    tier: 'Tier A',
    cluster: 'Pillar 3: Healthcare & Decentralized',
    stage: 'Validated',
    shortDesc: 'Frontline healthcare platform digitizing rural India with offline mobile sync and 5-tier referral.',
    differentiator: 'Harmonizes 236 statutory health duties across 21 national disease control programs.',
    slug: 'swasthya-health-network',
    x: 75,
    y: 95,
    size: 20,
  },
  {
    id: 'PX10',
    name: 'Blockchain-EHR & BCFL-POCC',
    label: ['Blockchain', 'EHR'],
    tier: 'Tier A',
    cluster: 'Pillar 3: Healthcare & Decentralized',
    stage: 'Validated',
    shortDesc: 'Sovereign clinical ledger and Proof-of-Convergence federated learning network across hospital nodes.',
    differentiator: 'Lipschitz continuity gradient validation mathematically rejecting Byzantine model poisoning.',
    slug: 'blockchain-ehr-bcfl',
    x: 105,
    y: 115,
    size: 18,
  },

  // Pillar 4: Developer Tooling & Autonomous IDEs
  {
    id: 'PX11',
    name: 'Supper-IDE (AMAWS v6.0)',
    label: ['Supper-IDE', 'Core'],
    tier: 'Tier A',
    cluster: 'Pillar 4: Developer Tooling & IDEs',
    stage: 'Validated',
    shortDesc: 'Autonomous pair-programming engine with 7-step sovereign execution and smart cost routing.',
    differentiator: 'Routes >=80% tasks to low-cost models with pre-mutation git commits preventing accidental code loss.',
    slug: 'supper-ide',
    x: -140,
    y: 55,
    size: 22,
  },
  {
    id: 'PX12',
    name: 'Operon-ext Platform',
    label: ['Operon-ext', 'VS Code'],
    tier: 'Tier A',
    cluster: 'Pillar 4: Developer Tooling & IDEs',
    stage: 'Validated',
    shortDesc: 'Open VSX TypeScript extension and FastAPI agentic backend with interactive visual diff approval.',
    differentiator: '307/308 tests passing with in-memory diff staging before user-approved workspace commits.',
    slug: 'operon-extension',
    x: -85,
    y: 90,
    size: 20,
  },

  // Pillar 5: Enterprise Web & Scalable Platforms
  {
    id: 'PX13',
    name: 'Flipkart ML Regression Platform',
    label: ['Flipkart', 'ML Engine'],
    tier: 'Tier B',
    cluster: 'Pillar 5: Enterprise Web & Platforms',
    stage: 'Validated',
    shortDesc: 'High-cardinality e-commerce catalog pricing regression and purchase elasticity modeling.',
    differentiator: 'CatBoost Ordered Target Statistics preventing target leakage across high-cardinality retail categories.',
    slug: 'flipkart-ml-platform',
    x: -45,
    y: 120,
    size: 18,
  },

  // Pillar 6: Scientific Computing, Geospatial & Space R&D
  {
    id: 'PX14',
    name: 'ISRO Route Resilience (BAH 2026)',
    label: ['ISRO Route', 'Resilience'],
    tier: 'Tier A',
    cluster: 'Pillar 6: Scientific & Space R&D',
    stage: 'Validated',
    shortDesc: 'Satellite road extraction and post-disaster topological graph recovery for ISRO BAH 2026.',
    differentiator: 'Angle-aware DSU/MST topological gap healing and Tarjan articulation point bottleneck detection.',
    slug: 'isro-route-resilience',
    x: 0,
    y: 40,
    size: 22,
  },
  {
    id: 'PX15',
    name: 'Engineering Knowledge RAG-X',
    label: ['RAG-X', 'Indexing'],
    tier: 'Tier A',
    cluster: 'Pillar 6: Scientific & Space R&D',
    stage: 'Validated',
    shortDesc: 'Air-gapped technical document indexing engine with SQLite FTS5 BM25 search.',
    differentiator: '80% RAM bounded memory throttling preventing OOM crashes during 1,000+ page manual indexing.',
    slug: 'engineering-knowledge-rag',
    x: 0,
    y: -30,
    size: 20,
  },
];

export const ATLAS_LINKS: AtlasLink[] = [
  // Inter-system dependencies & integrations
  { source: 'PX01', target: 'PX14', relation: 'Decoupled Attention -> Spatial Feature Extraction' },
  { source: 'PX02', target: 'PX15', relation: 'Enterprise RAG Kernel -> Local FTS5 Indexing' },
  { source: 'PX03', target: 'PX06', relation: 'Mediation Proxy -> Sovereign Program Repair' },
  { source: 'PX03', target: 'PX07', relation: 'Capability Security -> NetFlow IDS Telemetry' },
  { source: 'PX06', target: 'PX11', relation: 'AST Repair Loop -> AMAWS Checkpoint Engine' },
  { source: 'PX11', target: 'PX12', relation: 'Sovereign Core -> Open VSX Extension Host' },
  { source: 'PX04', target: 'PX07', relation: 'Edge Telemetry -> High-Speed Flow Classification' },
  { source: 'PX09', target: 'PX10', relation: 'Frontline Public Health -> Blockchain-EHR Ledger' },
  { source: 'PX10', target: 'PX08', relation: 'Consortium Federated Learning -> Lattice PQC' },
  { source: 'PX14', target: 'PX15', relation: 'Satellite GeoTIFF Specs -> Air-gapped Knowledge Store' },
  { source: 'PX05', target: 'PX13', relation: 'Quantitative Market Time-Series -> Segmented ML Regression' },
];
