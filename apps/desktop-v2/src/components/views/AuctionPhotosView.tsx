import { PlaceholderView } from "./_placeholder";

interface Props { photos: string[] }

export default function AuctionPhotosView({ photos: _photos }: Props) {
  return <PlaceholderView title="Fotos Subasta" />;
}
