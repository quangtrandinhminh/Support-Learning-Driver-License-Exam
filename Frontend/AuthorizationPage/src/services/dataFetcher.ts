import axios from "axios";

// Định nghĩa các kiểu dữ liệu cho người dùng và mật khẩu
export interface User {
  id: number;
  username: string;
  gmail: string;
  password: string;
  phone: string;
  role: string;
}

// Hàm fetchData dùng để tải dữ liệu từ tệp JSON
export async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error: any) { // Sử dụng kiểu any cho biến error
    console.error('Error loading data:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else {
      console.error('No response from the server.');
    }
    throw error;
  }
}
