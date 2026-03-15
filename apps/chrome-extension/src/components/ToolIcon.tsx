import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface ToolIconProps extends LucideProps {
  name: string;
}

export default function ToolIcon({ name, ...props }: ToolIconProps) {
  const IconComponent = (Icons as any)[name];
  
  if (!IconComponent) {
    return <Icons.Wrench {...props} />;
  }

  return <IconComponent {...props} />;
}
