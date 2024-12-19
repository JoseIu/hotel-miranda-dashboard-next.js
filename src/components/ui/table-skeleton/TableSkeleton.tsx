import './tableSkeleton.scss';
type Props = {
  colums?: number;
  rows?: number;
};
export const TableSkeleton = ({ colums = 6, rows = 10 }: Props) => {
  return (
    <div className="table-skeleton">
      <div className="table-skeleton__header">
        <div className="table-skeleton__header-text"></div>

        {Array.from({ length: colums }).map((_, index) => (
          <div key={index} className="table-skeleton__header-text"></div>
        ))}
      </div>
      <div className="table-skeleton__header-textt"></div>

      <div>
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="table-skeleton__row">
            <div className="table-skeleton__cell">
              <div className="table-skeleton__image"></div>
              <div className="table-skeleton__text"></div>
            </div>
            {Array.from({ length: colums }).map((_, index) => (
              <div key={index} className="table-skeleton__text"></div>
            ))}

            <div className="table-skeleton__actions">
              <div className="table-skeleton__action"></div>
              <div className="table-skeleton__action"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
