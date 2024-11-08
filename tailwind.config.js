/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Quét tất cả file html và ts trong thư mục src
  ],
  theme: {
    extend: {
      // Tùy chỉnh theme nếu cần
      colors: {
        primary: '#50B498',
        secondary: '#9CDBA6',
        // ...
      },
      // Thêm các cấu hình khác
    },
  },
  plugins: [],
}