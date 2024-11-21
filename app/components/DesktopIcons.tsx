import { useKernel } from '../contexts/KernelContext';
import { DesktopIcon } from './DesktopIcon';
import { applications } from '../config/applications';
import { launchApplication } from '../utils/windowManager';

export default function DesktopIcons() {
  const { dispatch } = useKernel();

  return (
    <div className="absolute top-2 left-2 grid grid-cols-1 gap-1">
      {Object.values(applications).map((app) => (
        <DesktopIcon
          key={app.id}
          id={app.id}
          icon={app.icon}
          title={app.title}
          onDoubleClick={() => launchApplication(app.id, dispatch)}
        />
      ))}
    </div>
  );
} 