import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Actions } from './actions';

describe('Actions', () => {
  let saveMock: () => void;
  let cancelMock: () => void;
  let editMock: () => void;
  let deleteMock: () => void;

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
    saveMock = vi.fn();
    cancelMock = vi.fn();
    editMock = vi.fn();
    deleteMock = vi.fn();
  });
  it('renders save and cancel buttons in edit mode', () => {
    render(
      <Actions
        isEdit={true}
        save={saveMock}
        cancel={cancelMock}
        delete={vi.fn()}
        edit={vi.fn()}
      />
    );

    const saveButton = screen.getByTitle(/save/i);
    const cancelButton = screen.getByTitle(/cancel/i);

    expect(saveButton).toBeDefined();
    expect(cancelButton).toBeDefined();

    saveButton.click();
    cancelButton.click();
    expect(saveMock).toBeCalledTimes(1);
    expect(cancelMock).toBeCalledTimes(1);
  });

  it('renders edit and delete buttons in non-edit mode', () => {
    render(
      <Actions
        isEdit={false}
        edit={editMock}
        delete={deleteMock}
        save={vi.fn()}
        cancel={vi.fn()}
      />
    );

    const editButton = screen.getByTitle(/edit/i);
    const deleteButton = screen.getByTitle(/delete/i);

    expect(editButton).toBeDefined();
    expect(deleteButton).toBeDefined();

    editButton.click();
    deleteButton.click();
    expect(editMock).toBeCalledTimes(1);
    expect(deleteMock).toBeCalledTimes(1);
  });

  it('disables save button when isSaveDisabled is true', () => {
    render(
      <Actions
        isEdit={true}
        save={saveMock}
        cancel={cancelMock}
        isSaveDisabled={true}
        delete={deleteMock}
        edit={editMock}
      />
    );

    const saveButton = screen.getByTitle(/save/i);

    expect(saveButton).toBeDefined();
    saveButton.click();
    expect(saveMock).not.toHaveBeenCalled();
  });
});
