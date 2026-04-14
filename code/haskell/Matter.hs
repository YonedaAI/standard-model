-- | Matter.hs -- Computational verification of key algebraic results
-- from "Matter in the Standard Model: A Modular Composition of
-- Fundamental Particles, Gauge Interactions, and Emergent Mass"
--
-- Module: Matter
-- Author: Matthew Long, YonedaAI Research Collective
-- Date: 2026-04-14

module Main where

import Data.Complex
import Text.Printf (printf)

-- ============================================================
-- Section 1: Fundamental Constants and Particle Data
-- ============================================================

-- | Electroweak parameters
vHiggs :: Double  -- Higgs VEV in GeV
vHiggs = 246.22

gWeak :: Double   -- SU(2)_L coupling
gWeak = 0.6517

gPrime :: Double  -- U(1)_Y coupling
gPrime = 0.3574

gStrong :: Double -- SU(3)_C coupling at m_Z
gStrong = 1.217716  -- gives alpha_s(m_Z) = 0.1180 exactly

-- | Weinberg angle
sinSqThetaW :: Double
sinSqThetaW = gPrime**2 / (gWeak**2 + gPrime**2)

cosThetaW :: Double
cosThetaW = sqrt (1 - sinSqThetaW)

-- | Electromagnetic coupling
eEM :: Double
eEM = gWeak * sqrt sinSqThetaW

alphaEM :: Double
alphaEM = eEM**2 / (4 * pi)

-- | Strong coupling
alphaS :: Double
alphaS = gStrong**2 / (4 * pi)

-- ============================================================
-- Section 2: Gauge Boson Masses from Higgs Mechanism
-- ============================================================

-- | W boson mass: m_W = g * v / 2
mW :: Double
mW = gWeak * vHiggs / 2

-- | Z boson mass: m_Z = v * sqrt(g^2 + g'^2) / 2
mZ :: Double
mZ = vHiggs * sqrt (gWeak**2 + gPrime**2) / 2

-- | Custodial symmetry check: rho = m_W^2 / (m_Z^2 * cos^2(theta_W))
rhoParameter :: Double
rhoParameter = mW**2 / (mZ**2 * cosThetaW**2)

-- | Fermi constant: G_F / sqrt(2) = g^2 / (8 * m_W^2)
fermiConstant :: Double
fermiConstant = gWeak**2 / (4 * sqrt 2 * mW**2)

-- ============================================================
-- Section 3: Fermion Masses from Yukawa Couplings
-- ============================================================

data Fermion = Fermion
  { fermionName   :: String
  , fermionMass   :: Double   -- mass in GeV
  , fermionCharge :: Double   -- electromagnetic charge
  , fermionT3     :: Double   -- weak isospin T3
  , fermionY      :: Double   -- hypercharge Y
  , fermionNc     :: Int      -- color multiplicity
  } deriving (Show)

-- | Yukawa coupling from mass: y_f = sqrt(2) * m_f / v
yukawaFromMass :: Double -> Double
yukawaFromMass m = sqrt 2 * m / vHiggs

-- | Mass from Yukawa coupling: m_f = y_f * v / sqrt(2)
massFromYukawa :: Double -> Double
massFromYukawa y = y * vHiggs / sqrt 2

-- | Standard Model fermions (one generation shown with all three)
quarks :: [Fermion]
quarks =
  [ Fermion "up"      0.00216  ( 2/3) ( 1/2) ( 1/6) 3
  , Fermion "down"    0.00467  (-1/3) (-1/2) ( 1/6) 3
  , Fermion "charm"   1.27     ( 2/3) ( 1/2) ( 1/6) 3
  , Fermion "strange" 0.093    (-1/3) (-1/2) ( 1/6) 3
  , Fermion "top"     172.69   ( 2/3) ( 1/2) ( 1/6) 3
  , Fermion "bottom"  4.18     (-1/3) (-1/2) ( 1/6) 3
  ]

leptons :: [Fermion]
leptons =
  [ Fermion "electron"     0.000511  (-1) (-1/2) (-1/2) 1
  , Fermion "e-neutrino"   0.0       ( 0) ( 1/2) (-1/2) 1
  , Fermion "muon"         0.10566   (-1) (-1/2) (-1/2) 1
  , Fermion "mu-neutrino"  0.0       ( 0) ( 1/2) (-1/2) 1
  , Fermion "tau"          1.777     (-1) (-1/2) (-1/2) 1
  , Fermion "tau-neutrino" 0.0       ( 0) ( 1/2) (-1/2) 1
  ]

-- ============================================================
-- Section 4: Gell-Mann--Nishijima Relation Verification
-- ============================================================

-- | Q = T3 + Y
gellMannNishijima :: Fermion -> Double
gellMannNishijima f = fermionT3 f + fermionY f

-- | Verify Q = T3 + Y for all fermions
verifyGMN :: Fermion -> Bool
verifyGMN f = abs (fermionCharge f - gellMannNishijima f) < 1e-10

-- ============================================================
-- Section 5: Anomaly Cancellation Verification
-- ============================================================

-- | One generation of left-handed fermions for anomaly computation
-- Each entry: (SU(3) rep dimension, SU(2) rep dimension, Y, chirality_sign)
data AnomalyFermion = AnomalyFermion
  { afName   :: String
  , afSU3dim :: Int
  , afSU2dim :: Int
  , afY      :: Double
  , afChiral :: Double  -- +1 for left-handed, -1 for right-handed
  } deriving (Show)

oneGeneration :: [AnomalyFermion]
oneGeneration =
  [ AnomalyFermion "Q_L"  3 2 ( 1/6) ( 1)
  , AnomalyFermion "u_R"  3 1 ( 2/3) (-1)
  , AnomalyFermion "d_R"  3 1 (-1/3) (-1)
  , AnomalyFermion "L_L"  1 2 (-1/2) ( 1)
  , AnomalyFermion "e_R"  1 1 (-1)   (-1)
  ]

-- | [SU(3)]^2 U(1)_Y anomaly: sum of Y * chirality over SU(3) non-singlets
-- weighted by SU(2) multiplicity
anomalySU3SU3U1 :: [AnomalyFermion] -> Double
anomalySU3SU3U1 fs = sum
  [ afChiral f * afY f * fromIntegral (afSU2dim f)
  | f <- fs, afSU3dim f == 3
  ]

-- | [SU(2)]^2 U(1)_Y anomaly: sum of Y * chirality over SU(2) doublets
-- weighted by SU(3) multiplicity
anomalySU2SU2U1 :: [AnomalyFermion] -> Double
anomalySU2SU2U1 fs = sum
  [ afChiral f * afY f * fromIntegral (afSU3dim f)
  | f <- fs, afSU2dim f == 2
  ]

-- | [U(1)_Y]^3 anomaly: sum of Y^3 * chirality * SU(3)dim * SU(2)dim
anomalyU1Cubed :: [AnomalyFermion] -> Double
anomalyU1Cubed fs = sum
  [ afChiral f * (afY f)**3
    * fromIntegral (afSU3dim f) * fromIntegral (afSU2dim f)
  | f <- fs
  ]

-- | U(1)_Y gravitational anomaly: sum of Y * chirality * SU(3)dim * SU(2)dim
anomalyU1Grav :: [AnomalyFermion] -> Double
anomalyU1Grav fs = sum
  [ afChiral f * afY f
    * fromIntegral (afSU3dim f) * fromIntegral (afSU2dim f)
  | f <- fs
  ]

-- ============================================================
-- Section 6: CKM Matrix and CP Violation
-- ============================================================

-- | CKM parameters (PDG 2024)
lambda_CKM :: Double
lambda_CKM = 0.22500

aCKM :: Double
aCKM = 0.826

rhoBar :: Double
rhoBar = 0.159

etaBar :: Double
etaBar = 0.348

-- | Wolfenstein parameterization of CKM matrix
wolfen :: [[Complex Double]]
wolfen =
  let l = lambda_CKM
      l2 = l * l
      l3 = l2 * l
      a = aCKM
  in [ [ (1 - l2/2) :+ 0,           l :+ 0,        (a * l3 * rhoBar) :+ (-(a * l3 * etaBar)) ]
     , [ (-l) :+ 0,                  (1 - l2/2) :+ 0,  (a * l2) :+ 0 ]
     , [ (a * l3 * (1 - rhoBar)) :+ (-(a * l3 * etaBar)), (-(a * l2)) :+ 0, 1 :+ 0 ]
     ]

-- | Jarlskog invariant J = c12 c23 c13^2 s12 s23 s13 sin(delta)
-- From Wolfenstein: J ~ A^2 lambda^6 eta
jarlskogInvariant :: Double
jarlskogInvariant = aCKM**2 * lambda_CKM**6 * etaBar

-- | Number of CP-violating phases for n generations
cpPhases :: Int -> Int
cpPhases n = (n - 1) * (n - 2) `div` 2

-- ============================================================
-- Section 7: Running Coupling (QCD)
-- ============================================================

-- | One-loop beta coefficient: b0 = 11 - 2*Nf/3
beta0 :: Int -> Double
beta0 nf = 11.0 - 2.0 * fromIntegral nf / 3.0

-- | Running coupling at scale mu (one-loop)
-- alpha_s(mu) = alpha_s(mu0) / (1 + b0/(2*pi) * alpha_s(mu0) * ln(mu/mu0))
runningAlphaS :: Double    -- alpha_s at reference scale
              -> Double    -- reference scale mu0 (GeV)
              -> Int       -- number of active flavors
              -> Double    -- target scale mu (GeV)
              -> Double    -- alpha_s(mu)
runningAlphaS as0 mu0 nf mu =
  let b = beta0 nf
      logRatio = log (mu / mu0)
  in as0 / (1 + b / (2 * pi) * as0 * logRatio)

-- ============================================================
-- Section 8: Higgs Potential and Self-Couplings
-- ============================================================

mHiggs :: Double
mHiggs = 125.25  -- GeV

-- | Higgs quartic coupling lambda
higgsLambda :: Double
higgsLambda = mHiggs**2 / (2 * vHiggs**2)

-- | Higgs cubic self-coupling
higgsCubic :: Double
higgsCubic = 3 * mHiggs**2 / vHiggs

-- | Higgs quartic self-coupling coefficient
higgsQuartic :: Double
higgsQuartic = 3 * mHiggs**2 / vHiggs**2

-- ============================================================
-- Section 9: Proton Mass Decomposition
-- ============================================================

mProton :: Double
mProton = 0.93827  -- GeV

-- | Sum of current quark masses (uud)
quarkMassContribution :: Double
quarkMassContribution = 2 * 0.00216 + 0.00467

-- | Fraction of proton mass from quark masses
quarkMassFraction :: Double
quarkMassFraction = quarkMassContribution / mProton

-- | Fraction from QCD dynamics
qcdFraction :: Double
qcdFraction = 1 - quarkMassFraction

-- ============================================================
-- Main: Run all verifications
-- ============================================================

main :: IO ()
main = do
  putStrLn "============================================="
  putStrLn "  MATTER IN THE STANDARD MODEL"
  putStrLn "  Computational Verification of Key Results"
  putStrLn "============================================="
  putStrLn ""

  -- Electroweak parameters
  putStrLn "--- Electroweak Parameters ---"
  printf "  sin^2(theta_W) = %.4f (expected ~0.2312)\n" sinSqThetaW
  printf "  alpha_EM(m_Z)  = 1/%.1f (running value at m_Z scale; low-energy value ~1/137)\n" (1/alphaEM)
  printf "  alpha_s(m_Z)   = %.4f (expected ~0.1180)\n" alphaS
  putStrLn ""

  -- Gauge boson masses
  putStrLn "--- Gauge Boson Masses (Higgs Mechanism) ---"
  printf "  m_W  = %.2f GeV (expected ~80.4)\n" mW
  printf "  m_Z  = %.2f GeV (expected ~91.2)\n" mZ
  printf "  rho  = %.6f (expected 1.000000 at tree level)\n" rhoParameter
  printf "  G_F  = %.4e GeV^-2 (expected ~1.166e-5)\n" fermiConstant
  putStrLn ""

  -- Gell-Mann--Nishijima verification
  putStrLn "--- Gell-Mann--Nishijima Relation: Q = T3 + Y ---"
  let allFermions = quarks ++ leptons
  mapM_ (\f -> printf "  %-12s Q=%.3f, T3+Y=%.3f  %s\n"
    (fermionName f)
    (fermionCharge f)
    (gellMannNishijima f)
    (if verifyGMN f then "[OK]" else "[FAIL]" :: String)
    ) allFermions
  putStrLn ""

  -- Yukawa couplings
  putStrLn "--- Yukawa Couplings (y_f = sqrt(2)*m_f/v) ---"
  mapM_ (\f -> when (fermionMass f > 0) $
    printf "  %-12s y = %.6e  (m = %.4f GeV)\n"
      (fermionName f) (yukawaFromMass (fermionMass f)) (fermionMass f)
    ) allFermions
  putStrLn ""

  -- Anomaly cancellation
  putStrLn "--- Anomaly Cancellation (per generation) ---"
  printf "  [SU(3)]^2 U(1)_Y  = %.6f  %s\n"
    (anomalySU3SU3U1 oneGeneration)
    (check $ anomalySU3SU3U1 oneGeneration)
  printf "  [SU(2)]^2 U(1)_Y  = %.6f  %s\n"
    (anomalySU2SU2U1 oneGeneration)
    (check $ anomalySU2SU2U1 oneGeneration)
  printf "  [U(1)_Y]^3        = %.6f  %s\n"
    (anomalyU1Cubed oneGeneration)
    (check $ anomalyU1Cubed oneGeneration)
  printf "  U(1)_Y [grav]^2   = %.6f  %s\n"
    (anomalyU1Grav oneGeneration)
    (check $ anomalyU1Grav oneGeneration)
  putStrLn ""

  -- CKM and CP violation
  putStrLn "--- CKM Matrix and CP Violation ---"
  printf "  Jarlskog invariant J = %.2e (expected ~3.18e-5)\n" jarlskogInvariant
  printf "  CP phases for 2 generations: %d (no CP violation)\n" (cpPhases 2)
  printf "  CP phases for 3 generations: %d (Standard Model)\n" (cpPhases 3)
  printf "  CP phases for 4 generations: %d\n" (cpPhases 4)
  putStrLn ""

  -- Running coupling
  putStrLn "--- QCD Running Coupling (one-loop) ---"
  let as_mZ = 0.1180
      mZval = 91.1876
  printf "  alpha_s(m_Z)    = %.4f\n" as_mZ
  printf "  alpha_s(1 GeV)  = %.4f (5 flavors approx)\n"
    (runningAlphaS as_mZ mZval 5 1.0)
  printf "  alpha_s(1 TeV)  = %.4f\n"
    (runningAlphaS as_mZ mZval 6 1000.0)
  printf "  alpha_s(10 TeV) = %.4f\n"
    (runningAlphaS as_mZ mZval 6 10000.0)
  printf "  b0(Nf=6) = %.2f (must be > 0 for asymptotic freedom)\n"
    (beta0 6)
  putStrLn ""

  -- Higgs self-couplings
  putStrLn "--- Higgs Boson Properties ---"
  printf "  m_H       = %.2f GeV\n" mHiggs
  printf "  lambda     = %.4f\n" higgsLambda
  printf "  lambda_3   = %.1f GeV (cubic self-coupling)\n" higgsCubic
  printf "  lambda_4   = %.4f (quartic self-coupling)\n" higgsQuartic
  putStrLn ""

  -- Proton mass decomposition
  putStrLn "--- Proton Mass Decomposition ---"
  printf "  Proton mass         = %.5f GeV\n" mProton
  printf "  Valence quark mass  = %.5f GeV (uud)\n" quarkMassContribution
  printf "  Quark mass fraction = %.2f%%\n" (quarkMassFraction * 100)
  printf "  QCD dynamics        = %.2f%% (emergent!)\n" (qcdFraction * 100)
  putStrLn ""

  putStrLn "============================================="
  putStrLn "  All verifications complete."
  putStrLn "============================================="

-- Helper
when :: Bool -> IO () -> IO ()
when True  action = action
when False _      = return ()

check :: Double -> String
check x = if abs x < 1e-10 then "[CANCELLED]" else "[ANOMALY!]"
