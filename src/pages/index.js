import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-100 to-gray-200 px-6">
      <div className="max-w-xl text-center p-8 bg-white rounded-3xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          3D Model Viewer
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          This is just a model loader page. Head over to the model loader page to upload and view your 3D file.
        </p>
        <Link
          href="/ModelLoaderPage"
          className="inline-block px-6 py-3 text-white bg-black hover:bg-gray-800 transition-all duration-300 rounded-xl shadow-lg font-medium"
        >
          Go to Model Loader
        </Link>
      </div>
    </div>
  );
}
