/**
 * Client-portal project stages. Delivery-focused vocabulary that replaces the
 * commerce-flavored order statuses, while staying backward-compatible with any
 * legacy rows (pending/paid/completed/cancelled).
 */

export const PROJECT_STAGES = [
  { id: 'intake', label: 'Intake' },
  { id: 'in-progress', label: 'In progress' },
  { id: 'review', label: 'Review' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'closed', label: 'Closed' },
];

const LEGACY_MAP = {
  pending: 'intake',
  paid: 'in-progress',
  completed: 'delivered',
  cancelled: 'closed',
};

export function normalizeStage(status) {
  if (!status) return 'intake';
  if (PROJECT_STAGES.some((s) => s.id === status)) return status;
  return LEGACY_MAP[status] || 'intake';
}

export function stageLabel(status) {
  const id = normalizeStage(status);
  const stage = PROJECT_STAGES.find((s) => s.id === id);
  return stage ? stage.label : id;
}

export function stageColor(status) {
  const id = normalizeStage(status);
  const colors = {
    intake: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    'in-progress': 'bg-purple-500/20 text-purple-400 border-purple-500/50',
    review: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    delivered: 'bg-green-500/20 text-green-400 border-green-500/50',
    closed: 'bg-gray-500/20 text-gray-300 border-gray-500/50',
  };
  return colors[id] || colors.intake;
}
