import { DATA } from './data.js';
export const keys = Object.keys(DATA.routes);
export const VERSION = 'One Small Venture 1.1 · unvalidated heuristic';
export function compute(a) {
  const missing = DATA.questions.filter(q => !q.options.some(o => o.id === a[q.id])).map(q => q.id);
  if (missing.length) return { missing };
  const scores = Object.fromEntries(keys.map(k => [k, 0]));
  let substantive = 0;
  for (const q of DATA.questions.filter(q => q.kind === 'scored')) {
    const option = q.options.find(o => o.id === a[q.id]);
    if (a[q.id] !== 'unsure') substantive++;
    for (const [k, n] of Object.entries(option.scores)) scores[k] += n;
  }
  const globalReasons = [];
  if (a.time === 'under2') globalReasons.push('With less than two hours a week, keep this to one short private sample.');
  if (a.availability !== 'windows') globalReasons.push('Without dependable response windows, explore privately before making buyer commitments.');
  if (a.support === 'none') globalReasons.push('Every sale creates delivery and correction responsibilities. Start privately while support is off the table.');
  const blocked = Object.fromEntries(keys.map(k => [k, []]));
  if (!['5to8','9plus'].includes(a.time)) for (const k of ['service','tool']) blocked[k].push('Plan at least five hours a week for a paid pilot.');
  if (!['bounded','technical'].includes(a.support)) blocked.service.push('A service needs willingness to answer bounded customer questions.');
  if (a.support !== 'technical') blocked.tool.push('A software pilot needs technical troubleshooting and compatibility support.');
  if (a.skills !== 'technical') blocked.tool.push('Demonstrate the technical skill with a tested manual prototype before building software.');
  const preliminary = [];
  if (a.access === 'none') preliminary.push('Identify three plausible buyers through public professional communities or introductions. Ask about their current process before building.');
  if (a.access === 'onetwo') preliminary.push('Speak with the people you can reach, then find one additional independent perspective.');
  if (a.proof !== 'artifact') preliminary.push(a.proof === 'none' ? 'Practice on a fictional, low-stakes example. Demonstrate the skill before offering paid expertise.' : 'Turn your experience into a shareable sample using fictional information.');
  if (a.skills === 'learning') preliminary.push('Set aside one practice session to learn the core task. Do not promise work you cannot yet demonstrate.');
  const rawMax = Math.max(...Object.values(scores));
  const raw = keys.filter(k => scores[k] >= rawMax - 1);
  const ready = keys.filter(k => !blocked[k].length);
  const readyMax = Math.max(0, ...ready.map(k => scores[k]));
  const practical = readyMax > 0 ? ready.filter(k => scores[k] > 0 && scores[k] >= readyMax - 1) : [];
  return { missing: [], scores, substantive, raw, practical, blocked, preliminary, globalReasons,
    exploration: substantive < 4, discovery: globalReasons.length > 0,
    privateFirst: globalReasons.length > 0 || a.proof !== 'artifact' || a.skills === 'learning' || a.access !== 'threeplus',
    urgent: a.urgency === 'yes' };
}
export function mode(k, r) { return r.exploration || r.discovery || r.privateFirst || r.blocked[k].length ? 'Private sample first' : 'Ready to test a bounded offer'; }
export function schedule(k, r) {
  const route = DATA.routes[k];
  const privateOnly = r.exploration || r.discovery || r.blocked[k].length > 0;
  return [
    { day: 'Days 1–2', title: 'Define one small question', body: 'Name one buyer, one recurring problem and the smallest useful output. Set a time limit and a spending cap before you begin.' },
    { day: 'Days 3–5', title: 'Make the sample', body: route.first_test[1] + ' Use fictional or authorized information. Keep the first version deliberately small.' },
    { day: 'Days 6–9', title: privateOnly ? 'Test the work safely' : 'Observe real use', body: privateOnly ? 'Rehearse the task privately or with a willing peer. Record confusion, completion time and what you still need to learn. Make no paid commitments.' : route.first_test[2] + ' Ask what they do today, what gets in the way and whether your sample actually helps.' },
    { day: 'Days 10–14', title: 'Review, then decide', body: privateOnly ? 'Check whether your sample works and whether your constraints changed. Stop, practice again or revisit your answers before offering work.' : 'Only after the sample works and readiness conditions are met, discuss one clearly scoped paid test. Record actual decisions, time spent and support required. A compliment is not a purchase.' }
  ];
}
