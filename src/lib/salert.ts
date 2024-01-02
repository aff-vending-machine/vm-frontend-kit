import Swal from 'sweetalert2';

export const salert = {
  success: (message: string) => {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
    });
  },
  failure: (message: string) => {
    Swal.fire({
      icon: 'error',
      title: message,
      showConfirmButton: false,
    });
  },
  delete: async (message: string, deleteFunc: () => void) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      deleteFunc();
    }
  },
};
