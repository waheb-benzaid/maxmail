import { from } from 'rxjs';

export function unique(a: any[], fn: (arg0: any, arg1: any) => any) {
  if (a.length === 0 || a.length === 1) {
    return a;
  }
  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      if (fn(a[i], a[j])) {
        a.splice(i, 1);
      }
    }
  }
  return a;
}
