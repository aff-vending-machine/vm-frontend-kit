import { get } from 'svelte/store';
import Swal from 'sweetalert2';

import { t } from './i18n/translations';

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
    const ts = get(t);
    const result = await Swal.fire({
      title: ts('common.delete-message-header'),
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: ts('common.button.confirm-delete'),
      cancelButtonText: ts('common.button.cancel'),
    });

    if (result.isConfirmed) {
      deleteFunc();
    }
  },
  filename: async (ext: string): Promise<string | undefined> => {
    const ts = get(t);
    const { value } = await Swal.fire({
      title: ts('common.export-message-header'),
      input: 'text',
      inputLabel: ts('common.export-message', { ext }),
      inputAttributes: {
        maxlength: '48',
        autocapitalize: 'off',
        autocorrect: 'off',
      },
      showCancelButton: true,
    });

    return value;
  },
  note: async (status: string): Promise<string | undefined> => {
    const ts = get(t);
    const { value } = await Swal.fire({
      title: ts('common.note-message-header', { status }),
      html: `
        <div class="flex flex-col space-y-2"> 
          <p class="text-xs">${ts('common.note-message-reason')}</p>
          <select id="swal-input1" class="w-full text-xs">
            <option value="ระบบจ่ายเงินมีปัญหา">ระบบจ่ายเงินมีปัญหา</option>
            <option value="จ่ายเงินแล้ว ไม่ได้รับสินค้า">จ่ายเงินแล้ว ไม่ได้รับสินค้า</option>
            <option value="จ่ายเงินแล้ว สินค้าหมด">จ่ายเงินแล้ว สินค้าหมด</option>
            <option value="จ่ายเงินแล้ว ได้รับสินค้าผิด">จ่ายเงินแล้ว ได้รับสินค้าผิด</option>
            <option value="อื่นๆ">อื่นๆ (โปรดระบุใน Note)</option>
          </select>
          <p class="text-xs mt-2">${ts('common.note-message-other-reason')}</p>
          <input id="swal-input2" type="input" class="w-full text-xs border px-3 py-2">
        </div>
      `,
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value ?? '',
          (document.getElementById('swal-input2') as HTMLInputElement).value ?? '',
        ];
      },
    });

    if (!value) {
      return undefined;
    }

    if (value[1]) {
      return value[0] + ': ' + value[1];
    } else {
      return value[0];
    }
  },
};
