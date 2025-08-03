import FullWidthImage from '../FullWidthImage';
import Button from '../global/Button';
import Heading from '../Text/Heading';
import Card from '../ui/card';
import { LABELS } from '@/constants/labels';

function Resources() {
  return (
    <Card>
      <Heading text="Rent Office Space" />
      <Card header={{ title: 'Suite 100: DB' }} className="mt-6">
        <div className="space-y-4">
          <FullWidthImage src="/images/Grey.jpg" alt="Grey block" />

          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">
              Suite 100: DB
            </h3>
            <Button text="Reserve" onClick={() => {}} color="indigo" />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div>
              <p className="font-bold text-gray-900">Size</p>
              <p className="text-gray-600">6000sqft: DB</p>
            </div>
            <div>
              <p className="font-bold text-gray-900">
                {LABELS.BOOKING.LABELS.AVAILABLE}
              </p>
              <p className="text-gray-600">September 19, 2025: DB</p>
            </div>
            <div>
              <p className="font-bold text-gray-900">Lease Rate</p>
              <p className="text-gray-600">$USD: DB</p>
            </div>
          </div>
        </div>
      </Card>
    </Card>
  );
}

export default Resources;
