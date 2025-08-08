// src/lib/maps/standard.ts
// Implementation of the standard map and related calculations

/**
 * Calculate iterations of the standard map
 * @param K Parameter controlling the behavior of the map
 * @param theta0 Initial angle value (between 0 and 2π)
 * @param p0 Initial momentum value (between 0 and 2π)
 * @param iterations Number of iterations to calculate
 * @returns Array of [theta, p] pairs from the iterations
 */
export function calculateStandardMap(
  K: number, 
  theta0: number, 
  p0: number, 
  iterations: number
): [number, number][] {
  const result: [number, number][] = [[theta0, p0]];
  let theta = theta0;
  let p = p0;
  
  for (let i = 0; i < iterations; i++) {
    p = (p + K * Math.sin(theta)) % (2 * Math.PI);
    if (p < 0) p += 2 * Math.PI;
    
    theta = (theta + p) % (2 * Math.PI);
    if (theta < 0) theta += 2 * Math.PI;
    
    result.push([theta, p]);
  }
  
  return result;
}

/**
 * Calculate multiple trajectories of the standard map for phase space visualization
 * @param K Parameter controlling the behavior of the map
 * @param numTrajectories Number of different initial conditions to use
 * @param iterations Number of iterations for each trajectory
 * @returns Array of trajectories, each containing [theta, p] pairs
 */
export function calculatePhaseSpace(
  K: number,
  numTrajectories: number,
  iterations: number
): [number, number][][] {
  const trajectories: [number, number][][] = [];
  
  // Generate initial conditions distributed across the phase space
  for (let i = 0; i < numTrajectories; i++) {
    const theta0 = (i % Math.sqrt(numTrajectories)) * 2 * Math.PI / Math.sqrt(numTrajectories);
    const p0 = Math.floor(i / Math.sqrt(numTrajectories)) * 2 * Math.PI / Math.sqrt(numTrajectories);
    
    trajectories.push(calculateStandardMap(K, theta0, p0, iterations));
  }
  
  return trajectories;
}

/**
 * Calculate the rotation number for the standard map
 * @param K Parameter controlling the behavior of the map
 * @param theta0 Initial angle value
 * @param p0 Initial momentum value
 * @param iterations Number of iterations
 * @returns The rotation number
 */
export function calculateRotationNumber(
  K: number,
  theta0: number,
  p0: number,
  iterations: number
): number {
  let theta = theta0;
  let p = p0;
  let totalRotation = 0;
  
  // Discard transient behavior
  for (let i = 0; i < 100; i++) {
    p = (p + K * Math.sin(theta)) % (2 * Math.PI);
    if (p < 0) p += 2 * Math.PI;
    
    theta = (theta + p) % (2 * Math.PI);
    if (theta < 0) theta += 2 * Math.PI;
  }
  
  // Calculate rotation number
  for (let i = 0; i < iterations; i++) {
    p = (p + K * Math.sin(theta)) % (2 * Math.PI);
    if (p < 0) p += 2 * Math.PI;
    
    theta = (theta + p) % (2 * Math.PI);
    if (theta < 0) theta += 2 * Math.PI;
    
    totalRotation += p / (2 * Math.PI);
  }
  
  return totalRotation / iterations;
}

/**
 * Calculate the Lyapunov exponent for the standard map
 * @param K Parameter controlling the behavior of the map
 * @param theta0 Initial angle value
 * @param p0 Initial momentum value
 * @param iterations Number of iterations
 * @returns The Lyapunov exponent
 */
export function calculateLyapunovExponent(
  K: number,
  theta0: number,
  p0: number,
  iterations: number
): number {
  let theta = theta0;
  let p = p0;
  
  // Discard transient behavior
  for (let i = 0; i < 100; i++) {
    p = (p + K * Math.sin(theta)) % (2 * Math.PI);
    if (p < 0) p += 2 * Math.PI;
    
    theta = (theta + p) % (2 * Math.PI);
    if (theta < 0) theta += 2 * Math.PI;
  }
  
  // Initialize tangent vector
  let dtheta = 1.0;
  let dp = 0.0;
  
  let sum = 0.0;
  
  for (let i = 0; i < iterations; i++) {
    // Calculate the Jacobian matrix at the current point
    // | 1  1 |
    // | K*cos(theta)  1 |
    
    // Apply the Jacobian to the tangent vector
    const nextDtheta = dtheta + dp;
    const nextDp = K * Math.cos(theta) * dtheta + dp;
    
    // Normalize the tangent vector
    const norm = Math.sqrt(nextDtheta * nextDtheta + nextDp * nextDp);
    dtheta = nextDtheta / norm;
    dp = nextDp / norm;
    
    // Accumulate the logarithm of the stretching factor
    sum += Math.log(norm);
    
    // Iterate the map
    p = (p + K * Math.sin(theta)) % (2 * Math.PI);
    if (p < 0) p += 2 * Math.PI;
    
    theta = (theta + p) % (2 * Math.PI);
    if (theta < 0) theta += 2 * Math.PI;
  }
  
  // Return the average stretching factor
  return sum / iterations;
}

/**
 * Calculate the stability transition in parameter space
 * @param KMin Minimum K value
 * @param KMax Maximum K value
 * @param KSteps Number of K values to calculate
 * @returns Array of [K, lyapunov] pairs for plotting
 */
export function calculateStabilityTransition(
  KMin: number,
  KMax: number,
  KSteps: number
): [number, number][] {
  const result: [number, number][] = [];
  const KValues = Array.from({ length: KSteps }, (_, i) => KMin + (i * (KMax - KMin)) / (KSteps - 1));
  
  for (const K of KValues) {
    const lyapunov = calculateLyapunovExponent(K, Math.PI, 0.5, 1000);
    result.push([K, lyapunov]);
  }
  
  return result;
}
