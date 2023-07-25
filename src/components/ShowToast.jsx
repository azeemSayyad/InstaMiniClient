import { toast } from 'react-toastify';

export const showErrorModal = (message) => {
  toast.error(message, {
    position: 'top-center',
    theme:'colored'
  });
};

export const showSuccessModal = (message) => {
  toast.success(message, {
    position: 'top-center',
    theme:'colored'
  });
}

export const showWarningModal = message => {
  toast.warning(message, {
    position: 'top-center',
    theme:'colored'
  });
}