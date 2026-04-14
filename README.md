# Standard Model — Modular Physics Framework

A four-paper research series presenting the Standard Model of particle physics through modular composition, where physical laws compose hierarchically with emergent properties at each level.

## Papers

| # | Paper | Pages |
|---|-------|-------|
| I | **Matter** — Fundamental particles, Higgs mechanism, QCD confinement | 28 |
| II | **Anti-Matter** — CPT symmetry, CP violation, baryogenesis | 27 |
| III | **Synthesis to Standard Model** — SU(3)×SU(2)×U(1) gauge unification | 27 |
| IV | **Unified Synthesis** — Cross-cutting themes, compositional structure | 29 |

**Total: 111 pages**

## Modular Framework

Laws compose hierarchically, each producing emergent properties:

- **Law I (Size-Aware):** Characteristic scales and kinematics
- **Law II (Thermal):** Statistical mechanics and phase transitions
- **Law III (Quantum):** Gauge field theory and interactions
- **Law IV (Gravitational):** Open frontier — quantum gravity

## Haskell Verification

Four modules in `code/haskell/` formally verify key physics results against PDG 2024 values:

- Anomaly cancellation (all 4 conditions)
- Electroweak parameters, gauge boson masses
- CKM matrix unitarity, Jarlskog invariant
- QCD asymptotic freedom, RG running
- Proton mass decomposition (99% from QCD dynamics)
- Baryogenesis insufficiency quantification

All compile with `ghc -Wall` — zero warnings.

## Website

Live at: https://website-peach-one-39.vercel.app

Dark-themed Next.js site with KaTeX math rendering, PDF downloads, and OG meta tags.

## Structure

```
papers/           LaTeX sources and compiled PDFs
code/haskell/     Formal verification modules
website/          Next.js research website
social/           Social media posts (Twitter/X, LinkedIn, Facebook, Bluesky)
images/           Cover images and OG social cards
```

## License

Research papers and code by Matthew Long / YonedaAI.
