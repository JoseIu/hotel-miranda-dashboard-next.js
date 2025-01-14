'use client';

import { deleteUser } from '@/app/actions/users/createUser';
import { Modal } from '@/components/ui/modal/Modal';
import { User } from '@/interfaces/user';
import { PencilIcon, TrashIcon } from '@primer/octicons-react';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { UserStatusBadge } from '../user-status/UserStatusBadge';

type Props = {
  user: User[];
};

export const UserTable = ({ user }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>('');

  const [deleteId, setDeleteId] = useState<string>('');

  const onDelete = async () => {
    const toasId = toast.loading('Deleting user...');

    const userDeleted = await deleteUser(deleteId);

    if (userDeleted?.error) {
      toast.dismiss(toasId);
      toast.error('Error deleting user');
    }
    toast.dismiss(toasId);

    toast.success('User deleted successfully');
  };

  return (
    <>
      <section className="table-container">
        <table className="table">
          <thead className="table__head">
            <tr className="table__head-tr">
              <th className="table__head-th">User</th>
              <th className="table__head-th">Job Description</th>
              <th className="table__head-th">Contact</th>
              <th className="table__head-th">Status</th>
              <th className="table__head-th">Action</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {user.map((user) => (
              <tr className="table__body-tr" key={user.id}>
                <td className="table__body-td">
                  <div className="table__body-sender">
                    <img className="table__body-img" src={user.user_image} alt={user.name} />
                    <span className="table__body-td">
                      {user.name} - {user.created_at.toLocaleDateString()}
                    </span>
                  </div>
                </td>
                <td className="table__body-td">
                  <button
                    onClick={() => {
                      setModalContent(user.jog_description);
                      setIsModalOpen(true);
                    }}
                  >
                    Show description
                  </button>
                </td>
                <td className="table__body-td table__body-td--hiden">
                  <div className="table__body-customer">
                    <div>{user.email}</div>
                    <div>{user.phone}</div>
                  </div>
                </td>
                <td className="table__body-td">
                  <UserStatusBadge status={user.status} />
                </td>

                <td className="table__body-td">
                  <div className="table__body-action">
                    <Link href={`/user/${user.id}`}>
                      <PencilIcon size={20} />
                    </Link>
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setDeleteId(user.id);
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
            <button
              className="modal-delete__btn modal-delete__btn--yes"
              onClick={() => {
                setIsModalOpen(false);
                onDelete();
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
        </Modal>
      )}
    </>
  );
};
