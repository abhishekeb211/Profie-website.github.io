// src/data/showcaseRegistry.ts
// Single source of truth for the Interactive Project Showcase Studio & C4 Schematics

import type { ShowcaseData } from '../components/ProjectShowcaseContainer.astro';

const base = import.meta.env.BASE_URL;

export const SHOWCASE_REGISTRY: Record<string, ShowcaseData> = {
  'vehiclegpt': {
    projectId: 'vehiclegpt',
    mvpIdea: {
      problemSpark: 'Cloud-dependent vehicular analytics experience fatal packet loss in remote corridors, while monolithic AI runtimes overheat and blow past the 12W automotive embedded power envelope.',
      earlyPrototype: 'Early Python script on Raspberry Pi dropped 40% of 1000Hz CAN frames during peak traffic. Evolved into a C++20 zero-copy ring buffer with SCHED_FIFO priority isolating deterministic ingestion from asynchronous quantized GGUF reasoning.',
      simulatorType: 'can-bus'
    },
    visualSchematics: [
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
    mvpIdea: {
      problemSpark: 'Autonomous browser agents with ambient tool permissions are vulnerable to indirect prompt injection on adversarial webpages, leading to rogue transactions and data exfiltration.',
      earlyPrototype: 'Early prototype evaluated client-side DOM filters, which were easily bypassed by steganographic prompts. Redesigned into a host-side L2/L3 mediation proxy enforcing default read-only containment elevated only via 8-tuple HMAC tokens.',
      simulatorType: 'hmac-token'
    },
    visualSchematics: [
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
    mvpIdea: {
      problemSpark: 'Standard monolithic transformers computing joint self-attention across 62 electrode channels and 60 time frames suffer a catastrophic O((C*T)^2) memory explosion (~1.38x10^7 operations).',
      earlyPrototype: 'Early spatial-temporal ViT exhausted GPU VRAM on batch size 8. Redesigned with four heterogeneous feature branches decoupling spatial scalp topology from temporal sub-window entropy, cutting operations to 7,444 (99.9% reduction).',
      simulatorType: 'eeg-tensor'
    },
    visualSchematics: [
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
    mvpIdea: {
      problemSpark: 'Proprietary enterprise software cannot be sent to public cloud LLMs for vulnerability review without catastrophic trade secret exposure.',
      earlyPrototype: 'Early CLI wrapper produced contradictory warnings from individual linters. Evolved into a normalized finding schema clustering Semgrep, Bandit, and YARA with local Ollama critique and AST patch validation.',
      simulatorType: 'vuln-scan'
    },
    visualSchematics: [
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
    mvpIdea: {
      problemSpark: 'Disaster satellite GeoTIFFs (floods, cyclones) feature dense cloud shadows and tree canopy debris that sever road continuity, blinding routing algorithms.',
      earlyPrototype: 'Early pixel segmentation generated disconnected road fragments. Built a topological gap healer applying angle-penalized Minimum Spanning Trees (MST) and Tarjan articulation point analysis.',
      simulatorType: 'gap-healer'
    },
    visualSchematics: [
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

  'trustwise-adaptiverag': {
    projectId: 'trustwise-adaptiverag',
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
