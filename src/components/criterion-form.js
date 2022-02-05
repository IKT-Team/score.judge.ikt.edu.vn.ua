import { useCallback, useEffect } from 'react';
import { GripVertical, Trash } from 'react-bootstrap-icons';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import api from '../api/action-cable';
import criteriaSlice from '../state/criteria';

const CriterionForm = ({ id }) => {
  const { name, limit, dirty } = useSelector(s => s.criteria.find(c => c.id === id), shallowEqual);
  const dispatch = useDispatch();

  const performDelete = useCallback(
    () => api.perform('delete_criterion', { id }),
    [id]
  );
  const onNameChange = useCallback(
    e => dispatch(criteriaSlice.actions.dirtyUpdate({ id, name: e.target.value })),
    [id, dispatch]
  );
  const onLimitChange = useCallback(
    e => dispatch(criteriaSlice.actions.dirtyUpdate({ id, limit: e.target.valueAsNumber })),
    [id, dispatch]
  );

  useEffect(
    () => dirty && api.perform('update_criterion', { id, token: dirty, params: { name, limit } }),
    [id, name, limit, dirty]
  );

  return <div className='d-flex gap-2 py-1 align-items-center bg-white'>
    <GripVertical size='25' />

    <div className='flex-grow-1 form-floating'>
      <input className='form-control' type='text' value={name} min={0} onChange={onNameChange} />
      <label>Назва критерію</label>
    </div>

    <div className='flex-grow-1 form-floating'>
      <input className='form-control' type='number' value={limit} min={0} onChange={onLimitChange} />
      <label>Кількість балів</label>
    </div>

    <button className='btn btn-outline-secondary align-self-stretch' onClick={performDelete}>
      <Trash />
    </button>
  </div>;
};

export default CriterionForm;
