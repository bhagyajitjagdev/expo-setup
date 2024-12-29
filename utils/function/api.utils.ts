export const extractErrorMsg = (error: any) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.result?.message ||
    error?.message ||
    'Something Went Wrong'
  );
};
