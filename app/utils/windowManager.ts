import { applications } from '../config/applications';
import { v4 as uuidv4 } from 'uuid';

export function launchApplication(appId: string, dispatch: any) {
  const app = applications[appId];
  if (!app) return;

  const windowId = `${appId}-${uuidv4()}`;

  dispatch({
    type: 'OPEN_WINDOW',
    payload: {
      id: windowId,
      title: app.title,
      content: app.component,
      isMinimized: false,
      isMaximized: false,
      position: app.defaultPosition || { x: 50, y: 50 },
    }
  });
} 