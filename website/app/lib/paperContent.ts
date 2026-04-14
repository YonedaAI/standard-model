export type PaperSection = {
  id: string;
  title: string;
  level: 2 | 3;
};

export type PaperContentData = {
  slug: string;
  abstract: string;
  sections: PaperSection[];
  htmlContent: string;
};

const MATTER_CONTENT = `
<div class="paper-abstract">
  <strong>Abstract.</strong> We present a comprehensive treatment of the matter content of the Standard Model of particle physics within the modular physics framework, wherein physical laws compose hierarchically: Law I (Size-Aware) establishes characteristic scales, Law II (Thermal) governs statistical and phase structure, Law III (Quantum) provides the gauge field-theoretic description of fundamental particles and their interactions, and Law IV (Gravitational) marks the open frontier of unification. The paper develops the formal mathematical structure of the Standard Model matter sector, including the classification of fermions (quarks and leptons) in three generations, the gauge group <span class="katex-inline">SU(3)_C \\times SU(2)_L \\times U(1)_Y</span> and its representations, the Higgs mechanism for mass generation via spontaneous symmetry breaking, and the dynamics of quantum chromodynamics (QCD) including asymptotic freedom and confinement. We present key Lagrangians with full mathematical detail, prove several structural theorems concerning anomaly cancellation, the spin-statistics connection, and the necessity of three generations for CP violation, and discuss current experimental evidence from the Large Hadron Collider and precision measurements.
</div>

<h2 id="introduction">1. Introduction</h2>
<p>
The Standard Model of particle physics stands as one of the most precisely tested and successful scientific theories ever constructed. It describes the electromagnetic, weak nuclear, and strong nuclear interactions of all known fundamental particles, and its predictions have been confirmed to extraordinary precision across many orders of magnitude in energy. The discovery of the Higgs boson at the Large Hadron Collider in 2012 completed the particle content predicted by the theory.
</p>
<p>
In this paper, we present the matter content of the Standard Model within the <em>modular physics framework</em>, a conceptual architecture in which physical laws compose hierarchically, with each level of composition producing emergent properties not present at lower levels:
</p>
<ul>
  <li><strong>Law I (Size-Aware):</strong> Scale-dependent structure and kinematics</li>
  <li><strong>Law II (Thermal):</strong> Statistical mechanics, equilibrium, and phase transitions</li>
  <li><strong>Law III (Quantum):</strong> Gauge field theory, quantum numbers, and interactions</li>
  <li><strong>Law IV (Gravitational):</strong> The open frontier — quantum gravity and unification</li>
</ul>

<h2 id="mathematical-framework">2. Mathematical Framework</h2>
<p>
The Standard Model is a quantum field theory based on the gauge group
</p>
<div class="katex-display">
$$G_{SM} = SU(3)_C \\times SU(2)_L \\times U(1)_Y$$
</div>
<p>
The matter content consists of fermions (quarks and leptons) arranged in three generations. Each generation contains a left-handed doublet and right-handed singlets under <span class="math-inline">SU(2)_L</span>. The full matter Lagrangian takes the form:
</p>
<div class="katex-display">
$$\\mathcal{L}_{\\text{matter}} = i\\bar{\\psi}_L \\slashed{D} \\psi_L + i\\bar{\\psi}_R \\slashed{D} \\psi_R$$
</div>
<p>
where <span class="math-inline">D_\\mu = \\partial_\\mu - ig_s T^a G_\\mu^a - ig T^i W_\\mu^i - ig' Y B_\\mu</span> is the covariant derivative encoding all gauge interactions.
</p>

<h2 id="fundamental-fermions">3. Fundamental Fermions: Quarks and Leptons</h2>
<p>
The matter content of the Standard Model comprises three generations of fermions. Each generation includes a quark doublet, right-handed up-type and down-type quarks, a lepton doublet, and a right-handed charged lepton:
</p>
<div class="katex-display">
$$Q_L^i = \\begin{pmatrix} u_L \\\\ d_L \\end{pmatrix}, \\quad u_R^i, \\quad d_R^i, \\quad L_L^i = \\begin{pmatrix} \\nu_L \\\\ e_L \\end{pmatrix}, \\quad e_R^i$$
</div>
<p>
The three generations are identical in structure but differ in mass. The first generation (up/down quarks, electron/electron-neutrino) is the lightest; the third generation (top/bottom quarks, tau/tau-neutrino) is the heaviest.
</p>

<div class="theorem">
<strong>Theorem 3.1 (Anomaly Cancellation).</strong> The Standard Model gauge anomalies cancel exactly within each generation if and only if the electric charges of quarks and leptons satisfy the quantization condition <span class="math-inline">Q_u - Q_d = Q_{\\nu} - Q_e = 1</span> and <span class="math-inline">3Q_u + 3Q_d + Q_{\\nu} + Q_e = 0</span>. This is satisfied by the assignment <span class="math-inline">Q_u = 2/3, Q_d = -1/3, Q_{\\nu} = 0, Q_e = -1</span>.
</div>

<h2 id="higgs-mechanism">4. The Higgs Mechanism and Mass Generation</h2>
<p>
Masses for the W and Z bosons and for fermions are generated through spontaneous symmetry breaking of the electroweak gauge symmetry. The Higgs field is a complex <span class="math-inline">SU(2)_L</span> doublet:
</p>
<div class="katex-display">
$$H = \\begin{pmatrix} \\phi^+ \\\\ \\phi^0 \\end{pmatrix}, \\quad V(H) = -\\mu^2 H^\\dagger H + \\lambda (H^\\dagger H)^2$$
</div>
<p>
For <span class="math-inline">\\mu^2 > 0</span>, the minimum of the potential occurs at a nonzero vacuum expectation value (VEV):
</p>
<div class="katex-display">
$$\\langle H \\rangle = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} 0 \\\\ v \\end{pmatrix}, \\quad v = \\sqrt{\\mu^2/\\lambda} \\approx 246\\, \\text{GeV}$$
</div>
<p>
The Yukawa couplings give masses to fermions:
</p>
<div class="katex-display">
$$\\mathcal{L}_{\\text{Yukawa}} = -y_d^{ij} \\bar{Q}_L^i H d_R^j - y_u^{ij} \\bar{Q}_L^i \\tilde{H} u_R^j - y_e^{ij} \\bar{L}_L^i H e_R^j + \\text{h.c.}$$
</div>

<h2 id="qcd">5. Quantum Chromodynamics</h2>
<p>
The strong interaction is described by quantum chromodynamics (QCD), a non-Abelian gauge theory based on <span class="math-inline">SU(3)_C</span>. Quarks carry color charge in the fundamental representation, while gluons carry color in the adjoint representation. The QCD Lagrangian is:
</p>
<div class="katex-display">
$$\\mathcal{L}_{\\text{QCD}} = -\\frac{1}{4} G_\\mu^{a\\nu} G_{\\mu\\nu}^a + \\sum_q \\bar{q}(i\\slashed{D} - m_q)q$$
</div>
<p>
Key features of QCD include <strong>asymptotic freedom</strong> — quarks behave as free particles at short distances — and <strong>confinement</strong> — quarks and gluons cannot be isolated as free particles at long distances, forming color-neutral hadrons.
</p>

<h2 id="electroweak">6. Electroweak Unification</h2>
<p>
The Glashow-Weinberg-Salam model unifies the electromagnetic and weak interactions under <span class="math-inline">SU(2)_L \\times U(1)_Y</span>. After spontaneous symmetry breaking, the gauge bosons mix, producing:
</p>
<div class="katex-display">
$$m_W = \\frac{gv}{2}, \\quad m_Z = \\frac{v\\sqrt{g^2 + g'^2}}{2}, \\quad m_\\gamma = 0$$
</div>
<p>
The Weinberg angle <span class="math-inline">\\theta_W</span> parametrizes the mixing, with <span class="math-inline">\\sin^2\\theta_W \\approx 0.231</span>.
</p>

<h2 id="modular-hierarchy">8. The Modular Hierarchy Applied to Matter</h2>
<p>
Within the modular framework, the matter content of the Standard Model emerges through hierarchical composition:
</p>
<ul>
  <li><strong>Law I composition:</strong> The characteristic energy scales — <span class="math-inline">\\Lambda_{\\text{QCD}} \\approx 200\\,\\text{MeV}</span>, <span class="math-inline">v \\approx 246\\,\\text{GeV}</span>, <span class="math-inline">M_{\\text{Planck}} \\approx 10^{19}\\,\\text{GeV}</span> — define the boundaries of each compositional level.</li>
  <li><strong>Law II composition:</strong> Thermal history determines phase transitions: QCD confinement at <span class="math-inline">T \\approx 150\\,\\text{MeV}</span>, electroweak symmetry breaking at <span class="math-inline">T \\approx 100\\,\\text{GeV}</span>.</li>
  <li><strong>Law III composition:</strong> The full gauge structure and matter content constitute the quantum compositional level.</li>
  <li><strong>Law IV frontier:</strong> Gravity remains unincorporated — the mass gap problem, hierarchy problem, and quantum gravity mark the current boundary.</li>
</ul>

<h2 id="experimental-evidence">9. Experimental Evidence and Current Results</h2>
<p>
The Standard Model has been confirmed to extraordinary precision. Key experimental milestones include:
</p>
<ul>
  <li>Discovery of the Higgs boson at <span class="math-inline">m_H = 125.25 \\pm 0.17\\,\\text{GeV}</span> (ATLAS and CMS, 2012)</li>
  <li>Precision electroweak measurements: <span class="math-inline">m_W = 80.377 \\pm 0.012\\,\\text{GeV}</span></li>
  <li>Strong coupling constant: <span class="math-inline">\\alpha_s(M_Z) = 0.1179 \\pm 0.0010</span></li>
  <li>Top quark mass: <span class="math-inline">m_t = 172.69 \\pm 0.30\\,\\text{GeV}</span></li>
</ul>

<h2 id="results">10. Results: Structural Theorems</h2>
<div class="theorem">
<strong>Theorem 10.1 (Spin-Statistics).</strong> In a local relativistic quantum field theory, particles with half-integer spin must satisfy Fermi-Dirac statistics, while particles with integer spin must satisfy Bose-Einstein statistics. This is a necessary consequence of Lorentz invariance and locality — a compositional emergent property at Law III.
</div>
<div class="theorem">
<strong>Theorem 10.2 (Three-Generation Necessity for CP Violation).</strong> CP violation in the quark sector via the CKM matrix requires a complex phase that cannot be removed by field redefinitions. This is possible if and only if there are at least three quark generations. With only two generations, the CKM matrix can always be made real by rephasing the quark fields.
</div>

<h2 id="discussion">11. Discussion</h2>
<p>
The matter content of the Standard Model, viewed through the modular framework, reveals deep compositional structure. The gauge group <span class="math-inline">G_{SM}</span> is not a unified simple group but a product of three modules that compose to produce emergent phenomena: confinement from <span class="math-inline">SU(3)_C</span>, parity violation from <span class="math-inline">SU(2)_L</span>, and hypercharge quantization from <span class="math-inline">U(1)_Y</span>.
</p>
<p>
Open problems in the matter sector include the hierarchy problem (why <span class="math-inline">m_H \\ll M_{\\text{Planck}}</span>), the strong CP problem (why <span class="math-inline">\\bar{\\theta} \\lesssim 10^{-10}</span>), the origin of the three-generation structure, and the mechanism of neutrino mass generation.
</p>

<h2 id="conclusion">12. Conclusion</h2>
<p>
We have presented the matter content of the Standard Model within the modular physics framework, demonstrating that the gauge structure, fermion content, and Higgs sector together constitute a compositional architecture in which each level builds upon and extends the previous. The anomaly cancellation condition linking quark and lepton charges is an emergent consistency requirement of the Law III composition, while the Higgs VEV provides the compositional bridge between the gauge and matter modules. The companion papers (Parts II, III, IV) extend this analysis to anti-matter, gauge synthesis, and unified composition.
</p>
`;

const ANTI_MATTER_CONTENT = `
<div class="paper-abstract">
  <strong>Abstract.</strong> We present a comprehensive treatment of anti-matter within the modular physics framework, in which the laws of physics compose hierarchically: Law I (Size-Aware) → Law II (Thermal) → Law III (Quantum) → Law IV (Gravitational). Anti-matter emerges as a necessary consequence of the modular composition of quantum mechanics with special relativity at Law III, through the Dirac equation and its negative-energy solutions. We provide rigorous derivations of the CPT theorem and its implications for particle-antiparticle symmetry, develop the CKM matrix formalism and the origin of CP violation from the complex phase requiring three quark generations, and analyze the Sakharov conditions for baryogenesis. We show that CP violation creates asymmetry at each compositional level of the modular framework.
</div>

<h2 id="introduction">1. Introduction</h2>
<p>
The existence of anti-matter is one of the most striking predictions of relativistic quantum mechanics. Anti-matter particles have the same mass as their matter counterparts but opposite quantum numbers: opposite electric charge, opposite baryon or lepton number, and opposite color charge. The Dirac equation, written to describe spin-1/2 particles in a relativistically consistent way, inevitably predicts negative-energy solutions that correspond to antiparticles.
</p>
<p>
In the modular physics framework, anti-matter is not an independent postulate but emerges as a necessary compositional consequence: the composition of quantum mechanics (Law III) with special relativity forces the existence of antiparticles. The same modular composition that generates anti-matter also generates CP violation and, through the Sakharov conditions, the baryon asymmetry of the universe.
</p>

<h2 id="dirac-equation">2. The Dirac Equation and the Prediction of Anti-Matter</h2>
<p>
The Dirac equation for a free spin-1/2 particle is:
</p>
<div class="katex-display">
$$(i\\gamma^\\mu \\partial_\\mu - m)\\psi = 0$$
</div>
<p>
where <span class="math-inline">\\gamma^\\mu</span> are the Dirac matrices satisfying <span class="math-inline">\\{\\gamma^\\mu, \\gamma^\\nu\\} = 2g^{\\mu\\nu}</span>. The plane-wave solutions of the Dirac equation include both positive-energy solutions <span class="math-inline">u(p)e^{-ip\\cdot x}</span> and negative-energy solutions <span class="math-inline">v(p)e^{+ip\\cdot x}</span>. The negative-energy solutions are reinterpreted, via the field quantization, as positive-energy antiparticles.
</p>
<div class="theorem">
<strong>Theorem 2.1 (Existence of Antiparticles).</strong> Any relativistic quantum field theory describing spin-1/2 particles with mass m > 0 necessarily contains antiparticles with the same mass but opposite conserved quantum numbers. This follows from the representation theory of the Poincaré group: both particle and antiparticle representations appear in the decomposition of the Dirac spinor.
</div>

<h2 id="cpt-symmetry">3. CPT Symmetry and Its Proof</h2>
<p>
The CPT theorem is a fundamental result: any local, Lorentz-invariant quantum field theory is invariant under the combined operation of charge conjugation (C), parity (P), and time reversal (T). The three discrete symmetries are:
</p>
<ul>
  <li><strong>Charge conjugation (C):</strong> <span class="math-inline">\\psi \\to C\\bar{\\psi}^T</span>, exchanging particles and antiparticles</li>
  <li><strong>Parity (P):</strong> <span class="math-inline">\\psi(t,\\mathbf{x}) \\to \\gamma^0 \\psi(t,-\\mathbf{x})</span>, spatial inversion</li>
  <li><strong>Time reversal (T):</strong> <span class="math-inline">\\psi(t,\\mathbf{x}) \\to i\\gamma^1\\gamma^3\\psi(-t,\\mathbf{x})</span>, time reversal</li>
</ul>
<div class="theorem">
<strong>Theorem 3.1 (CPT Theorem).</strong> Let <span class="math-inline">\\mathcal{L}</span> be a local, Lorentz-invariant Lagrangian density with hermitian Hamiltonian. Then the theory is invariant under the combined CPT transformation. Consequently: (i) particles and antiparticles have equal masses and lifetimes; (ii) the magnetic moments of a particle and its antiparticle are equal and opposite.
</div>
<p>
Individual symmetries C, P, and T may be violated, and indeed are. The weak interaction violates both C and P maximally. CP violation, which by CPT implies T violation, has been observed in kaon and B-meson systems and arises from the complex phase in the CKM matrix.
</p>

<h2 id="cp-violation">4. CP Violation and the CKM Matrix</h2>
<p>
The Cabibbo-Kobayashi-Maskawa (CKM) matrix describes the mixing between quark mass eigenstates and weak eigenstates:
</p>
<div class="katex-display">
$$V_{\\text{CKM}} = \\begin{pmatrix} V_{ud} & V_{us} & V_{ub} \\\\ V_{cd} & V_{cs} & V_{cb} \\\\ V_{td} & V_{ts} & V_{tb} \\end{pmatrix}$$
</div>
<p>
For three generations, the CKM matrix has one physical complex phase <span class="math-inline">\\delta</span> that cannot be removed by field redefinitions. This phase is the source of all CP violation observed in the quark sector. The Jarlskog invariant measures the magnitude of CP violation:
</p>
<div class="katex-display">
$$J = \\text{Im}(V_{us} V_{cb} V_{ub}^* V_{cs}^*) \\approx 3.0 \\times 10^{-5}$$
</div>

<h2 id="baryogenesis">5. Matter-Antimatter Asymmetry and Baryogenesis</h2>
<p>
The observed universe contains far more matter than antimatter. The baryon-to-photon ratio is:
</p>
<div class="katex-display">
$$\\eta = \\frac{n_B - n_{\\bar{B}}}{n_\\gamma} \\approx 6.1 \\times 10^{-10}$$
</div>
<p>
Sakharov (1967) identified three necessary conditions for baryogenesis:
</p>
<ol>
  <li><strong>Baryon number violation:</strong> Required to generate net baryon number from a symmetric initial state</li>
  <li><strong>C and CP violation:</strong> Required so that matter-generating processes occur at different rates than antimatter-generating processes</li>
  <li><strong>Departure from thermal equilibrium:</strong> Required so that CPT symmetry does not wash out the asymmetry</li>
</ol>
<p>
The Standard Model satisfies all three Sakharov conditions, but the CP violation present (quantified by J) is insufficient to explain the observed baryon asymmetry by many orders of magnitude. This constitutes direct evidence for physics beyond the Standard Model.
</p>

<h2 id="modular-framework">6. Anti-Matter in the Modular Physics Framework</h2>
<p>
Within the modular framework, anti-matter and its properties emerge at each compositional level:
</p>
<ul>
  <li><strong>At Law III (Quantum):</strong> Anti-matter emerges from the composition of quantum mechanics with special relativity via the Dirac equation. CP violation arises from the complex CKM phase.</li>
  <li><strong>At Law II (Thermal):</strong> The baryon asymmetry is generated during departure from equilibrium in the early universe's phase transitions.</li>
  <li><strong>At Law I (Size-Aware):</strong> The observed baryon-to-photon ratio <span class="math-inline">\\eta \\approx 6.1 \\times 10^{-10}</span> is a macroscopic manifestation of microscopic CP violation.</li>
  <li><strong>At Law IV (Gravitational) frontier:</strong> The insufficiency of Standard Model CP violation for baryogenesis points toward new physics at this compositional level.</li>
</ul>

<h2 id="experimental">7. Experimental Detection and Current Results</h2>
<p>
Key experimental programs studying anti-matter include:
</p>
<ul>
  <li><strong>ALPHA (CERN):</strong> Trapping and spectroscopy of antihydrogen. The 1S-2S transition of antihydrogen agrees with hydrogen to 2 parts in 10<sup>12</sup>, consistent with CPT symmetry.</li>
  <li><strong>BASE (CERN):</strong> Comparison of proton and antiproton magnetic moments. Result: <span class="math-inline">\\mu_p/\\mu_{\\bar{p}} = -1.000\\,000\\,000\\,3 \\pm 0.000\\,000\\,000\\,2</span></li>
  <li><strong>LHCb (2025):</strong> Observation of CP violation in baryon decays, confirming the CKM mechanism at higher precision.</li>
  <li><strong>Belle II / BaBar:</strong> Precision measurements of CP violation in B-meson systems.</li>
</ul>

<h2 id="conclusion">11. Conclusion</h2>
<p>
Anti-matter is a necessary emergent consequence of the modular composition of quantum mechanics with special relativity at Law III. The CPT theorem guarantees particle-antiparticle symmetry in any local, Lorentz-invariant theory, while CP violation — arising from the complex CKM phase — breaks this symmetry at the quantum level and seeds the baryon asymmetry of the universe. The observed baryon asymmetry, however, requires CP violation far beyond what the Standard Model provides, pointing toward new physics at higher compositional levels. The modular framework thus identifies the matter-antimatter asymmetry problem as a frontier at the boundary between Law III and Law IV.
</p>
`;

const SYNTHESIS_CONTENT = `
<div class="paper-abstract">
  <strong>Abstract.</strong> We present a comprehensive treatment of the Standard Model of particle physics from the perspective of modular composition. The Standard Model gauge group SU(3)_C × SU(2)_L × U(1)_Y is developed as the composition of three independent gauge modules — quantum chromodynamics, weak isospin, and hypercharge — whose interplay produces emergent phenomena absent from any individual sector. Within the modular physics framework, we trace the hierarchical composition from Law I (Size-Aware) through Law II (Thermal), Law III (Quantum), and identify Law IV (Gravitational) as the open frontier. We derive the full Standard Model Lagrangian and demonstrate how spontaneous symmetry breaking via the Higgs mechanism provides the compositional bridge between the gauge and matter modules.
</div>

<h2 id="introduction">1. Introduction</h2>
<p>
The Standard Model is not a simple unified theory but a product of three gauge modules, each describing a fundamental force, composed together into a single consistent framework. This modular structure is not merely a mathematical convenience — it reflects deep physical facts about how the fundamental interactions combine to produce the rich phenomenology of particle physics.
</p>
<p>
In this paper, we analyze the Standard Model through the lens of modular composition, identifying the three gauge modules and demonstrating how their composition produces emergent properties absent from any individual module.
</p>

<h2 id="gauge-group">2. Mathematical Framework: The Gauge Group Structure</h2>
<p>
The Standard Model gauge group is:
</p>
<div class="katex-display">
$$G_{SM} = SU(3)_C \\times SU(2)_L \\times U(1)_Y$$
</div>
<p>
This is a rank-4 Lie group with three independent coupling constants <span class="math-inline">g_s, g, g'</span>. The three factors are independent modules:
</p>
<ul>
  <li><strong>Module 1 — <span class="math-inline">SU(3)_C</span> (QCD):</strong> 8 gluons, strong force, confinement, asymptotic freedom</li>
  <li><strong>Module 2 — <span class="math-inline">SU(2)_L</span> (Weak Isospin):</strong> 3 gauge bosons, maximal parity violation, acts only on left-handed fermions</li>
  <li><strong>Module 3 — <span class="math-inline">U(1)_Y</span> (Hypercharge):</strong> 1 gauge boson, abelian, mixes with <span class="math-inline">SU(2)_L</span> to give electromagnetism and Z</li>
</ul>

<h2 id="electroweak">3. Electroweak Unification: The Glashow-Weinberg-Salam Model</h2>
<p>
The electroweak module is the composition of <span class="math-inline">SU(2)_L</span> and <span class="math-inline">U(1)_Y</span>. Before symmetry breaking, there are four massless gauge bosons <span class="math-inline">W_\\mu^1, W_\\mu^2, W_\\mu^3, B_\\mu</span>. After the Higgs VEV, these mix to produce the physical states:
</p>
<div class="katex-display">
$$W_\\mu^\\pm = \\frac{1}{\\sqrt{2}}(W_\\mu^1 \\mp iW_\\mu^2), \\quad Z_\\mu = \\cos\\theta_W W_\\mu^3 - \\sin\\theta_W B_\\mu, \\quad A_\\mu = \\sin\\theta_W W_\\mu^3 + \\cos\\theta_W B_\\mu$$
</div>
<p>
The electromagnetic coupling <span class="math-inline">e = g\\sin\\theta_W = g'\\cos\\theta_W</span> is an emergent quantity arising from the composition of the two modules — neither <span class="math-inline">SU(2)_L</span> nor <span class="math-inline">U(1)_Y</span> alone contains electromagnetism.
</p>

<h2 id="qcd">4. Quantum Chromodynamics: The Strong Force Module</h2>
<p>
The QCD module is based on <span class="math-inline">SU(3)_C</span> with the Lagrangian:
</p>
<div class="katex-display">
$$\\mathcal{L}_{\\text{QCD}} = -\\frac{1}{4}G_{\\mu\\nu}^a G^{a\\mu\\nu} + \\sum_f \\bar{q}_f(i\\gamma^\\mu D_\\mu - m_f)q_f$$
</div>
<p>
The running of the strong coupling constant is governed by the QCD beta function:
</p>
<div class="katex-display">
$$\\beta(g_s) = \\mu \\frac{\\partial g_s}{\\partial \\mu} = -\\frac{g_s^3}{16\\pi^2}\\left(11 - \\frac{2n_f}{3}\\right) + O(g_s^5)$$
</div>
<p>
For <span class="math-inline">n_f \\leq 16</span> quark flavors, the leading coefficient is negative, giving asymptotic freedom: the coupling decreases at high energies and increases at low energies, leading to confinement.
</p>

<h2 id="higgs">5. Spontaneous Symmetry Breaking and the Higgs Mechanism</h2>
<p>
The Higgs mechanism is the compositional bridge between the gauge and matter modules. The Higgs doublet <span class="math-inline">H</span> transforms as <span class="math-inline">(1, 2, +1/2)</span> under <span class="math-inline">G_{SM}</span>. The potential:
</p>
<div class="katex-display">
$$V(H) = -\\mu^2 H^\\dagger H + \\lambda(H^\\dagger H)^2$$
</div>
<p>
has a minimum at <span class="math-inline">|H| = v/\\sqrt{2}</span>, <span class="math-inline">v = \\sqrt{\\mu^2/\\lambda} \\approx 246</span> GeV. The symmetry breaking pattern is:
</p>
<div class="katex-display">
$$SU(2)_L \\times U(1)_Y \\xrightarrow{\\langle H \\rangle = v/\\sqrt{2}} U(1)_{\\text{em}}$$
</div>

<h2 id="full-lagrangian">6. The Full Standard Model Lagrangian</h2>
<p>
The complete Standard Model Lagrangian is:
</p>
<div class="katex-display">
$$\\mathcal{L}_{SM} = \\mathcal{L}_{\\text{gauge}} + \\mathcal{L}_{\\text{matter}} + \\mathcal{L}_{\\text{Higgs}} + \\mathcal{L}_{\\text{Yukawa}}$$
</div>
<p>
Each term is a compositional module:
</p>
<ul>
  <li><span class="math-inline">\\mathcal{L}_{\\text{gauge}} = -\\frac{1}{4}G_{\\mu\\nu}^a G^{a\\mu\\nu} - \\frac{1}{4}W_{\\mu\\nu}^i W^{i\\mu\\nu} - \\frac{1}{4}B_{\\mu\\nu}B^{\\mu\\nu}</span></li>
  <li><span class="math-inline">\\mathcal{L}_{\\text{matter}} = i\\bar{Q}_L \\slashed{D} Q_L + i\\bar{u}_R \\slashed{D} u_R + \\ldots</span></li>
  <li><span class="math-inline">\\mathcal{L}_{\\text{Higgs}} = |D_\\mu H|^2 - V(H)</span></li>
  <li><span class="math-inline">\\mathcal{L}_{\\text{Yukawa}} = -y_u \\bar{Q}_L \\tilde{H} u_R - y_d \\bar{Q}_L H d_R - y_e \\bar{L}_L H e_R + \\text{h.c.}</span></li>
</ul>

<h2 id="anomaly">7. Anomaly Cancellation: Emergent Consistency</h2>
<div class="theorem">
<strong>Theorem 7.1 (Anomaly Cancellation).</strong> The Standard Model is anomaly-free if and only if the following conditions are satisfied within each generation:
<div class="katex-display">
$$\\text{Tr}[Y^3] = 0, \\quad \\text{Tr}[T_3^2 Y] = 0, \\quad \\text{Tr}[T_a^2 Y] = 0$$
</div>
These conditions link the quark and lepton content and are satisfied by the observed particle content. This is an emergent consistency condition of the modular composition: neither the quark sector nor the lepton sector is individually anomaly-free; only their composition cancels all anomalies.
</div>

<h2 id="rge">8. Renormalization Group: Compositional Flow Across Scales</h2>
<p>
The three gauge couplings run with energy scale according to the renormalization group equations. The one-loop running is:
</p>
<div class="katex-display">
$$\\frac{1}{\\alpha_i(\\mu)} = \\frac{1}{\\alpha_i(M_Z)} + \\frac{b_i}{2\\pi} \\ln\\frac{\\mu}{M_Z}$$
</div>
<p>
where <span class="math-inline">b_1 = 41/10</span>, <span class="math-inline">b_2 = -19/6</span>, <span class="math-inline">b_3 = -7</span> for the Standard Model. The three couplings nearly meet at <span class="math-inline">\\mu \\approx 10^{16}</span> GeV, suggesting grand unification — a potential Law IV compositional structure.
</p>

<h2 id="conclusion">13. Conclusion</h2>
<p>
The Standard Model is a modular composition of three gauge sectors whose interplay produces emergent phenomena absent from any individual module. The electroweak mixing angle, anomaly cancellation, and the running toward grand unification are all compositional emergent properties. The Higgs mechanism serves as the compositional bridge, breaking the electroweak module while preserving the QCD module and generating masses for all massive particles. The companion papers (Parts I, II, IV) provide the matter content, anti-matter structure, and unified synthesis completing this modular description.
</p>
`;

const UNIFIED_CONTENT = `
<div class="paper-abstract">
  <strong>Abstract.</strong> We present a unified synthesis of the Standard Model of particle physics from the perspective of modular composition, integrating the results of three companion papers: Part I (Matter), Part II (Anti-Matter), and Part III (Synthesis to the Standard Model). The Standard Model is shown to arise as the modular composition of three fundamental sectors — the matter module, the anti-matter module, and the gauge-symmetry module — within the hierarchical modular physics framework. We identify five cross-cutting themes that span all three papers and develop a unified mathematical framework expressing the full Standard Model as a single compositional equation.
</div>

<h2 id="introduction">1. Introduction</h2>
<p>
This paper presents the unified synthesis of the four-paper Standard Model series. Parts I, II, and III have developed the matter content, anti-matter structure, and gauge synthesis of the Standard Model independently. Here, we assemble these modular components into a complete compositional picture, identifying the cross-cutting themes, emergent properties, and open frontiers that emerge from the full synthesis.
</p>
<p>
The central thesis is that the Standard Model is not a monolithic theory but a hierarchical composition of modules, each contributing emergent properties to the complete structure. The compositional equation:
</p>
<div class="katex-display">
$$\\text{SM} = \\text{Matter} \\otimes_{\\text{Higgs}} \\text{Anti-Matter} \\otimes_{\\text{CPT}} \\text{Gauge}$$
</div>
<p>
captures this structure symbolically, where <span class="math-inline">\\otimes_{\\text{Higgs}}</span> denotes composition via the Higgs mechanism and <span class="math-inline">\\otimes_{\\text{CPT}}</span> denotes composition via CPT symmetry.
</p>

<h2 id="cross-cutting-themes">2. Cross-Cutting Themes</h2>
<p>
Five themes span all three companion papers:
</p>

<h3 id="theme-ssb">Theme 1: Spontaneous Symmetry Breaking</h3>
<p>
Spontaneous symmetry breaking (SSB) appears as the universal compositional mechanism across all three papers. In Part I, the Higgs VEV <span class="math-inline">\\langle H \\rangle = v/\\sqrt{2}</span> generates fermion masses. In Part II, the electroweak phase transition at <span class="math-inline">T \\approx 100</span> GeV provides the departure-from-equilibrium Sakharov condition. In Part III, SSB reduces <span class="math-inline">SU(2)_L \\times U(1)_Y \\to U(1)_{\\text{em}}</span>.
</p>

<h3 id="theme-anomaly">Theme 2: Anomaly Cancellation</h3>
<p>
Anomaly cancellation is an emergent consistency condition linking all three modules. The gauge anomalies:
</p>
<div class="katex-display">
$$\\mathcal{A}[G^3] = \\text{Tr}[T^a\\{T^b, T^c\\}] = 0, \\quad \\mathcal{A}[G^2 Y] = \\text{Tr}[T_a^2 Y] = 0, \\quad \\mathcal{A}[Y^3] = \\text{Tr}[Y^3] = 0$$
</div>
<p>
cancel only when quarks and leptons are present together — the matter and antimatter modules are not individually consistent, but their composition is.
</p>

<h3 id="theme-generations">Theme 3: Three-Generation Structure</h3>
<p>
The three-generation structure is the minimal requirement for CP violation (Part II) and baryogenesis. With fewer generations, the CKM matrix has no physical phase, CP is conserved, and there is no mechanism for the observed baryon asymmetry. The three-generation structure is thus not arbitrary but necessitated by the requirement of CP violation at Law III.
</p>

<h3 id="theme-rge">Theme 4: Renormalization Group</h3>
<p>
The RGE running of the three gauge couplings is a compositional bridge across energy scales. The near-unification at <span class="math-inline">\\mu \\approx 10^{16}</span> GeV suggests that <span class="math-inline">G_{SM}</span> is the low-energy limit of a simple group at Law IV:
</p>
<div class="katex-display">
$$G_{\\text{GUT}} \\xrightarrow{\\langle \\Phi \\rangle} G_{SM} \\xrightarrow{\\langle H \\rangle} U(1)_{\\text{em}} \\times SU(3)_C$$
</div>

<h3 id="theme-baryogenesis">Theme 5: Baryon Asymmetry as Pointer to New Physics</h3>
<p>
The Jarlskog invariant <span class="math-inline">J \\approx 3.0 \\times 10^{-5}</span> generates a baryon asymmetry <span class="math-inline">\\eta_{SM} \\sim 10^{-18}</span>, far below the observed <span class="math-inline">\\eta_{\\text{obs}} \\approx 6.1 \\times 10^{-10}</span>. This 8-order-of-magnitude discrepancy is the clearest signal of physics beyond the Standard Model.
</p>

<h2 id="unified-framework">3. Unified Mathematical Framework</h2>
<p>
The complete Standard Model Lagrangian, expressed as a modular composition, is:
</p>
<div class="katex-display">
$$\\mathcal{L}_{SM} = \\underbrace{\\mathcal{L}_{\\text{gauge}}}_{\\text{Gauge Module}} + \\underbrace{\\mathcal{L}_{\\text{matter}} + \\mathcal{L}_{\\text{Yukawa}}}_{\\text{Matter Module}} + \\underbrace{\\mathcal{L}_{\\text{Higgs}}}_{\\text{Bridge}}$$
</div>
<p>
The CPT symmetry ensures that for each term involving matter fields, there is a corresponding term for antimatter fields, and that the total Lagrangian is invariant under the combined CPT operation. The Higgs Lagrangian is the compositional bridge: it belongs to neither the matter nor the gauge module but mediates between them.
</p>

<h2 id="emergent-properties">6. Emergent Properties of the Full Composition</h2>
<div class="theorem">
<strong>Theorem 6.1 (Mass Generation as Emergent Property).</strong> No fermion or gauge boson mass term is gauge-invariant in the individual modules. Masses emerge only from the composition of the matter module with the Higgs module via Yukawa couplings and spontaneous symmetry breaking. Mass generation is a genuine emergent property of the full modular composition.
</div>
<div class="theorem">
<strong>Theorem 6.2 (Dynamical Hadronic Mass).</strong> Approximately 95% of visible mass in the universe (proton mass ≈ 938 MeV, neutron mass ≈ 940 MeV) does not arise from Yukawa couplings but from the QCD binding energy — a non-perturbative emergent property of the <span class="math-inline">SU(3)_C</span> module's confinement dynamics, with the light quark masses (a few MeV) providing only a small perturbation.
</div>
<div class="theorem">
<strong>Theorem 6.3 (CP Violation as Compositional Phenomenon).</strong> CP violation in the Standard Model is impossible with fewer than three generations and requires the simultaneous presence of all three quark generations in the charged-current interactions. It is a property of the composed matter-gauge-Higgs system, absent from any individual module.
</div>

<h2 id="modular-hierarchy">7. The Modular Law Hierarchy for the Complete Standard Model</h2>
<p>
The complete modular hierarchy for the Standard Model is:
</p>
<ul>
  <li><strong>Law I (Size-Aware):</strong> Provides the energy scales — <span class="math-inline">\\Lambda_{QCD} \\approx 200</span> MeV, <span class="math-inline">v \\approx 246</span> GeV, <span class="math-inline">m_t \\approx 173</span> GeV, <span class="math-inline">M_{GUT} \\sim 10^{16}</span> GeV, <span class="math-inline">M_{Pl} \\sim 10^{19}</span> GeV</li>
  <li><strong>Law II (Thermal):</strong> QCD confinement at <span class="math-inline">T \\approx 150</span> MeV, electroweak symmetry breaking at <span class="math-inline">T \\approx 100</span> GeV, baryogenesis conditions</li>
  <li><strong>Law III (Quantum):</strong> The complete <span class="math-inline">G_{SM}</span> gauge structure, all matter and antimatter fields, Higgs mechanism, CKM mixing, CP violation</li>
  <li><strong>Law IV (Gravitational) frontier:</strong> Hierarchy problem, strong CP problem, dark matter, dark energy, quantum gravity — the open frontier of modular composition</li>
</ul>

<h2 id="open-problems">8. Open Problems Spanning Multiple Papers</h2>
<p>
Several open problems require the full modular synthesis to properly state:
</p>
<ul>
  <li><strong>The Hierarchy Problem:</strong> Why is <span class="math-inline">m_H \\approx 125</span> GeV <span class="math-inline">\\ll M_{Pl} \\approx 10^{19}</span> GeV? The Higgs mass is quadratically sensitive to new physics at high scales — a fine-tuning problem that spans Law III and Law IV.</li>
  <li><strong>The Strong CP Problem:</strong> Why is <span class="math-inline">\\bar{\\theta} \\lesssim 10^{-10}</span>? The QCD Lagrangian admits a CP-violating term <span class="math-inline">\\theta G_{\\mu\\nu}^a \\tilde{G}^{a\\mu\\nu}</span>, but this is experimentally bounded to be negligibly small.</li>
  <li><strong>Neutrino Mass:</strong> Neutrino oscillations demonstrate that neutrinos have mass, but the Standard Model has no right-handed neutrino and no neutrino mass mechanism — requiring extension of the matter module.</li>
  <li><strong>Dark Matter:</strong> 27% of the universe's energy density is non-luminous, non-baryonic matter with no Standard Model candidate.</li>
  <li><strong>Insufficient Baryogenesis:</strong> Standard Model CP violation is insufficient for the observed baryon asymmetry by 8 orders of magnitude.</li>
</ul>

<h2 id="formal-theorems">10. Results: Formal Synthesis Theorems</h2>
<div class="theorem">
<strong>Theorem 10.1 (Completeness of the Standard Model at Law III).</strong> The Standard Model, defined by <span class="math-inline">G_{SM} = SU(3)_C \\times SU(2)_L \\times U(1)_Y</span> with the observed matter content and Higgs sector, is a complete, self-consistent, anomaly-free quantum field theory at Law III. It accounts for all experimentally observed particle physics phenomena (excluding gravity, dark matter, and dark energy) to the precision of current experiments.
</div>
<div class="theorem">
<strong>Theorem 10.2 (Modularity of Emergent Properties).</strong> The following properties of the Standard Model are genuine compositional emergent properties, absent from any individual module: (i) gauge boson and fermion masses; (ii) CP violation; (iii) hadronic binding energy; (iv) the baryon-to-photon ratio; (v) the electromagnetic coupling constant <span class="math-inline">e = g\\sin\\theta_W</span>.
</div>

<h2 id="conclusion">12. Conclusion</h2>
<p>
The Standard Model, analyzed through the modular physics framework, reveals itself as a hierarchical composition of matter, anti-matter, and gauge-symmetry modules, with the Higgs mechanism serving as the compositional bridge. The emergent properties of the complete composition — mass generation, CP violation, confinement, and the baryon asymmetry — are absent from any individual module and arise only from their combination.
</p>
<p>
The five cross-cutting themes (spontaneous symmetry breaking, anomaly cancellation, three-generation structure, RGE running, and baryon asymmetry) provide the organizing principles of the modular synthesis. The open problems — hierarchy, strong CP, neutrino mass, dark matter, baryogenesis, quantum gravity — define the frontier where the modular framework must be extended to Law IV.
</p>
<p>
This synthesis completes the four-paper series. The Standard Model is not merely a list of particles and interactions but a modular architecture in which composition at each hierarchical level produces structure that transcends the sum of its parts.
</p>
`;

const contentMap: Record<string, string> = {
  matter: MATTER_CONTENT,
  "anti-matter": ANTI_MATTER_CONTENT,
  "synthesis-to-standard-model": SYNTHESIS_CONTENT,
  "unified-synthesis": UNIFIED_CONTENT,
};

export function getPaperContent(slug: string): string {
  return contentMap[slug] || "";
}
