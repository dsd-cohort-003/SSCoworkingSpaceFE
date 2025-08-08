import Heading from '../Text/Heading';
import type { OfficeDesk } from '../../type/officeDesk';
import BodyText from '../Text/BodyText';
import { LABELS } from '../../labels';
import Button from '../global/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setTotal } from '@/store/slices/officeSlice';
import type { RootState } from '@/store/store';
interface DeskCardProps {
  key: number;
  officeDesk: OfficeDesk;
  isLoading: boolean;
  isError: boolean;
  className?: string;
}

function DeskCard({
  officeDesk,
  isLoading,
  isError,
  className = '',
}: DeskCardProps) {
  const {
    description,
    basePrice,
    office: { name },
  } = officeDesk;

  const dispatch = useDispatch();
  const total = useSelector(
    (state: RootState) => state.officeReservation.resInfo.total,
  );

  const { SRC: src, ALT: alt } =
    description === 'Regular Desk'
      ? LABELS.IMAGES.REGULAR_DESK
      : description === 'Premium Desk'
        ? LABELS.IMAGES.PREMIUM_DESK
        : description === 'Large Desk'
          ? LABELS.IMAGES.LARGE_DESK
          : description === 'Standing Desk'
            ? LABELS.IMAGES.STANDING_DESK
            : { SRC: '', ALT: '' };
  const onReserve = () => {
    dispatch(setTotal());
    console.log(total);
  };
  return (
    <div
      className={`h-full bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group ${className} sm:h-[200px]`}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>There was an error loading</div>
      ) : (
        <div className="h-full flex flex-col sm:flex-row">
          <div className="h-80 sm:h-full sm:w-1/4">
            <img src={src} alt={alt} className="h-full w-full object-cover" />
          </div>
          <div className="px-4 pt-4 pb-6 sm:flex sm:flex-row">
            <div className="h-1/4 flex flex-col gap-y-2 sm:h-full sm:w-3/4">
              <Heading text={`Book a desk at ${name}`} />
              <BodyText
                text={`Available at $${basePrice}/day`}
                color="accent"
              />
            </div>
            <div className="h-1/4 sm:h-full sm:w-1/4 mt-3 sm:mt-1">
              <Button
                text={LABELS.BOOKING.CHOOSE_DESK.CTA}
                color="indigo"
                onClick={() => onReserve()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeskCard;
