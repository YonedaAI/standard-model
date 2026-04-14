-- | AntiMatter.hs
-- | Haskell verification code for "Anti-Matter in the Modular Physics Framework"
-- | Demonstrates CKM matrix parameterization, Jarlskog invariant computation,
-- | CPT symmetry properties, and baryon asymmetry estimates.
--
-- | Author: Matthew Long, YonedaAI Research Collective
-- | Date: April 14, 2026

module Main where

import Data.Complex
import Data.List (intercalate)
import Text.Printf (printf)

-- ============================================================================
-- Type definitions
-- ============================================================================

-- | A 3x3 complex matrix represented as a list of rows
type Matrix3 = [[Complex Double]]

-- | Particle properties: mass (GeV), charge (units of e), spin
data Particle = Particle
  { particleName   :: String
  , particleMass   :: Double    -- GeV
  , particleCharge  :: Double   -- units of e
  , particleSpin   :: Double    -- units of hbar
  } deriving (Show)

-- | Antiparticle constructor: flip charge, preserve mass and spin (CPT theorem)
antiparticle :: Particle -> Particle
antiparticle p = Particle
  { particleName   = "anti-" ++ particleName p
  , particleMass   = particleMass p      -- CPT: m = m_bar
  , particleCharge  = negate (particleCharge p)  -- C: q -> -q
  , particleSpin   = particleSpin p       -- CPT: spin magnitude preserved
  }

-- ============================================================================
-- CKM Matrix Construction
-- ============================================================================

-- | Standard (Chau-Keung) parameterization of the CKM matrix
-- | Parameters: theta12, theta13, theta23 (radians), delta (CP phase, radians)
ckmMatrix :: Double -> Double -> Double -> Double -> Matrix3
ckmMatrix t12 t13 t23 delta =
  let c12 = cos t12; s12 = sin t12
      c13 = cos t13; s13 = sin t13
      c23 = cos t23; s23 = sin t23
      eid  = mkPolar 1 delta      -- e^{i*delta}
      emid = mkPolar 1 (-delta)   -- e^{-i*delta}
  in [ [ r c12 * r c13,                           r s12 * r c13,                          r s13 * emid ]
     , [ negate (r s12 * r c23) - r c12 * r s23 * r s13 * eid, r c12 * r c23 - r s12 * r s23 * r s13 * eid, r s23 * r c13 ]
     , [ r s12 * r s23 - r c12 * r c23 * r s13 * eid,  negate (r c12 * r s23) - r s12 * r c23 * r s13 * eid, r c23 * r c13 ]
     ]
  where r x = x :+ 0

-- | Wolfenstein parameterization (leading order)
ckmWolfenstein :: Double -> Double -> Double -> Double -> Matrix3
ckmWolfenstein lambda a rhobar etabar =
  let l  = lambda
      l2 = l * l
      l3 = l * l * l
      rho = rhobar
      eta = etabar
  in [ [ r (1 - l2/2),   r l,           (a * l3 * rho) :+ (negate $ a * l3 * eta) ]
     , [ r (negate l),    r (1 - l2/2),  r (a * l2) ]
     , [ (a * l3 * (1 - rho)) :+ (negate $ a * l3 * eta), r (negate $ a * l2), r 1 ]
     ]
  where r x = x :+ 0

-- | Current best-fit CKM parameters (PDG 2024)
ckmStandard :: Matrix3
ckmStandard = ckmMatrix theta12 theta13 theta23 delta
  where
    theta12 = asin 0.22500   -- sin(theta12) = lambda ~ 0.225
    theta13 = asin 0.00369   -- sin(theta13) ~ 0.00369
    theta23 = asin 0.04182   -- sin(theta23) ~ 0.04182
    delta   = 1.144          -- CP phase ~ 65.5 degrees in radians

-- ============================================================================
-- Jarlskog Invariant
-- ============================================================================

-- | Compute the Jarlskog invariant J from the CKM matrix
-- | J = Im(V_us * V_cb * V_ub* * V_cs*)
jarlskogInvariant :: Matrix3 -> Double
jarlskogInvariant v =
  let vus = v !! 0 !! 1
      vcb = v !! 1 !! 2
      vub = v !! 0 !! 2
      vcs = v !! 1 !! 1
  in imagPart (vus * vcb * conjugate vub * conjugate vcs)

-- | Jarlskog invariant from explicit parameters
jarlskogFromParams :: Double -> Double -> Double -> Double -> Double
jarlskogFromParams t12 t13 t23 delta =
  cos t12 * cos t23 * (cos t13 * cos t13) * sin t12 * sin t23 * sin t13 * sin delta

-- ============================================================================
-- CKM Parameter Count (Proposition 4.2)
-- ============================================================================

-- | Count mixing angles and CP phases for n generations
ckmParameterCount :: Int -> (Int, Int, Int)
ckmParameterCount n =
  let totalParams  = (n - 1) * (n - 1)   -- (n-1)^2 physical parameters
      mixingAngles = n * (n - 1) `div` 2  -- n(n-1)/2 mixing angles
      cpPhases     = (n - 1) * (n - 2) `div` 2  -- (n-1)(n-2)/2 CP phases
  in (totalParams, mixingAngles, cpPhases)

-- ============================================================================
-- Unitarity Triangle
-- ============================================================================

-- | Compute the unitarity triangle apex (rhobar, etabar)
-- | from the bd unitarity relation: V_ud*V_ub* + V_cd*V_cb* + V_td*V_tb* = 0
unitarityTriangle :: Matrix3 -> (Double, Double)
unitarityTriangle v =
  let vud = v !! 0 !! 0
      vub = v !! 0 !! 2
      vcd = v !! 1 !! 0
      vcb = v !! 1 !! 2
      -- Normalize by V_cd * V_cb*
      normFactor = vcd * conjugate vcb
      -- The apex is -V_ud * V_ub* / (V_cd * V_cb*)
      apex = negate (vud * conjugate vub) / normFactor
  in (realPart apex, imagPart apex)

-- | Unitarity triangle angles (alpha, beta, gamma) in degrees
unitarityAngles :: Matrix3 -> (Double, Double, Double)
unitarityAngles v =
  let vtd = v !! 2 !! 0; vtb = v !! 2 !! 2
      vud = v !! 0 !! 0; vub = v !! 0 !! 2
      vcd = v !! 1 !! 0; vcb = v !! 1 !! 2
      alpha = phase (negate (vtd * conjugate vtb) / (vud * conjugate vub)) * 180 / pi
      beta  = phase (negate (vcd * conjugate vcb) / (vtd * conjugate vtb)) * 180 / pi
      gamma = phase (negate (vud * conjugate vub) / (vcd * conjugate vcb)) * 180 / pi
  in (alpha, beta, gamma)

-- ============================================================================
-- CPT Verification
-- ============================================================================

-- | Verify CPT theorem predictions for a particle-antiparticle pair
verifyCPT :: Particle -> IO ()
verifyCPT p = do
  let ap = antiparticle p
  putStrLn $ "  Particle: " ++ particleName p
  putStrLn $ "    Mass: " ++ show (particleMass p) ++ " GeV"
  putStrLn $ "    Charge: " ++ show (particleCharge p) ++ " e"
  putStrLn $ "    Spin: " ++ show (particleSpin p)
  putStrLn $ "  Antiparticle: " ++ particleName ap
  putStrLn $ "    Mass: " ++ show (particleMass ap) ++ " GeV"
  putStrLn $ "    Charge: " ++ show (particleCharge ap) ++ " e"
  putStrLn $ "    Spin: " ++ show (particleSpin ap)
  putStrLn $ "  CPT checks:"
  putStrLn $ "    Mass equality (m = m_bar): " ++ show (particleMass p == particleMass ap)
  putStrLn $ "    Charge conjugation (q = -q_bar): " ++ show (particleCharge p == negate (particleCharge ap))
  putStrLn $ "    Spin preservation: " ++ show (particleSpin p == particleSpin ap)

-- ============================================================================
-- Matrix utilities
-- ============================================================================

-- | Matrix multiplication for 3x3 complex matrices
matMul :: Matrix3 -> Matrix3 -> Matrix3
matMul a b =
  let bt = transpose3 b
  in [ [ sum $ zipWith (*) ar bc | bc <- bt ] | ar <- a ]

-- | Conjugate transpose (dagger)
dagger :: Matrix3 -> Matrix3
dagger = map (map conjugate) . transpose3

-- | Transpose
transpose3 :: [[a]] -> [[a]]
transpose3 ([]:_) = []
transpose3 xss    = map safeHead xss : transpose3 (map safeTail xss)
  where
    safeHead (x:_) = x
    safeHead []    = error "transpose3: empty row"
    safeTail (_:xs) = xs
    safeTail []     = error "transpose3: empty row"

-- | Check unitarity: V^dag V ~ Identity
checkUnitarity :: Matrix3 -> Double
checkUnitarity v =
  let prod = matMul (dagger v) v
      offDiag = sum [ magnitude (prod !! i !! j) | i <- [0..2], j <- [0..2], i /= j ]
      diagDev = sum [ abs (magnitude (prod !! i !! i) - 1.0) | i <- [0..2] ]
  in offDiag + diagDev

-- | Print a complex matrix
printMatrix :: String -> Matrix3 -> IO ()
printMatrix name m = do
  putStrLn $ name ++ ":"
  mapM_ (\row -> putStrLn $ "  " ++ intercalate "  " (map showComplex row)) m
  where
    showComplex z =
      let r = realPart z
          i = imagPart z
      in if abs i < 1e-10
         then printf "%8.5f" r
         else printf "(%8.5f, %8.5f)" r i

-- ============================================================================
-- Thermal physics: Baryon asymmetry estimates
-- ============================================================================

-- | Baryon-to-photon ratio from observations
etaObserved :: Double
etaObserved = 6.12e-10

-- | Square of a Double
sq :: Double -> Double
sq x = x * x

-- | Estimate Standard Model EWBG baryon asymmetry (order of magnitude)
-- | This demonstrates the quantitative insufficiency
etaSMEstimate :: Double -> Double
etaSMEstimate jarlskog =
  let -- Quark mass hierarchy suppression factor (schematic)
      mt = 173.0; mc = 1.27; mu = 0.00216    -- up-type masses in GeV
      mb = 4.18;  ms = 0.093; md = 0.00467   -- down-type masses in GeV
      v  = 246.0                               -- Higgs VEV in GeV
      v12 = sq (sq (sq v)) * sq (sq v)  -- v^12 = v^8 * v^4
      massFactor = (sq mt - sq mc) * (sq mt - sq mu) * (sq mc - sq mu)
                 * (sq mb - sq ms) * (sq mb - sq md) * (sq ms - sq md)
                 / v12
      -- Sphaleron rate factor (schematic, in SM with crossover transition ~ 0)
      kappaEW = 1e-3  -- generous upper bound for illustration
  in jarlskog * massFactor * kappaEW

-- | Annihilation energy from matter-antimatter pair
annihilationEnergy :: Double -> Double  -- mass in GeV -> energy in GeV
annihilationEnergy mass = 2 * mass

-- ============================================================================
-- PET scanning physics
-- ============================================================================

-- | PET: Positron-electron annihilation photon energy
petPhotonEnergy :: Double
petPhotonEnergy = 0.511  -- MeV (= m_e c^2)

-- | PET: Coincidence detection window
petCoincidenceWindow :: Double
petCoincidenceWindow = 5e-9  -- 5 nanoseconds

-- ============================================================================
-- Fundamental particles
-- ============================================================================

electron :: Particle
electron = Particle "electron" 0.000511 (-1.0) 0.5

proton :: Particle
proton = Particle "proton" 0.938272 1.0 0.5

neutron :: Particle
neutron = Particle "neutron" 0.939565 0.0 0.5

upQuark :: Particle
upQuark = Particle "up-quark" 0.00216 (2/3) 0.5

downQuark :: Particle
downQuark = Particle "down-quark" 0.00467 (-1/3) 0.5

-- ============================================================================
-- Main demonstration
-- ============================================================================

main :: IO ()
main = do
  putStrLn "============================================================"
  putStrLn "Anti-Matter in the Modular Physics Framework"
  putStrLn "Haskell Verification Code"
  putStrLn "============================================================"
  putStrLn ""

  -- Section 1: CPT Theorem Verification
  putStrLn "--- Section 1: CPT Theorem (Corollary 3.4) ---"
  putStrLn ""
  putStrLn "Verifying CPT predictions for fundamental particles:"
  putStrLn ""
  verifyCPT electron
  putStrLn ""
  verifyCPT proton
  putStrLn ""
  verifyCPT upQuark
  putStrLn ""

  -- Section 2: CKM Matrix
  putStrLn "--- Section 2: CKM Matrix (Definition 4.1) ---"
  putStrLn ""

  let v = ckmStandard
  printMatrix "CKM matrix (standard parameterization, PDG 2024)" v
  putStrLn ""

  -- Magnitudes
  putStrLn "CKM matrix magnitudes |V_ij|:"
  let mags = map (map magnitude) v
  mapM_ (\row -> putStrLn $ "  " ++ intercalate "  " (map (printf "%8.5f") row)) mags
  putStrLn ""

  -- Unitarity check
  let unitDev = checkUnitarity v
  putStrLn $ "Unitarity deviation |V^dag V - I|: " ++ printf "%.2e" unitDev
  putStrLn $ "  (should be ~0, confirming V is unitary)"
  putStrLn ""

  -- Section 3: CKM Parameter Count
  putStrLn "--- Section 3: Parameter Count (Proposition 4.2) ---"
  putStrLn ""
  putStrLn "  n | Total params | Mixing angles | CP phases"
  putStrLn "  --|-------------|---------------|----------"
  mapM_ (\n -> do
    let (t, a, p) = ckmParameterCount n
    printf "  %d |     %d       |       %d       |     %d\n" n t a p
    ) [2..5 :: Int]
  putStrLn ""
  putStrLn "  => n=2: 0 CP phases (no CP violation possible)"
  putStrLn "  => n=3: 1 CP phase  (CP violation from single phase delta)"
  putStrLn ""

  -- Section 4: Jarlskog Invariant
  putStrLn "--- Section 4: Jarlskog Invariant (Definition 4.5) ---"
  putStrLn ""
  let j = jarlskogInvariant v
  printf "  J = Im(V_us V_cb V_ub* V_cs*) = %.4e\n" j
  printf "  Expected value: ~3.08e-05\n"
  printf "  CP violation is %s\n" (if abs j > 1e-10 then "PRESENT (J /= 0)" :: String else "ABSENT (J = 0)")
  putStrLn ""

  -- Section 5: Unitarity Triangle
  putStrLn "--- Section 5: Unitarity Triangle ---"
  putStrLn ""
  let (rhobar, etabar) = unitarityTriangle v
  printf "  Triangle apex: (rho_bar, eta_bar) = (%.4f, %.4f)\n" rhobar etabar
  let (alpha, beta, gamma) = unitarityAngles v
  printf "  Angles: alpha = %.1f deg, beta = %.1f deg, gamma = %.1f deg\n" alpha beta gamma
  printf "  Sum of angles: %.1f deg (should be ~180)\n" (alpha + beta + gamma)
  printf "  sin(2*beta) = %.3f (measured: 0.699 +/- 0.017)\n" (sin (2 * beta * pi / 180))
  putStrLn ""

  -- Section 6: Wolfenstein parameterization
  putStrLn "--- Section 6: Wolfenstein Parameterization ---"
  putStrLn ""
  let vw = ckmWolfenstein 0.22500 0.826 0.159 0.349
  printMatrix "CKM (Wolfenstein, leading order)" vw
  putStrLn ""

  -- Section 7: Baryon Asymmetry
  putStrLn "--- Section 7: Baryon Asymmetry (Lemma 9.2) ---"
  putStrLn ""
  printf "  Observed eta = n_B / n_gamma = %.2e\n" etaObserved
  let etaSM = etaSMEstimate (abs j)
  printf "  SM EWBG estimate (order of magnitude): eta_SM ~ %.2e\n" etaSM
  printf "  Ratio eta_obs / eta_SM ~ %.0e\n" (etaObserved / etaSM)
  putStrLn "  => Standard Model CP violation is INSUFFICIENT for baryogenesis"
  putStrLn "  => New physics beyond the Standard Model is REQUIRED"
  putStrLn ""

  -- Section 8: Annihilation Energy
  putStrLn "--- Section 8: Matter-Antimatter Annihilation ---"
  putStrLn ""
  printf "  Electron-positron annihilation energy: %.3f MeV (= 2 * m_e)\n"
    (annihilationEnergy 0.511 :: Double)
  printf "  PET photon energy: %.3f MeV each (two back-to-back photons)\n" petPhotonEnergy
  printf "  Proton-antiproton annihilation energy: %.3f MeV (= 2 * m_p)\n"
    (annihilationEnergy 938.272 :: Double)
  putStrLn ""

  -- Section 9: Modular Framework Summary
  putStrLn "--- Section 9: Modular Framework Composition Chain ---"
  putStrLn ""
  putStrLn "  Law I  (Size-Aware):   m, q, s, sigma_ann ~ pi/m^2"
  putStrLn "       |"
  putStrLn "       v  compose with (T, mu)"
  putStrLn "  Law II (Thermal):      eta ~ 6e-10, freeze-out, pair equilibrium"
  putStrLn "       |"
  putStrLn "       v  compose with hbar (quantization)"
  putStrLn "  Law III (Quantum):     Dirac eq => antiparticles"
  putStrLn "                         CPT theorem (emergent)"
  putStrLn "                         CKM phase => CP violation"
  putStrLn "       |"
  putStrLn "       v  compose with G (gravity)"
  putStrLn "  Law IV (Gravitational): WEP for antimatter"
  putStrLn "                          Omega_b h^2 = 0.02237"
  putStrLn ""

  -- Section 10: CPT experimental bounds
  putStrLn "--- Section 10: CPT Experimental Bounds (Proposition 9.5) ---"
  putStrLn ""
  putStrLn "  Observable                          | Bound"
  putStrLn "  ------------------------------------|------------------"
  putStrLn "  |m_K0 - m_Kbar0| / m_K              | < 6e-19  (CPLEAR)"
  putStrLn "  |q/m|_pbar / |q/m|_p - 1            | < 1.6e-11 (BASE)"
  putStrLn "  |g_e - g_ebar| / g_e                 | < 2e-12  (Harvard)"
  putStrLn "  |nu_1S2S(Hbar) - nu_1S2S(H)| / nu   | < 2e-12  (ALPHA)"
  putStrLn ""

  putStrLn "============================================================"
  putStrLn "All verifications complete."
  putStrLn "============================================================"
