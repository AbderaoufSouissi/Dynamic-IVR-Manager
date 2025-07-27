export const StatusMessage = ({ message }: { message: string }) => (
  <div className="pt-4 text-center">
    <p className="text-sm text-[var(--text-secondary)]">Status: <span className="font-medium text-[var(--danger-color)]">{message}</span></p>
  </div>
);
