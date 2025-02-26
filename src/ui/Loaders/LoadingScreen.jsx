import Loader from "./Loaders/Spinner";

function LoadingScreen() {
  return (
    <div className="fixed z-30 flex h-screen w-screen items-center justify-center bg-black bg-opacity-40">
      <Loader />
    </div>
  );
}

export default LoadingScreen;
