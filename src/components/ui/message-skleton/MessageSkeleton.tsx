import './messageSkeleton.scss';

const NUMBER_OF_MEESSAGES = 5;
export const MessageSkeleton = () => {
  return (
    <div className="message-skeleton">
      <div className="message-skeleton__messages">
        {Array.from({ length: NUMBER_OF_MEESSAGES }).map((_, index) => (
          <div key={index} className="message-skeleton__message">
            <div className="message-skeleton__titlle"></div>
            <div className="message-skeleton__description">
              <div className="message-skeleton__text"></div>
              <div className="message-skeleton__text"></div>
              <div className="message-skeleton__text"></div>
              <div className="message-skeleton__text"></div>
              <div className="message-skeleton__text"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="message-skeleton__controls">
        <div className="message-skeleton__control"></div>
        <div className="message-skeleton__control"></div>
      </div>
    </div>
  );
};
