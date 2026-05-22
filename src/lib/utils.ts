import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function generateAdmissionNumber(year: number, programCode: string): string {
  const serial = Math.floor(Math.random() * 9999) + 1;
  return `IS-${year}-${programCode}-${serial.toString().padStart(4, '0')}`;
}

export function calculateGPA(scores: { grade: string; unit: number }[]): number {
  const gradePoints: Record<string, number> = {
    'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'F': 0
  };
  
  let totalPoints = 0;
  let totalUnits = 0;
  
  scores.forEach(({ grade, unit }) => {
    totalPoints += (gradePoints[grade] || 0) * unit;
    totalUnits += unit;
  });
  
  return totalUnits > 0 ? Number((totalPoints / totalUnits).toFixed(2)) : 0;
}

export function getGradeFromScore(score: number): string {
  if (score >= 70) return 'A';
  if (score >= 60) return 'B';
  if (score >= 50) return 'C';
  if (score >= 45) return 'D';
  if (score >= 40) return 'E';
  return 'F';
}

export function getGradeColor(grade: string): string {
  const colors: Record<string, string> = {
    'A': 'text-green-600 bg-green-100',
    'B': 'text-blue-600 bg-blue-100',
    'C': 'text-yellow-600 bg-yellow-100',
    'D': 'text-orange-600 bg-orange-100',
    'E': 'text-orange-600 bg-orange-100',
    'F': 'text-red-600 bg-red-100',
  };
  return colors[grade] || 'text-gray-600 bg-gray-100';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}