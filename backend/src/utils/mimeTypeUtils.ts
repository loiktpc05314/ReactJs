export function getMimeTypeCategory(mimeType: string): string {
    // Kiểm tra nếu chuỗi mimeType chứa 'image'
    if (mimeType.includes('image')) {
      return 'IMAGE';
    } else {
      return 'VIDEO';
    }
  }