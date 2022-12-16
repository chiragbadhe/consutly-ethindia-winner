
import { useEnsAvatar } from "wagmi";

export const GetEnsAvatar = () => {
    try {
        const ensAvatar = useEnsAvatar({
            address: '0x983110309620d911731ac0932219af06091b6744',
            chainId: 1,
          })
        return ensAvatar.data
    }catch(e) {
        console.log("Error from GetEnsAvatar" )
        return
    }
}

