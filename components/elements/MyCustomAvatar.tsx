import { Types } from "connectkit";
import Image from "next/image";

const MyCustomAvatar = ({ address, ensImage, ensName, size, radius }: Types.CustomAvatarProps) => {
    
    function generateColorFromAddress(address: string | undefined): import("csstype").Property.Background<string | number> | undefined {
        throw new Error("Function not implemented.");
    }

  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: radius,
        height: size,
        width: size,
        background: generateColorFromAddress(address), // your function here
      }}
    >
      {ensImage && <Image src={ensImage} alt={(ensName ?? address) ?? ''}/>}
    </div>
  );
};

export default MyCustomAvatar;