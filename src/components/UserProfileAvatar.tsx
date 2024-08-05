
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserProfileAvatar({
  name,
  image,
}: {
  name: string;
  image?: string;
}) {
  return (
    <Avatar>
    <AvatarImage src={image} alt="profile" />
    <AvatarFallback>{name}</AvatarFallback>
  </Avatar>
  );
}
