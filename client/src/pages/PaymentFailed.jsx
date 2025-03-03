const PaymentFailed = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-red-600">Payment Failed ❌</h1>
      <p>Something went wrong. Please try again.</p>
      <a href="/buy" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
        Try Again
      </a>
    </div>
  );
};

export default PaymentFailed;
