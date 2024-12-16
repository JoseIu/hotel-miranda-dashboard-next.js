import { XIcon } from '@primer/octicons-react';
import './modal.scss';
type Props = {
  children: React.ReactNode;
  isModalOpen: boolean;
  closeModal: () => void;
};

export const Modal = ({ children, isModalOpen, closeModal }: Props) => {
  const modalClass = isModalOpen && 'modal--open';
  return (
    <div className={`modal ${modalClass}`}>
      <div className="modal__content">
        <button className="modal__btn" onClick={closeModal}>
          <XIcon size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};
