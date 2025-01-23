'use client';
import { deleteMessage } from '@/app/actions/messages/deleteMessage';
import { Message } from '@/interfaces/message';
import { TrashIcon } from '@primer/octicons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Modal } from '../ui/modal/Modal';
type Props = {
  messages: Message[];
};
export const ContactTable = ({ messages }: Props) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>('');
  const [deleteId, setDeleteId] = useState<string>('');

  const onDeleteMessage = async () => {
    const toasId = toast.loading('Deleting message...');
    const userDeleted = await deleteMessage(deleteId);

    if (userDeleted?.error) {
      toast.dismiss(toasId);
      toast.error('Error deleting message');
      return;
    }

    toast.dismiss(toasId);
    toast.success('Message deleted successfully');
    router.refresh();
  };

  return (
    <>
      <section className="table-container">
        <table className="table">
          <thead className="table__head">
            <tr className="table__head-tr">
              <th className="table__head-th">Date</th>
              <th className="table__head-th">Customer</th>
              <th className="table__head-th">Subject</th>
              <th className="table__head-th">Action</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {messages.map((message) => (
              <tr className="table__body-tr" key={message.id}>
                <td className="table__body-td">
                  <span className="table__body-td">{message.date.toLocaleDateString()}</span>
                </td>
                <td className="table__body-td">
                  <div className="table__body-customer">
                    <div>
                      {message.customer_name} - {message.customer_phone}
                    </div>
                    <div> {message.customer_email}</div>
                  </div>
                </td>
                <td className="table__body-td table__body-td--hiden">
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setModalContent(message.message);
                    }}
                  >
                    Show messaje
                  </button>
                </td>

                <td className="table__body-td">
                  <div className="table__body-action">
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setDeleteId(message.id);
                      }}
                    >
                      <TrashIcon size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {modalContent && (
        <Modal
          isModalOpen={isModalOpen}
          closeModal={() => {
            setIsModalOpen(false);
            setModalContent(null);
          }}
        >
          <div>{modalContent && modalContent}</div>
        </Modal>
      )}

      {!modalContent && (
        <Modal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
          <div className="modal-delete">
            <h2 className="modal-delete__title">Are you sure you want to delete this message?</h2>

            <div className="modal-delete__btns">
              <button
                className="modal-delete__btn modal-delete__btn--yes"
                onClick={() => {
                  setIsModalOpen(false);
                  onDeleteMessage();
                }}
              >
                Yes
              </button>
              <button
                className="modal-delete__btn modal-delete__btn--no"
                onClick={() => {
                  setIsModalOpen(false);
                  setDeleteId('');
                }}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
