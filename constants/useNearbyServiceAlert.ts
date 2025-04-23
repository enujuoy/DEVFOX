// hooks/useNearbyServiceAlert.ts
import { getDistance } from '../utils/distance';
import serviceAreas from '../constants/serviceAreas';
import { useNotifications } from './useNotifications';

export const useNearbyServiceAlert = (
  myLat: number,
  myLon: number,
  showPopup: (text: string) => void,
  showHighlight: (text: string) => void
) => {
  const { notify } = useNotifications();

  const check = () => {
    for (const area of serviceAreas) {
      const distance = getDistance(myLat, myLon, area.latitude, area.longitude);
      if (distance <= 1.0) {
        showPopup(area.description);
        showHighlight('EV急速充電スタンド\n基数：3基');
        notify(area.name, area.description);
        notify('EV急速充電スタンド', '基数：3基');
        break;
      }
    }
  };

  return { check };
};
