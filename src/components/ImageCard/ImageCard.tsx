import { Photo } from "../../services/Api";
import css from "./ImageCard.module.css";

type Props = {
  image: Photo;
  onModalOpen: (image:string) => void;
};
const ImageCard = ({ image, onModalOpen }: Props) => {
  return (
    <div className={css.galleryWrap}>
      <img
        className={css.galleryImage}
        onClick={() => onModalOpen(image.urls.regular)}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;
