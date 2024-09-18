import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Photo } from "../../services/Api";

type Props = {
  images: Photo[] | null;
  onModalOpen: (image:string) => void;
};

const ImageGallery = ({ images, onModalOpen }: Props) => {
  return (
    <ul className={css.galleryList}>
      {images !== null &&
        images.map((image) => {
          return (
            <li key={image.id} className={css.galleryItem}>
              <ImageCard image={image} onModalOpen={onModalOpen} />
            </li>
          );
        })}
    </ul>
  );
};

export default ImageGallery;
