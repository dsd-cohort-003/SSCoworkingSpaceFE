import Heading from '../Text/Heading';
import type { OfficeDesk } from '../../type/officeDesk';
import type { RootState } from '@/store/store';
import BodyText from '../Text/BodyText';
import { LABELS } from '../../labels';
import Button from '../global/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setDesks, removeDesk } from '@/store/slices/officeSlice';
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
    id,
  } = officeDesk;
  const dispatch = useDispatch();
  const selectedDesks = useSelector(
    (state: RootState) => state.officeReservation.resInfo.resDesks,
  );
  const isSelected = selectedDesks.some((desk) => desk.id === id);
  const deskCount = selectedDesks.filter((desk) => desk.id === id).length;

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

  const onReserve = (basePrice: number) => {
    dispatch(setDesks({ description, basePrice, name, id }));
  };

  return (
    <div
      className={`h-full bg-white rounded-xl border border-gray-200 mt-3 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group ${className} sm:h-[200px]`}
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
            <div className="h-1/4 sm:h-full sm:w-1/4 mt-3 sm:mt-1 gap-1 flex flex-col">
              <Button
                text={LABELS.BOOKING.CHOOSE_DESK.CTA}
                color="indigo"
                onClick={() => onReserve(basePrice)}
              />
              {!isSelected ? null : (
                <Button
                  text={'Remove Desk'}
                  onClick={() => dispatch(removeDesk(id))}
                  color="secondary"
                />
              )}
              {deskCount > 0 && (
                <div className="text-md text-gray-600 pl-2">
                  Total selected: {deskCount}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeskCard;
