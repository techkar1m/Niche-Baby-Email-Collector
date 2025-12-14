import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ResultPage from '@/components/pages/ResultPage';
import { useAudioStore } from '@/store/audioStore';

// Layout component that includes ScrollToTop and shared audio element
function Layout() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const setAudioRef = useAudioStore((state) => state.setAudioRef);

  useEffect(() => {
    // Register the audio element with the store so it can be accessed from any page
    setAudioRef(audioRef.current);
  }, [setAudioRef]);

  return (
    <>
      <ScrollToTop />
      {/* Shared audio element that persists across page navigation */}
      <audio 
        ref={audioRef}
        src="https://static.wixstatic.com/mp3/900eb8_787b885d9f3247fda85d9c00a0c9a921.mp3"
        preload="auto"
      />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "result",
        element: <ResultPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
