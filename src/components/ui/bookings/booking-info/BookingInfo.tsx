'use client';
import { NextButton, PrevButton, usePrevNextButtons } from '@/components/dashboard/carousel/CarouselArrow';
import { Booking, Room } from '@/interfaces';
import useEmblaCarousel from 'embla-carousel-react';
import './bookingInfo.scss';

type Props = {
  booking: Booking;
  room: Room;
};

export const BookingInfo = ({ booking, room }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
  });
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);
  return (
    <div className="booking-info">
      <div className="booking-info__left">
        <div className="booking-info__user">
          <img
            className="booking-info__user-img"
            src={booking.guest_image}
            alt={booking.guest_name || 'Guest'}
          />
          <h2 className="booking-info__user-name">
            {booking.guest_name} - {booking.guest_last_name}
            <span>ID: {booking.id}</span>
          </h2>
        </div>

        <div className="booking-info__room">
          <div className="booking-info__room-details">
            <div>
              <h3 className="booking-info__room-title">Room info</h3>
              <p className="booking-info__room-name">
                {room.room_type}-{room.room_number}
              </p>
            </div>

            <div>
              <h3 className="booking-info__room-title">Price</h3>

              <p className="booking-info__room-price">${room.price}/nigth</p>
            </div>
          </div>
          <div className="booking-info__room-description">
            <h3 className="booking-info__room-title">Description</h3>
            <p>{room.description}</p>
          </div>
        </div>
      </div>
      <div className="booking-info__right">
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {room.images.map((image) => (
                <article key={image} className="embla__slide embla__slide--room message">
                  <img src={image} alt="image room" />
                </article>
              ))}
            </div>

            <div className="embla__controls">
              <div className="embla__buttons">
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
