interface StatItemProps {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

export function StatItem({ icon: Icon, label, value }: StatItemProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        {Icon && <Icon className="h-4 w-4" />}
        <span>{label}</span>
      </div>
      <p className="font-medium">{value}</p>
    </div>
  );
}