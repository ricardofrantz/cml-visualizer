// src/lib/maps/logistic.ts
export interface LogisticPoint {
  x: number;
  y: number;
}

/**
 * Calculate a single iteration of the logistic map
 * @param x Current x value
 * @param r Parameter r (default: 3.9)
 * @returns New x value after one iteration
 */
export function calculateLogisticIteration(
  x: number,
  r: number = 3.9
): number {
  return r * x * (1 - x);
}

/**
 * Calculate the logistic map for a given number of iterations
 * @param r Parameter r (default: 3.9)
 * @param x0 Initial x value (default: 0.5)
 * @param iterations Number of iterations (default: 100)
 * @returns Array of x values representing the logistic map trajectory
 */
export function calculateLogisticMap(
  r: number = 3.9,
  x0: number = 0.5,
  iterations: number = 100
): number[] {
  const points: number[] = [];
  let x = x0;
  
  for (let i = 0; i < iterations; i++) {
    points.push(x);
    x = calculateLogisticIteration(x, r);
  }
  
  return points;
}

/**
 * Calculate the logistic map cobweb plot
 * @param r Parameter r (default: 3.9)
 * @param x0 Initial x value (default: 0.5)
 * @param iterations Number of iterations (default: 100)
 * @returns Array of points representing the cobweb plot
 */
export function calculateLogisticCobweb(
  r: number = 3.9,
  x0: number = 0.5,
  iterations: number = 100
): LogisticPoint[] {
  const points: LogisticPoint[] = [];
  let x = x0;
  
  for (let i = 0; i < iterations; i++) {
    const y = calculateLogisticIteration(x, r);
    points.push({ x, y });
    x = y;
  }
  
  return points;
}

/**
 * Calculate the bifurcation diagram for the logistic map
 * @param rMin Minimum r value (default: 2.5)
 * @param rMax Maximum r value (default: 4.0)
 * @param rSteps Number of r values to calculate (default: 500)
 * @param transient Number of iterations to discard (default: 100)
 * @param iterations Number of iterations to keep (default: 100)
 * @returns Array of points representing the bifurcation diagram
 */
export function calculateLogisticBifurcation(
  rMin: number = 2.5,
  rMax: number = 4.0,
  rSteps: number = 500,
  transient: number = 100,
  iterations: number = 100
): LogisticPoint[] {
  const points: LogisticPoint[] = [];
  const rStep = (rMax - rMin) / rSteps;
  
  for (let rIndex = 0; rIndex <= rSteps; rIndex++) {
    const r = rMin + rIndex * rStep;
    let x = 0.5; // Start with x0 = 0.5
    
    // Discard transient
    for (let i = 0; i < transient; i++) {
      x = calculateLogisticIteration(x, r);
    }
    
    // Collect attractor points
    for (let i = 0; i < iterations; i++) {
      x = calculateLogisticIteration(x, r);
      points.push({ x: r, y: x });
    }
  }
  
  return points;
}

/**
 * Calculate the Lyapunov exponent for the logistic map
 * @param r Parameter r (default: 3.9)
 * @param x0 Initial x value (default: 0.5)
 * @param iterations Number of iterations (default: 1000)
 * @returns Approximate Lyapunov exponent
 */
export function calculateLogisticLyapunovExponent(
  r: number = 3.9,
  x0: number = 0.5,
  iterations: number = 1000
): number {
  const transient = 100;
  let x = x0;
  
  // Run the transient iterations
  for (let i = 0; i < transient; i++) {
    x = calculateLogisticIteration(x, r);
  }
  
  // Calculate the Lyapunov exponent
  let sum = 0;
  for (let i = 0; i < iterations; i++) {
    // The derivative of the logistic map with respect to x is r * (1 - 2x)
    const derivative = Math.abs(r * (1 - 2 * x));
    sum += Math.log(derivative);
    x = calculateLogisticIteration(x, r);
  }
  
  return sum / iterations;
}
