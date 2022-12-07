import { useRouter } from "next/router"

const VCard = () => {
    const router = useRouter();
    const {link} = router.query;
    return (
        <>
            {link}
        </>
    );
}

export default VCard;