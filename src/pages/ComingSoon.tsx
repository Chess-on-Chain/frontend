const ComingSoon = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-black/70 z-50 flex items-center">
      <div className="w-full space-y-8">
        <p className="text-center text-white font-medium text-3xl sm:text-5xl leading-20 sm:leading-24 bg-linear-to-l from-white/0 from-20% via-yellow-600 via-50% to-white/0 to-80%">
          Cooming Soon
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-secondary text-black text-xl px-3 py-1 rounded m-2 mx-auto block cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
