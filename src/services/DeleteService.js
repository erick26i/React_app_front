import { useModal } from '../Context/ModalContext';
import { useToken } from '../Context/TokenContext';
import questionImg from '../img/question.svg';

export default function DeleteService({id, deleteFile}) {
  const [token] = useToken();
  const [, setModal] = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://127.0.0.1:3000/service/${id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ id }),
      });
      deleteFile({serviceId: id})
      setModal(null);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className='container'>
      <img src={questionImg} alt='question_img' />
      <form className='form' onSubmit={handleSubmit}>
        <span>Do you realy want to delete the service?</span>
        <button className='accept'>Accept</button>
        <button className='cancel' onClick={() => setModal(null)}>
          Cancel
        </button>
      </form>
    </div>
  );
}
