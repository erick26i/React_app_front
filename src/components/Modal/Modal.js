import { useModal } from '../../Context/ModalContext';
import './Modal.css';

function Modal({ children }) {
  const [, setModal] = useModal();

  return (
    <div className='modal-bg'>
      <div className='modal-fg' onClick={(e) => e.stopPropagation()}>
        <p className='close' onClick={() => setModal(null)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-x'
            viewBox='0 0 16 16'
          >
            <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
          </svg>
        </p>
        {children}
      </div>
    </div>
  );
}

export default Modal;
