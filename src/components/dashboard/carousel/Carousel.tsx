'use client';

import { Message } from '@/interfaces/message';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { formatter } from '../../../utils/formatter';
import './carousel.scss';
import { NextButton, PrevButton, usePrevNextButtons } from './CarouselArrow';

type Props = {
  options?: EmblaOptionsType;
  messages: Message[];
};

export const Carousel = ({ messages, options }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
  });
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {messages.map((meesage) => (
            <article key={meesage.id} className="embla__slide message">
              <h2 className="message__title">
                {meesage.customer_name}
                <time className="message__date" dateTime={formatter(meesage.date.toISOString())}>
                  {formatter(meesage.date.toISOString())}
                </time>
              </h2>
              {/* <p>{meesage.subject}</p> */}
              <p className="message__description">{meesage.message}</p>
            </article>
          ))}
          {/* <div className="embla__slide">Slide 1</div>
        <div className="embla__slide">Slide 2</div>
        <div className="embla__slide">Slide 3</div>
        <div className="embla__slide">Slide 4</div>
        <div className="embla__slide">Slide 5</div>
        <div className="embla__slide">Slide 6</div>
        <div className="embla__slide">Slide 7</div>
        <div className="embla__slide">Slide 8</div>
        <div className="embla__slide">Slide 9</div>
        <div className="embla__slide">Slide 10</div> */}
        </div>

        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>
      </div>
    </div>
  );
};
