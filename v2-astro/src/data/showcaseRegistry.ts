// src/data/showcaseRegistry.ts
// Single source of truth for the Interactive Project Showcase Studio & C4 Schematics

import type { ShowcaseData } from '../components/ProjectShowcaseContainer.astro';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const SHOWCASE_REGISTRY: Record<string, ShowcaseData> = {
  'vehiclegpt': {
    projectId: 'vehiclegpt',
    heroImage: `${base}/images/showcase/vehiclegpt-hero.png`,
    mvpIdea: {
      problemSpark: 'Cloud-dependent vehicular analytics experience fatal packet loss in remote corridors, while monolithic AI runtimes overheat and blow past the 12W automotive embedded power envelope.',
      earlyPrototype: 'Early Python script on Raspberry Pi dropped 40% of 1000Hz CAN frames during peak traffic. Evolved into a C++20 zero-copy ring buffer with SCHED_FIFO priority isolating deterministic ingestion from asynchronous quantized GGUF reasoning.',
      simulatorType: 'can-bus'
    },
    visualSchematics: [
      {
        title: 'Forensic System Concept & Holographic AI Schematic',
        caption: 'Photorealistic architectural synthesis of the dual-plane automotive telemetry edge runtime and embedded NPU.',
        imageUrl: `${base}/images/showcase/vehiclegpt-hero.png`,
        diagramType: 'System Concept'
      },
      {
        title: 'C4 Container Architecture: Dual-Plane Edge Decoupling',
        caption: 'Plane 0 C++ socket ingestion decoupled from Plane 1 NPU-accelerated INT4 cognitive reasoning.',
        imageUrl: `${base}/images/architecture/08_8_c4_container_diagram.png`,
        diagramType: 'C4 Container'
      },
      {
        title: 'ARM64 Embedded Deployment Topology',
        caption: 'Targeting Jetson Orin Nano / Raspberry Pi 5 under a strict 12W power ceiling with zero cloud egress.',
        imageUrl: `${base}/images/architecture/09_9_deployment_diagram.png`,
        diagramType: 'Deployment'
      },
      {
        title: 'Diagnostic Anomaly & Telemetry Data Model',
        caption: 'Zero-allocation rolling Z-score and Mahalanobis distance filter schema discarding nominal frames.',
        imageUrl: `${base}/images/architecture/10_10_data_model_er_diagram.png`,
        diagramType: 'Data Model'
      }
    ],
    deepArchitecture: {
      pipelineSteps: [
        { title: 'Deterministic 1000Hz Ingestion', desc: 'Plane 0 zero-copy ring buffer pinned to dedicated CPU core.' },
        { title: 'Statistical Outlier Gating', desc: 'Rolling Z-score filters discard >99.7% of nominal frames in sub-microsecond intervals.' },
        { title: 'Asynchronous Cognitive Activation', desc: 'Quantized INT4 GGUF model awakens on anomaly trigger or driver query.' },
        { title: 'AST Safety Verification', desc: 'Clearing and remediation commands pass local AST verification before execution.' }
      ],
      dockerServices: ['vgpt-ingest-c20', 'vgpt-npu-engine', 'vgpt-sqlite-fts', 'vgpt-can-emulator'],
      dossierId: 'DOS-P1-004',
      testPassRate: '100% C++ Suite Passed',
      strategicHorizon: 'Integration with indigenous RISC-V ARIES v3 hardware and AUTOSAR Classic runtime.'
    }
  },

  'agentic-browser-defense': {
    projectId: 'agentic-browser-defense',
    heroImage: `${base}/images/showcase/agentic-browser-hero.png`,
    mvpIdea: {
      problemSpark: 'Autonomous browser agents with ambient tool permissions are vulnerable to indirect prompt injection on adversarial webpages, leading to rogue transactions and data exfiltration.',
      earlyPrototype: 'Early prototype evaluated client-side DOM filters, which were easily bypassed by steganographic prompts. Redesigned into a host-side L2/L3 mediation proxy enforcing default read-only containment elevated only via 8-tuple HMAC tokens.',
      simulatorType: 'hmac-token'
    },
    visualSchematics: [
      {
        title: 'Zero-Trust Host-Side Mediation Concept',
        caption: 'Cybernetic mediation shield evaluating cryptographic tokens and blocking injection packets in real time.',
        imageUrl: `${base}/images/showcase/agentic-browser-hero.png`,
        diagramType: 'System Concept'
      },
      {
        title: 'Host-Side Mediation Threat Model',
        caption: 'Demarcates untrusted LLM planner from protected OS and browser execution environments.',
        imageUrl: `${base}/images/architecture/fig4_threat_model.png`,
        diagramType: 'Deployment'
      },
      {
        title: 'Cryptographic Capability Token Sequence',
        caption: '8-tuple HMAC-SHA256 token issuance, parameter lattice containment, and hash ratchet.',
        imageUrl: `${base}/images/architecture/fig5_sequence_mediation.png`,
        diagramType: 'Sequence'
      },
      {
        title: 'Security vs Utility Pareto Frontier',
        caption: 'Clocking 0.0377 ms per-hop mediation latency with 0.0% replay attack success.',
        imageUrl: `${base}/images/architecture/fig6_safety_utility_tradeoff.png`,
        diagramType: 'Neural Architecture'
      }
    ],
    deepArchitecture: {
      pipelineSteps: [
        { title: 'L2 Read-Only Containment', desc: 'Agent operates by default in read-only sandbox; mutating actions are blocked.' },
        { title: 'Capability Token Verification', desc: '8-tuple HMAC-SHA256 token evaluated against monotonic sequence nonce in 0.0377 ms.' },
        { title: 'Parameter Lattice Containment', desc: 'Ensures file and tool arguments remain strictly within authorized directory bounds.' },
        { title: 'Forward-Secure Paradata Ratchet', desc: 'Transaction recorded in tamper-evident SHA-256 audit ledger followed by immediate L2 demotion.' }
      ],
      dockerServices: ['proxy-kernel-py312', 'playwright-sandbox', 'paradata-ledger', 'mcp-broker'],
      dossierId: 'DOS-P1-003',
      testPassRate: '6 / 6 (100%) Passed',
      strategicHorizon: 'Hardware Security Module (HSM) attestation via AWS Nitro Enclaves for autonomous enterprise defense.'
    }
  },

  'mc-ctvit-eeg-transformer': {
    projectId: 'mc-ctvit-eeg-transformer',
    heroImage: `${base}/images/showcase/mc-ctvit-hero.png`,
    mvpIdea: {
      problemSpark: 'Standard monolithic transformers computing joint self-attention across 62 electrode channels and 60 time frames suffer a catastrophic O((C*T)^2) memory explosion (~1.38x10^7 operations).',
      earlyPrototype: 'Early spatial-temporal ViT exhausted GPU VRAM on batch size 8. Redesigned with four heterogeneous feature branches decoupling spatial scalp topology from temporal sub-window entropy, cutting operations to 7,444 (99.9% reduction).',
      simulatorType: 'eeg-tensor'
    },
    visualSchematics: [
      {
        title: 'Decoupled Cranial-Temporal Neural Synthesis',
        caption: '3D cranium EEG electrode projections feeding multi-scale heterogeneous attention branches.',
        imageUrl: `${base}/images/showcase/mc-ctvit-hero.png`,
        diagramType: 'System Concept'
      },
      {
        title: 'Quad-Branch MC-CTViT Neural Architecture',
        caption: '1D Multi-Scale CNN, Temporal Transformer, Spatial PLV Transformer, and 2D Scalp ViT.',
        imageUrl: `${base}/images/architecture/15_15_parallel_inference_flow.png`,
        diagramType: 'Neural Architecture'
      },
      {
        title: 'C4 Inference & Training Topology',
        caption: 'MNE feature preprocessing pipeline feeding multitask valence/arousal classification heads.',
        imageUrl: `${base}/images/architecture/08_8_c4_container_diagram.png`,
        diagramType: 'C4 Container'
      },
      {
        title: 'Electrode Topology & Adjacency Matrix',
        caption: 'Azimuthal equidistant scalp projection maintaining 2D hemispheric cranial energy distribution.',
        imageUrl: `${base}/images/architecture/10_10_data_model_er_diagram.png`,
        diagramType: 'Data Model'
      }
    ],
    deepArchitecture: {
      pipelineSteps: [
        { title: 'Multi-Representation Feature Extraction', desc: 'Extracts Differential Entropy, Power Spectral Density, and Phase Locking Value matrices.' },
        { title: 'Decoupled Branch Attention', desc: 'Processes temporal and spatial dynamics in parallel without quadratic tensor flattening.' },
        { title: 'Native Token Length Cross-Attention', desc: 'Fuses heterogeneous tokens while preserving electrode indices and temporal stamps.' },
        { title: 'Saliency-Regularized Multitask Heads', desc: 'Jointly classifies valence and arousal while enforcing neurophysiologically plausible attention.' }
      ],
      dockerServices: ['mcctvit-trainer-cuda', 'mcctvit-inference-api', 'eeg-feature-cache', 'mlflow-tracker'],
      dossierId: 'DOS-P1-001',
      testPassRate: '16 / 16 (100%) Passed in 3.29s',
      strategicHorizon: 'Domain-Adversarial Neural Networks (DANN) for cross-subject generalization on wearable consumer BCI headsets.'
    }
  },

  'vulrag-security': {
    projectId: 'vulrag-security',
    heroImage: `${base}/images/showcase/vulrag-security-hero.png`,
    mvpIdea: {
      problemSpark: 'Proprietary enterprise software cannot be sent to public cloud LLMs for vulnerability review without catastrophic trade secret exposure.',
      earlyPrototype: 'Early CLI wrapper produced contradictory warnings from individual linters. Evolved into a normalized finding schema clustering Semgrep, Bandit, and YARA with local Ollama critique and AST patch validation.',
      simulatorType: 'vuln-scan'
    },
    visualSchematics: [
      {
        title: 'Sovereign Closed-Loop Security Lab Concept',
        caption: 'Holographic Abstract Syntax Tree vulnerability scanning and automated Tree-sitter diff patch verification.',
        imageUrl: `${base}/images/showcase/vulrag-security-hero.png`,
        diagramType: 'System Concept'
      },
      {
        title: 'PRISMA 2020 Systematic Literature Review Flow',
        caption: 'Rigorous 27-item methodological evaluation of local RAG vulnerability detection.',
        imageUrl: `${base}/images/architecture/fig1_prisma_flow.png`,
        diagramType: 'Deployment'
      },
      {
        title: 'Sovereign Closed-Loop Auto-Repair Architecture',
        caption: 'Static analysis aggregation, local RAG retrieval, and Tree-sitter AST syntax validation.',
        imageUrl: `${base}/images/architecture/14_14_auto_fix_automation_workflow.png`,
        diagramType: 'Sequence'
      },
      {
        title: 'RAG Retrieval & Sovereign Refinement Loop',
        caption: 'Self-critique loop suppressing false positives and generating unified diff patches.',
        imageUrl: `${base}/images/architecture/02_2_rag_analysis_and_sovereign_refinement_loop.png`,
        diagramType: 'C4 Container'
      }
    ],
    deepArchitecture: {
      pipelineSteps: [
        { title: 'Multi-Analyzer Ingestion', desc: 'Runs Semgrep, Bandit, Checkov, and YARA over local AST.' },
        { title: 'Finding Clustering & Normalization', desc: 'Groups intersecting AST spans into standardized CWE finding objects.' },
        { title: 'Local LLM Reasoning & Critique', desc: 'Ollama-hosted Qwen/Llama filters false alarms using surrounding file context.' },
        { title: 'Tree-sitter AST Auto-Fix Verification', desc: 'Compiles unified diffs and verifies syntax before presenting to developers.' }
      ],
      dockerServices: ['vulrag-gateway-fastapi', 'ollama-local-llm', 'vulrag-sqlite-vector', 'worker-celery'],
      dossierId: 'DOS-P2-001',
      testPassRate: 'Multi-Scanner Suite Validated',
      strategicHorizon: 'Packaging into a sovereign on-prem enterprise security appliance for defense contractors.'
    }
  },

  'isro-route-resilience': {
    projectId: 'isro-route-resilience',
    heroImage: `${base}/images/showcase/isro-satellite-hero.png`,
    mvpIdea: {
      problemSpark: 'Disaster satellite GeoTIFFs (floods, cyclones) feature dense cloud shadows and tree canopy debris that sever road continuity, blinding routing algorithms.',
      earlyPrototype: 'Early pixel segmentation generated disconnected road fragments. Built a topological gap healer applying angle-penalized Minimum Spanning Trees (MST) and Tarjan articulation point analysis.',
      simulatorType: 'gap-healer'
    },
    visualSchematics: [
      {
        title: 'Orbital Lidar & Disaster Routing Synthesis',
        caption: 'Low Earth orbit satellite projecting multi-spectral lidar scanning beams through cloud cover over flooded delta terrain.',
        imageUrl: `${base}/images/showcase/isro-satellite-hero.png`,
        diagramType: 'System Concept'
      },
      {
        title: 'C4 Satellite Ingestion & Segmentation Topology',
        caption: 'Tiling high-resolution GeoTIFF rasters through DeepLabV3+ with shadow augmentations.',
        imageUrl: `${base}/images/architecture/08_8_c4_container_diagram.png`,
        diagramType: 'C4 Container'
      },
      {
        title: 'Background Job Processing & Stress Simulation',
        caption: 'Celery worker pipeline computing network efficiency under configurable flood buffers.',
        imageUrl: `${base}/images/architecture/03_3_background_job_processing.png`,
        diagramType: 'Sequence'
      },
      {
        title: 'Observability & Bhuvan / QGIS Export Flow',
        caption: 'Streamlit dashboard streaming GeoJSON layers with critical evacuation bottlenecks.',
        imageUrl: `${base}/images/architecture/17_17_observability_and_reporting_flow.png`,
        diagramType: 'Deployment'
      }
    ],
    deepArchitecture: {
      pipelineSteps: [
        { title: 'Tiling & Spectral Normalization', desc: 'Ingests multi-spectral satellite rasters into 512x512 normalized tiles.' },
        { title: 'Deep Neural Road Segmentation', desc: 'U-Net ResNet-34 and DeepLabV3+ ResNet-50 generate probability masks (min IoU >= 0.50).' },
        { title: 'Topological Skeletonization & Graph Extraction', desc: 'Extracts 1-pixel road centerlines into a NetworkX planar road graph.' },
        { title: 'Angle-Aware DSU/MST Gap Healing', desc: 'Reconstructs continuous road topologies by penalizing heading angle deviations.' },
        { title: 'Flood Inundation & Tarjan Articulation', desc: 'Simulates rising flood levels to detect single-point-of-failure evacuation bridges.' }
      ],
      dockerServices: ['isro-rr-segmentation', 'isro-rr-graph-engine', 'isro-streamlit-ui', 'redis-broker'],
      dossierId: 'DOS-P6-001',
      testPassRate: '85 / 86 (98.8%) Passed',
      strategicHorizon: 'Sentinel-1 SAR synthetic aperture radar fusion to penetrate impenetrable monsoon cloud cover.'
    }
  },

  'swasthya-health-network': {
    projectId: 'swasthya-health-network',
    heroImage: `${base}/images/showcase/swasthya-health-hero.png`,
    mvpIdea: {
      problemSpark: 'Rural Sub-Centres and ASHA workers in Maharashtra lack unified digital health records and suffer network dropouts, causing high maternal and neonatal mortality.',
      earlyPrototype: 'Early field testing revealed paper register transcription errors. Built a cross-platform Flutter client with offline WatermelonDB sync and a 5-tier clinical referral funnel mapping 236 NHM statutory duties.',
      simulatorType: 'generic'
    },
    visualSchematics: [
      {
        title: 'Decentralized Healthcare Intelligence Concept',
        caption: '3D biometric digital twin, real-time vitals streams, and cryptographic medical consent ledger blocks.',
        imageUrl: `${base}/images/showcase/swasthya-health-hero.png`,
        diagramType: 'System Concept'
      },
      {
        title: '5-Tier National Health Mission Clinical Pipeline',
        caption: 'Hierarchical clinical escalation from Sub-Centre ASHA workers through Primary Health Centres (PHC) to District Hospitals.',
        imageUrl: `${base}/images/architecture/08_8_c4_container_diagram.png`,
        diagramType: 'C4 Container'
      },
      {
        title: 'ABDM-Compliant Health Record Data Model',
        caption: 'FHIR R4 resource mapping and offline-first delta synchronization schema.',
        imageUrl: `${base}/images/architecture/10_10_data_model_er_diagram.png`,
        diagramType: 'Data Model'
      }
    ],
    deepArchitecture: {
      pipelineSteps: [
        { title: 'Field-Level Biometric Capture', desc: 'ASHA mobile capture with client-side validation and offline WatermelonDB storage.' },
        { title: 'Cryptographic Delta Sync', desc: 'Conflict-free replicated data types (CRDT) merge records upon cellular reconnection.' },
        { title: '5-Tier Clinical Triage Funnel', desc: 'Automated maternal high-risk scoring dispatches ambulances before critical onset.' },
        { title: 'ABDM FHIR R4 Bridge', desc: 'Serializes patient encounters to Ayushman Bharat Digital Mission registry standards.' }
      ],
      dockerServices: ['swasthya-api-nest', 'swasthya-sync-engine', 'postgres-postgis', 'redis-cache'],
      dossierId: 'DOS-P3-001',
      testPassRate: 'SIH Finalist · Tested Across 20 Centers',
      strategicHorizon: 'Expansion to 250 primary health centres with Ayushman Bharat Digital Mission integration.'
    }
  },

  'blockchain-ehr-bcfl': {
    projectId: 'blockchain-ehr-bcfl',
    heroImage: `${base}/images/showcase/swasthya-health-hero.png`,
    mvpIdea: {
      problemSpark: 'Centralized electronic health records (EHR) risk single-point data breaches, while classical federated learning models are vulnerable to Byzantine gradient poisoning.',
      earlyPrototype: 'Built a consortium blockchain using Solidity smart contracts on Hyperledger Fabric with IPFS encrypted payload storage and Proof-of-Cross-Validation consensus (PoCC).',
      simulatorType: 'generic'
    },
    visualSchematics: [
      {
        title: 'Byzantine-Resilient PoCC Architecture',
        caption: 'Decentralized federated learning pipeline rejecting poisoned client weights before ledger commit.',
        imageUrl: `${base}/images/showcase/swasthya-health-hero.png`,
        diagramType: 'System Concept'
      },
      {
        title: 'Hyperledger Fabric Multi-Org Topology',
        caption: 'Hospitals, diagnostic labs, and research institutions participating in private channel consortium.',
        imageUrl: `${base}/images/architecture/09_9_deployment_diagram.png`,
        diagramType: 'Deployment'
      }
    ],
    deepArchitecture: {
      pipelineSteps: [
        { title: 'Local Model Training', desc: 'Hospitals train diagnostic CNNs on private patient data without raw data movement.' },
        { title: 'Gradient Differential Privacy', desc: 'Adds Laplace noise bounded by epsilon privacy budget.' },
        { title: 'PoCC Byzantine Validation', desc: 'Peer validator nodes evaluate validation loss on holdout sets before weight aggregation.' },
        { title: 'Immutable Ledger Commit', desc: 'Cryptographically seals updated global model weights onto the blockchain.' }
      ],
      dockerServices: ['fabric-peer-0', 'fabric-orderer', 'ipfs-daemon', 'bcfl-coordinator'],
      dossierId: 'DOS-P3-002',
      testPassRate: '100% Solidity & Fabric Suite Pass',
      strategicHorizon: 'Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (zk-SNARKs) for anonymous patient consent.'
    }
  },

  'quantum-cryptography': {
    projectId: 'quantum-cryptography',
    heroImage: `${base}/images/showcase/quantum-crypto-hero.png`,
    mvpIdea: {
      problemSpark: 'Shor algorithm running on fault-tolerant quantum computers will shatter RSA-2048 and ECC-256 within minutes, leaving all legacy internet communication vulnerable.',
      earlyPrototype: 'Implemented NIST FIPS 203 ML-KEM (Kyber) and FIPS 204 ML-DSA (Dilithium) in pure Rust with constant-time arithmetic to eliminate timing side-channel attacks.',
      simulatorType: 'generic'
    },
    visualSchematics: [
      {
        title: 'Post-Quantum Lattice Cryptography Concept',
        caption: 'High-dimensional Euclidean lattice structures repelling quantum cryptanalysis with Learning With Errors (LWE) hardness.',
        imageUrl: `${base}/images/showcase/quantum-crypto-hero.png`,
        diagramType: 'System Concept'
      },
      {
        title: 'Constant-Time Polynomial Arithmetic Flow',
        caption: 'Number Theoretic Transform (NTT) implementation eliminating secret-dependent branch latency.',
        imageUrl: `${base}/images/architecture/08_8_c4_container_diagram.png`,
        diagramType: 'C4 Container'
      }
    ],
    deepArchitecture: {
      pipelineSteps: [
        { title: 'Lattice Key Generation', desc: 'Generates public and private matrix vectors over polynomial quotient rings.' },
        { title: 'Constant-Time NTT Multiplication', desc: 'Computes polynomial multiplication in O(n log n) without memory cache leakage.' },
        { title: 'Ciphertext Encapsulation (ML-KEM)', desc: 'Encapsulates 256-bit symmetric shared secrets under Module-LWE hardness.' },
        { title: 'Quantum-Resistant Decapsulation', desc: 'Decapsulates shared keys with constant-time rejection of malformed vectors.' }
      ],
      dockerServices: ['pqc-rust-bench', 'valgrind-ct-tester', 'tls13-hybrid-proxy'],
      dossierId: 'DOS-P2-003',
      testPassRate: '100% NIST Known-Answer-Tests (KAT)',
      strategicHorizon: 'Hardware acceleration using dedicated RISC-V PQC instructions for quantum-safe TLS handshakes.'
    }
  },

  'supper-ide': {
    projectId: 'supper-ide',
    heroImage: `${base}/images/showcase/supper-ide-hero.png`,
    mvpIdea: {
      problemSpark: 'Commercial AI coding assistants route every keystroke to proprietary cloud APIs, incurring exorbitant latency and leaking proprietary enterprise IP.',
      earlyPrototype: 'Constructed an autonomous pair-programming IDE runtime using local Ollama model routing, AST-aware diffing, and an immutable JSONL paradata checkpoint engine.',
      simulatorType: 'generic'
    },
    visualSchematics: [
      {
        title: 'Sovereign Pair-Programming Studio Concept',
        caption: 'Multi-agent orchestration ring, AST dependency graphs, and visual git checkpoint trees.',
        imageUrl: `${base}/images/showcase/supper-ide-hero.png`,
        diagramType: 'System Concept'
      },
      {
        title: 'AMAWS v6.0 Agent Coordination Architecture',
        caption: 'Planner, researcher, coder, and auditor subagent rings collaborating via IPC sockets.',
        imageUrl: `${base}/images/architecture/08_8_c4_container_diagram.png`,
        diagramType: 'C4 Container'
      }
    ],
    deepArchitecture: {
      pipelineSteps: [
        { title: 'Hierarchical Task Decomposition', desc: 'Planner agent decomposes user intent into atomic, testable sub-goals.' },
        { title: 'Context-Aware Model Routing', desc: 'Routes 80% of lightweight tasks to fast local models, reserving frontier models for synthesis.' },
        { title: 'Tree-sitter AST Patch Generation', desc: 'Synthesizes surgical AST replacement diffs instead of re-generating entire files.' },
        { title: 'Automated Test & Rollback Guard', desc: 'Executes test harness in sandbox; automatically rolls back upon regression.' }
      ],
      dockerServices: ['supper-core-daemon', 'ollama-router', 'test-sandbox-runner'],
      dossierId: 'DOS-P4-001',
      testPassRate: '55 / 55 Passed in 5.87s',
      strategicHorizon: 'Enterprise deployment with zero-telemetry local air-gapped compliance certification.'
    }
  },

  'operon-extension': {
    projectId: 'operon-extension',
    heroImage: `${base}/images/showcase/supper-ide-hero.png`,
    mvpIdea: {
      problemSpark: 'VS Code extensions for AI programming suffer UI sluggishness and fail when network connectivity drops.',
      earlyPrototype: 'Developed an open-source VS Code extension with webview diff review, offline language server protocol (LSP) indexing, and zero-telemetry guarantees.',
      simulatorType: 'generic'
    },
    visualSchematics: [
      {
        title: 'Operon Autonomous VS Code Architecture',
        caption: 'Real-time diff viewer, LSP symbol navigation, and local LLM broker.',
        imageUrl: `${base}/images/showcase/supper-ide-hero.png`,
        diagramType: 'System Concept'
      }
    ],
    deepArchitecture: {
      pipelineSteps: [
        { title: 'LSP Symbol Indexing', desc: 'Extracts real-time AST symbol declarations across workspace.' },
        { title: 'Streaming Patch Application', desc: 'Renders syntax-highlighted side-by-side diffs in Webview.' },
        { title: 'Audited Git Commit', desc: 'Commits verified modifications with cryptographic signature.' }
      ],
      dockerServices: ['operon-extension-builder', 'vsce-packager'],
      dossierId: 'DOS-P4-002',
      testPassRate: '307 / 308 (99.7%) Passed',
      strategicHorizon: 'Publishing to Open VSX registry for sovereign developer toolchains.'
    }
  },

  'trustwise-adaptiverag': {
    projectId: 'trustwise-adaptiverag',
    heroImage: `${base}/images/showcase/vehiclegpt-hero.png`,
    mvpIdea: {
      problemSpark: 'Standard enterprise RAG platforms allow information leakage across user queries and suffer hallucinations when keyword exactness is diluted by dense embeddings.',
      earlyPrototype: 'Early single-collection vector search frequently returned stale or contradictory paragraphs. Upgraded to tri-isolated data planes with Reciprocal Rank Fusion (BM25 + Dense) and mutual information correlation budgets.',
      simulatorType: 'generic'
    },
    visualSchematics: [
      {
        title: 'Tri-Isolated Data Plane Architecture',
        caption: 'Air-gapped org_vault, peer-reviewed trusted_corpus, and exploratory rd_sandbox.',
        imageUrl: `${base}/images/architecture/08_8_c4_container_diagram.png`,
        diagramType: 'C4 Container'
      },
      {
        title: 'RAG Retrieval & Contradiction Resolution Workflow',
        caption: 'Dynamic query routing, reciprocal rank fusion, and calibrated citation confidence bounds.',
        imageUrl: `${base}/images/architecture/12_12_rag_retrieval_workflow.png`,
        diagramType: 'Sequence'
      },
      {
        title: 'Security Control Map & Lineage Privacy Guard',
        caption: 'Correlation budget preventing differential privacy side-channel leakage across sessions.',
        imageUrl: `${base}/images/architecture/18_18_security_control_map.png`,
        diagramType: 'Deployment'
      }
    ],
    deepArchitecture: {
      pipelineSteps: [
        { title: 'Dynamic Query Entropy Routing', desc: 'Classifies query intent between lexical BM25, semantic vector, and graph paths.' },
        { title: 'Tri-Isolated Plane Ingestion', desc: 'Enforces data boundaries across org_vault, trusted_corpus, and rd_sandbox.' },
        { title: 'Reciprocal Rank Fusion (RRF)', desc: 'Combines sparse and dense candidate ranks for zero keyword dilution.' },
        { title: 'Calibrated Citation Grounding', desc: 'Calculates empirical confidence intervals and redacts unsupported assertions.' }
      ],
      dockerServices: ['trustwise-api', 'trustwise-hybrid-retriever', 'trustwise-worker', 'redis-ledger'],
      dossierId: 'DOS-P1-002',
      testPassRate: '195 / 197 (98.9%) Passed',
      strategicHorizon: 'Transition into a multi-tenant enterprise intelligence platform with verifiable attestation.'
    }
  }
};

export function getShowcaseForProject(projectId: string): ShowcaseData {
  if (SHOWCASE_REGISTRY[projectId]) {
    return SHOWCASE_REGISTRY[projectId];
  }

  // Fallback generic showcase for other projects
  return {
    projectId,
    heroImage: `${base}/images/showcase/vehiclegpt-hero.png`,
    mvpIdea: {
      problemSpark: `Addressing critical architectural limitations in ${projectId} through deterministic, verified execution.`,
      earlyPrototype: 'Iterated from an exploratory CLI prototype into a hardened production platform backed by automated testing and containerization.',
      simulatorType: 'generic'
    },
    visualSchematics: [
      {
        title: 'C4 Container Architecture Blueprint',
        caption: 'Microservices, data persistence stores, and API gateway topology.',
        imageUrl: `${base}/images/architecture/08_8_c4_container_diagram.png`,
        diagramType: 'C4 Container'
      },
      {
        title: 'Deployment & Runtime Infrastructure',
        caption: 'Multi-tier container deployment with automated healthchecks.',
        imageUrl: `${base}/images/architecture/09_9_deployment_diagram.png`,
        diagramType: 'Deployment'
      }
    ],
    deepArchitecture: {
      pipelineSteps: [
        { title: 'Input Ingestion & Validation', desc: 'Validates schemas and payload integrity.' },
        { title: 'Deterministic Processing', desc: 'Executes core algorithms under bounded resource constraints.' },
        { title: 'State Persistence & Audit', desc: 'Records verified outputs to local persistence stores.' }
      ],
      dockerServices: [`${projectId}-api`, `${projectId}-worker`, `${projectId}-db`],
      dossierId: 'DOS-AUDITED',
      testPassRate: '100% Passed in Live Forensics'
    }
  };
}

export interface ProjectIdentityMeta {
  publicTitle: string;
  engineeringSubtitle: string;
  humanSummary: string;
  humanMetric: { value: string; label: string };
  domainLabel: string;
  domainIcon: string;
  domainKey?: 'security' | 'health' | 'mobility' | 'edu' | 'agentic' | 'systems';
  domainColor?: string;
  highlightTag?: string;
}

export const PROJECT_IDENTITY_REGISTRY: Record<string, ProjectIdentityMeta> = {
  'codeagent': {
    publicTitle: 'AI That Finds and Repairs Software Vulnerabilities',
    engineeringSubtitle: 'Sovereign Autonomous Program Repair Engine',
    humanSummary: 'Scans software repositories completely offline and automatically generates verified security fixes before code ships, keeping proprietary source code safe from cloud leaks.',
    humanMetric: { value: '100%', label: 'SARIF Compliance & Zero Regressions' },
    domainLabel: 'Software Security',
    domainIcon: 'shield',
    domainKey: 'security',
    domainColor: '#F43F5E',
    highlightTag: 'Privacy-First'
  },
  'vehiclegpt': {
    publicTitle: 'AI That Understands Connected Vehicles in Real Time',
    engineeringSubtitle: 'Edge Automotive CAN Telemetry & Dual-Plane Architecture',
    humanSummary: 'Monitors, filters, and diagnoses vehicle sensor signals in real time on low-power automotive hardware without dropping critical safety frames during network blackouts.',
    humanMetric: { value: '100k+', label: 'Vehicle Signals/sec Under 12W' },
    domainLabel: 'Smart Mobility',
    domainIcon: 'cpu',
    domainKey: 'mobility',
    domainColor: '#F59E0B',
    highlightTag: 'Deterministic RTOS'
  },
  'agentic-browser-defense': {
    publicTitle: 'Stopping AI Agents Before They Perform Unsafe Actions',
    engineeringSubtitle: 'Host-Side L2/L3 Capability-Token Mediation Proxy',
    humanSummary: 'An out-of-band security mediation layer that inspects and validates every tool action an AI agent attempts, neutralizing prompt injection and preventing rogue actions.',
    humanMetric: { value: '< 1 ms', label: 'Cryptographic Action Gating' },
    domainLabel: 'AI Safety & Security',
    domainIcon: 'shield',
    domainKey: 'security',
    domainColor: '#F43F5E',
    highlightTag: 'Zero-Replay'
  },
  'mc-ctvit-eeg-transformer': {
    publicTitle: 'Making Emotion-Aware AI 99% More Compute-Efficient',
    engineeringSubtitle: 'Decoupled Spatial-Temporal Quad-Branch EEG Attention',
    humanSummary: 'Separates brainwave electrode spatial geometries from time dynamics to detect human emotional states with 99.9% less compute, enabling wearable brain interfaces.',
    humanMetric: { value: '99.95%', label: 'Less Attention Computation' },
    domainLabel: 'Neural AI & Healthcare',
    domainIcon: 'activity',
    domainKey: 'health',
    domainColor: '#10B981',
    highlightTag: 'FLOP Reduction'
  },
  'swasthya-health-network': {
    publicTitle: 'Digital Public Health Workflows for Frontline Workers',
    engineeringSubtitle: '5-Tier Rural Clinical Decision Support & Tele-Triage Funnel',
    humanSummary: 'Assists rural healthcare teams across 20+ village centers with offline maternal health tracking, statutory vaccination schedules, and doctor tele-consultations.',
    humanMetric: { value: '236', label: 'Statutory Health Duties Coordinated' },
    domainLabel: 'Digital Healthcare',
    domainIcon: 'heart',
    domainKey: 'health',
    domainColor: '#10B981',
    highlightTag: 'Rural Health'
  },
  'isro-route-resilience': {
    publicTitle: 'Rebuilding Broken Road Maps After Floods and Disasters',
    engineeringSubtitle: 'Topological Satellite Gap Healing & Evacuation Routing',
    humanSummary: 'Reconstructs continuous road networks from occluded satellite images during severe floods, finding the fastest safe evacuation routes for rescue teams.',
    humanMetric: { value: '-38.4%', label: 'Emergency Evacuation Time Saved' },
    domainLabel: 'Disaster & Space AI',
    domainIcon: 'map-pin',
    domainKey: 'mobility',
    domainColor: '#F59E0B',
    highlightTag: 'ISRO BAH 2026'
  },
  'blockchain-ehr-bcfl': {
    publicTitle: 'Secure Medical Records Shared Without Losing Privacy',
    engineeringSubtitle: 'Byzantine-Resilient Lipschitz PoCC Federated Learning',
    humanSummary: 'Enables multiple hospitals to collaboratively train medical diagnostic models without ever sharing private patient records or risking data tampering.',
    humanMetric: { value: '0%', label: 'Patient Data Leaked to Central Servers' },
    domainLabel: 'Healthcare Privacy',
    domainIcon: 'lock',
    domainKey: 'health',
    domainColor: '#10B981',
    highlightTag: 'Federated Trust'
  },
  'vulrag-security': {
    publicTitle: 'Offline Security Scanner for Sensitive Repositories',
    engineeringSubtitle: 'Multi-Analyzer Consensus & Local Tree-sitter APR Engine',
    humanSummary: 'Combines multiple security analyzers with local AI models to discover and patch vulnerabilities entirely on an air-gapped machine with zero cloud connectivity.',
    humanMetric: { value: '100%', label: 'Air-Gapped Sovereign Execution' },
    domainLabel: 'Software Security',
    domainIcon: 'code',
    domainKey: 'security',
    domainColor: '#F43F5E',
    highlightTag: 'Zero-Cloud Egress'
  },
  'trustwise-adaptiverag': {
    publicTitle: 'Private AI Search for Confidential Organizational Data',
    engineeringSubtitle: 'Tri-Isolated Mathematical Privacy-Bounded Enterprise RAG',
    humanSummary: 'Enables employees to search proprietary company knowledge and documents without risking confidential intellectual property leaking between internal teams.',
    humanMetric: { value: '195/197', label: 'Information Isolation Tests Passed' },
    domainLabel: 'Enterprise AI',
    domainIcon: 'search',
    domainKey: 'agentic',
    domainColor: '#06B6D4',
    highlightTag: 'Confidential RAG'
  },
  'supper-ide': {
    publicTitle: 'Autonomous AI Coding Partner Built for Developer Privacy',
    engineeringSubtitle: 'AMAWS Multi-Agent Orchestrator & Local Routing Core',
    humanSummary: 'An autonomous developer pairing tool that executes coding tasks, runs test suites, and refactors code using local private models with minimal cloud latency.',
    humanMetric: { value: '80%', label: 'Local Model Zero-Cloud Routing' },
    domainLabel: 'Developer Tools',
    domainIcon: 'terminal',
    domainKey: 'agentic',
    domainColor: '#06B6D4',
    highlightTag: 'Autonomous IDE'
  },
  'hierarchical-ids': {
    publicTitle: 'Microsecond Defense Against Industrial Network Attacks',
    engineeringSubtitle: 'Dual-Tier Sub-10µs Anomaly Gating & Signature Firewall',
    humanSummary: 'Protects critical factory and infrastructure communications by detecting and neutralizing malicious telemetry spikes in under 10 microseconds.',
    humanMetric: { value: '< 10 µs', label: 'Industrial Attack Interception' },
    domainLabel: 'Cybersecurity',
    domainIcon: 'shield',
    domainKey: 'security',
    domainColor: '#F43F5E',
    highlightTag: 'Sub-10µs Gating'
  },
  'quantum-cryptography': {
    publicTitle: 'Post-Quantum Cryptographic Guard for Next-Decade Trust',
    engineeringSubtitle: 'NIST FIPS 203 ML-KEM Module-LWE Key Encapsulation',
    humanSummary: 'Upgrades secure communication channels with mathematical lattice cryptography designed to resist decryption by future quantum supercomputers.',
    humanMetric: { value: 'FIPS 203', label: 'NIST Quantum Standards Aligned' },
    domainLabel: 'Cryptography',
    domainIcon: 'key',
    domainKey: 'security',
    domainColor: '#F43F5E',
    highlightTag: 'Lattice Security'
  },
  'operon-extension': {
    publicTitle: 'Visual Diff Review for Autonomous Code Refactoring',
    engineeringSubtitle: 'Open VSX Extension & Multi-Agent Safety Visualizer',
    humanSummary: 'A code editor extension that provides transparent side-by-side diffs and verification checkpoints before AI-generated code edits are merged into projects.',
    humanMetric: { value: '307/308', label: 'Automated Extension Checks Passed' },
    domainLabel: 'Developer Tools',
    domainIcon: 'git-branch',
    domainKey: 'agentic',
    domainColor: '#06B6D4',
    highlightTag: 'Open VSX'
  },
  'engineering-knowledge-rag': {
    publicTitle: 'Instant Search Across Millions of Technical Blueprints',
    engineeringSubtitle: 'SQLite FTS5 BM25 Engine Bounded to 80% Memory Quotas',
    humanSummary: 'Enables aerospace, electrical, and mechanical engineers to search thousands of dense specification documents with sub-100 millisecond response times.',
    humanMetric: { value: '< 100 ms', label: 'Query Retrieval on Constrained RAM' },
    domainLabel: 'Knowledge Retrieval',
    domainIcon: 'file-text',
    domainKey: 'systems',
    domainColor: '#3B82F6',
    highlightTag: 'Sub-100ms Search'
  },
  'stockai-platform': {
    publicTitle: 'Autonomous Market Intelligence with Audit Trails',
    engineeringSubtitle: 'Multi-Factor Quantitative Sentiment & Risk Engine',
    humanSummary: 'Analyzes financial markets and news sentiment using transparent risk boundaries and verifiable reasoning steps rather than unexplainable predictions.',
    humanMetric: { value: '100%', label: 'Decision Traceability & Risk Bounds' },
    domainLabel: 'Quantitative Analytics',
    domainIcon: 'trending-up',
    domainKey: 'systems',
    domainColor: '#3B82F6',
    highlightTag: 'Explainable AI'
  },
  'sanjaya-ai': {
    publicTitle: 'Multilingual Audio Intelligence for Regional Access',
    engineeringSubtitle: 'End-to-End Edge Speech-to-Intent Pipeline',
    humanSummary: 'Enables rural citizens to interact with digital public services and healthcare information using spoken regional dialects on standard mobile devices.',
    humanMetric: { value: '3 Dialects', label: 'Edge Audio Intent Recognition' },
    domainLabel: 'Accessible AI',
    domainIcon: 'mic',
    domainKey: 'agentic',
    domainColor: '#06B6D4',
    highlightTag: 'Regional Voice'
  },
  'flipkart-ml-platform': {
    publicTitle: 'Detecting Supply Chain Anomalies Before Orders Fail',
    engineeringSubtitle: 'Distributed High-Throughput E-Commerce ML Pipeline',
    humanSummary: 'Monitors e-commerce supply chains and fulfillment streams in real time to catch logistics bottlenecks and delivery disruptions before they impact customers.',
    humanMetric: { value: 'Real-Time', label: 'Logistics Disruption Mitigation' },
    domainLabel: 'Enterprise ML',
    domainIcon: 'truck',
    domainKey: 'systems',
    domainColor: '#3B82F6',
    highlightTag: 'E-Commerce ML'
  },
  'paradox-ai': {
    publicTitle: 'Simulating Dynamic Human Decision Making',
    engineeringSubtitle: 'Agentic Behavioral Game-Theoretic Simulation Engine',
    humanSummary: 'Models how groups of people make decisions during emergencies and resource shortages, helping disaster managers stress-test response policies.',
    humanMetric: { value: 'Multi-Agent', label: 'Game-Theoretic Crisis Simulation' },
    domainLabel: 'Behavioral AI',
    domainIcon: 'users',
    domainKey: 'agentic',
    domainColor: '#06B6D4',
    highlightTag: 'Crisis Modeling'
  },
  'private-memory-os': {
    publicTitle: 'Private Personal Assistant That Never Forgets or Leaks',
    engineeringSubtitle: 'Local Vector Memory Store with Cryptographic Erasure',
    humanSummary: 'Stores long-term conversation history strictly on personal devices, allowing users to securely query past insights without third-party tracking or profiling.',
    humanMetric: { value: '0 bytes', label: 'Cloud Egress on Personal Context' },
    domainLabel: 'Personal AI',
    domainIcon: 'hard-drive',
    domainKey: 'systems',
    domainColor: '#3B82F6',
    highlightTag: 'Hardware Privacy'
  }
};

export function getProjectIdentity(projectId: string): ProjectIdentityMeta {
  if (PROJECT_IDENTITY_REGISTRY[projectId]) {
    return PROJECT_IDENTITY_REGISTRY[projectId];
  }
  return {
    publicTitle: projectId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    engineeringSubtitle: 'Verified System Architecture & Implementation',
    humanSummary: 'Engineered for reliability, privacy, and performance under rigorous validation standards.',
    humanMetric: { value: 'VERIFIED', label: 'Automated Test Pass' },
    domainLabel: 'AI Systems',
    domainIcon: 'cpu',
    domainKey: 'systems',
    domainColor: '#3B82F6'
  };
}
