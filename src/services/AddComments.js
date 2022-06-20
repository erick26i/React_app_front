import { useState } from 'react';
import { useModal } from '../Context/ModalContext';
import { useToken } from '../Context/TokenContext';
import './AddComments.css';
import commentImg from '../img/comment_img.svg';
//import { useComment } from '../Context/CommentContext';

function AddComments({id, updateComment}) {
  const [token] = useToken();
  const [comments, setComments] = useState();
  const [, setModal] = useModal()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await fetch(`http://127.0.0.1:3000/service/${id}/add`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ id, comments }),
      })

      updateComment({serviceId: id, comment: comments})
      setModal(null)
    } catch (e) {
      console.warn(e);
    }

  };

  return (
    <aside className='comment-aside'>
      <div className='container'>
        <form id='add-comment' onSubmit={handleSubmit}>
          <span>
            <img src={commentImg} alt='comment_img' className='comment-img' />
          </span>
          <div className='container-wrap'>
            <label>
              <textarea
                placeholder='Your comment...'
                required
                className='comments'
                name='comments'
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </label>
            <button className='add-comment-btn'>Add Comments</button>
          </div>
        </form>
      </div>
    </aside>
  );
}

export default AddComments;
