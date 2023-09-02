import { derive } from "./utils";

/* ------- DERIVE ---------- */
export function renderDerive(percentage: number) {
  const grade = derive(() => {
    if (percentage >= 0.9) {
      return "A";
    }
    if (percentage >= 0.8) {
      return "B";
    }
    if (percentage >= 0.7) {
      return "C";
    }
    if (percentage >= 0.6) {
      return "D";
    }
    return "F";
  });

  return "Your grade is " + grade;
}
/* ------- DERIVE ---------- */
