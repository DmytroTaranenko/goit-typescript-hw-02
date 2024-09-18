import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import "./App.css";
import {
  Photo,
  requestPhotosBySearchValue,
} from "./services/Api";
import Loader from "./components/Loader/Loader";
import { Toaster } from "react-hot-toast";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState<Photo[] | null>(null);
  const [userInput, setUserInput] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageModalUrl, setImageModalUrl] = useState<string | null>(null);

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const onSearch = (query: string) => {
    setUserInput(query);
    setPage(1);
  };

  const onModalOpen = (imageUrl: string) => {
    setImageModalUrl(imageUrl);
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (userInput === null && page === 1) return;

    const fetchImages = async () => {
      if (userInput === null) return;
      try {
        setLoader(true);
        const { results, totalPages } = await requestPhotosBySearchValue(
          userInput,
          page
        );
        setTotalPages(totalPages);
        if (page === 1) {
          setImages(results);
        } else {
          if(images === null) return;
          setImages([...images, ...results]);
        }
      } catch (error) {
        if(error instanceof Error)
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };

    fetchImages();
  }, [userInput, page]);

  return (
    <>
      <SearchBar onSearch={onSearch} />
      <ImageGallery onModalOpen={onModalOpen} images={images} />
      {loader === true && <Loader />}
      {error !== null && <ErrorMessage errorMessage={error} />}
      {images?.length !== 0 && page < (totalPages ?? 0)  && !loader && (
        <LoadMoreBtn onClick={onLoadMore} />
      )}
      <ImageModal
        imageModalUrl={imageModalUrl}
        isOpen={isModalOpen}
        onClose={onModalClose}
      />
      <Toaster />
    </>
  );
}

export default App;
