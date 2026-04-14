-- | Synthesis.hs
-- Computational verification of key Standard Model results
-- from "Synthesis to the Standard Model: Modular Composition
-- of Gauge Symmetries, Spontaneous Symmetry Breaking,
-- and Emergent Particle Physics"
--
-- Module: Synthesis
-- Author: Matthew Long, YonedaAI Research Collective
-- Date: April 14, 2026

module Main where

import Text.Printf (printf)

-- ============================================================
-- Section 1: Fundamental Constants and Parameters
-- ============================================================

-- | Higgs vacuum expectation value (GeV)
higgsVEV :: Double
higgsVEV = 246.22

-- | Fermi constant (GeV^-2)
fermiConstant :: Double
fermiConstant = 1.1663788e-5

-- | Fine structure constant at zero momentum transfer
alphaEM :: Double
alphaEM = 1.0 / 137.036

-- | Strong coupling at Z mass
alphaS_mZ :: Double
alphaS_mZ = 0.1180

-- | Weinberg angle (sin^2 theta_W)
sin2ThetaW :: Double
sin2ThetaW = 0.23122

-- | Experimental masses (GeV)
mW_exp, mZ_exp, mH_exp, mTop :: Double
mW_exp  = 80.379
mZ_exp  = 91.1876
mH_exp  = 125.25
mTop    = 172.69

-- ============================================================
-- Section 2: Gauge Group Dimensions
-- ============================================================

-- | Dimension of SU(N) Lie algebra
dimSU :: Int -> Int
dimSU n = n * n - 1

-- | Total gauge boson count for SU(3) x SU(2) x U(1)
totalGaugeBosons :: Int
totalGaugeBosons = dimSU 3 + dimSU 2 + 1

-- | Verify gauge boson count
verifyGaugeBosonCount :: Bool
verifyGaugeBosonCount = totalGaugeBosons == 12

-- ============================================================
-- Section 3: Electroweak Relations
-- ============================================================

-- | Compute g and g' from alpha_EM and sin^2(theta_W)
-- e = g * sin(theta_W) = g' * cos(theta_W)
-- alpha = e^2 / (4*pi)
-- Note: alpha is taken at q=0 (Thompson limit) while sin2ThetaW is the
-- MSbar value at the Z scale.  The mixed renormalization scheme produces
-- a ~4% tree-level offset in the predicted W and Z masses relative to
-- experiment; this is expected and resolved by radiative corrections
-- (principally Delta_r ~ 0.037 from the top Yukawa and alpha running).
electromagneticCoupling :: Double
electromagneticCoupling = sqrt (4.0 * pi * alphaEM)

weakCouplingG :: Double
weakCouplingG = electromagneticCoupling / sqrt sin2ThetaW

weakCouplingGPrime :: Double
weakCouplingGPrime = electromagneticCoupling / sqrt (1.0 - sin2ThetaW)

-- | W boson mass from Higgs mechanism: m_W = g*v/2
mW_predicted :: Double
mW_predicted = weakCouplingG * higgsVEV / 2.0

-- | Z boson mass: m_Z = m_W / cos(theta_W)
cosThetaW :: Double
cosThetaW = sqrt (1.0 - sin2ThetaW)

mZ_predicted :: Double
mZ_predicted = mW_predicted / cosThetaW

-- | Rho parameter at tree level
rhoTreeLevel :: Double
rhoTreeLevel = mW_predicted^(2::Int) / (mZ_predicted^(2::Int) * (1.0 - sin2ThetaW))

-- | Fermi constant from W mass: G_F/sqrt(2) = g^2 / (8 * m_W^2)
gF_predicted :: Double
gF_predicted = weakCouplingG^(2::Int) / (4.0 * sqrt 2.0 * mW_predicted^(2::Int))

-- | Weinberg angle relation: tan(theta_W) = g'/g
tanThetaW :: Double
tanThetaW = weakCouplingGPrime / weakCouplingG

weinbergAngleCheck :: Double
weinbergAngleCheck = atan tanThetaW * 180.0 / pi

-- ============================================================
-- Section 4: Anomaly Cancellation Verification
-- ============================================================

-- | Fermion representation: (name, SU(3) dim, SU(2) dim, Y, multiplicity)
data FermionRep = FermionRep
  { repName    :: String
  , su3Dim     :: Int
  , su2Dim     :: Int
  , hyperY     :: Double
  } deriving (Show)

-- | Standard Model fermions (one generation, left-handed Weyl)
-- Right-handed fermions enter as left-handed with negated Y
smFermionsLH :: [FermionRep]
smFermionsLH =
  [ FermionRep "Q_L"       3  2  (1.0/6.0)    -- Left-handed quark doublet
  , FermionRep "u_R^dag"   3  1  (-2.0/3.0)   -- Right-handed up (conjugated)
  , FermionRep "d_R^dag"   3  1  (1.0/3.0)    -- Right-handed down (conjugated)
  , FermionRep "L_L"       1  2  (-1.0/2.0)   -- Left-handed lepton doublet
  , FermionRep "e_R^dag"   1  1  (1.0)        -- Right-handed electron (conjugated)
  ]

-- | Multiplicity of a representation (SU(3) dim * SU(2) dim)
repMultiplicity :: FermionRep -> Int
repMultiplicity f = su3Dim f * su2Dim f

-- | [SU(3)]^2 U(1)_Y anomaly: sum of Y over SU(3) non-singlets, weighted by SU(2) dim
anomalySU3SU3U1 :: Double
anomalySU3SU3U1 = sum
  [ fromIntegral (su2Dim f) * hyperY f
  | f <- smFermionsLH
  , su3Dim f > 1  -- only color-charged fermions
  ]

-- | [SU(2)]^2 U(1)_Y anomaly: sum of Y over SU(2) doublets, weighted by SU(3) dim
anomalySU2SU2U1 :: Double
anomalySU2SU2U1 = sum
  [ fromIntegral (su3Dim f) * hyperY f
  | f <- smFermionsLH
  , su2Dim f > 1  -- only SU(2) doublets
  ]

-- | [U(1)_Y]^3 anomaly: sum of Y^3 over all fermions with full multiplicity
anomalyU1Cubed :: Double
anomalyU1Cubed = sum
  [ fromIntegral (repMultiplicity f) * (hyperY f)^(3::Int)
  | f <- smFermionsLH
  ]

-- | Gravitational-U(1)_Y anomaly: sum of Y over all fermions
anomalyGravU1 :: Double
anomalyGravU1 = sum
  [ fromIntegral (repMultiplicity f) * hyperY f
  | f <- smFermionsLH
  ]

-- ============================================================
-- Section 5: Renormalization Group Running
-- ============================================================

-- | One-loop beta function coefficients for SM
-- with GUT normalization alpha_1 = (5/3) * alpha'
b1_SM, b2_SM, b3_SM :: Double
b1_SM = 41.0 / 10.0   -- U(1)_Y
b2_SM = -19.0 / 6.0   -- SU(2)_L
b3_SM = -7.0           -- SU(3)_C

-- | Running coupling at scale mu, given coupling at mu0
-- alpha_i^{-1}(mu) = alpha_i^{-1}(mu0) - (b_i / 2*pi) * ln(mu/mu0)
runCoupling :: Double -> Double -> Double -> Double -> Double
runCoupling alpha0 b mu mu0 =
  let alphaInv0 = 1.0 / alpha0
      alphaInv  = alphaInv0 - (b / (2.0 * pi)) * log (mu / mu0)
  in 1.0 / alphaInv

-- | Initial conditions at Z mass (GUT normalized)
alpha1_mZ, alpha2_mZ, alpha3_atMZ :: Double
alpha1_mZ  = (5.0/3.0) * alphaEM / (1.0 - sin2ThetaW)
alpha2_mZ  = alphaEM / sin2ThetaW
alpha3_atMZ = alphaS_mZ

-- | Run all three couplings to a given scale
runAllCouplings :: Double -> (Double, Double, Double)
runAllCouplings mu =
  ( runCoupling alpha1_mZ b1_SM mu mZ_exp
  , runCoupling alpha2_mZ b2_SM mu mZ_exp
  , runCoupling alpha3_atMZ b3_SM mu mZ_exp
  )

-- ============================================================
-- Section 6: Higgs Mechanism
-- ============================================================

-- | Higgs quartic coupling from mass and VEV: m_H = sqrt(2*lambda) * v
higgsQuartic :: Double
higgsQuartic = mH_exp^(2::Int) / (2.0 * higgsVEV^(2::Int))

-- | Higgs mu^2 parameter: mu^2 = lambda * v^2
higgsMuSq :: Double
higgsMuSq = higgsQuartic * higgsVEV^(2::Int)

-- | Triple Higgs coupling: lambda_3 = 3 * m_H^2 / v
tripleHiggsCoupling :: Double
tripleHiggsCoupling = 3.0 * mH_exp^(2::Int) / higgsVEV

-- | Degree of freedom counting
-- Before SSB: 4 scalar + 3*2 (massless SU(2)) + 2 (massless U(1)) = 12
-- After SSB: 1 scalar + 3*3 (massive W+, W-, Z) + 2 (massless photon) = 12
dofBeforeSSB, dofAfterSSB :: Int
dofBeforeSSB = 4 + 3*2 + 2
dofAfterSSB  = 1 + 3*3 + 2

-- ============================================================
-- Section 7: CKM Matrix
-- ============================================================

-- | Wolfenstein parameters
lambda_CKM, bigA_CKM, rhoBar_CKM, etaBar_CKM :: Double
lambda_CKM  = 0.22500
bigA_CKM    = 0.826
rhoBar_CKM  = 0.159
etaBar_CKM  = 0.348

-- | Number of CP-violating phases for n generations
cpPhases :: Int -> Int
cpPhases n = (n - 1) * (n - 2) `div` 2

-- | Number of mixing angles for n generations
mixingAngles :: Int -> Int
mixingAngles n = n * (n - 1) `div` 2

-- | Jarlskog invariant (approximate)
jarlskogInvariant :: Double
jarlskogInvariant = bigA_CKM^(2::Int) * lambda_CKM^(6::Int) * etaBar_CKM

-- ============================================================
-- Section 8: QCD Beta Function
-- ============================================================

-- | QCD beta function coefficient b0 = 11*Nc/3 - 2*Nf/3
qcdBeta0 :: Int -> Int -> Double
qcdBeta0 nc nf = (11.0 * fromIntegral nc / 3.0) - (2.0 * fromIntegral nf / 3.0)

-- | Check asymptotic freedom: b0 > 0
isAsymptoticallyFree :: Int -> Int -> Bool
isAsymptoticallyFree nc nf = qcdBeta0 nc nf > 0

-- | Maximum number of flavors for asymptotic freedom in SU(Nc)
maxFlavorsAF :: Int -> Int
maxFlavorsAF nc = floor (11.0 * fromIntegral nc / 2.0 :: Double)

-- ============================================================
-- Main: Demonstrate All Results
-- ============================================================

main :: IO ()
main = do
  putStrLn "=================================================================="
  putStrLn "  SYNTHESIS TO THE STANDARD MODEL"
  putStrLn "  Computational Verification of Key Results"
  putStrLn "  YonedaAI Research Collective, April 2026"
  putStrLn "=================================================================="
  putStrLn ""

  -- Gauge group
  putStrLn "--- Gauge Group Structure ---"
  printf "  dim SU(3) = %d\n" (dimSU 3)
  printf "  dim SU(2) = %d\n" (dimSU 2)
  printf "  dim U(1)  = 1\n"
  printf "  Total gauge bosons: %d (expected 12: %s)\n"
    totalGaugeBosons (show verifyGaugeBosonCount)
  putStrLn ""

  -- Electroweak
  putStrLn "--- Electroweak Sector ---"
  printf "  e (electromagnetic coupling) = %.6f\n" electromagneticCoupling
  printf "  g (weak coupling)            = %.6f\n" weakCouplingG
  printf "  g' (hypercharge coupling)    = %.6f\n" weakCouplingGPrime
  printf "  m_W predicted = %.3f GeV (exp: %.3f GeV)\n" mW_predicted mW_exp
  printf "  m_Z predicted = %.3f GeV (exp: %.3f GeV)\n" mZ_predicted mZ_exp
  printf "  rho (tree level) = %.6f (expected 1.0)\n" rhoTreeLevel
  printf "  G_F predicted = %.4e GeV^-2 (exp: %.4e GeV^-2)\n" gF_predicted fermiConstant
  printf "  Weinberg angle = %.2f degrees\n" weinbergAngleCheck
  putStrLn ""

  -- Anomaly cancellation
  putStrLn "--- Anomaly Cancellation (per generation) ---"
  printf "  [SU(3)]^2 U(1)_Y : %.10f (should be 0)\n" anomalySU3SU3U1
  printf "  [SU(2)]^2 U(1)_Y : %.10f (should be 0)\n" anomalySU2SU2U1
  printf "  [U(1)_Y]^3       : %.10f (should be 0)\n" anomalyU1Cubed
  printf "  [grav]^2 U(1)_Y  : %.10f (should be 0)\n" anomalyGravU1
  let allAnomaliesCancel = all (\x -> abs x < 1e-10)
        [anomalySU3SU3U1, anomalySU2SU2U1, anomalyU1Cubed, anomalyGravU1]
  printf "  All anomalies cancel: %s\n" (show allAnomaliesCancel)
  putStrLn ""

  -- Higgs mechanism
  putStrLn "--- Higgs Mechanism ---"
  printf "  Higgs quartic lambda = %.6f\n" higgsQuartic
  printf "  Higgs mu^2 = %.2f GeV^2\n" higgsMuSq
  printf "  Triple Higgs coupling = %.2f GeV\n" tripleHiggsCoupling
  printf "  DOF before SSB: %d, after SSB: %d, conserved: %s\n"
    dofBeforeSSB dofAfterSSB (show (dofBeforeSSB == dofAfterSSB))
  putStrLn ""

  -- CKM matrix
  putStrLn "--- CKM Matrix and CP Violation ---"
  printf "  Wolfenstein: lambda=%.4f, A=%.3f, rho=%.3f, eta=%.3f\n"
    lambda_CKM bigA_CKM rhoBar_CKM etaBar_CKM
  printf "  CP phases for 2 generations: %d (no CP violation)\n" (cpPhases 2)
  printf "  CP phases for 3 generations: %d (one phase -> CP violation)\n" (cpPhases 3)
  printf "  Mixing angles for 3 generations: %d\n" (mixingAngles 3)
  printf "  Jarlskog invariant J ~ %.2e\n" jarlskogInvariant
  putStrLn ""

  -- QCD
  putStrLn "--- QCD and Asymptotic Freedom ---"
  printf "  beta_0(Nc=3, Nf=6) = %.4f\n" (qcdBeta0 3 6)
  printf "  Asymptotically free (Nc=3, Nf=6): %s\n" (show (isAsymptoticallyFree 3 6))
  printf "  Max flavors for AF in SU(3): %d\n" (maxFlavorsAF 3)
  printf "  Max flavors for AF in SU(5): %d\n" (maxFlavorsAF 5)
  putStrLn ""

  -- Renormalization group running
  putStrLn "--- Renormalization Group Running ---"
  printf "  alpha_1(m_Z) = %.6f (GUT normalized)\n" alpha1_mZ
  printf "  alpha_2(m_Z) = %.6f\n" alpha2_mZ
  printf "  alpha_3(m_Z) = %.6f\n" alpha3_atMZ
  putStrLn ""
  putStrLn "  Scale (GeV)       alpha_1^{-1}   alpha_2^{-1}   alpha_3^{-1}"
  putStrLn "  ---------------------------------------------------------------"
  let scales = [mZ_exp, 1.0e3, 1.0e6, 1.0e10, 1.0e14, 1.0e16]
  mapM_ (\mu -> do
    let (a1, a2, a3) = runAllCouplings mu
    printf "  %-18.2e  %10.4f     %10.4f     %10.4f\n"
      mu (1.0/a1) (1.0/a2) (1.0/a3)
    ) scales
  putStrLn ""

  putStrLn "=================================================================="
  putStrLn "  All verifications complete."
  putStrLn "=================================================================="
