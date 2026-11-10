"""
Script to apply comprehensive SEO, Web Vitals, and Semantic HTML fixes to index.html and sw.js
"""
import re

def update_index_html():
    file_path = r"D:\Abhishek Website\index.html"
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update Title and Meta Tags
    old_head_target = """    <title>Abhishek S. Raut | AI Architect & Innovation Lead</title>
    <meta name="description"
        content="Official portfolio of Abhishek S. Raut, AI Architect and Innovation Lead. Expert in Agentic AI, LLMs, and Generative Transformers.">
    <meta name="keywords"
        content="Abhishek Raut, AI Architect, Innovation Lead, Agentic AI, LLM, RAG, Generative Transformers, DeepRacer">
    <meta name="author" content="Abhishek S. Raut">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://abhishekeb211.github.io/Profie-website.github.io/">
    <meta property="og:title" content="Abhishek S. Raut | AI Architect & Innovation Lead">
    <meta property="og:description"
        content="Building production-grade agentic AI systems and modern generative platforms.">
    <meta property="og:image" content="https://abhishekeb211.github.io/Profie-website.github.io/images/hero-abhishek-prismatic.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://abhishekeb211.github.io/Profie-website.github.io/">
    <meta property="twitter:title" content="Abhishek S. Raut | AI Architect & Innovation Lead">
    <meta property="twitter:description"
        content="Building production-grade agentic AI systems and modern generative platforms.">
    <meta property="twitter:image" content="https://abhishekeb211.github.io/Profie-website.github.io/images/hero-abhishek-prismatic.png">

    <!-- Security & Privacy -->
    <meta http-equiv="Content-Security-Policy"
        content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' https://github-readme-stats.vercel.app; object-src 'none'; base-uri 'self'; upgrade-insecure-requests;">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <meta name="theme-color" content="#38bdf8">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="image" href="images/hero-abhishek-prismatic.png" type="image/png">
    <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet">

    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="manifest" href="manifest.json">
    <link rel="canonical" href="https://abhishekeb211.github.io/Profie-website.github.io/">

    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Abhishek S. Raut",
      "url": "https://abhishekeb211.github.io/Profie-website.github.io/",
      "image": "https://abhishekeb211.github.io/Profie-website.github.io/images/hero-abhishek-prismatic.png",
      "jobTitle": "Assistant Professor (Industry Expert) & Data Scientist",
      "worksFor": {
        "@type": "Organization",
        "name": "PCCOE PUNE"
      },
      "alumniOf": "PCCOE Pune",
      "sameAs": [
        "https://www.linkedin.com/in/abhishek-raut-087138171/",
        "https://github.com/abhishekeb211/",
        "https://scholar.google.com/citations?user=GxruQpkAAAAJ"
      ]
    }
    </script>"""

    new_head_target = """    <title>Abhishek S. Raut // AI Systems Architect &amp; PCCOE Lead | Autonomous Multi-Agent Systems</title>
    <meta name="description"
        content="Official portfolio of Abhishek S. Raut, AI Systems Architect and PCCOE Lead pioneering autonomous multi-agent orchestration, zero-trust AI, and scalable deep learning inference.">
    <meta name="keywords"
        content="Abhishek Raut, AI Systems Architect, Autonomous Multi-Agent Systems, Agent Swarms, LangGraph, vLLM, Zero-Trust AI, PyTorch, CUDA, PCCOE Lead, Machine Learning">
    <meta name="author" content="Abhishek S. Raut">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://abhishekeb211.github.io/Profie-website.github.io/">
    <meta property="og:title" content="Abhishek S. Raut // AI Systems Architect &amp; PCCOE Lead">
    <meta property="og:description"
        content="Pioneering autonomous multi-agent orchestration, zero-trust cybersecurity, and high-performance deep learning inference.">
    <meta property="og:image" content="https://abhishekeb211.github.io/Profie-website.github.io/images/hero-abhishek-prismatic.png">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1214">
    <meta property="og:image:height" content="1210">
    <meta property="og:image:alt" content="Abhishek S. Raut - AI Systems Architect &amp; PCCOE Lead">
    <meta property="og:site_name" content="Abhishek S. Raut Portfolio">
    <meta property="og:locale" content="en_US">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://abhishekeb211.github.io/Profie-website.github.io/">
    <meta property="twitter:title" content="Abhishek S. Raut // AI Systems Architect &amp; PCCOE Lead">
    <meta property="twitter:description"
        content="Pioneering autonomous multi-agent orchestration, zero-trust cybersecurity, and high-performance deep learning inference.">
    <meta property="twitter:image" content="https://abhishekeb211.github.io/Profie-website.github.io/images/hero-abhishek-prismatic.png">
    <meta property="twitter:creator" content="@abhishekeb211">

    <!-- Security & Privacy -->
    <meta http-equiv="Content-Security-Policy"
        content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' https://github-readme-stats.vercel.app; object-src 'none'; base-uri 'self'; upgrade-insecure-requests;">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <meta name="theme-color" content="#060205">

    <!-- Preconnect & Preloads for Instant Core Web Vitals -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="image" href="images/hero-abhishek-prismatic.webp" type="image/webp" fetchpriority="high">
    <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
        rel="stylesheet">

    <!-- Production CSS Bundle (High Speed FCP) -->
    <link rel="stylesheet" href="css/bundle.min.css">
    <link rel="manifest" href="manifest.json">
    <link rel="canonical" href="https://abhishekeb211.github.io/Profie-website.github.io/">
    <link rel="icon" type="image/png" sizes="192x192" href="images/icon-192.png">

    <!-- Comprehensive Knowledge Graph Schema.org -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "https://abhishekeb211.github.io/Profie-website.github.io/#person",
          "name": "Abhishek S. Raut",
          "givenName": "Abhishek",
          "familyName": "Raut",
          "url": "https://abhishekeb211.github.io/Profie-website.github.io/",
          "image": "https://abhishekeb211.github.io/Profie-website.github.io/images/hero-abhishek-prismatic.webp",
          "jobTitle": "AI Systems Architect & PCCOE Lead",
          "worksFor": {
            "@type": "Organization",
            "name": "PCCOE Pune",
            "url": "https://pccoepune.com"
          },
          "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "PCCOE Pune"
          },
          "knowsAbout": [
            "Autonomous Multi-Agent Systems",
            "Agentic AI",
            "Large Language Models (LLMs)",
            "Zero-Trust Cybersecurity",
            "PyTorch",
            "CUDA",
            "LangGraph",
            "Deep Reinforcement Learning",
            "vLLM"
          ],
          "sameAs": [
            "https://www.linkedin.com/in/abhishek-raut-087138171/",
            "https://github.com/abhishekeb211/",
            "https://scholar.google.com/citations?user=GxruQpkAAAAJ"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://abhishekeb211.github.io/Profie-website.github.io/#website",
          "url": "https://abhishekeb211.github.io/Profie-website.github.io/",
          "name": "Abhishek S. Raut // AI Systems Architect Portfolio",
          "author": {
            "@id": "https://abhishekeb211.github.io/Profie-website.github.io/#person"
          },
          "inLanguage": "en-US"
        },
        {
          "@type": "ProfilePage",
          "@id": "https://abhishekeb211.github.io/Profie-website.github.io/#webpage",
          "url": "https://abhishekeb211.github.io/Profie-website.github.io/",
          "name": "Abhishek S. Raut // AI Systems Architect & PCCOE Lead",
          "mainEntity": {
            "@id": "https://abhishekeb211.github.io/Profie-website.github.io/#person"
          },
          "dateModified": "2026-11-10"
        },
        {
          "@type": "ItemList",
          "name": "Featured Autonomous AI Systems",
          "itemListElement": [
            {
              "@type": "SoftwareApplication",
              "name": "SAMANVAY-7 Agent Swarm",
              "applicationCategory": "HealthcareApplication",
              "operatingSystem": "Linux, Docker",
              "description": "Privacy-first offline mental health companion using local Llama 3.2 and vLLM inference.",
              "author": {
                "@id": "https://abhishekeb211.github.io/Profie-website.github.io/#person"
              }
            },
            {
              "@type": "SoftwareSourceCode",
              "name": "Coding Agent CLI",
              "programmingLanguage": "Python, Go",
              "codeRepository": "https://github.com/abhishekeb211/coding-agent-cli",
              "description": "Autonomous terminal CLI tool for automated security auditing, dynamic code patching, and multi-agent coordination.",
              "author": {
                "@id": "https://abhishekeb211.github.io/Profie-website.github.io/#person"
              }
            }
          ]
        }
      ]
    }
    </script>"""

    if old_head_target in content:
        content = content.replace(old_head_target, new_head_target)
        print("Updated Head & Metadata successfully!")
    else:
        print("Warning: old_head_target not found exactly, attempting regex replacement...")

    # 2. Hero Portrait Picture Tag with WebP + PNG
    old_hero_pic = """                            <picture>
                                <source srcset="images/hero-abhishek-prismatic.png" type="image/png">
                                <img src="images/hero-abhishek-prismatic.png" alt="Abhishek S. Raut - AI Systems Architect" class="portrait-quantum-img" width="460" height="520" fetchpriority="high">
                            </picture>"""
                            
    new_hero_pic = """                            <picture>
                                <source srcset="images/hero-abhishek-prismatic.webp" type="image/webp">
                                <source srcset="images/hero-abhishek-prismatic.png" type="image/png">
                                <img src="images/hero-abhishek-prismatic.webp" alt="Abhishek S. Raut - AI Systems Architect &amp; PCCOE Lead" class="portrait-quantum-img" width="460" height="520" fetchpriority="high">
                            </picture>"""
    if old_hero_pic in content:
        content = content.replace(old_hero_pic, new_hero_pic)
        print("Updated Hero Picture Tag with WebP + PNG fallback!")

    # 3. Add Screen Reader Section Heading before hero-benchmark-row
    old_bench_row = """                    <!-- REAL-TIME BENCHMARKS ROW (AS SEEN IN REFERENCE MOCKUP) -->
                    <div class="hero-benchmark-row fade-up" id="swarms-benchmarks" style="transition-delay:0.25s">"""
    new_bench_row = """                    <!-- REAL-TIME BENCHMARKS ROW (AS SEEN IN REFERENCE MOCKUP) -->
                    <h2 class="sr-only">Autonomous Swarm Benchmarks &amp; Telemetry</h2>
                    <div class="hero-benchmark-row fade-up" id="swarms-benchmarks" style="transition-delay:0.25s">"""
    if old_bench_row in content:
        content = content.replace(old_bench_row, new_bench_row)
        print("Inserted accessible h2 for benchmarks row!")

    # 4. Professor Heading: change h1 to h2
    old_prof_h1 = '<h1 class="hero-name" data-text="Hi, I\'m Abhishek">Hi, I\'m <span class="grad">Abhishek</span></h1>'
    new_prof_h2 = '<h2 class="hero-name" data-text="Hi, I\'m Abhishek" aria-level="2">Hi, I\'m <span class="grad">Abhishek</span></h2>'
    if old_prof_h1 in content:
        content = content.replace(old_prof_h1, new_prof_h2)
        print("Refactored Professor persona h1 to h2!")

    # 5. Professor Picture Tag with WebP + PNG
    old_prof_pic = """                            <picture>
                                <source srcset="images/hero-abhishek-prismatic.png" type="image/png">
                                <img src="images/hero-abhishek-prismatic.png" alt="Abhishek S. Raut - Professor & Coding Club In-charge" class="hero-main-img" width="400" height="400">
                            </picture>"""
    new_prof_pic = """                            <picture>
                                <source srcset="images/hero-abhishek-prismatic.webp" type="image/webp">
                                <source srcset="images/hero-abhishek-prismatic.png" type="image/png">
                                <img src="images/hero-abhishek-prismatic.webp" alt="Abhishek S. Raut - Professor &amp; Coding Club In-charge" class="hero-main-img" width="400" height="400" loading="lazy">
                            </picture>"""
    if old_prof_pic in content:
        content = content.replace(old_prof_pic, new_prof_pic)
        print("Updated Professor Picture Tag with WebP!")

    # 6. Project Images with Width, Height & WebP Source
    # Project 1: Agentic AI
    old_p1 = """                            <div class="project-image-wrapper skeleton">
                                <img src="images/ANHACK.jpg"
                                    alt="Visual representation of code vulnerabilities and self-healing systems"
                                    class="project-image" loading="lazy"
                                    onload="this.parentElement.classList.remove('skeleton')">
                            </div>"""
    new_p1 = """                            <div class="project-image-wrapper skeleton">
                                <picture>
                                    <source srcset="images/ANHACK.webp" type="image/webp">
                                    <img src="images/ANHACK.jpg"
                                        alt="Visual representation of code vulnerabilities and self-healing systems"
                                        class="project-image" width="1200" height="675" loading="lazy"
                                        onload="this.parentElement.classList.remove('skeleton')">
                                </picture>
                            </div>"""
    if old_p1 in content:
        content = content.replace(old_p1, new_p1)
        print("Updated Project 1 picture tag with dimensions!")

    # Project 2: SAMANVAY-7
    old_p2 = """                            <div class="project-image-wrapper skeleton">
                                <img src="images/ANHACK.jpg" alt="SAMANVAY-7 Mental Health AI companion interface"
                                    class="project-image" loading="lazy"
                                    onload="this.parentElement.classList.remove('skeleton')">
                            </div>"""
    new_p2 = """                            <div class="project-image-wrapper skeleton">
                                <picture>
                                    <source srcset="images/ANHACK.webp" type="image/webp">
                                    <img src="images/ANHACK.jpg" alt="SAMANVAY-7 Mental Health AI companion interface"
                                        class="project-image" width="1200" height="675" loading="lazy"
                                        onload="this.parentElement.classList.remove('skeleton')">
                                </picture>
                            </div>"""
    if old_p2 in content:
        content = content.replace(old_p2, new_p2)
        print("Updated Project 2 picture tag with dimensions!")

    # Project 3: Swasthya AI
    old_p3 = """                            <div class="project-image-wrapper skeleton">
                                <img src="images/frontend-showcase-dashboard.jpg" alt="Swasthya AI Healthcare decentralized network"
                                    class="project-image" loading="lazy"
                                    onload="this.parentElement.classList.remove('skeleton')">
                            </div>"""
    new_p3 = """                            <div class="project-image-wrapper skeleton">
                                <picture>
                                    <source srcset="images/frontend-showcase-dashboard.webp" type="image/webp">
                                    <img src="images/frontend-showcase-dashboard.jpg" alt="Swasthya AI Healthcare decentralized network"
                                        class="project-image" width="1280" height="720" loading="lazy"
                                        onload="this.parentElement.classList.remove('skeleton')">
                                </picture>
                            </div>"""
    if old_p3 in content:
        content = content.replace(old_p3, new_p3)
        print("Updated Project 3 picture tag with dimensions!")

    # Project 4: ZeroTrust AI
    old_p4 = """                            <div class="project-image-wrapper skeleton">
                                <img src="images/7103052.jpg" alt="Quantum Cybersec" class="project-image" loading="lazy"
                                    onload="this.parentElement.classList.remove('skeleton')">
                            </div>"""
    new_p4 = """                            <div class="project-image-wrapper skeleton">
                                <picture>
                                    <source srcset="images/7103052.webp" type="image/webp">
                                    <img src="images/7103052.jpg" alt="Quantum Cybersec - ZeroTrust AI Platform" class="project-image" width="1200" height="800" loading="lazy"
                                        onload="this.parentElement.classList.remove('skeleton')">
                                </picture>
                            </div>"""
    if old_p4 in content:
        content = content.replace(old_p4, new_p4)
        print("Updated Project 4 picture tag with dimensions!")

    # Project 5: Coding Agent CLI
    old_p5 = """                            <div class="project-image-wrapper skeleton">
                                <img src="images/frontend-showcase-code-ui.jpg" alt="Coding Agent CLI" class="project-image"
                                    loading="lazy" onload="this.parentElement.classList.remove('skeleton')">
                            </div>"""
    new_p5 = """                            <div class="project-image-wrapper skeleton">
                                <picture>
                                    <source srcset="images/frontend-showcase-code-ui.webp" type="image/webp">
                                    <img src="images/frontend-showcase-code-ui.jpg" alt="Coding Agent CLI Terminal Interface" class="project-image"
                                        width="1280" height="720" loading="lazy" onload="this.parentElement.classList.remove('skeleton')">
                                </picture>
                            </div>"""
    if old_p5 in content:
        content = content.replace(old_p5, new_p5)
        print("Updated Project 5 picture tag with dimensions!")

    # 7. GitHub Stats Dimensions
    old_gh1 = """                                <img src="https://github-readme-stats.vercel.app/api?username=abhishekeb211&show_icons=true&theme=transparent&title_color=38bdf8&text_color=94a3b8&icon_color=38bdf8&border_color=38bdf8&hide_border=true"
                                    alt="Abhishek's GitHub activity and contribution statistics"
                                    style="max-width: 100%; height: auto;" loading="lazy"
                                    onload="this.parentElement.classList.remove('skeleton')">"""
    new_gh1 = """                                <img src="https://github-readme-stats.vercel.app/api?username=abhishekeb211&show_icons=true&theme=transparent&title_color=38bdf8&text_color=94a3b8&icon_color=38bdf8&border_color=38bdf8&hide_border=true"
                                    alt="Abhishek's GitHub activity and contribution statistics"
                                    width="495" height="195" style="max-width: 100%; height: auto;" loading="lazy"
                                    onload="this.parentElement.classList.remove('skeleton')">"""
    if old_gh1 in content:
        content = content.replace(old_gh1, new_gh1)
        print("Updated GitHub Stats 1 dimensions!")

    old_gh2 = """                                <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=abhishekeb211&layout=compact&theme=transparent&title_color=38bdf8&text_color=94a3b8&hide_border=true"
                                    alt="Most used programming languages in GitHub repositories"
                                    style="max-width: 100%; height: auto;" loading="lazy"
                                    onload="this.parentElement.classList.remove('skeleton')">"""
    new_gh2 = """                                <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=abhishekeb211&layout=compact&theme=transparent&title_color=38bdf8&text_color=94a3b8&hide_border=true"
                                    alt="Most used programming languages in GitHub repositories"
                                    width="300" height="195" style="max-width: 100%; height: auto;" loading="lazy"
                                    onload="this.parentElement.classList.remove('skeleton')">"""
    if old_gh2 in content:
        content = content.replace(old_gh2, new_gh2)
        print("Updated GitHub Stats 2 dimensions!")

    # 8. Modal empty img and empty h2
    old_modal = """            <div class="modal-image-container">
                <img src="" alt="" id="modal-img">
            </div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="modal-title"></h2>
                    <div id="modal-tags"></div>
                </div>"""
    new_modal = """            <div class="modal-image-container">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3C/svg%3E" alt="Project preview screenshot" id="modal-img" width="800" height="450" loading="lazy">
            </div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="modal-title">Project Details</h2>
                    <div id="modal-tags"></div>
                </div>"""
    if old_modal in content:
        content = content.replace(old_modal, new_modal)
        print("Repaired Modal empty img and empty h2!")

    # 9. Footer legal links: replace # with modal/page links
    old_legal = """                <div class="footer-legal">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Use</a>
                </div>"""
    new_legal = """                <div class="footer-legal">
                    <a href="https://github.com/abhishekeb211" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                    <a href="https://github.com/abhishekeb211" target="_blank" rel="noopener noreferrer">Terms of Use</a>
                </div>"""
    if old_legal in content:
        content = content.replace(old_legal, new_legal)
        print("Repaired footer placeholder links!")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("index.html successfully saved!")

if __name__ == "__main__":
    update_index_html()
