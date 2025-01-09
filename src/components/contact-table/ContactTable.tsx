'use client';
import { Message } from '@/interfaces/message';
import { TrashIcon } from '@primer/octicons-react';
import { useState } from 'react';
import { Modal } from '../ui/modal/Modal';
type Props = {
  messages: Message[];
};
export const ContactTable = ({ messages }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>('');

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
                  {message.customer_name}
                  {message.customer_phone}
                  {message.customer_email}
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
                    <button>
                      <TrashIcon size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Modal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <div>{modalContent && modalContent}</div>
      </Modal>
    </>
  );
};
