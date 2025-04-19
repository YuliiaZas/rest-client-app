import { Button } from '../button';
import styles from './actions.module.scss';

type ActionsProps = {
  isEdit: boolean;
  save: () => void;
  cancel: () => void;
  delete: () => void;
  edit: () => void;
  isSaveDisabled?: boolean;
};

export function Actions({
  isEdit,
  save,
  edit,
  delete: deleteItem,
  cancel,
  isSaveDisabled = false,
}: ActionsProps) {
  return (
    <div className={styles.actions}>
      {isEdit ? (
        <>
          <Button onClick={save} icon="save" isDisabled={isSaveDisabled} />
          <Button onClick={cancel} icon="cancel" />
        </>
      ) : (
        <>
          <Button onClick={edit} icon="edit" />
          <Button onClick={deleteItem} icon="delete" />
        </>
      )}
    </div>
  );
}
